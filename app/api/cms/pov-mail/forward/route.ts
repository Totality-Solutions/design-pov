import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!.trim(),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!.trim(),
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@designpovindia.com";

export async function POST(req: Request) {
  const { to, mail } = await req.json();

  if (!to || !mail) {
    return NextResponse.json({ error: "to and mail are required" }, { status: 400 });
  }

  const fields: [string, string][] = [
    ["Department", mail.department],
    ["Form Type", mail.form_type || "—"],
    ["Category", mail.category || "—"],
    ["Name", mail.from_name || "—"],
    ["Email", mail.from_email || "—"],
    ["Phone", mail.from_phone || "—"],
    ["Message", mail.message || "—"],
    ["Received", new Date(mail.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];

  const extraRows = Object.entries(mail.extra_data || {})
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `<tr><td style="padding:8px 16px;font-weight:600;background:#f4f4f4;border:1px solid #ddd;white-space:nowrap">${k}</td><td style="padding:8px 16px;border:1px solid #ddd">${v}</td></tr>`)
    .join("");

  const rows = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:8px 16px;font-weight:600;background:#f4f4f4;border:1px solid #ddd;white-space:nowrap">${k}</td><td style="padding:8px 16px;border:1px solid #ddd">${v}</td></tr>`)
    .join("") + extraRows;

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#000;padding:20px 24px">
        <h1 style="color:#fff;margin:0;font-size:18px">Design POV — Forwarded Submission</h1>
        <p style="color:#aaa;margin:6px 0 0;font-size:13px">${mail.subject || "Form Submission"}</p>
      </div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse">${rows}</table>
      </div>
      <div style="padding:12px 24px;background:#f4f4f4;font-size:12px;color:#888">
        Forwarded from Design POV CMS
      </div>
    </div>`;

  try {
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: `[Fwd] ${mail.subject || "Form Submission"}`, Charset: "UTF-8" },
        Body: { Html: { Data: html, Charset: "UTF-8" } },
      },
    }));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Forward SES error:", err);
    return NextResponse.json({ error: err.message || "Failed to send" }, { status: 500 });
  }
}
