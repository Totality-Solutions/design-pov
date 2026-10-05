"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";
import ImageUploadField from "./ImageUploadField";

const LIST_PATH = "/cms/about";
const UPLOAD_FOLDER = "temp/about/press";

type PressMentionFormData = {
  title: string;
  image: string;
  link: string;
  sort_order: number;
  active: boolean;
};

const emptyForm: PressMentionFormData = {
  title: "",
  image: "",
  link: "",
  sort_order: 0,
  active: true,
};

export default function PressMentionForm({
  initialData,
  mentionId,
}: {
  initialData?: Partial<PressMentionFormData>;
  mentionId?: string;
}) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const isEdit = !!mentionId;

  const [form, setForm] = useState<PressMentionFormData>({ ...emptyForm, ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField<K extends keyof PressMentionFormData>(field: K, value: PressMentionFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.image.trim()) {
      setError("Logo image is required.");
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      title: form.title.trim(),
      image: form.image.trim(),
      link: form.link.trim(),
    };

    const url    = isEdit ? `/api/cms/press-mentions/${mentionId}` : "/api/cms/press-mentions";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      showSuccess(isEdit ? "Press mention updated." : "Press mention created.");
      router.push(LIST_PATH);
      router.refresh();
    } else {
      const json = await res.json();
      setError(json.error || "Something went wrong.");
      showError("Couldn't save this press mention. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      <Section title="Press Mention">
        <Field label="Publication Name *">
          <input
            required
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            className={input}
            placeholder="e.g. The Hindu"
          />
        </Field>

        <Field label="Article Link *">
          <input
            required
            inputMode="url"
            value={form.link}
            onChange={(e) => setField("link", e.target.value)}
            className={input}
            placeholder="https://..."
          />
        </Field>

        <Field label="Logo Image * (JPG, PNG, WEBP or SVG)">
          <ImageUploadField
            value={form.image}
            onChange={(url) => setField("image", url)}
            folder={UPLOAD_FOLDER}
            allowSvg
            className={input}
            previewClassName="mt-2 h-24 w-full object-contain border border-black/10 bg-white p-2"
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

      {/* ── Actions ── */}
      <div className="flex gap-4 pt-2 border-t border-black/10">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-8 py-3 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update Press Mention" : "Create Press Mention"}
        </button>
        <button
          type="button"
          onClick={() => router.push(LIST_PATH)}
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

const input = "border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors bg-white w-full";
const label = "text-[11px] uppercase tracking-widest text-gray-500";
