import { NextResponse, after } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getDepartment, DEPARTMENT_EMAILS } from '@/lib/mailDepartment';
import { sendRawEmail, readEmailAttachment, type EmailAttachment } from '@/lib/sesMail';

// Form components attach files under one (or more) of these field names
const ATTACHMENT_FIELDS = ['file', 'doc', 'image'];

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

async function sendSubmissionEmail(
  to: string,
  subject: string,
  fields: Record<string, string | null>,
  attachments: EmailAttachment[]
) {
  const plainText = Object.entries(fields)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  await sendRawEmail({
    from: `Design POV <${process.env.SES_FROM_EMAIL || 'noreply@designpovindia.com'}>`,
    to,
    subject,
    text: plainText,
    html: buildEmailHtml(fields),
    attachments,
  });
}

export async function POST(req: Request) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (parseError) {
      console.error('[submissions] Failed to parse form data:', parseError);
      return NextResponse.json({ error: "Invalid form payload format." }, { status: 400 });
    }

    const type = (formData.get("type") as string) || null;
    const category = (formData.get("category") as string) || null;
    const name = (formData.get("name") as string) || null;
    const email = (formData.get("email") as string) || null;
    const contact = (formData.get("contact") as string) || null;
    const message = (formData.get("message") as string) || null;

    // Read any attached files in-memory so they can go straight into the email.
    // Only the count is tracked downstream — actual filenames aren't stored or emailed.
    const attachments: EmailAttachment[] = [];

    for (const field of ATTACHMENT_FIELDS) {
      const value = formData.get(field);
      if (value && typeof value !== 'string') {
        const file = value as File;
        const result = await readEmailAttachment(file);
        if (!result.ok) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }
        attachments.push(result.attachment);
      }
    }

    const attachedFileCount = attachments.length;
    const attachedFileSummary = attachedFileCount > 0 ? `attached_file: ${attachedFileCount}` : null;

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
        file_name: attachedFileSummary,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('[submissions] Supabase insert error:', error);
      throw error;
    }

    console.log('[submissions] Saved to Supabase:', data);

    // 2 & 3. pov_mails dual-write + SES email — deferred via after() so the
    // response returns immediately, but Vercel keeps the function alive until
    // these actually finish instead of silently dropping them mid-flight.
    after(async () => {
      const { data: mailData, error: mailErr } = await supabase.from('pov_mails').insert([{
        department,
        form_type: type,
        category,
        subject: `New Submission: ${category || type || 'Form'}`,
        from_name: name || null,
        from_email: email || null,
        from_phone: contact || null,
        message: message || null,
        to_email: toEmail,
        mail_sent: false,
        extra_data: attachedFileCount > 0 ? { attached_file: attachedFileCount } : {},
      }]).select().single();
      if (mailErr) {
        console.error('[submissions] pov_mails write error:', mailErr);
      } else {
        console.log('[submissions] Saved to pov_mails:', mailData);
      }

      try {
        await sendSubmissionEmail(toEmail, `New Submission: ${category || type || 'Form'}`, {
          Category: category || type || null,
          Name: name || null,
          Email: email || null,
          Phone: contact || null,
          Message: message || null,
          'File Name': attachedFileSummary || 'No file attached',
        }, attachments);
        if (mailData) {
          await supabase.from('pov_mails').update({ mail_sent: true }).eq('id', mailData.id);
        }
      } catch (emailErr) {
        console.error('[submissions] SES email error (non-fatal):', emailErr);
      }
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('[submissions] API route error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
