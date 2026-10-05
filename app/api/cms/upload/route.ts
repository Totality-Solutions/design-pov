import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { uploadBufferToS3 } from "@/lib/s3";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const SVG_TYPE = "image/svg+xml";
const MAX_SIZE = 25 * 1024 * 1024;
const MAX_SVG_SIZE = 2 * 1024 * 1024;

// SVG is XML and can carry scripts that run if someone opens the file URL
// directly. Logos never need any of this, so reject rather than sanitize.
const UNSAFE_SVG = /<script|<foreignObject|<iframe|<embed|<object|\son[a-z]+\s*=|javascript:|<!ENTITY/i;

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
  // SVG is opt-in per field (e.g. logos) — photo fields keep raster-only.
  const allowSvg = formData.get("allowSvg") === "true";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  const isSvg = file.type === SVG_TYPE;
  if (!ACCEPTED_TYPES.includes(file.type) && !(allowSvg && isSvg)) {
    return NextResponse.json(
      { error: `Unsupported file type. Accepted: JPG, PNG, WEBP${allowSvg ? ", SVG" : ""}.` },
      { status: 400 }
    );
  }
  if (file.size > (isSvg ? MAX_SVG_SIZE : MAX_SIZE)) {
    return NextResponse.json({ error: `File exceeds ${isSvg ? "2" : "25"} MB limit.` }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (isSvg) {
    const text = buffer.toString("utf8");
    if (!/<svg[\s>]/i.test(text)) {
      return NextResponse.json({ error: "This file isn't a valid SVG." }, { status: 400 });
    }
    if (UNSAFE_SVG.test(text)) {
      return NextResponse.json(
        { error: "This SVG contains scripts or embedded content. Please export a plain SVG and try again." },
        { status: 400 }
      );
    }
  }

  const ext = isSvg ? "svg" : file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const base = slugify(file.name) || "image";
  const key = `${folder.replace(/^\/+|\/+$/g, "")}/${base}-${randomUUID().slice(0, 8)}.${ext}`;

  try {
    const result = await uploadBufferToS3(buffer, key, file.type);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (err: any) {
    console.error("[cms/upload] S3 upload error:", err);
    return NextResponse.json({ error: err.message || "Upload failed." }, { status: 500 });
  }
}
