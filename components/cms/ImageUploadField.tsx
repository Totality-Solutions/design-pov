"use client";

import { useRef, useState } from "react";
import { cdn } from "@/lib/cdn";
import { uploadViaApi, uploadFileDirect } from "@/lib/cmsUpload";
import { useToast } from "./ToastProvider";
import { SingleUploadStatus, type UploadEntry } from "./UploadProgress";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  placeholder?: string;
  className?: string;
  previewClassName?: string;
  previewStyle?: React.CSSProperties;
  /** Prefix bare paths with the CDN for the preview. Off for values that are already render-ready (e.g. gallery's local /gallery/... paths). */
  cdnPreview?: boolean;
  /** Also accept SVG files — meant for logos. */
  allowSvg?: boolean;
}

export default function ImageUploadField({
  value,
  onChange,
  folder,
  placeholder,
  className,
  previewClassName,
  previewStyle,
  cdnPreview = true,
  allowSvg = false,
}: ImageUploadFieldProps) {
  const { showSuccess, showError } = useToast();
  const [upload, setUpload] = useState<UploadEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uploading = upload?.status === "uploading";

  async function handleFile(file: File) {
    setUpload({ name: file.name, size: file.size, status: "uploading", progress: 0 });
    const onProgress = (progress: number) => setUpload((u) => u && { ...u, progress });
    try {
      // SVGs go through /api/cms/upload, which checks them for scripts. Photos
      // go straight to S3 so they aren't capped by the API route's body limit
      // (4.5 MB on Vercel).
      let url: string;
      if (file.type === "image/svg+xml") {
        url = await uploadViaApi(file, folder, { allowSvg, onProgress });
      } else if (file.type.startsWith("image/")) {
        url = (await uploadFileDirect(file, folder, onProgress)).url;
      } else {
        throw new Error(`${file.name}: unsupported type. Use JPG, PNG or WEBP${allowSvg ? " or SVG" : ""}.`);
      }
      onChange(url);
      setUpload((u) => u && { ...u, status: "done", progress: 1 });
      showSuccess("Image uploaded.");
    } catch (err: any) {
      setUpload((u) => u && { ...u, status: "error", error: err.message || "Upload failed." });
      showError("Couldn't upload this image. See the message under the field.");
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
          placeholder={placeholder || "https://... or upload a file"}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 border border-black/20 px-4 py-2.5 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors disabled:opacity-50"
        >
          {uploading ? `Uploading ${Math.round((upload?.progress ?? 0) * 100)}%` : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={`image/jpeg,image/jpg,image/png,image/webp${allowSvg ? ",image/svg+xml,.svg" : ""}`}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      <SingleUploadStatus entry={upload} onDismiss={() => setUpload(null)} />
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cdnPreview ? cdn(value) : value}
          alt="preview"
          style={previewStyle}
          className={previewClassName || "mt-2 h-32 w-full object-cover border border-black/10"}
        />
      )}
    </div>
  );
}
