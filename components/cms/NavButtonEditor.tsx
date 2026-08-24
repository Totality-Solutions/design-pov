"use client";

import { useState, useEffect } from "react";

export default function NavButtonEditor() {
  const [label, setLabel] = useState("2027");
  const [href, setHref] = useState("/collaborate");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchButton() {
      try {
        const res = await fetch("/api/cms/global-settings");
        if (res.ok) {
          const data = await res.json();
          if (data.navButtonLabel) setLabel(data.navButtonLabel);
          if (data.navButtonHref) setHref(data.navButtonHref);
        }
      } catch (err) {
        console.error("Failed to load nav button:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchButton();
  }, []);

  async function handleSave() {
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/cms/global-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navButtonLabel: label, navButtonHref: href }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save nav button:", err);
      alert("Failed to save nav button changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-4 text-[10px] uppercase tracking-widest text-gray-400 bg-white border border-black/10 max-w-xs shadow-sm">
        <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
        Syncing Nav Button...
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/10 p-5 w-full max-w-xs shadow-sm">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-semibold">
        Header &amp; Footer Nav Button
      </p>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Label</span>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border border-black/20 px-3 py-2 text-xs focus:outline-none focus:border-black"
            placeholder="2027"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Link (href)</span>
          <input
            type="text"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            className="border border-black/20 px-3 py-2 text-xs focus:outline-none focus:border-black"
            placeholder="/collaborate"
          />
        </label>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-black text-white text-[11px] uppercase tracking-widest py-2 hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
