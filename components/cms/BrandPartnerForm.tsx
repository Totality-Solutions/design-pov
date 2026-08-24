"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";
import ImageUploadField from "./ImageUploadField";
import { extractFolderNumber } from "@/lib/mediaFolder";

const BASE_PATH = "/temp/brand-partners";

const SPECIAL_TYPES = [
  { value: "sponsor", label: "Sponsor (Partners)" },
  { value: "brand",   label: "Brand" },
];

const FALLBACK_TYPES = [
  { value: "brand_collaborator",        label: "Brand Collaborator" },
  { value: "build_partner",             label: "Build Partner" },
  { value: "gifting_partner",           label: "Gifting Partner" },
  { value: "media_partner",             label: "Media Partner" },
  { value: "digital_media_partner",     label: "Digital Media Partner" },
  { value: "ticketing_partner",         label: "Ticketing Partner" },
  { value: "sensory_collaborator",      label: "Sensory Collaborator" },
  { value: "key_execution_partner",     label: "Key Execution Partner" },
  { value: "operation_partner",         label: "Operations Partner" },
  { value: "curatorial_partner",        label: "Curatorial Partner" },
  { value: "experience_partner",        label: "Experience Partner" },
  { value: "learning_partner",          label: "Learning Partner" },
  { value: "knowledge_partner",         label: "Knowledge Partner" },
  { value: "visual_experience_partner", label: "Visual Experience Partner" },
  { value: "workshop_partner",          label: "Workshop Partner" },
  { value: "community_partner",         label: "Community Partner" },
  { value: "red_room_partner",          label: "Red Room Partner" },
  { value: "growth_consultant",         label: "Growth Consultants" },
  { value: "mural_art_partner",         label: "Mural and Art Partner" },
];

const SPONSOR_TIERS = [
  { value: "presenting", label: "PRESENTING PARTNER" },
  { value: "powered_by", label: "POWERED BY" },
  { value: "network",    label: "NETWORK PARTNER" },
  { value: "lounge",     label: "LOUNGE PARTNER" },
  { value: "colour",     label: "COLOUR PARTNER" },
];

type FormData = {
  name: string;
  logo: string;
  website: string;
  type: string;
  tier: string;
  sort_order: number;
  active: boolean;
};

const emptyForm: FormData = {
  name: "",
  logo: "",
  website: "",
  type: "brand_collaborator",
  tier: "",
  sort_order: 0,
  active: true,
};

const inputCls = "border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white transition-colors w-full";
const labelCls = "block text-[10px] uppercase tracking-widest text-gray-400 mb-1";

const PRESET_TIER_VALUES = new Set(SPONSOR_TIERS.map((t) => t.value));

export default function BrandPartnerForm({
  initialData,
  partnerId,
  defaultImageFolder,
}: {
  initialData?: Partial<FormData>;
  partnerId?: string;
  /** e.g. "/temp/brand-partners/9/" — pre-fills the logo field so uploads land in the same folder */
  defaultImageFolder?: string;
}) {
  const router  = useRouter();
  const { showSuccess, showError } = useToast();
  const isEdit  = !!partnerId;

  const [form, setForm]           = useState<FormData>({
    ...emptyForm,
    ...(defaultImageFolder && !isEdit ? { logo: defaultImageFolder } : {}),
    ...initialData,
  });
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");
  const [partnerTypes, setPartnerTypes] = useState([...SPECIAL_TYPES, ...FALLBACK_TYPES]);
  const [customTier, setCustomTier] = useState(
    () => !!(initialData?.tier && !PRESET_TIER_VALUES.has(initialData.tier))
  );
  const [customType, setCustomType] = useState(false);

  useEffect(() => {
    fetch("/api/cms/brand-partner-types")
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.length) {
          const dbTypes = data.map((t: { type: string; title: string }) => ({ value: t.type, label: t.title }));
          setPartnerTypes([...SPECIAL_TYPES, ...dbTypes]);
          // If current type isn't in the list, switch to custom input
          const allValues = new Set([...SPECIAL_TYPES, ...dbTypes].map((t) => t.value));
          if (initialData?.type && !allValues.has(initialData.type)) {
            setCustomType(true);
          }
        }
      })
      .catch(() => {});
  }, [initialData?.type]);

  // Keep every upload in this partner's folder, whatever the current logo path is
  const uploadFolder =
    extractFolderNumber(BASE_PATH, form.logo) != null
      ? `temp/brand-partners/${extractFolderNumber(BASE_PATH, form.logo)}`
      : defaultImageFolder
        ? defaultImageFolder.replace(/^\/+|\/+$/g, "")
        : "brand-partners/misc";

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setError("");
    if (!form.name.trim()) { setError("Name is required."); return; }
    if (!form.logo.trim()) { setError("Logo path is required."); return; }

    setSaving(true);
    const payload = {
      ...form,
      tier: form.type === "sponsor" ? form.tier : null,
    };

    const url    = isEdit ? `/api/cms/brand-partners/${partnerId}` : "/api/cms/brand-partners";
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
      showError("Couldn't save this brand partner. Please try again.");
      return;
    }
    showSuccess(isEdit ? "Brand partner updated." : "Brand partner created.");
    router.push("/cms/brand-partners");
    router.refresh();
  }

  return (
    <div className="max-w-xl space-y-6">
      {/* Name */}
      <div>
        <label className={labelCls}>Name *</label>
        <input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. PRESENTING PARTNER"
          className={inputCls}
        />
      </div>

      {/* Logo path + preview */}
      <div>
        <label className={labelCls}>Logo *</label>
        <ImageUploadField
          value={form.logo}
          onChange={(url) => set("logo", url)}
          folder={uploadFolder}
          className={inputCls}
          previewClassName="mt-2 h-24 w-40 object-contain bg-gray-50 border border-black/10 p-2"
        />
      </div>

      {/* Website */}
      <div>
        <label className={labelCls}>Website</label>
        <input
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
          placeholder="https://example.com"
          className={inputCls}
        />
      </div>

      {/* Type */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className={labelCls} style={{ marginBottom: 0 }}>Type *</label>
          <button
            type="button"
            onClick={() => {
              setCustomType((v) => !v);
              set("type", "");
            }}
            className="text-[10px] uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors"
          >
            {customType ? "Choose existing" : "+ Add new type"}
          </button>
        </div>

        {customType ? (
          <input
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            placeholder="e.g. hospitality_partner"
            className={inputCls}
          />
        ) : (
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className={inputCls}
          >
            {partnerTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Tier — only for sponsors */}
      {form.type === "sponsor" && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={labelCls} style={{ marginBottom: 0 }}>Sponsor Tier</label>
            <button
              type="button"
              onClick={() => {
                setCustomTier((v) => !v);
                set("tier", "");
              }}
              className="text-[10px] uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors"
            >
              {customTier ? "Choose existing" : "+ Add new tier"}
            </button>
          </div>

          {customTier ? (
            <input
              value={form.tier}
              onChange={(e) => set("tier", e.target.value)}
              placeholder="e.g. HOSPITALITY PARTNER"
              className={inputCls}
            />
          ) : (
            <select
              value={form.tier}
              onChange={(e) => set("tier", e.target.value)}
              className={inputCls}
            >
              <option value="">— Select tier —</option>
              {SPONSOR_TIERS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Sort order */}
      <div>
        <label className={labelCls}>Sort Order</label>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => set("sort_order", Number(e.target.value))}
          className={`${inputCls} w-32`}
        />
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => set("active", !form.active)}
          className={`px-4 py-1.5 text-[10px] uppercase tracking-widest border transition-colors ${
            form.active ? "bg-black text-white border-black" : "border-black/20 text-gray-400 hover:border-black"
          }`}
        >
          {form.active ? "Active" : "Hidden"}
        </button>
        <span className="text-xs text-gray-400">Toggle visibility on the site</span>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Save */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-40"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Partner"}
        </button>
        <button
          onClick={() => router.push("/cms/brand-partners")}
          className="px-6 py-2.5 text-[11px] uppercase tracking-widest border border-black/20 text-gray-500 hover:text-black hover:border-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
