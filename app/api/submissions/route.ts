import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getDepartment } from '@/lib/mailDepartment';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ses = new SESClient({
  region: process.env.AWS_SES_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

const MARKETING_EMAIL = 'marketing@designpovindia.com';
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

async function sendEmail(subject: string, fields: Record<string, string | null>) {
  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: { ToAddresses: [MARKETING_EMAIL] },
    Message: {
      Subject: { Data: subject, Charset: 'UTF-8' },
      Body: { Html: { Data: buildEmailHtml(fields), Charset: 'UTF-8' } },
    },
  });
  await ses.send(command);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, category, name, email, contact, fileName } = body;

    // 1. Save to submissions table
    const { data, error } = await supabase
      .from('submissions')
      .insert([{ type, category, name, email, contact, file_name: fileName, created_at: new Date().toISOString() }])
      .select();

    if (error) throw error;

    // 2. Dual-write to pov_mails (non-blocking)
    const department = getDepartment(type, category);
    supabase.from('pov_mails').insert([{
      department,
      form_type: type,
      category,
      subject: `New Submission: ${category || type || 'Form'}`,
      from_name: name || null,
      from_email: email || null,
      from_phone: contact || null,
      extra_data: fileName ? { file_name: fileName } : {},
    }]).then(({ error: e }) => { if (e) console.error('pov_mails write error:', e); });

    // 3. Send SES email (non-blocking)
    try {
      await sendEmail(`New Submission: ${category || type || 'Form'}`, {
        Category: category || type || null,
        Name: name || null,
        Email: email || null,
        Phone: contact || null,
        'File Name': fileName || null,
      });
    } catch (emailErr) {
      console.error('SES email error (non-fatal):', emailErr);
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
