"use client";

import { useRef, useState } from "react";
import ImageUploadField from "../ImageUploadField";
import { useToast } from "../ToastProvider";
import { cdn } from "@/lib/cdn";
import { DIRECT_UPLOAD_ACCEPT, uploadFileDirect, type UploadedFile } from "@/lib/cmsUpload";
import { SingleUploadStatus, UploadProgressPanel, toEntries, type UploadEntry } from "../UploadProgress";
import type { MediaType } from "@/lib/homeContent";

// Small form building blocks shared by the CMS → Home section editors.

export const inputCls = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full";
const labelCls = "text-[11px] uppercase tracking-widest text-gray-500";
const smallBtn = "border border-black/20 px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors disabled:opacity-30 disabled:hover:border-black/20 disabled:hover:text-gray-600";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

export function TextField({
  label, value, onChange, placeholder, hint,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string }) {
  return (
    <Field label={label} hint={hint}>
      <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputCls} placeholder={placeholder} />
    </Field>
  );
}

export function TextArea({
  label, value, onChange, placeholder, hint, rows = 3,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; rows?: number }) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputCls} resize-y`}
        placeholder={placeholder}
      />
    </Field>
  );
}

/**
 * Picks several images/videos at once and uploads them one after another
 * straight to S3 (50 MB max each). Calls `onUploaded` with every file that
 * succeeded; a per-file progress panel shows what's uploading, done or failed.
 */
export function BulkUploadButton({
  folder, onUploaded, label = "Bulk Upload", accept = DIRECT_UPLOAD_ACCEPT,
}: {
  folder: string;
  onUploaded: (files: UploadedFile[]) => void;
  label?: string;
  accept?: string;
}) {
  const { showSuccess, showError } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<UploadEntry[]>([]);
  const busy = entries.some((e) => e.status === "waiting" || e.status === "uploading");

  const patchEntry = (i: number, patch: Partial<UploadEntry>) =>
    setEntries((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));

  async function handleFiles(files: File[]) {
    if (files.length === 0) return;
    setEntries(toEntries(files));
    const done: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      patchEntry(i, { status: "uploading" });
      try {
        done.push(await uploadFileDirect(files[i], folder, (progress) => patchEntry(i, { progress })));
        patchEntry(i, { status: "done", progress: 1 });
      } catch (err: any) {
        patchEntry(i, { status: "error", error: err.message });
      }
    }

    const failed = files.length - done.length;
    if (done.length) {
      onUploaded(done);
      showSuccess(`${done.length} file${done.length === 1 ? "" : "s"} uploaded — click Save Section to publish.`);
    }
    if (failed) showError(`${failed} file${failed === 1 ? "" : "s"} failed to upload. See the list for details.`);
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className={`${smallBtn} bg-white`}
        >
          {busy ? "Uploading..." : label}
        </button>
        <span className="text-[11px] text-gray-400">Images or videos · 50 MB max each</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          handleFiles(files);
        }}
      />
      </div>
      <UploadProgressPanel entries={entries} onDismiss={() => setEntries([])} />
    </div>
  );
}

/** Single video upload (direct to S3, 50 MB max). Status is shown by the caller. */
function VideoUploadButton({
  folder, onUploaded, upload, setUpload,
}: {
  folder: string;
  onUploaded: (url: string) => void;
  upload: UploadEntry | null;
  setUpload: React.Dispatch<React.SetStateAction<UploadEntry | null>>;
}) {
  const { showSuccess, showError } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploading = upload?.status === "uploading";

  async function handleFile(file: File) {
    setUpload({ name: file.name, size: file.size, status: "uploading", progress: 0 });
    try {
      const { url } = await uploadFileDirect(file, folder, (progress) => setUpload((u) => u && { ...u, progress }));
      onUploaded(url);
      setUpload((u) => u && { ...u, status: "done", progress: 1 });
      showSuccess("Video uploaded.");
    } catch (err: any) {
      setUpload((u) => u && { ...u, status: "error", error: err.message });
      showError("Couldn't upload this video. See the message under the field.");
    }
  }

  return (
    <>
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
        accept="video/mp4,video/webm,video/quicktime"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) handleFile(file);
        }}
      />
    </>
  );
}

/**
 * Image or video picker. Images use the regular CMS uploader; videos upload
 * straight to S3 (50 MB max) or can be pasted as a CDN URL.
 */
export function MediaField({
  label, src, type, onChange, folder, allowVideo = false, hint,
}: {
  label: string;
  src: string;
  type: MediaType;
  onChange: (patch: { src?: string; type?: MediaType }) => void;
  folder: string;
  allowVideo?: boolean;
  hint?: string;
}) {
  const [videoUpload, setVideoUpload] = useState<UploadEntry | null>(null);
  return (
    <Field label={label} hint={hint}>
      {allowVideo && (
        <div className="flex gap-2 mb-1">
          {(["image", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => t !== type && onChange({ type: t, src: "" })}
              className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-colors ${
                type === t ? "bg-black text-white border-black" : "border-black/20 text-gray-500 hover:border-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      {type === "video" ? (
        <>
          <div className="flex gap-2">
            <input
              value={src}
              onChange={(e) => onChange({ src: e.target.value })}
              className={inputCls}
              placeholder="https://... .mp4 or upload a file"
            />
            <VideoUploadButton
              folder={folder}
              onUploaded={(url) => onChange({ src: url })}
              upload={videoUpload}
              setUpload={setVideoUpload}
            />
          </div>
          <SingleUploadStatus entry={videoUpload} onDismiss={() => setVideoUpload(null)} />
          <p className="text-[11px] text-gray-400">MP4, WEBM or MOV · 50 MB max. MP4 plays in every browser.</p>
          {src && (
            <video src={cdn(src)} muted loop playsInline controls className="mt-1 h-40 w-full object-cover bg-black border border-black/10" />
          )}
        </>
      ) : (
        <ImageUploadField
          value={src}
          onChange={(url) => onChange({ src: url })}
          folder={folder}
          className={inputCls}
          previewClassName="mt-2 h-32 w-full object-cover border border-black/10"
        />
      )}
    </Field>
  );
}

/** Image-only upload field, for posters and backgrounds. */
export function ImageField({
  label, value, onChange, folder, hint,
}: { label: string; value: string; onChange: (v: string) => void; folder: string; hint?: string }) {
  return (
    <Field label={label} hint={hint}>
      <ImageUploadField
        value={value ?? ""}
        onChange={onChange}
        folder={folder}
        className={inputCls}
        previewClassName="mt-2 h-24 w-full object-cover border border-black/10"
      />
    </Field>
  );
}

/**
 * Editable list with add / remove / reorder. Pass `fixed` for lists whose
 * length is set by the page layout (e.g. the 9 Core Collective tiles).
 */
export function ListEditor<T>({
  items, onChange, renderItem, newItem, itemLabel, addLabel = "+ Add", fixed = false, minItems = 0, extraActions,
}: {
  /** Rendered next to the Add button, e.g. a BulkUploadButton. */
  extraActions?: React.ReactNode;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  newItem?: () => T;
  itemLabel: (item: T, index: number) => string;
  addLabel?: string;
  fixed?: boolean;
  minItems?: number;
}) {
  const update = (i: number, patch: Partial<T>) =>
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-black/10 bg-[#fafafa] p-4">
          <div className="flex items-center justify-between mb-3 gap-3">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 truncate">
              {itemLabel(item, i)}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-black disabled:opacity-20 text-sm px-1" aria-label="Move up">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-gray-400 hover:text-black disabled:opacity-20 text-sm px-1" aria-label="Move down">↓</button>
              {!fixed && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={items.length <= minItems}
                  className="text-red-400 hover:text-red-600 text-xs px-1 disabled:opacity-30"
                >
                  ✕ Remove
                </button>
              )}
            </div>
          </div>
          <div className="space-y-3">{renderItem(item, (patch) => update(i, patch), i)}</div>
        </div>
      ))}
      {!fixed && (newItem || extraActions) && (
        <div className="flex flex-wrap items-center gap-4">
          {newItem && (
            <button type="button" onClick={() => onChange([...items, newItem()])} className={smallBtn}>
              {addLabel}
            </button>
          )}
          {extraActions}
        </div>
      )}
    </div>
  );
}

/** Paragraph list edited as one textarea; a blank line starts a new paragraph. */
export function ParagraphsField({
  label, value, onChange, hint,
}: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string }) {
  return (
    <TextArea
      label={label}
      value={value.join("\n\n")}
      onChange={(text) => onChange(text.split(/\n\s*\n/))}
      rows={5}
      hint={hint ?? "Leave a blank line between paragraphs."}
    />
  );
}
