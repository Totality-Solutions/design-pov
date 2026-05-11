import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";

const ses = new SESClient({
  region: process.env.AWS_SES_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@designpovindia.com";
const TO_EMAIL = process.env.MAIL_MARKETING || "marketing@designpovindia.com";

export async function POST(req: Request) {
  try {
    const { name, email, contact, organization, designation, location, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const fields: [string, string | undefined][] = [
      ["Name", name],
      ["Email", email],
      ["Phone", contact],
      ["Organization", organization],
      ["Designation", designation],
      ["Location", location],
      ["Message", message],
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
          <h1 style="color:#fff;margin:0;font-size:18px">Design POV — New Contact Enquiry</h1>
          <p style="color:#aaa;margin:6px 0 0;font-size:13px">From the Contact page</p>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:collapse">${rows}</table>
        </div>
        <div style="padding:12px 24px;background:#f4f4f4;font-size:12px;color:#888">
          Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </div>
      </div>`;

    await ses.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [TO_EMAIL] },
        Message: {
          Subject: { Data: `Contact Enquiry from ${name}`, Charset: "UTF-8" },
          Body: { Html: { Data: html, Charset: "UTF-8" } },
        },
      })
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact SES error:", err);
    return NextResponse.json({ error: err.message || "Failed to send message." }, { status: 500 });
  }
}
