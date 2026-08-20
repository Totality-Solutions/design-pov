"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

type GalleryFormData = {
  title: string;
  image_src: string;
  category: string;
  year: number;
  sort_order: number;
  active: boolean;
};

const emptyForm: GalleryFormData = {
  title: "",
  image_src: "",
  category: "",
  year: new Date().getFullYear(),
  sort_order: 0,
  active: true,
};

export default function GalleryForm({
  initialData,
  itemId,
}: {
  initialData?: Partial<GalleryFormData>;
  itemId?: string;
}) {
  const router = useRouter();
  const isEdit = !!itemId;

  const [form, setForm] = useState<GalleryFormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [existingYears, setExistingYears] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/cms/gallery")
      .then((res) => res.json())
      .then(({ data }) => {
        if (!Array.isArray(data)) return;
        setExistingCategories(Array.from(new Set(data.map((d) => d.category))).sort());
        setExistingYears(Array.from(new Set(data.map((d) => d.year))).sort((a, b) => b - a));
      })
      .catch(() => {});
  }, []);

  function setField<K extends keyof GalleryFormData>(field: K, value: GalleryFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const url = isEdit ? `/api/cms/gallery/${itemId}` : "/api/cms/gallery";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/cms/gallery");
      router.refresh();
    } else {
      const json = await res.json();
      setError(json.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

      <Field label="Title *">
        <input
          required
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          className={input}
          placeholder="e.g. Artists"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Category *">
          <input
            required
            list="gallery-categories"
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className={input}
            placeholder="e.g. artists, brand, circle..."
          />
          <datalist id="gallery-categories">
            {existingCategories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <p className="text-[11px] text-gray-400 mt-1">Pick an existing one, or type a new category — it just works.</p>
        </Field>
        <Field label="Year *">
          <input
            required
            type="number"
            list="gallery-years"
            value={form.year}
            onChange={(e) => setField("year", Number(e.target.value))}
            className={input}
          />
          <datalist id="gallery-years">
            {existingYears.map((y) => (
              <option key={y} value={y} />
            ))}
          </datalist>
          <p className="text-[11px] text-gray-400 mt-1">Type any year — e.g. 2027 — no code changes needed.</p>
        </Field>
      </div>

      <Field label="Image *">
        <ImageUploadField
          value={form.image_src}
          onChange={(url) => setField("image_src", url)}
          folder={`gallery/${form.year}/${form.category || "misc"}`}
          className={input}
          previewClassName="mt-2 h-40 w-full object-cover border border-black/10"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Sort Order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setField("sort_order", Number(e.target.value))}
            className={input}
            min={0}
          />
        </Field>
        <Field label="Status">
          <div className="flex gap-2 mt-1">
            {(["active", "hidden"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setField("active", s === "active")}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-colors ${
                  (s === "active") === form.active
                    ? "bg-black text-white border-black"
                    : "border-black/20 text-gray-500 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="flex gap-4 pt-2 border-t border-black/10">
        <button
          type="submit"
          disabled={saving || !form.image_src}
          className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Image" : "Add Image"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/cms/gallery")}
          className="border border-black/20 px-8 py-3 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
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
