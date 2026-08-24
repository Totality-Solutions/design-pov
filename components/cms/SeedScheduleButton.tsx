"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

export default function SeedScheduleButton() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSeed() {
    if (!confirm("Import all schedule events from Scheduledata.ts into Supabase?\n\nExisting events will be skipped.")) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/cms/seed-schedule", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMsg(json.error || "Seed failed");
        showError("Couldn't import the schedule data. Please try again.");
        return;
      }
      const { inserted, skipped, errors } = json;
      setStatus("done");
      setMsg(`✓ Inserted ${inserted}, skipped ${skipped}${errors?.length ? `, ${errors.length} error(s)` : ""}`);
      showSuccess(`Added ${inserted} schedule events.`);
      router.refresh();
    } catch (e: any) {
      setStatus("error");
      setMsg(e.message || "Network error");
      showError("Couldn't import the schedule data. Please try again.");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSeed}
        disabled={status === "loading"}
        className="border border-black/30 px-4 py-2.5 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-40"
      >
        {status === "loading" ? "Seeding..." : "Seed from Schedule Data"}
      </button>
      {msg && (
        <span className={`text-[11px] ${status === "error" ? "text-red-500" : "text-green-600"}`}>
          {msg}
        </span>
      )}
    </div>
  );
}
