import { randomUUID } from "crypto";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const IMAGE_BUCKET = "gallery-submissions";

function parseDataUrl(dataUrl: string) {
  // Only regex-match the short header — running a greedy `.+` capture
  // against the full base64 payload (several MB for a real photo) can
  // overflow V8's regex backtracking stack.
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return null;

  const header = dataUrl.slice(0, commaIndex);
  const match = /^data:(image\/[a-zA-Z+]+);base64$/.exec(header);
  if (!match) return null;

  const contentType = match[1];
  const ext = contentType.split("/")[1].replace("jpeg", "jpg");
  const base64 = dataUrl.slice(commaIndex + 1);
  return { buffer: Buffer.from(base64, "base64"), contentType, ext };
}

async function ensureBucket(supabase: ReturnType<typeof createServerClient>) {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === IMAGE_BUCKET)) {
    const { error } = await supabase.storage.createBucket(IMAGE_BUCKET, { public: true });
    if (error) console.error("[gallery-submission] createBucket error:", error);
  }
}

// Uploads each base64 image to Supabase Storage and returns their public
// URLs. Images that fail to parse/upload are skipped rather than failing
// the whole submission — the form itself already enforces file type/size.
async function uploadImages(
  supabase: ReturnType<typeof createServerClient>,
  submissionId: string,
  images: string[]
) {
  await ensureBucket(supabase);

  const urls: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const parsed = parseDataUrl(images[i]);
    if (!parsed) {
      console.error(`[gallery-submission] image ${i} is not a valid data URL`);
      continue;
    }
    const path = `${submissionId}/${i + 1}.${parsed.ext}`;
    const { error } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, parsed.buffer, { contentType: parsed.contentType, upsert: true });

    if (error) {
      console.error(`[gallery-submission] upload error for image ${i}:`, error);
      continue;
    }
    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

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

    // 1. Upload the actual images to Supabase Storage so they're kept
    // permanently — the request body only carries them as base64 for
    // transmission, nothing persisted them until now.
    const submissionId = randomUUID();
    const imageUrls = await uploadImages(supabase, submissionId, images);

    // 2. Save to submissions table — only real columns (matches the shape
    // every other form on the site uses; `submissions` has no extra_data
    // column, that's pov_mails only).
    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          type: "gallery",
          category: "Gallery Submission",
          name: contributor,
          email,
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
            images: imageUrls,
          },
        },
      ])
      .select()
      .single();

    if (mailErr) {
      console.error("[gallery-submission] pov_mails write error:", mailErr);
    }

    // 3. Send SES email — with real, permanent image URLs (from Storage)
    // rather than the raw base64 the browser sent, which would bloat the
    // message and isn't a real file link.
    const fields: [string, string | undefined][] = [
      ["Project Title", title],
      ["Contributor", contributor],
      ["Email", email],
      ["Organization", organization],
      ["Website", website],
      ["Images Submitted", `${imageUrls.length} of ${images.length}`],
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

    const imagesHtml = imageUrls.length
      ? `<div style="margin-top:20px">
          <p style="font-weight:600;font-size:14px;margin:0 0 10px">Submitted Images</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${imageUrls
              .map(
                (url) =>
                  `<a href="${url}" target="_blank"><img src="${url}" width="110" height="110" style="object-fit:cover;border:1px solid #ddd;border-radius:4px;display:block" /></a>`
              )
              .join("")}
          </div>
        </div>`
      : "";

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#000;padding:20px 24px">
          <h1 style="color:#fff;margin:0;font-size:18px">Design POV — New Gallery Submission</h1>
          <p style="color:#aaa;margin:6px 0 0;font-size:13px">From the Gallery "Get Featured" form</p>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:collapse">${rows}</table>
          ${imagesHtml}
        </div>
        <div style="padding:12px 24px;background:#f4f4f4;font-size:12px;color:#888">
          Submitted at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </div>
      </div>`;

    const plainText =
      fields
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n") +
      (imageUrls.length ? `\n\nImages:\n${imageUrls.join("\n")}` : "");

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
