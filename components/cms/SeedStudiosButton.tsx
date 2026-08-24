"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function SeedStudiosButton() {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState("");

  async function handleSeed() {
    setLoading(true);
    setMsg("");
    const res  = await fetch("/api/cms/seed-studios", { method: "POST" });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    setMsg(json.message ?? json.error ?? "Done");
    if (res.ok) {
      showSuccess("Studio data imported.");
    } else {
      showError("Couldn't import the studio data. Please try again.");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSeed}
        disabled={loading}
        className="border border-black/20 px-4 py-2.5 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors disabled:opacity-40"
      >
        {loading ? "Seeding..." : "Seed Default Data"}
      </button>
      {msg && <span className="text-xs text-gray-500">{msg}</span>}
    </div>
  );
}
