import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { createServerClient } from '@/lib/supabase/server';
import { getDepartment, DEPARTMENT_EMAILS } from '@/lib/mailDepartment';

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

function buildEmailHtml(fields: Record<string, string | null>) {
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
      <div style="background:#c00;padding:20px 24px">
        <h1 style="color:#fff;margin:0;font-size:20px">Design POV — New Submission</h1>
      </div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse">${rows}</table>
      </div>
      <div style="padding:12px 24px;background:#f4f4f4;font-size:12px;color:#888">
        Submitted at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </div>
    </div>`;
}

async function sendEmail(to: string, subject: string, fields: Record<string, string | null>) {
  const plainText = Object.entries(fields)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  await getSesClient().send(new SendEmailCommand({
    Source: `Design POV <${FROM_EMAIL}>`,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: 'UTF-8' },
      Body: {
        Html: { Data: buildEmailHtml(fields), Charset: 'UTF-8' },
        Text: { Data: plainText, Charset: 'UTF-8' },
      },
    },
  }));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, category, name, email, contact, message, fileName } = body;

    const supabase = createServerClient();

    // 1. Save to submissions table
    const department = getDepartment(type, category);
    const toEmail = DEPARTMENT_EMAILS[department];

    const { data, error } = await supabase
      .from('submissions')
      .insert([{
        type,
        category,
        name,
        email,
        contact,
        file_name: fileName,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('[submissions] Supabase insert error:', error);
      throw error;
    }

    console.log('[submissions] Saved to Supabase:', data);

    // 2. Dual-write to pov_mails (non-blocking)
    supabase.from('pov_mails').insert([{
      department,
      form_type: type,
      category,
      subject: `New Submission: ${category || type || 'Form'}`,
      from_name: name || null,
      from_email: email || null,
      from_phone: contact || null,
      message: message || null,
      extra_data: fileName ? { file_name: fileName } : {},
    }]).then(({ data: mailData, error: mailErr }) => {
      if (mailErr) {
        console.error('[submissions] pov_mails write error:', mailErr);
      } else {
        console.log('[submissions] Saved to pov_mails:', mailData);
      }
    });

    // 3. Send SES email (non-blocking)
    sendEmail(toEmail, `New Submission: ${category || type || 'Form'}`, {
      Category: category || type || null,
      Name: name || null,
      Email: email || null,
      Phone: contact || null,
      Message: message || null,
      'File Name': fileName || null,
    }).catch((emailErr) => {
      console.error('[submissions] SES email error (non-fatal):', emailErr);
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('[submissions] API route error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
