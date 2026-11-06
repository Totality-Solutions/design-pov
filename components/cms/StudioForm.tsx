"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";
import ImageUploadField from "./ImageUploadField";
import { extractFolderNumber } from "@/lib/mediaFolder";
import { STUDIO_EDITIONS, DEFAULT_STUDIO_EDITION } from "@/lib/studios";

const BASE_PATH = "/temp/studios";

type FormData = {
  label: string;
  architects: string;
  logo: string;
  website: string;
  instagram: string;
  core_image: string;
  bio: string;
  core_additional_images: string[];
  booth_image: string;
  concept: string;
  booth_additional_images: string[];
  sort_order: number;
  edition: number;
  active: boolean;
};

const emptyForm: FormData = {
  label: "",
  architects: "",
  logo: "",
  website: "",
  instagram: "",
  core_image: "",
  bio: "",
  core_additional_images: [""],
  booth_image: "",
  concept: "",
  booth_additional_images: [""],
  sort_order: 0,
  edition: DEFAULT_STUDIO_EDITION,
  active: true,
};

const inputCls  = "border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white transition-colors w-full";
const labelCls  = "block text-[10px] uppercase tracking-widest text-gray-400 mb-1";
const hintCls   = "text-[10px] text-gray-400 mt-1";
const sectionCls = "pt-6 border-t border-black/10";

function parseLines(raw: string): string[] {
  return raw.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function StudioForm({
  initialData,
  studioId,
  defaultImageFolder,
}: {
  initialData?: Partial<FormData>;
  studioId?: string;
  /** e.g. "/temp/studios/12/" — pre-fills the core image so uploads land in the same folder */
  defaultImageFolder?: string;
}) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const isEdit = !!studioId;

  const [form, setForm]     = useState<FormData>({
    ...emptyForm,
    ...(defaultImageFolder && !isEdit ? { core_image: defaultImageFolder, booth_image: defaultImageFolder } : {}),
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  // Keep every upload in this studio's folder, whatever the current image paths are
  const uploadFolder =
    (extractFolderNumber(BASE_PATH, form.core_image) ?? extractFolderNumber(BASE_PATH, form.booth_image)) != null
      ? `temp/studios/${extractFolderNumber(BASE_PATH, form.core_image) ?? extractFolderNumber(BASE_PATH, form.booth_image)}`
      : defaultImageFolder
        ? defaultImageFolder.replace(/^\/+|\/+$/g, "")
        : "studios/misc";

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateImg(key: "core_additional_images" | "booth_additional_images", i: number, value: string) {
    setForm((f) => {
      const arr = [...f[key]];
      arr[i] = value;
      return { ...f, [key]: arr };
    });
  }
  function addImg(key: "core_additional_images" | "booth_additional_images") {
    setForm((f) => ({ ...f, [key]: [...f[key], ""] }));
  }
  function removeImg(key: "core_additional_images" | "booth_additional_images", i: number) {
    setForm((f) => ({ ...f, [key]: f[key].filter((_, idx) => idx !== i) }));
  }

  async function handleSave() {
    setError("");
    if (!form.label.trim())      { setError("Studio name is required."); return; }
    if (!form.core_image.trim()) { setError("Core image is required."); return; }
    if (!form.booth_image.trim()) { setError("Theme image is required."); return; }

    const payload = {
      label: form.label.trim(),
      architects: parseLines(form.architects),
      logo: form.logo.trim(),
      website: form.website.trim(),
      instagram: form.instagram.trim(),
      core_image: form.core_image.trim(),
      bio: form.bio.trim(),
      core_additional_images: form.core_additional_images.map((s) => s.trim()).filter(Boolean),
      booth_image: form.booth_image.trim(),
      concept: form.concept.trim(),
      booth_additional_images: form.booth_additional_images.map((s) => s.trim()).filter(Boolean),
      sort_order: form.sort_order,
      edition: form.edition,
      active: form.active,
    };

    setSaving(true);
    const url    = isEdit ? `/api/cms/studios/${studioId}` : "/api/cms/studios";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Save failed. Try again.");
      showError("Couldn't save this studio. Please try again.");
      return;
    }
    showSuccess(isEdit ? "Studio updated." : "Studio created.");
    router.push(`/cms/studios?edition=${form.edition}`);
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-6">

      {/* ── WHERE THIS SHOWS ─────────────────────────── */}
      <div className="border border-black/10 bg-[#fafafa] p-4 text-[12px] text-gray-600 leading-relaxed">
        <p className="font-semibold text-black mb-1">One studio = one card on two pages</p>
        <p>
          The name, architects, logo and links below are shared. The{" "}
          <span className="font-semibold text-blue-700">Core section</span> fills the studio’s card and popup on{" "}
          <a href="/edition/core" target="_blank" rel="noopener noreferrer" className="underline">Edition → Core ↗</a>; the{" "}
          <span className="font-semibold text-amber-700">Theme section</span> fills its card and popup on{" "}
          <a href="/edition/theme" target="_blank" rel="noopener noreferrer" className="underline">Edition → Theme ↗</a>.
          Images uploaded in one section never appear on the other page.
        </p>
      </div>

      {/* ── IDENTITY ─────────────────────────────────── */}
      <div>
        <label className={labelCls}>Studio Name *</label>
        <input value={form.label} onChange={(e) => set("label", e.target.value)} placeholder="e.g. Abin Design Studio" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Architects (one per line)</label>
        <textarea
          value={form.architects}
          onChange={(e) => set("architects", e.target.value)}
          rows={3}
          placeholder={"Abin Chaudhury\nAnother Name"}
          className={inputCls}
        />
        <p className={hintCls}>Each line becomes one architect name.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Website</label>
          <input value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://..." className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Instagram URL</label>
          <input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://www.instagram.com/..." className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Logo</label>
        <ImageUploadField
          value={form.logo}
          onChange={(url) => set("logo", url)}
          folder={uploadFolder}
          placeholder="/temp/edition/core-logo/ads.png"
          allowSvg
          className={inputCls}
          previewClassName="mt-2 w-36 h-16 object-contain p-2 bg-gray-50 border border-black/10"
        />
      </div>

      {/* ── CORE SECTION ─────────────────────────────── */}
      <div className="border-l-4 border-blue-600 bg-blue-50/40 pl-5 pr-4 py-5">
        <div className="flex items-center justify-between gap-3 mb-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-700">Core Section</p>
          <a href="/edition/core" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-blue-700 hover:underline">
            View Core page ↗
          </a>
        </div>
        <p className="text-[11px] text-gray-500 mb-4">Shown only on Edition → Core: the studio’s card and its popup.</p>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Core Image *</label>
            <ImageUploadField
              value={form.core_image}
              onChange={(url) => set("core_image", url)}
              folder={uploadFolder}
              className={inputCls}
              previewClassName="mt-2 h-32 w-full object-cover border border-black/10"
            />
          </div>

          <div>
            <label className={labelCls}>Bio (Studio About)</label>
            <textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              rows={5}
              placeholder="Describe the studio — who they are, their philosophy..."
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Core Additional Images <span className="normal-case tracking-normal text-gray-400">— Core popup only</span></label>
            <div className="space-y-2 mt-1.5">
              {form.core_additional_images.map((img, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <ImageUploadField
                      value={img}
                      onChange={(url) => updateImg("core_additional_images", i, url)}
                      folder={uploadFolder}
                      className={inputCls}
                      previewClassName="mt-1 h-20 w-full object-cover border border-black/10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImg("core_additional_images", i)}
                    className="mt-0.5 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 border border-black/10 hover:border-red-300 transition-colors shrink-0 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addImg("core_additional_images")}
              className="mt-3 border border-black/20 px-4 py-2 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors"
            >
              + Add Image
            </button>
          </div>
        </div>
      </div>

      {/* ── THEME / BOOTH SECTION ────────────────────── */}
      <div className="border-l-4 border-amber-500 bg-amber-50/50 pl-5 pr-4 py-5">
        <div className="flex items-center justify-between gap-3 mb-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-700">Theme Section</p>
          <a href="/edition/theme" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-amber-700 hover:underline">
            View Theme page ↗
          </a>
        </div>
        <p className="text-[11px] text-gray-500 mb-4">Shown only on Edition → Theme: the studio’s card and its popup.</p>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Theme Image *</label>
            <ImageUploadField
              value={form.booth_image}
              onChange={(url) => set("booth_image", url)}
              folder={uploadFolder}
              className={inputCls}
              previewClassName="mt-2 h-32 w-full object-cover border border-black/10"
            />
          </div>

          <div>
            <label className={labelCls}>Concept (Exhibition Theme)</label>
            <textarea
              value={form.concept}
              onChange={(e) => set("concept", e.target.value)}
              rows={5}
              placeholder="Describe the exhibition concept / booth idea..."
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Theme Additional Images <span className="normal-case tracking-normal text-gray-400">— Theme popup only</span></label>
            <div className="space-y-2 mt-1.5">
              {form.booth_additional_images.map((img, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <ImageUploadField
                      value={img}
                      onChange={(url) => updateImg("booth_additional_images", i, url)}
                      folder={uploadFolder}
                      className={inputCls}
                      previewClassName="mt-1 h-20 w-full object-cover border border-black/10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImg("booth_additional_images", i)}
                    className="mt-0.5 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 border border-black/10 hover:border-red-300 transition-colors shrink-0 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addImg("booth_additional_images")}
              className="mt-3 border border-black/20 px-4 py-2 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors"
            >
              + Add Image
            </button>
          </div>
        </div>
      </div>

      {/* ── META ─────────────────────────────────────── */}
      <div className={sectionCls}>
        <div className="flex gap-6 items-end">
          <div>
            <label className={labelCls}>Edition</label>
            <select
              value={form.edition}
              onChange={(e) => set("edition", Number(e.target.value))}
              className={`${inputCls} w-28`}
            >
              {STUDIO_EDITIONS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
              className={`${inputCls} w-28`}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => set("active", !form.active)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-colors ${
                form.active ? "bg-black text-white border-black" : "border-black/20 text-gray-400 hover:border-black"
              }`}
            >
              {form.active ? "Active" : "Hidden"}
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-40"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Studio"}
        </button>
        <button
          onClick={() => router.push("/cms/studios")}
          className="px-6 py-2.5 text-[11px] uppercase tracking-widest border border-black/20 text-gray-500 hover:text-black hover:border-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
