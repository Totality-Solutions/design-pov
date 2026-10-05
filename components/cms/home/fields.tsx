"use client";

import ImageUploadField from "../ImageUploadField";
import { cdn } from "@/lib/cdn";
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
 * Image or video picker. Images upload through the CMS uploader; videos are
 * pasted as a CDN URL because video files exceed the 4.5 MB request limit
 * of the upload route on Vercel.
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
          <input
            value={src}
            onChange={(e) => onChange({ src: e.target.value })}
            className={inputCls}
            placeholder="https://d1qlyda1dsr5ui.cloudfront.net/.../video.mp4"
          />
          <p className="text-[11px] text-gray-400">
            Paste the video&apos;s CDN URL (.mp4). Upload large videos to S3 first — the CMS uploader only takes images.
          </p>
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
  items, onChange, renderItem, newItem, itemLabel, addLabel = "+ Add", fixed = false, minItems = 0,
}: {
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
      {!fixed && newItem && (
        <button type="button" onClick={() => onChange([...items, newItem()])} className={smallBtn}>
          {addLabel}
        </button>
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
