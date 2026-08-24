import { NextResponse } from 'next/server';
import { sendRawEmail, readEmailAttachment, type EmailAttachment } from '@/lib/sesMail';
import { getFileExtension } from '@/lib/attachments';

const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];

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
    let cvAttachment: EmailAttachment | null = null;

    if (cvFile && typeof cvFile !== 'string') {
      const file = cvFile as File;
      cvFileName = file.name;

      if (!ALLOWED_CV_EXTENSIONS.includes(getFileExtension(file.name))) {
        return NextResponse.json({ error: "CV must be a PDF, DOC, or DOCX file." }, { status: 400 });
      }

      const result = await readEmailAttachment(file);
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      cvAttachment = result.attachment;
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

    await sendRawEmail({
      from: `Design POV Careers <${process.env.SES_FROM_EMAIL || 'noreply@designpovindia.com'}>`,
      to: HR_EMAIL,
      subject,
      text: plainText,
      html: buildCareerEmailHtml(emailFields),
      attachments: cvAttachment ? [cvAttachment] : [],
    });

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
