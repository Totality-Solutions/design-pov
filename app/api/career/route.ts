import { NextResponse } from 'next/server';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';

const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024; // SES raw message limit is 40MB; base64 inflates ~33%, well within range
const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const EXTENSION_CONTENT_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

let _ses: SESClient | null = null;
function getSesClient() {
  if (!_ses) {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error("Missing AWS SES environment variables");
    }
    _ses = new SESClient({
      region,
      credentials: { accessKeyId: accessKeyId.trim(), secretAccessKey: secretAccessKey.trim() },
    });
  }
  return _ses;
}

const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@designpovindia.com';
const HR_EMAIL = process.env.MAIL_HR || 'hr@totality.solutions';

function buildCareerEmailHtml(fields: Record<string, string | null>) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:8px 16px;font-weight:600;background:#f4f4f4;white-space:nowrap;border:1px solid #ddd">${key}</td>
          <td style="padding:8px 16px;border:1px solid #ddd">${value}</td>
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#10b981;padding:20px 24px">
        <h1 style="color:#fff;margin:0;font-size:20px">Design POV Careers — New Application</h1>
      </div>
      <div style="padding:24px">
        <p style="font-size:15px;color:#333;">A new job application has been submitted:</p>
        <table style="width:100%;border-collapse:collapse">${rows}</table>
      </div>
      <div style="padding:12px 24px;background:#f4f4f4;font-size:12px;color:#888">
        Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </div>
    </div>`;
}

function encodeMimeWord(str: string) {
  return /[^\x00-\x7F]/.test(str)
    ? `=?UTF-8?B?${Buffer.from(str, 'utf-8').toString('base64')}?=`
    : str;
}

function buildRawMimeEmail(opts: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachment: { filename: string; contentType: string; content: Buffer } | null;
}) {
  const boundaryMixed = `mixed_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const boundaryAlt = `alt_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    `Subject: ${encodeMimeWord(opts.subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundaryMixed}"`,
  ].join('\r\n');

  const alternativePart = [
    `--${boundaryMixed}`,
    `Content-Type: multipart/alternative; boundary="${boundaryAlt}"`,
    '',
    `--${boundaryAlt}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(opts.text, 'utf-8').toString('base64'),
    '',
    `--${boundaryAlt}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(opts.html, 'utf-8').toString('base64'),
    '',
    `--${boundaryAlt}--`,
  ].join('\r\n');

  let attachmentPart = '';
  if (opts.attachment) {
    const filename = encodeMimeWord(opts.attachment.filename);
    const base64Content = opts.attachment.content.toString('base64').replace(/(.{76})/g, '$1\r\n');
    attachmentPart = [
      '',
      `--${boundaryMixed}`,
      `Content-Type: ${opts.attachment.contentType}; name="${filename}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${filename}"`,
      '',
      base64Content,
    ].join('\r\n');
  }

  return [headers, '', alternativePart, attachmentPart, `--${boundaryMixed}--`, ''].join('\r\n');
}

export async function POST(req: Request) {
  try {
    // 1. Parse FormData payload securely
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (parseError) {
      console.error('[careers] Failed to parse form data layout:', parseError);
      return NextResponse.json({ error: "Invalid form payload format." }, { status: 400 });
    }
    
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const role = (formData.get("role") as string) || "";
    const experience = (formData.get("experience") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    const reason = (formData.get("reason") as string) || "";
    
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required basic fields." }, { status: 400 });
    }

    // Read the uploaded CV in-memory so it can be attached directly to the email
    const cvFile = formData.get("cv");
    let cvFileName: string | null = null;
    let cvAttachment: { filename: string; contentType: string; content: Buffer } | null = null;

    if (cvFile && typeof cvFile !== 'string') {
      const file = cvFile as File;
      cvFileName = file.name;

      const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      if (!ALLOWED_CV_EXTENSIONS.includes(extension)) {
        return NextResponse.json({ error: "CV must be a PDF, DOC, or DOCX file." }, { status: 400 });
      }
      if (file.size > MAX_CV_SIZE_BYTES) {
        return NextResponse.json({ error: "CV file is too large (max 10MB)." }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      cvAttachment = {
        filename: file.name,
        contentType: file.type || EXTENSION_CONTENT_TYPES[extension],
        content: Buffer.from(arrayBuffer),
      };
    }

    // 2. Build template email structures
    const emailFields = {
      Candidate: name,
      Email: email,
      Phone: phone,
      'Targeted Role': role,
      'Experience Level': experience,
      'Portfolio URL': portfolio || 'Not provided',
      'Cover Letter Note': reason,
      'Uploaded CV File Name': cvFileName || 'No file attached',
    };

    const subject = `New Application: ${role} - ${name}`;
    const plainText = Object.entries(emailFields)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    // 3. Await the SES execution directly (Blocking)
    // Making this await blocking guarantees that if AWS SES fails, it falls straight to the catch block
    console.log(`[careers] Attempting to route application alert email to: ${HR_EMAIL}`);
    
    const rawMessage = buildRawMimeEmail({
      from: `Design POV Careers <${FROM_EMAIL}>`,
      to: HR_EMAIL,
      subject,
      text: plainText,
      html: buildCareerEmailHtml(emailFields),
      attachment: cvAttachment,
    });

    await getSesClient().send(new SendRawEmailCommand({
      Source: FROM_EMAIL,
      Destinations: [HR_EMAIL],
      RawMessage: { Data: Buffer.from(rawMessage, 'utf-8') },
    }));

    console.log('[careers] SES email successfully dispatched!');
    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });

  } catch (error: any) {
    // 4. Any AWS SES credentials or sandbox identity validation issues will end up here cleanly
    console.error('[careers] Critical processing failure:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch notification email.' }, 
      { status: 500 }
    );
  }
}