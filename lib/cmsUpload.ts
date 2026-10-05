// Direct browser → S3 uploads for the CMS (images and videos up to 50 MB).
// The server signs the upload (app/api/cms/upload/presign); the file itself
// goes straight to S3, so it isn't limited by Vercel's 4.5 MB request size.

export const MAX_DIRECT_UPLOAD_BYTES = 50 * 1024 * 1024; // 50 MB

/** Accepted MIME types → file extension used for the S3 key. */
export const DIRECT_UPLOAD_TYPES = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
} as const;

export const DIRECT_UPLOAD_ACCEPT = Object.keys(DIRECT_UPLOAD_TYPES).join(",");

export type UploadedFile = { url: string; type: "image" | "video"; name: string };

/**
 * Uploads an image through /api/cms/upload (the server-side uploader used by
 * the older image fields), reporting progress. Returns the CDN URL.
 */
export function uploadViaApi(
  file: File,
  folder: string,
  { allowSvg = false, onProgress }: { allowSvg?: boolean; onProgress?: (fraction: number) => void } = {}
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  if (allowSvg) formData.append("allowSvg", "true");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/cms/upload");
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(e.loaded / e.total);
    xhr.onload = () => {
      let json: any = {};
      try { json = JSON.parse(xhr.responseText); } catch { /* non-JSON error page */ }
      if (xhr.status >= 200 && xhr.status < 300 && json?.data?.url) {
        onProgress?.(1);
        resolve(json.data.url);
      } else if (xhr.status === 413) {
        reject(new Error(`${file.name} is too large for this uploader (4.5 MB max on the live site).`));
      } else {
        reject(new Error(`${file.name}: ${json?.error || `upload failed (${xhr.status}).`}`));
      }
    };
    xhr.onerror = () => reject(new Error(`${file.name}: network error — check your connection and try again.`));
    xhr.send(formData);
  });
}

/**
 * Uploads one file and returns its CDN URL. `onProgress` gets 0–1.
 * Throws with a readable message on any failure.
 */
export async function uploadFileDirect(
  file: File,
  folder: string,
  onProgress?: (fraction: number) => void
): Promise<UploadedFile> {
  if (!(file.type in DIRECT_UPLOAD_TYPES)) {
    throw new Error(`${file.name}: unsupported type. Use JPG, PNG, WEBP, MP4, WEBM or MOV.`);
  }
  if (file.size > MAX_DIRECT_UPLOAD_BYTES) {
    throw new Error(`${file.name} is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 50 MB.`);
  }

  const res = await fetch("/api/cms/upload/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size, folder }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${file.name}: ${json.error || "couldn't prepare the upload."}`);
  const { uploadUrl, url } = json.data as { uploadUrl: string; url: string };

  // XHR rather than fetch so we can report upload progress.
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(e.loaded / e.total);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`${file.name}: upload failed (S3 returned ${xhr.status}).`));
    // A network error here is almost always the bucket's CORS rule not
    // allowing this site's address (e.g. a LAN IP or preview URL in dev).
    xhr.onerror = () =>
      reject(
        new Error(
          `${file.name}: upload blocked — S3 doesn't allow uploads from ${window.location.origin}. ` +
            `Add it to the bucket's CORS AllowedOrigins, or use the CMS from an allowed address.`
        )
      );
    xhr.send(file);
  });

  onProgress?.(1);
  return { url, type: file.type.startsWith("video/") ? "video" : "image", name: file.name };
}
