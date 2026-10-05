"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useToast } from "../ToastProvider";
import { DEFAULT_HOME, HOME_SECTIONS, type HomeContent, type HomeSectionKey } from "@/lib/homeContent";
import { SECTION_EDITORS, cleanSection, validateSection } from "./sectionEditors";

type SavedMap = Record<string, string>; // section → updated_at

export default function HomeEditor({ initial, saved: initialSaved }: { initial: HomeContent; saved: SavedMap }) {
  const [open, setOpen] = useState<Set<HomeSectionKey>>(() => new Set());
  const [dirty, setDirty] = useState<Set<HomeSectionKey>>(() => new Set());
  const [saved, setSaved] = useState<SavedMap>(initialSaved);

  // Warn before leaving the page with unsaved edits.
  useEffect(() => {
    if (dirty.size === 0) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty.size]);

  const toggle = (key: HomeSectionKey) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const setSectionDirty = (key: HomeSectionKey, isDirty: boolean) =>
    setDirty((prev) => {
      if (prev.has(key) === isDirty) return prev;
      const next = new Set(prev);
      if (isDirty) next.add(key);
      else next.delete(key);
      return next;
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Sections appear in the same order as on the home page. Each section saves on its own.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(new Set(HOME_SECTIONS.map((s) => s.key)))}
            className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black"
          >
            Expand all
          </button>
          <span className="text-gray-300">/</span>
          <button
            type="button"
            onClick={() => setOpen(new Set())}
            className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {HOME_SECTIONS.map(({ key, label, hint }, i) => (
          <SectionPanel
            key={key}
            sectionKey={key}
            number={i + 1}
            label={label}
            hint={hint}
            initial={initial[key]}
            isOpen={open.has(key)}
            isSaved={!!saved[key]}
            onToggle={() => toggle(key)}
            onDirtyChange={(d) => setSectionDirty(key, d)}
            onSaved={(isSaved) =>
              setSaved((prev) => {
                const next = { ...prev };
                if (isSaved) next[key] = new Date().toISOString();
                else delete next[key];
                return next;
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

function SectionPanel<K extends HomeSectionKey>({
  sectionKey, number, label, hint, initial, isOpen, isSaved, onToggle, onDirtyChange, onSaved,
}: {
  sectionKey: K;
  number: number;
  label: string;
  hint: string;
  initial: HomeContent[K];
  isOpen: boolean;
  isSaved: boolean;
  onToggle: () => void;
  onDirtyChange: (dirty: boolean) => void;
  onSaved: (saved: boolean) => void;
}) {
  const { showSuccess, showError } = useToast();
  const [committed, setCommitted] = useState(initial); // last saved state
  const [draft, setDraft] = useState(initial);
  const [busy, setBusy] = useState<"save" | "reset" | null>(null);
  const [error, setError] = useState("");

  const isDirty = JSON.stringify(draft) !== JSON.stringify(committed);
  useEffect(() => onDirtyChange(isDirty), [isDirty]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (patch: Partial<HomeContent[K]>) => setDraft((d) => ({ ...d, ...patch }));

  async function save() {
    const data = cleanSection(draft);
    const problem = validateSection(sectionKey, data);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setBusy("save");
    const res = await fetch(`/api/cms/home/${sectionKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setBusy(null);
    if (res.ok) {
      setCommitted(data);
      setDraft(data);
      onSaved(true);
      showSuccess(`${label} saved. The home page is updated.`);
    } else {
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Couldn't save.");
      showError(`Couldn't save ${label}. Please try again.`);
    }
  }

  async function resetToDefault() {
    if (!confirm(`Reset “${label}” to its original content? Your saved changes to this section will be lost.`)) return;
    setBusy("reset");
    const res = await fetch(`/api/cms/home/${sectionKey}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) {
      setCommitted(DEFAULT_HOME[sectionKey]);
      setDraft(DEFAULT_HOME[sectionKey]);
      setError("");
      onSaved(false);
      showSuccess(`${label} reset to default.`);
    } else {
      showError(`Couldn't reset ${label}. Please try again.`);
    }
  }

  const Editor = SECTION_EDITORS[sectionKey] as (props: {
    value: HomeContent[K];
    update: (patch: Partial<HomeContent[K]>) => void;
  }) => React.ReactNode;

  return (
    <div className={`bg-white border ${isOpen ? "border-black/30" : "border-black/10"}`}>
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50/60 transition-colors"
      >
        <span className="text-[11px] tabular-nums text-gray-300 w-5">{String(number).padStart(2, "0")}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-black flex items-center gap-2">
            {label}
            {isDirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Unsaved changes" />}
          </p>
          <p className="text-[12px] text-gray-400 truncate">{hint}</p>
        </div>
        {!committed.enabled && (
          <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-gray-100 text-gray-500">Hidden</span>
        )}
        <span
          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${
            isSaved ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-400"
          }`}
        >
          {isSaved ? "Customised" : "Default"}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Body */}
      {isOpen && (
        <div className="border-t border-black/10 px-6 py-6 space-y-5">
          <label className="flex items-center gap-3 cursor-pointer select-none w-fit">
            <input
              type="checkbox"
              checked={draft.enabled}
              onChange={(e) => update({ enabled: e.target.checked } as Partial<HomeContent[K]>)}
              className="w-4 h-4"
            />
            <span className="text-[11px] uppercase tracking-widest text-gray-600">Show this section on the home page</span>
          </label>

          <div className={`space-y-4 ${draft.enabled ? "" : "opacity-50"}`}>
            <Editor value={draft} update={update} />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}

          <div className="flex items-center gap-3 pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={save}
              disabled={!isDirty || !!busy}
              className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-40"
            >
              {busy === "save" ? "Saving..." : "Save Section"}
            </button>
            <button
              type="button"
              onClick={() => { setDraft(committed); setError(""); }}
              disabled={!isDirty || !!busy}
              className="border border-black/20 px-6 py-2.5 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-colors disabled:opacity-40"
            >
              Discard Changes
            </button>
            {isSaved && (
              <button
                type="button"
                onClick={resetToDefault}
                disabled={!!busy}
                className="ml-auto text-[11px] uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
              >
                {busy === "reset" ? "Resetting..." : "Reset to Default"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
