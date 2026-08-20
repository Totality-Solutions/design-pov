"use client";

import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  placeholder?: string;
  className?: string;
  previewClassName?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  folder,
  placeholder,
  className,
  previewClassName,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/cms/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Upload failed.");
      onChange(json.data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
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
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="preview" className={previewClassName || "mt-2 h-32 w-full object-cover border border-black/10"} />
      )}
    </div>
  );
}
