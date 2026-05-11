"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeedBlogsButton() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSeed() {
    if (!confirm("Import all blogs from magazineData.ts into Supabase?\n\nExisting slugs will be skipped.")) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/cms/seed-blogs", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMsg(json.error || "Seed failed");
        return;
      }
      const { inserted, skipped, errors } = json;
      setStatus("done");
      setMsg(`✓ Inserted ${inserted}, skipped ${skipped}${errors?.length ? `, ${errors.length} error(s)` : ""}`);
      router.refresh();
    } catch (e: any) {
      setStatus("error");
      setMsg(e.message || "Network error");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSeed}
        disabled={status === "loading"}
        className="border border-black/30 px-4 py-2.5 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-40"
      >
        {status === "loading" ? "Seeding..." : "Seed from Magazine Data"}
      </button>
      {msg && (
        <span className={`text-[11px] ${status === "error" ? "text-red-500" : "text-green-600"}`}>
          {msg}
        </span>
      )}
    </div>
  );
}
