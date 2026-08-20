"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SeedGalleryButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSeed() {
    if (!confirm("Import all existing gallery images (from galleryData.ts) into the database? This only needs to run once.")) return;
    setLoading(true);
    const res = await fetch("/api/cms/seed-gallery", { method: "POST" });
    const json = await res.json();
    setLoading(false);
    if (res.ok) {
      alert(`Inserted ${json.inserted} gallery items.`);
      router.refresh();
    } else {
      alert("Error: " + json.error);
    }
  }

  return (
    <button
      onClick={handleSeed}
      disabled={loading}
      className="border border-black/20 px-5 py-2.5 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors disabled:opacity-40"
    >
      {loading ? "Seeding..." : "Seed Existing Gallery"}
    </button>
  );
}
