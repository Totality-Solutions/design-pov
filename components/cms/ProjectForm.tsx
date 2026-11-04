"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cdn } from "@/lib/cdn";
import { useToast } from "./ToastProvider";
import { BulkUploadButton, Field, ImageField, ListEditor, TextArea, TextField, inputCls } from "./page-editor/fields";
import type { ProjectBlock, ProjectGalleryImage, ProjectSpec } from "@/lib/projects";

// Create / edit a Magazine project (table `projects`). Field names match the
// table columns so the form posts straight to /api/cms/projects.

export type ProjectFormData = {
  title: string;
  slug: string;
  architects: string;
  category: string;
  status: "draft" | "published";
  published_on: string;
  area: string;
  year: string;
  photographer: string;
  city: string;
  country: string;
  design_team: string;
  extra_specs: ProjectSpec[];
  cover_image: string;
  gallery: ProjectGalleryImage[];
  text_credit: string;
  content: ProjectBlock[];
  office_name: string;
  office_logo: string;
  office_url: string;
  tags: string[];
};

export const EMPTY_PROJECT: ProjectFormData = {
  title: "",
  slug: "",
  architects: "",
  category: "",
  status: "draft",
  published_on: new Date().toISOString().slice(0, 10),
  area: "",
  year: String(new Date().getFullYear()),
  photographer: "",
  city: "",
  country: "",
  design_team: "",
  extra_specs: [],
  cover_image: "",
  gallery: [],
  text_credit: "Text description provided by the architects.",
  content: [{ type: "text", value: "" }],
  office_name: "",
  office_logo: "",
  office_url: "",
  tags: [],
};

const CATEGORY_SUGGESTIONS = [
  "Residential Architecture", "Housing", "Houses", "Apartments", "Interior Design", "Hospitality",
  "Commercial Architecture", "Offices", "Retail", "Cultural Architecture", "Educational Architecture",
  "Landscape", "Urban Design", "Installation", "Refurbishment",
];

// Suggestions only — any title can be typed.
const SPEC_SUGGESTIONS = [
  "Typology", "Principal Architects", "Lead Architects", "Date of Completion", "Client", "Manufacturers",
  "Structural Engineering", "Landscape", "Lighting", "Contractor", "Interior Design",
];

const BLOCK_LABEL: Record<ProjectBlock["type"], string> = {
  text: "Text",
  image: "Image",
  heading: "Heading",
  quote: "Quote",
};

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProjectForm({ initialData, projectId }: { initialData?: Partial<ProjectFormData>; projectId?: string }) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const isEdit = !!projectId;

  const [form, setForm] = useState<ProjectFormData>({ ...EMPTY_PROJECT, ...initialData });
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const folder = `magazine/projects/${form.slug || "misc"}`;
  const viewUrl = isEdit && initialData?.slug ? `/magazine/projects/${initialData.slug}` : null;

  // New projects: the slug follows "Title Architects" until edited by hand.
  useEffect(() => {
    if (!slugEdited) setForm((f) => ({ ...f, slug: toSlug([f.title, f.architects].filter(Boolean).join(" ")) }));
  }, [form.title, form.architects, slugEdited]);

  const set = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.status === "published" && !form.cover_image && form.gallery.length === 0) {
      setError("Add a hero image or at least one photo before publishing.");
      return;
    }
    setSaving(true);

    const payload: ProjectFormData = {
      ...form,
      slug: toSlug(form.slug),
      extra_specs: form.extra_specs.filter((s) => s.label.trim() && s.value.trim()),
      gallery: form.gallery.filter((g) => g.src),
      content: form.content.filter((b) => b.value?.trim()),
      tags: form.tags.map((t) => t.trim()).filter(Boolean),
    };

    const res = await fetch(isEdit ? `/api/cms/projects/${projectId}` : "/api/cms/projects", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);

    if (res.ok) {
      showSuccess(isEdit ? "Project updated." : "Project created.");
      router.push("/cms/projects");
      router.refresh();
    } else {
      const json = await res.json().catch(() => ({}));
      const msg: string = json.error || "Something went wrong.";
      setError(/duplicate key|unique/i.test(msg) ? "Another project already uses this slug. Change the slug and save again." : msg);
      showError("Couldn't save this project. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}
      {viewUrl && (
        <a
          href={viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-dashed border-gray-300"
        >
          View on site ↗
        </a>
      )}

      {/* ── Core info ── */}
      <Section title="Project">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Project name *">
            <input required value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="e.g. Modern Mokotów" />
          </Field>
          <Field label="Architects *" hint="Shown after the name: “Modern Mokotów / BBGK Architekci”.">
            <input required value={form.architects} onChange={(e) => set("architects", e.target.value)} className={inputCls} placeholder="e.g. BBGK Architekci" />
          </Field>
        </div>
        <Field label="Slug *" hint={`Page address: /magazine/projects/${form.slug || "…"}`}>
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugEdited(true);
              set("slug", e.target.value);
            }}
            className={inputCls}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <input list="project-categories" value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="e.g. Residential Architecture" />
            <datalist id="project-categories">
              {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
            </datalist>
          </Field>
          <Field label="Publish date">
            <input type="date" value={form.published_on} onChange={(e) => set("published_on", e.target.value)} className={inputCls} />
          </Field>
        </div>
        <div className="flex gap-2">
          {(["draft", "published"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("status", s)}
              className={`px-4 py-1.5 text-[10px] uppercase tracking-widest border transition-colors ${
                form.status === s ? "bg-black text-white border-black" : "border-black/20 text-gray-500 hover:border-black"
              }`}
            >
              {s}
            </button>
          ))}
          <span className="text-[11px] text-gray-400 self-center ml-2">Only published projects appear on the site.</span>
        </div>
      </Section>

      {/* ── Fact sheet ── */}
      <Section title="Fact Sheet">
        <div className="grid grid-cols-3 gap-4">
          <TextField label="Area" value={form.area} onChange={(v) => set("area", v)} placeholder="e.g. 17000 m²" />
          <TextField label="Year" value={form.year} onChange={(v) => set("year", v)} placeholder="e.g. 2025" />
          <TextField label="Photographs" value={form.photographer} onChange={(v) => set("photographer", v)} placeholder="e.g. Nate Cook Photography" hint="Credited on every photo." />
          <TextField label="City" value={form.city} onChange={(v) => set("city", v)} placeholder="e.g. Mumbai" />
          <TextField label="Country" value={form.country} onChange={(v) => set("country", v)} placeholder="e.g. India" />
        </div>
        <TextArea label="Design team" value={form.design_team} onChange={(v) => set("design_team", v)} rows={2} hint="Names separated by commas." />
        <p className="text-[11px] text-gray-400">Any field above left empty is hidden on the page.</p>
      </Section>

      <Section title="Specifications">
        <p className="text-[11px] text-gray-400 -mt-2">
          Any title and value, shown in the fact sheet in this order — e.g. “Typology: Residential, Private Villa”, “Principal
          Architects”, “Date of Completion”, “Manufacturers”.
        </p>
        <ListEditor
          items={form.extra_specs}
          onChange={(extra_specs) => set("extra_specs", extra_specs)}
          newItem={() => ({ label: "", value: "" })}
          addLabel="+ Add Specification"
          itemLabel={(s, i) => s.label || `Specification ${i + 1}`}
          renderItem={(s, update) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              <Field label="Title">
                <input list="project-spec-labels" value={s.label} onChange={(e) => update({ label: e.target.value })} className={inputCls} placeholder="e.g. Typology" />
              </Field>
              <TextArea label="Value" value={s.value} onChange={(value) => update({ value })} rows={1} placeholder="e.g. Residential, Private Villa" />
            </div>
          )}
        />
        <datalist id="project-spec-labels">
          {SPEC_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
        </datalist>
      </Section>

      {/* ── Photos ── */}
      <Section title="Hero Image">
        <ImageField
          label="Hero image"
          value={form.cover_image}
          onChange={(v) => set("cover_image", v)}
          folder={folder}
          hint="The large image at the top of the project page and on its cards. Upload one here, or click “Hero” on any photo below. Left empty, the first photo is used."
        />
      </Section>

      <Section title={`Photos & Drawings (${form.gallery.length})`}>
        <p className="text-[11px] text-gray-400 -mt-2">
          The project gallery, in order — photos first, then plans, sections and other drawings.
        </p>
        <BulkUploadButton
          folder={folder}
          accept="image/jpeg,image/png,image/webp"
          label="Upload Photos"
          onUploaded={(files) => setForm((f) => ({ ...f, gallery: [...f.gallery, ...files.map((file) => ({ src: file.url, caption: "" }))] }))}
        />
        {form.gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {form.gallery.map((g, i) => {
              const isCover = form.cover_image ? form.cover_image === g.src : i === 0;
              const move = (dir: -1 | 1) =>
                setForm((f) => {
                  const next = [...f.gallery];
                  const j = i + dir;
                  if (j < 0 || j >= next.length) return f;
                  [next[i], next[j]] = [next[j], next[i]];
                  return { ...f, gallery: next };
                });
              return (
                <div key={`${g.src}-${i}`} className={`border bg-[#fafafa] ${isCover ? "border-black" : "border-black/10"}`}>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cdn(g.src)} alt="" className="w-full aspect-[4/3] object-cover" />
                    <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 tabular-nums">{i + 1}</span>
                    {isCover && <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] uppercase tracking-widest px-1.5 py-0.5">Hero</span>}
                  </div>
                  <div className="p-2 space-y-2">
                    <input
                      value={g.caption ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, gallery: f.gallery.map((x, idx) => (idx === i ? { ...x, caption: e.target.value } : x)) }))
                      }
                      className="border border-black/20 px-2 py-1.5 text-xs outline-none focus:border-black bg-white w-full"
                      placeholder="Caption (optional)"
                    />
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => move(-1)} disabled={i === 0} className="px-1.5 text-gray-400 hover:text-black disabled:opacity-20" aria-label="Move earlier">←</button>
                        <button type="button" onClick={() => move(1)} disabled={i === form.gallery.length - 1} className="px-1.5 text-gray-400 hover:text-black disabled:opacity-20" aria-label="Move later">→</button>
                      </div>
                      <div className="flex gap-3">
                        {!isCover && (
                          <button type="button" onClick={() => set("cover_image", g.src)} className="text-gray-500 hover:text-black">Hero</button>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              gallery: f.gallery.filter((_, idx) => idx !== i),
                              cover_image: f.cover_image === g.src ? "" : f.cover_image,
                            }))
                          }
                          className="text-red-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* ── Description ── */}
      <Section title="Description">
        <TextField label="Text credit" value={form.text_credit} onChange={(v) => set("text_credit", v)} hint="Shown in italics above the text. Leave empty to hide." />
        <ListEditor
          items={form.content}
          onChange={(content) => set("content", content)}
          itemLabel={(b) => BLOCK_LABEL[b.type]}
          renderItem={(b, update) => {
            const patch = update as (p: Partial<ProjectBlock>) => void;
            switch (b.type) {
              case "text":
                return (
                  <>
                    <TextField label="Section heading (optional)" value={b.title ?? ""} onChange={(title) => patch({ title })} />
                    <TextArea label="Text" value={b.value} onChange={(value) => patch({ value })} rows={6} hint="Leave a blank line between paragraphs. Start lines with “- ” for a bullet list." />
                  </>
                );
              case "image":
                return (
                  <>
                    <ImageField label="Image" value={b.value} onChange={(value) => patch({ value })} folder={folder} hint="Shown full width between the text." />
                    <TextField label="Caption (optional)" value={b.caption ?? ""} onChange={(caption) => patch({ caption })} />
                  </>
                );
              case "heading":
                return <TextField label="Heading" value={b.value} onChange={(value) => patch({ value })} />;
              case "quote":
                return <TextArea label="Quote" value={b.value} onChange={(value) => patch({ value })} rows={2} />;
            }
          }}
          extraActions={(["text", "image", "heading", "quote"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                set("content", [...form.content, type === "text" ? { type, value: "", title: "" } : type === "image" ? { type, value: "", caption: "" } : { type, value: "" }])
              }
              className="border border-black/20 px-3 py-1.5 text-[10px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors bg-white"
            >
              + {BLOCK_LABEL[type]}
            </button>
          ))}
        />
      </Section>

      {/* ── Office + tags ── */}
      <Section title="About This Office">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Office name" value={form.office_name} onChange={(v) => set("office_name", v)} hint="Defaults to the Architects name." />
          <TextField label="Website" value={form.office_url} onChange={(v) => set("office_url", v)} placeholder="https://..." />
        </div>
        <ImageField label="Logo / photo" value={form.office_logo} onChange={(v) => set("office_logo", v)} folder={folder} />
        <TextField
          label="Tags"
          value={form.tags.join(", ")}
          onChange={(v) => set("tags", v.split(","))}
          hint="Comma separated, e.g. Housing, Concrete, Mumbai. Category, city and country are added automatically."
        />
      </Section>

      <div className="flex gap-4 pt-2 border-t border-black/10">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/cms/projects")}
          className="border border-black/20 px-8 py-3 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors"
        >
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
