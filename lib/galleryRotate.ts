import { randomUUID } from "crypto";
import sharp from "sharp";
import { cdn } from "@/lib/cdn";
import { uploadBufferToS3, deleteObjectsFromS3, resolveS3KeyFromCdnValue } from "@/lib/s3";

const CONTENT_TYPES: Record<string, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export type GalleryRotation = 0 | 90 | 180 | 270;

export function parseRotation(value: unknown): GalleryRotation {
  const n = ((Number(value) % 360) + 360) % 360;
  return n === 90 || n === 180 || n === 270 ? n : 0;
}

// Legacy seeded items store a bare /gallery/... path served from /public —
// try the site itself first, then the CDN.
async function fetchImage(src: string, origin: string): Promise<Buffer> {
  const candidates = src.startsWith("http") ? [src] : [new URL(src, origin).toString(), cdn(src)];
  for (const url of candidates) {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
  }
  throw new Error("Couldn't load the original image to rotate it.");
}

/**
 * Re-encodes the image rotated clockwise by `degrees` and uploads it as a new
 * S3 object (a new key, so CloudFront never serves the old orientation).
 * EXIF orientation is applied first, so the result matches what the admin saw.
 */
export async function rotateGalleryImage(
  src: string,
  degrees: GalleryRotation,
  folder: string,
  origin: string
) {
  const input = await fetchImage(src, origin);
  const { format } = await sharp(input).metadata();
  const outFormat = format === "png" || format === "webp" ? format : "jpeg";

  let pipeline = sharp(input).autoOrient().rotate(degrees);
  if (outFormat === "jpeg") pipeline = pipeline.jpeg({ quality: 92, mozjpeg: true });
  else if (outFormat === "webp") pipeline = pipeline.webp({ quality: 92 });
  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

  const base =
    (src.split("/").pop() ?? "")
      .replace(/\.[^.]+$/, "")
      .replace(/-r?[0-9a-f]{8}$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";
  const ext = outFormat === "jpeg" ? "jpg" : outFormat;
  const key = `${folder.replace(/^\/+|\/+$/g, "")}/${base}-r${randomUUID().slice(0, 8)}.${ext}`;

  const { url } = await uploadBufferToS3(data, key, CONTENT_TYPES[outFormat]);
  return { image_src: url, image_width: info.width, image_height: info.height };
}

/** Deletes a replaced image, but only one we uploaded (a full CDN URL) — never legacy shared paths. */
export async function deleteReplacedGalleryImage(src: string) {
  if (!src.startsWith("http")) return;
  const key = resolveS3KeyFromCdnValue(src);
  if (!key) return;
  try {
    await deleteObjectsFromS3([key]);
  } catch (err) {
    console.error("[gallery] Failed to delete pre-rotation image", src, err);
  }
}
