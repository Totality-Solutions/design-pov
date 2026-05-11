"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type TextBlock = { type: "text"; title?: string; value: string };
type ImageBlock = { type: "image"; value: string; caption?: string };
type QuoteBlock = { type: "quote"; value: string };
type ContentBlock = TextBlock | ImageBlock | QuoteBlock;

type BlogFormData = {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  category_display: string;
  author: string;
  date: string;
  is_featured: boolean;
  status: "draft" | "published";
  image: string;
  thumbnail: string;
  featured_paragraphs: string[];
  detailed_content: ContentBlock[];
};

const CATEGORIES = ["Design", "POV Blogs", "Spotlight", "Interview", "Feature", "Architecture", "Interiors"];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const emptyForm: BlogFormData = {
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  category: "Design",
  category_display: "",
  author: "",
  date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }),
  is_featured: false,
  status: "draft",
  image: "",
  thumbnail: "",
  featured_paragraphs: [""],
  detailed_content: [{ type: "text", title: "", value: "" }],
};

export default function BlogForm({ initialData, blogId }: { initialData?: Partial<BlogFormData>; blogId?: string }) {
  const router = useRouter();
  const isEdit = !!blogId;
  const viewUrl = isEdit && initialData?.slug ? `/magazine/${initialData.slug}` : null;

  const [form, setForm] = useState<BlogFormData>({ ...emptyForm, ...initialData });
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slugEdited && form.title) {
      setForm((f) => ({ ...f, slug: toSlug(f.title) }));
    }
  }, [form.title, slugEdited]);

  function setField<K extends keyof BlogFormData>(field: K, value: BlogFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // ── Featured Paragraphs ─────────────────────────────────
  function addParagraph() {
    setForm((f) => ({ ...f, featured_paragraphs: [...f.featured_paragraphs, ""] }));
  }

  function updateParagraph(i: number, value: string) {
    setForm((f) => {
      const arr = [...f.featured_paragraphs];
      arr[i] = value;
      return { ...f, featured_paragraphs: arr };
    });
  }

  function removeParagraph(i: number) {
    setForm((f) => ({ ...f, featured_paragraphs: f.featured_paragraphs.filter((_, idx) => idx !== i) }));
  }

  // ── Detailed Content Blocks ─────────────────────────────
  function addBlock(type: ContentBlock["type"]) {
    const block: ContentBlock =
      type === "text" ? { type: "text", title: "", value: "" } :
      type === "image" ? { type: "image", value: "", caption: "" } :
      { type: "quote", value: "" };
    setForm((f) => ({ ...f, detailed_content: [...f.detailed_content, block] }));
  }

  function updateBlock(i: number, patch: Partial<ContentBlock>) {
    setForm((f) => {
      const arr = [...f.detailed_content];
      arr[i] = { ...arr[i], ...patch } as ContentBlock;
      return { ...f, detailed_content: arr };
    });
  }

  function removeBlock(i: number) {
    setForm((f) => ({ ...f, detailed_content: f.detailed_content.filter((_, idx) => idx !== i) }));
  }

  function moveBlock(i: number, dir: -1 | 1) {
    setForm((f) => {
      const arr = [...f.detailed_content];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return f;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...f, detailed_content: arr };
    });
  }

  // ── Submit ───────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      featured_paragraphs: form.featured_paragraphs.filter((p) => p.trim()),
      detailed_content: form.detailed_content.filter((b) => b.value?.trim()),
    };

    const url = isEdit ? `/api/cms/blogs/${blogId}` : "/api/cms/blogs";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/cms/blogs");
      router.refresh();
    } else {
      const json = await res.json();
      setError(json.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}
      {viewUrl && (
        <a href={viewUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-dashed border-gray-300">
          View on site ↗
        </a>
      )}

      {/* ── Core Info ── */}
      <Section title="Core Info">
        <Field label="Title *">
          <input required value={form.title} onChange={(e) => setField("title", e.target.value)} className={input} placeholder="Blog post title" />
        </Field>
        <Field label="Slug *">
          <input
            required
            value={form.slug}
            onChange={(e) => { setSlugEdited(true); setField("slug", e.target.value); }}
            className={input}
            placeholder="auto-generated-from-title"
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Author *">
            <input required value={form.author} onChange={(e) => setField("author", e.target.value)} className={input} placeholder="e.g. Dyumni Pandit" />
          </Field>
          <Field label="Date *">
            <input required value={form.date} onChange={(e) => setField("date", e.target.value)} className={input} placeholder="e.g. 17 May 2021" />
          </Field>
          <Field label="Category *">
            <select required value={form.category} onChange={(e) => setField("category", e.target.value)} className={input}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Category Display Tag">
            <input value={form.category_display} onChange={(e) => setField("category_display", e.target.value)} className={input} placeholder="e.g. Featured Story" />
          </Field>
        </div>
        <Field label="Subtitle">
          <input value={form.subtitle} onChange={(e) => setField("subtitle", e.target.value)} className={input} placeholder="Short subtitle shown on cards" />
        </Field>
        <Field label="Description">
          <textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={2} className={textarea} placeholder="Short description for preview cards" />
        </Field>

        <div className="flex items-center gap-6 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setField("is_featured", e.target.checked)} className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-widest text-gray-600">Featured post</span>
          </label>
          <div className="flex gap-2">
            {(["draft", "published"] as const).map((s) => (
              <button key={s} type="button" onClick={() => setField("status", s)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest border transition-colors ${form.status === s ? "bg-black text-white border-black" : "border-black/20 text-gray-500 hover:border-black"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Images ── */}
      <Section title="Images">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Cover Image URL (image)">
            <input value={form.image} onChange={(e) => setField("image", e.target.value)} className={input} placeholder="https://... or /temp/..." />
            {form.image && <img src={form.image} alt="cover" className="mt-2 h-28 w-full object-cover border border-black/10" />}
          </Field>
          <Field label="Thumbnail URL">
            <input value={form.thumbnail} onChange={(e) => setField("thumbnail", e.target.value)} className={input} placeholder="https://... or /temp/..." />
            {form.thumbnail && <img src={form.thumbnail} alt="thumb" className="mt-2 h-28 w-full object-cover border border-black/10" />}
          </Field>
        </div>
      </Section>

      {/* ── Featured Paragraphs ── */}
      <Section title="Featured Paragraphs (preview text)">
        <p className="text-[11px] text-gray-400 -mt-2 mb-2">These appear on the magazine preview card. Add one paragraph per block.</p>
        <div className="space-y-3">
          {form.featured_paragraphs.map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1">
                <textarea
                  value={para}
                  onChange={(e) => updateParagraph(i, e.target.value)}
                  rows={3}
                  className={textarea}
                  placeholder={`Paragraph ${i + 1}...`}
                />
              </div>
              <button type="button" onClick={() => removeParagraph(i)} className={removeBtn} title="Remove">✕</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addParagraph} className={addBtn}>+ Add Paragraph</button>
      </Section>

      {/* ── Detailed Content ── */}
      <Section title="Detailed Content (full article)">
        <p className="text-[11px] text-gray-400 -mt-2 mb-4">Build the full article block by block. Text blocks can have an optional section heading.</p>

        <div className="space-y-4">
          {form.detailed_content.map((block, i) => (
            <div key={i} className="border border-black/10 bg-[#fafafa] p-4">
              {/* Block header */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold ${
                  block.type === "text" ? "bg-blue-50 text-blue-600" :
                  block.type === "image" ? "bg-green-50 text-green-600" :
                  "bg-orange-50 text-orange-600"
                }`}>
                  {block.type}
                </span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0} className="text-gray-400 hover:text-black disabled:opacity-20 text-sm px-1">↑</button>
                  <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === form.detailed_content.length - 1} className="text-gray-400 hover:text-black disabled:opacity-20 text-sm px-1">↓</button>
                  <button type="button" onClick={() => removeBlock(i)} className="text-red-400 hover:text-red-600 text-xs px-1">✕ Remove</button>
                </div>
              </div>

              {/* Text block */}
              {block.type === "text" && (
                <div className="space-y-2">
                  <input
                    value={(block as TextBlock).title ?? ""}
                    onChange={(e) => updateBlock(i, { title: e.target.value })}
                    className={input}
                    placeholder="Section heading (optional)"
                  />
                  <textarea
                    value={block.value}
                    onChange={(e) => updateBlock(i, { value: e.target.value })}
                    rows={4}
                    className={textarea}
                    placeholder="Paragraph text *"
                  />
                </div>
              )}

              {/* Image block */}
              {block.type === "image" && (
                <div className="space-y-2">
                  <input
                    value={block.value}
                    onChange={(e) => updateBlock(i, { value: e.target.value })}
                    className={input}
                    placeholder="Image URL — https://... or /temp/..."
                  />
                  <input
                    value={(block as ImageBlock).caption ?? ""}
                    onChange={(e) => updateBlock(i, { caption: e.target.value })}
                    className={input}
                    placeholder="Caption (optional)"
                  />
                  {block.value && (
                    <img src={block.value} alt="preview" className="mt-1 h-40 w-full object-cover border border-black/10" />
                  )}
                </div>
              )}

              {/* Quote block */}
              {block.type === "quote" && (
                <textarea
                  value={block.value}
                  onChange={(e) => updateBlock(i, { value: e.target.value })}
                  rows={3}
                  className={textarea}
                  placeholder="Quote text..."
                />
              )}
            </div>
          ))}
        </div>

        {/* Add block buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button type="button" onClick={() => addBlock("text")} className={`${addBtn} bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100`}>+ Text Block</button>
          <button type="button" onClick={() => addBlock("image")} className={`${addBtn} bg-green-50 border-green-200 text-green-600 hover:bg-green-100`}>+ Image Block</button>
          <button type="button" onClick={() => addBlock("quote")} className={`${addBtn} bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100`}>+ Quote Block</button>
        </div>
      </Section>

      {/* ── Actions ── */}
      <div className="flex gap-4 pt-2 border-t border-black/10">
        <button type="submit" disabled={saving}
          className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50">
          {saving ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
        </button>
        <button type="button" onClick={() => router.push("/cms/blogs")}
          className="border border-black/20 px-8 py-3 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-black/10">{title}</p>
      <div className="space-y-4">{children}</div>
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

const input    = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full";
const textarea = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full resize-y";
const addBtn   = "border px-4 py-2 text-[11px] uppercase tracking-widest transition-colors border-black/20 text-gray-600 hover:border-black hover:text-black";
const removeBtn = "mt-0.5 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 border border-black/10 hover:border-red-300 transition-colors shrink-0 text-xs";
