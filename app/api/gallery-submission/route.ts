import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  title: z.string().min(1, "Project title is required"),
  contributor: z.string().min(1, "Contributor name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  story: z
    .string()
    .min(50, "Project story must be at least 50 characters")
    .max(1000, "Project story must not exceed 1000 characters"),
  images: z.array(z.string()).min(2).max(10),
});

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

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@designpovindia.com";
const TO_EMAIL = process.env.MAIL_MARKETING || "marketing@designpovindia.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors },
        { status: 422 }
      );
    }

    const { title, contributor, email, organization, website, story, images } =
      parsed.data;

    const supabase = createServerClient();

    // 1. Save to submissions table
    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          type: "gallery",
          category: "Gallery Submission",
          name: contributor,
          email,
          message: story,
          extra_data: {
            title,
            organization: organization || null,
            website: website || null,
            images,
          },
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[gallery-submission] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save submission." },
        { status: 500 }
      );
    }

    // 2. Dual-write to pov_mails — awaited so we have the row's id ready to
    // mark mail_sent once the SES send below actually succeeds.
    const { data: mailData, error: mailErr } = await supabase
      .from("pov_mails")
      .insert([
        {
          department: "marketing",
          form_type: "gallery",
          category: "Gallery Submission",
          subject: `Gallery Submission: ${title}`,
          from_name: contributor,
          from_email: email,
          message: story,
          to_email: TO_EMAIL,
          mail_sent: false,
          extra_data: {
            title,
            organization: organization || null,
            website: website || null,
            imageCount: images.length,
          },
        },
      ])
      .select()
      .single();

    if (mailErr) {
      console.error("[gallery-submission] pov_mails write error:", mailErr);
    }

    // 3. Send SES email — the raw base64 images are stored in Supabase, not
    // embedded in the email itself (would bloat the message unnecessarily).
    const fields: [string, string | undefined][] = [
      ["Project Title", title],
      ["Contributor", contributor],
      ["Email", email],
      ["Organization", organization],
      ["Website", website],
      ["Images Submitted", String(images.length)],
      ["Project Story", story],
    ];

    const rows = fields
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr>
            <td style="padding:8px 16px;font-weight:600;background:#f4f4f4;border:1px solid #ddd;white-space:nowrap">${k}</td>
            <td style="padding:8px 16px;border:1px solid #ddd">${v}</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#000;padding:20px 24px">
          <h1 style="color:#fff;margin:0;font-size:18px">Design POV — New Gallery Submission</h1>
          <p style="color:#aaa;margin:6px 0 0;font-size:13px">From the Gallery "Get Featured" form</p>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:collapse">${rows}</table>
        </div>
        <div style="padding:12px 24px;background:#f4f4f4;font-size:12px;color:#888">
          Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </div>
      </div>`;

    const plainText = fields
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    await getSesClient().send(
      new SendEmailCommand({
        Source: `Design POV <${FROM_EMAIL}>`,
        Destination: { ToAddresses: [TO_EMAIL] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: `Gallery Submission: ${title}`, Charset: "UTF-8" },
          Body: {
            Html: { Data: html, Charset: "UTF-8" },
            Text: { Data: plainText, Charset: "UTF-8" },
          },
        },
      })
    );

    if (mailData) {
      await supabase.from("pov_mails").update({ mail_sent: true }).eq("id", mailData.id);
    }

    return NextResponse.json(
      { success: true, message: "Your project has been submitted successfully.", data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[gallery-submission] API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
