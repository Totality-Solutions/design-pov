"use client";

import { useState } from "react";

type Social = { name: string; link: string };

type ThemeDetail = {
  companyName: string;
  logo: string;
  themeImages: string[];
  coreImages: string[];
  themeDescriptionHtml: string;
  CoreDescriptionHtml: string;
  socials: Social[];
};

type Block = {
  id: string;
  section_key: string;
  type: string;
  order_index: number;
  data: ThemeDetail;
  page_id: string;
};

type Page = { id: string; title: string };

const empty: ThemeDetail = {
  companyName: "",
  logo: "",
  themeImages: [""],
  coreImages: [""],
  themeDescriptionHtml: "",
  CoreDescriptionHtml: "",
  socials: [{ name: "instagram", link: "" }],
};

// ── Main Editor ──────────────────────────────────────────────────────────────
export default function ThemeEditor({
  page: initialPage,
  blocks: initialBlocks,
}: {
  page: Page;
  blocks: Block[];
}) {
  const [page, setPage]       = useState(initialPage);
  const [blocks, setBlocks]   = useState<Block[]>(initialBlocks.filter((b) => b.section_key === "theme_detail"));
  const [savingTitle, setSavingTitle] = useState(false);
  const [modal, setModal]     = useState<{ mode: "create" | "edit"; block?: Block } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // ── Title ────────────────────────────────────────────────
  async function saveTitle() {
    setSavingTitle(true);
    await fetch("/api/cms/theme", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: page.title }),
    });
    setSavingTitle(false);
  }

  // ── Create ───────────────────────────────────────────────
  async function handleCreate(data: ThemeDetail) {
    const res = await fetch("/api/cms/theme/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_id: initialPage.id,
        section_key: "theme_detail",
        type: "theme_detail",
        order_index: blocks.length,
        data,
      }),
    });
    const { data: block } = await res.json();
    setBlocks((prev) => [...prev, block]);
    setModal(null);
  }

  // ── Update ───────────────────────────────────────────────
  async function handleUpdate(id: string, data: ThemeDetail) {
    await fetch(`/api/cms/theme/blocks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, data } : b)));
    setModal(null);
  }

  // ── Delete ───────────────────────────────────────────────
  async function handleDelete(id: string) {
    if (!confirm("Delete this collaborator? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/cms/theme/blocks/${id}`, { method: "DELETE" });
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  }

  // ── Reorder ──────────────────────────────────────────────
  async function move(id: string, dir: -1 | 1) {
    const i = blocks.findIndex((b) => b.id === id);
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;

    const a = blocks[i];
    const b = blocks[j];

    await Promise.all([
      fetch(`/api/cms/theme/blocks/${a.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_index: b.order_index }) }),
      fetch(`/api/cms/theme/blocks/${b.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_index: a.order_index }) }),
    ]);

    setBlocks((prev) => {
      const arr = [...prev];
      [arr[i], arr[j]] = [{ ...arr[j], order_index: arr[i].order_index }, { ...arr[i], order_index: arr[j].order_index }];
      return arr;
    });
  }

  return (
    <div className="space-y-6">
      {/* ── Page Title ── */}
      <div className="bg-white border border-black/10 p-6">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Page Title</p>
        <div className="flex gap-3">
          <input
            value={page.title}
            onChange={(e) => setPage((p) => ({ ...p, title: e.target.value }))}
            className="flex-1 border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors"
            placeholder="Page title"
          />
          <button
            onClick={saveTitle}
            disabled={savingTitle}
            className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-colors"
          >
            {savingTitle ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* ── Collaborators Table ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Theme Collaborators</p>
            <p className="text-xs text-gray-400 mt-0.5">{blocks.length} total</p>
          </div>
          <button
            onClick={() => setModal({ mode: "create" })}
            className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            + Add Collaborator
          </button>
        </div>

        <div className="bg-white border border-black/10 overflow-x-auto">
          {blocks.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-400">
              No collaborators yet. Click "+ Add Collaborator" to create one.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  {["#", "Logo", "Company", "Socials", "Images", "Order", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blocks.map((block, i) => {
                  const d = block.data;
                  return (
                    <tr key={block.id} className="border-b border-black/5 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 text-[11px]">{i + 1}</td>
                      <td className="px-4 py-3">
                        {d.logo ? (
                          <img src={d.logo} alt="" className="h-8 w-16 object-contain" />
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {d.companyName || <span className="text-gray-400 italic">Untitled</span>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {d.socials?.filter((s) => s.link).map((s) => (
                          <span key={s.name} className="bg-black/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider mr-1">{s.name}</span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        <span>{d.themeImages?.filter(Boolean).length || 0} theme</span>
                        <span className="mx-1 text-gray-300">/</span>
                        <span>{d.coreImages?.filter(Boolean).length || 0} core</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => move(block.id, -1)} disabled={i === 0} className="text-gray-400 hover:text-black disabled:opacity-20 px-1 border border-black/10 hover:border-black transition-colors">↑</button>
                          <button onClick={() => move(block.id, 1)} disabled={i === blocks.length - 1} className="text-gray-400 hover:text-black disabled:opacity-20 px-1 border border-black/10 hover:border-black transition-colors">↓</button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => setModal({ mode: "edit", block })}
                            className="text-[10px] uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(block.id)}
                            disabled={deleting === block.id}
                            className="text-[10px] uppercase tracking-wider text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
                          >
                            {deleting === block.id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <ThemeDetailModal
          mode={modal.mode}
          initial={modal.block?.data ?? empty}
          onClose={() => setModal(null)}
          onSave={(data) =>
            modal.mode === "create"
              ? handleCreate(data)
              : handleUpdate(modal.block!.id, data)
          }
        />
      )}
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function ThemeDetailModal({
  mode,
  initial,
  onClose,
  onSave,
}: {
  mode: "create" | "edit";
  initial: ThemeDetail;
  onClose: () => void;
  onSave: (d: ThemeDetail) => Promise<void>;
}) {
  const [form, setForm] = useState<ThemeDetail>(JSON.parse(JSON.stringify(initial)));
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "images" | "content" | "socials">("basic");

  function set<K extends keyof ThemeDetail>(key: K, val: ThemeDetail[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function updateImg(key: "themeImages" | "coreImages", i: number, val: string) {
    const arr = [...form[key]];
    arr[i] = val;
    set(key, arr);
  }

  function addImg(key: "themeImages" | "coreImages") { set(key, [...form[key], ""]); }
  function removeImg(key: "themeImages" | "coreImages", i: number) { set(key, form[key].filter((_, idx) => idx !== i)); }

  function updateSocial(i: number, field: keyof Social, val: string) {
    const arr = [...form.socials];
    arr[i] = { ...arr[i], [field]: val };
    set("socials", arr);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  const TABS = [
    { key: "basic",   label: "Basic Info" },
    { key: "images",  label: "Images" },
    { key: "content", label: "Descriptions" },
    { key: "socials", label: "Socials" },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-10">
      <div className="bg-white w-full max-w-2xl shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-black/10">
          <h2 className="text-sm font-semibold uppercase tracking-widest">
            {mode === "create" ? "Add Collaborator" : `Edit — ${form.companyName || "Untitled"}`}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors text-lg">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-black/10">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 text-[10px] uppercase tracking-widest transition-colors ${
                activeTab === key ? "border-b-2 border-black text-black" : "text-gray-400 hover:text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit}>
          <div className="px-8 py-6 space-y-4 min-h-[320px]">

            {/* Basic Info */}
            {activeTab === "basic" && (
              <>
                <F label="Company Name *">
                  <input required value={form.companyName} onChange={(e) => set("companyName", e.target.value)} className={inp} placeholder="e.g. ADND Studio" />
                </F>
                <F label="Logo URL">
                  <input value={form.logo} onChange={(e) => set("logo", e.target.value)} className={inp} placeholder="/temp/edition/core-logo/... or https://..." />
                  {form.logo && <img src={form.logo} alt="logo" className="mt-2 h-10 object-contain border border-black/10 p-1" />}
                </F>
              </>
            )}

            {/* Images */}
            {activeTab === "images" && (
              <>
                <ImageList label="Theme Images" images={form.themeImages} onUpdate={(i, v) => updateImg("themeImages", i, v)} onAdd={() => addImg("themeImages")} onRemove={(i) => removeImg("themeImages", i)} />
                <div className="border-t border-black/10 pt-4">
                  <ImageList label="Core Images" images={form.coreImages} onUpdate={(i, v) => updateImg("coreImages", i, v)} onAdd={() => addImg("coreImages")} onRemove={(i) => removeImg("coreImages", i)} />
                </div>
              </>
            )}

            {/* Descriptions */}
            {activeTab === "content" && (
              <>
                <F label="Theme Description (HTML)">
                  <textarea value={form.themeDescriptionHtml} onChange={(e) => set("themeDescriptionHtml", e.target.value)} rows={6} className={area} placeholder="<p>Description shown on the Theme page...</p>" />
                </F>
                <F label="Core Description (HTML)">
                  <textarea value={form.CoreDescriptionHtml} onChange={(e) => set("CoreDescriptionHtml", e.target.value)} rows={6} className={area} placeholder="<p>Description shown on the Core page...</p>" />
                </F>
              </>
            )}

            {/* Socials */}
            {activeTab === "socials" && (
              <div className="space-y-2">
                {form.socials.map((s, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <select value={s.name} onChange={(e) => updateSocial(i, "name", e.target.value)} className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white w-36 shrink-0">
                      {["instagram", "website", "facebook", "linkedin", "twitter", "youtube", "behance", "pinterest"].map((n) => <option key={n}>{n}</option>)}
                    </select>
                    <input value={s.link} onChange={(e) => updateSocial(i, "link", e.target.value)} className={`${inp} flex-1`} placeholder="https://..." />
                    <button type="button" onClick={() => set("socials", form.socials.filter((_, idx) => idx !== i))} className="shrink-0 text-red-400 hover:text-red-600 border border-red-200 hover:bg-red-50 px-2 py-2 text-xs transition-colors">✕</button>
                  </div>
                ))}
                <button type="button" onClick={() => set("socials", [...form.socials, { name: "instagram", link: "" }])} className="border border-black/20 px-4 py-2 text-[11px] uppercase tracking-widest hover:border-black transition-colors mt-1">
                  + Add Social
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-8 py-5 border-t border-black/10 bg-gray-50">
            <div className="flex gap-1">
              {TABS.map(({ key }) => (
                <span key={key} className={`w-1.5 h-1.5 rounded-full ${activeTab === key ? "bg-black" : "bg-gray-300"}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="border border-black/20 px-6 py-2.5 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-colors">
                {saving ? "Saving..." : mode === "create" ? "Create" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────────
function ImageList({ label, images, onUpdate, onAdd, onRemove }: {
  label: string;
  images: string[];
  onUpdate: (i: number, v: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      <div className="space-y-2">
        {images.map((url, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input value={url} onChange={(e) => onUpdate(i, e.target.value)} className={`${inp} flex-1`} placeholder={`Image ${i + 1} URL`} />
            {url && <img src={url} alt="" className="h-8 w-12 object-cover border border-black/10 shrink-0" />}
            <button type="button" onClick={() => onRemove(i)} className="shrink-0 text-red-400 hover:text-red-600 border border-red-200 hover:bg-red-50 px-2 py-2 text-xs transition-colors">✕</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={onAdd} className="mt-2 border border-black/20 px-4 py-1.5 text-[11px] uppercase tracking-widest hover:border-black transition-colors">
        + Add Image
      </button>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-gray-400">{label}</label>
      {children}
    </div>
  );
}

const inp  = "border border-black/20 px-3 py-2 text-sm outline-none focus:border-black transition-colors bg-white w-full";
const area = "border border-black/20 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full resize-y font-mono text-xs leading-relaxed";
