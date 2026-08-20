"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

type FileStatus = "pending" | "uploading" | "done" | "error";

interface QueuedFile {
  file: File;
  preview: string;
  status: FileStatus;
  error?: string;
}

const CONCURRENCY = 4;

export default function GalleryBulkUpload() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/cms/gallery")
      .then((res) => res.json())
      .then(({ data }) => {
        if (Array.isArray(data)) setExistingCategories(Array.from(new Set(data.map((d) => d.category))).sort());
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback((list: FileList | File[]) => {
    const accepted = Array.from(list).filter((f) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)
    );
    setFiles((prev) => [
      ...prev,
      ...accepted.map((file) => ({ file, preview: URL.createObjectURL(file), status: "pending" as FileStatus })),
    ]);
  }, []);

  function removeFile(index: number) {
    setFiles((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function updateStatus(index: number, patch: Partial<QueuedFile>) {
    setFiles((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  async function uploadOne(index: number, item: QueuedFile) {
    updateStatus(index, { status: "uploading" });
    const formData = new FormData();
    formData.append("file", item.file);
    formData.append("folder", `gallery/${year}/${category}`);

    const res = await fetch("/api/cms/upload", { method: "POST", body: formData });
    const json = await res.json();

    if (!res.ok) {
      updateStatus(index, { status: "error", error: json.error || "Upload failed" });
      return null;
    }
    updateStatus(index, { status: "done" });
    return json.data.url as string;
  }

  async function handleUploadAll() {
    setError("");
    if (!category.trim()) return setError("Category is required.");
    if (!year) return setError("Year is required.");
    if (files.length === 0) return setError("Add at least one image.");

    setUploading(true);
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    const results: { image_src: string; title: string; category: string; year: number; sort_order: number; active: boolean }[] = [];

    let cursor = 0;
    async function worker() {
      while (cursor < files.length) {
        const i = cursor++;
        const url = await uploadOne(i, files[i]);
        if (url) {
          results.push({ image_src: url, title: label, category, year, sort_order: i, active: true });
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));

    if (results.length === 0) {
      setUploading(false);
      setError("All uploads failed — nothing was saved.");
      return;
    }

    const res = await fetch("/api/cms/gallery/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: results }),
    });

    setUploading(false);

    if (res.ok) {
      router.push("/cms/gallery");
      router.refresh();
    } else {
      const json = await res.json();
      setError(`Uploaded ${results.length} images, but saving to the database failed: ${json.error}`);
    }
  }

  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div className="space-y-8">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Category *">
          <input
            list="bulk-gallery-categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={input}
            placeholder="e.g. artists, brand, circle..."
            disabled={uploading}
          />
          <datalist id="bulk-gallery-categories">
            {existingCategories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label="Year *">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className={input}
            disabled={uploading}
          />
          <p className="text-[11px] text-gray-400 mt-1">All images in this dump get filed under this year.</p>
        </Field>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`border-2 border-dashed transition-colors flex flex-col items-center justify-center p-10 min-h-[180px] cursor-pointer text-center ${
          isDragOver ? "border-black bg-gray-50" : "border-black/20 hover:border-black/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <Upload size={20} className="text-black mb-2" />
        <p className="text-sm font-medium text-black">Drop your image dump here</p>
        <p className="text-xs text-gray-400 mt-1">or click to select multiple files — no limit</p>
      </div>

      {files.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              {files.length} file{files.length !== 1 ? "s" : ""} queued
              {uploading && ` — ${doneCount + errorCount} / ${files.length} processed`}
            </p>
            {!uploading && (
              <button type="button" onClick={() => setFiles([])} className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-red-500">
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-[360px] overflow-y-auto">
            {files.map((f, i) => (
              <div key={i} className="relative aspect-square border border-black/10 overflow-hidden bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.preview} alt="" className="w-full h-full object-cover" />
                <div
                  className={`absolute inset-0 flex items-center justify-center text-[9px] font-medium uppercase tracking-wide ${
                    f.status === "pending" ? "bg-transparent" :
                    f.status === "uploading" ? "bg-black/40 text-white" :
                    f.status === "done" ? "bg-green-600/70 text-white" :
                    "bg-red-600/80 text-white"
                  }`}
                >
                  {f.status !== "pending" && f.status}
                </div>
                {!uploading && f.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-black/60 text-white text-[10px] rounded-full"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 pt-2 border-t border-black/10">
        <button
          type="button"
          onClick={handleUploadAll}
          disabled={uploading || files.length === 0}
          className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {uploading ? `Uploading ${doneCount + errorCount}/${files.length}...` : `Upload ${files.length || ""} Image${files.length === 1 ? "" : "s"}`}
        </button>
        <button
          type="button"
          onClick={() => router.push("/cms/gallery")}
          disabled={uploading}
          className="border border-black/20 px-8 py-3 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-widest text-gray-500">{label}</label>
      {children}
    </div>
  );
}

const input = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full";
