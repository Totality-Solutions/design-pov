import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createPresignedUpload } from "@/lib/s3";
import { DIRECT_UPLOAD_TYPES, MAX_DIRECT_UPLOAD_BYTES } from "@/lib/cmsUpload";

// Issues a signed URL for a direct browser → S3 upload (used for videos and
// bulk uploads, which can be larger than our API routes accept).
// Auth: under /api/cms, so proxy.ts requires a CMS session.

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const { fileName, contentType, size, folder } = await req.json().catch(() => ({}));

  const ext = DIRECT_UPLOAD_TYPES[contentType as keyof typeof DIRECT_UPLOAD_TYPES];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Accepted: JPG, PNG, WEBP, MP4, WEBM, MOV." },
      { status: 400 }
    );
  }
  if (typeof size !== "number" || !Number.isInteger(size) || size <= 0) {
    return NextResponse.json({ error: "Invalid file size." }, { status: 400 });
  }
  if (size > MAX_DIRECT_UPLOAD_BYTES) {
    return NextResponse.json({ error: "File exceeds the 50 MB limit." }, { status: 400 });
  }

  const cleanFolder = String(folder || "uploads").replace(/^\/+|\/+$/g, "").replace(/\.\./g, "");
  const base = slugify(String(fileName || "")) || "file";
  const key = `${cleanFolder}/${base}-${randomUUID().slice(0, 8)}.${ext}`;

  try {
    const result = await createPresignedUpload(key, contentType, size);
    return NextResponse.json({ data: result });
  } catch (err: any) {
    console.error("[cms/upload/presign] error:", err);
    return NextResponse.json({ error: err.message || "Couldn't prepare the upload." }, { status: 500 });
  }
}
