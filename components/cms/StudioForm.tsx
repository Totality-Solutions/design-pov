"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cdn } from "@/lib/cdn";
import { useToast } from "./ToastProvider";

type FormData = {
  label: string;
  architects: string;
  logo: string;
  website: string;
  instagram: string;
  core_image: string;
  bio: string;
  core_additional_images: string;
  booth_image: string;
  concept: string;
  booth_additional_images: string;
  sort_order: number;
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
  core_additional_images: "",
  booth_image: "",
  concept: "",
  booth_additional_images: "",
  sort_order: 0,
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
}: {
  initialData?: Partial<FormData>;
  studioId?: string;
}) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const isEdit = !!studioId;

  const [form, setForm]     = useState<FormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setError("");
    if (!form.label.trim())      { setError("Studio name is required."); return; }
    if (!form.core_image.trim()) { setError("Core image path is required."); return; }
    if (!form.booth_image.trim()) { setError("Booth image path is required."); return; }

    const payload = {
      label: form.label.trim(),
      architects: parseLines(form.architects),
      logo: form.logo.trim(),
      website: form.website.trim(),
      instagram: form.instagram.trim(),
      core_image: form.core_image.trim(),
      bio: form.bio.trim(),
      core_additional_images: parseLines(form.core_additional_images),
      booth_image: form.booth_image.trim(),
      concept: form.concept.trim(),
      booth_additional_images: parseLines(form.booth_additional_images),
      sort_order: form.sort_order,
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
    router.push("/cms/studios");
    router.refresh();
  }

  return (
    <div className="max-w-2xl space-y-6">

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
        <label className={labelCls}>Logo Path</label>
        <input value={form.logo} onChange={(e) => set("logo", e.target.value)} placeholder="/temp/edition/core-logo/ads.png" className={inputCls} />
        {form.logo && (
          <div className="mt-2 relative w-36 h-16 bg-gray-50 border border-black/10">
            <Image src={cdn(form.logo)} alt="Logo preview" fill className="object-contain p-2" sizes="144px" unoptimized />
          </div>
        )}
      </div>

      {/* ── CORE SECTION ─────────────────────────────── */}
      <div className={sectionCls}>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">Core Section</p>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Core Image Path *</label>
            <input value={form.core_image} onChange={(e) => set("core_image", e.target.value)} placeholder="/temp/home/core/Abin.jpg" className={inputCls} />
            {form.core_image && (
              <div className="mt-2 relative w-40 h-28 bg-gray-50 border border-black/10 overflow-hidden">
                <Image src={cdn(form.core_image)} alt="Core image preview" fill className="object-cover" sizes="160px" unoptimized />
              </div>
            )}
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
            <label className={labelCls}>Core Additional Images (one path per line)</label>
            <textarea
              value={form.core_additional_images}
              onChange={(e) => set("core_additional_images", e.target.value)}
              rows={3}
              placeholder={"/temp/home/core/ABIN_1.jpg\n/temp/home/core/ABIN_2.jpg"}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── THEME / BOOTH SECTION ────────────────────── */}
      <div className={sectionCls}>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">Theme / Booth Section</p>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Booth Image Path *</label>
            <input value={form.booth_image} onChange={(e) => set("booth_image", e.target.value)} placeholder="/temp/home/core/Abin_booth.jpg" className={inputCls} />
            {form.booth_image && (
              <div className="mt-2 relative w-40 h-28 bg-gray-50 border border-black/10 overflow-hidden">
                <Image src={cdn(form.booth_image)} alt="Booth image preview" fill className="object-cover" sizes="160px" unoptimized />
              </div>
            )}
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
            <label className={labelCls}>Booth Additional Images (one path per line)</label>
            <textarea
              value={form.booth_additional_images}
              onChange={(e) => set("booth_additional_images", e.target.value)}
              rows={3}
              placeholder={"/temp/home/core/ABIN_booth_1.jpg\n/temp/home/core/ABIN_booth_2.jpg"}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── META ─────────────────────────────────────── */}
      <div className={sectionCls}>
        <div className="flex gap-6 items-end">
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
