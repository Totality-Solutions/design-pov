import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { uploadBufferToS3 } from "@/lib/s3";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 25 * 1024 * 1024;

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");
  const folder = (formData.get("folder") as string) || "uploads";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type. Accepted: JPG, PNG, WEBP." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File exceeds 25 MB limit." }, { status: 400 });
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const base = slugify(file.name) || "image";
  const key = `${folder.replace(/^\/+|\/+$/g, "")}/${base}-${randomUUID().slice(0, 8)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await uploadBufferToS3(buffer, key, file.type);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err: any) {
    console.error("[cms/upload] S3 upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed." }, { status: 500 });
  }
}
