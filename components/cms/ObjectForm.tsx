"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ObjectFormData = {
  label: string;
  sublabel: string;
  description: string;
  src: string;
  additional_images: string[];
  website: string;
  instagram: string;
  logo: string;
  sort_order: number;
  active: boolean;
};

const emptyForm: ObjectFormData = {
  label: "",
  sublabel: "",
  description: "",
  src: "",
  additional_images: [""],
  website: "#",
  instagram: "#",
  logo: "/logo/Totality.svg",
  sort_order: 0,
  active: true,
};

export default function ObjectForm({
  initialData,
  objectId,
}: {
  initialData?: Partial<ObjectFormData>;
  objectId?: string;
}) {
  const router = useRouter();
  const isEdit = !!objectId;

  const [form, setForm] = useState<ObjectFormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField<K extends keyof ObjectFormData>(field: K, value: ObjectFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateImage(i: number, value: string) {
    setForm((f) => {
      const arr = [...f.additional_images];
      arr[i] = value;
      return { ...f, additional_images: arr };
    });
  }

  function addImage() {
    setForm((f) => ({ ...f, additional_images: [...f.additional_images, ""] }));
  }

  function removeImage(i: number) {
    setForm((f) => ({ ...f, additional_images: f.additional_images.filter((_, idx) => idx !== i) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      additional_images: form.additional_images.filter((img) => img.trim()),
    };

    const url    = isEdit ? `/api/cms/objects/${objectId}` : "/api/cms/objects";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/cms/objects");
      router.refresh();
    } else {
      const json = await res.json();
      setError(json.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      {/* ── Core Info ── */}
      <Section title="Core Info">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Label *">
            <input
              required
              value={form.label}
              onChange={(e) => setField("label", e.target.value)}
              className={input}
              placeholder="e.g. Collectible Seating"
            />
          </Field>
          <Field label="Sublabel">
            <input
              value={form.sublabel}
              onChange={(e) => setField("sublabel", e.target.value)}
              className={input}
              placeholder="e.g. Collectible Seating"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={4}
            className={textarea}
            placeholder="Short description shown in the modal..."
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
      </Section>

      {/* ── Images ── */}
      <Section title="Images">
        <Field label="Main Image Path *">
          <input
            required
            value={form.src}
            onChange={(e) => setField("src", e.target.value)}
            className={input}
            placeholder="/temp/objects/1.png"
          />
          {form.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.src} alt="preview" className="mt-2 h-32 w-full object-cover border border-black/10" />
          )}
        </Field>

        <div>
          <p className={label}>Additional Images</p>
          <div className="space-y-2 mt-1.5">
            {form.additional_images.map((img, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1 space-y-1">
                  <input
                    value={img}
                    onChange={(e) => updateImage(i, e.target.value)}
                    className={input}
                    placeholder={`/temp/objects/${i + 2}.jpg`}
                  />
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={`additional ${i}`} className="h-20 w-full object-cover border border-black/10" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="mt-0.5 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 border border-black/10 hover:border-red-300 transition-colors shrink-0 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addImage} className={`${addBtn} mt-3`}>
            + Add Image
          </button>
        </div>

        <Field label="Logo Path">
          <input
            value={form.logo}
            onChange={(e) => setField("logo", e.target.value)}
            className={input}
            placeholder="/logo/Totality.svg"
          />
        </Field>
      </Section>

      {/* ── Links ── */}
      <Section title="Links">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Website URL">
            <input
              value={form.website}
              onChange={(e) => setField("website", e.target.value)}
              className={input}
              placeholder="https://example.com or #"
            />
          </Field>
          <Field label="Instagram URL">
            <input
              value={form.instagram}
              onChange={(e) => setField("instagram", e.target.value)}
              className={input}
              placeholder="https://instagram.com/handle or #"
            />
          </Field>
        </div>
      </Section>

      {/* ── Actions ── */}
      <div className="flex gap-4 pt-2 border-t border-black/10">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Object" : "Create Object"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/cms/objects")}
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
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-black/10">
        {title}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label: labelText, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={label}>{labelText}</label>
      {children}
    </div>
  );
}

const input    = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full";
const textarea = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full resize-y";
const label    = "text-[11px] uppercase tracking-widest text-gray-500";
const addBtn   = "border border-black/20 px-4 py-2 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors";
