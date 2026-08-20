"use client";

import { useState } from "react";
import CmsSidebar from "@/components/cms/CmsSidebar";
import GalleryForm from "@/components/cms/GalleryForm";
import GalleryBulkUpload from "@/components/cms/GalleryBulkUpload";

export default function NewGalleryItemPage() {
  const [mode, setMode] = useState<"single" | "bulk">("bulk");

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10 max-w-3xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Gallery</p>
          <h1 className="text-2xl font-semibold text-black">Add Images</h1>
        </div>

        <div className="flex gap-2 mb-6">
          {(["bulk", "single"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest border transition-colors ${
                mode === m ? "bg-black text-white border-black" : "border-black/20 text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {m === "bulk" ? "Bulk Dump Upload" : "Single Image"}
            </button>
          ))}
        </div>

        <div className="bg-white border border-black/10 p-8">
          {mode === "bulk" ? (
            <GalleryBulkUpload />
          ) : (
            <GalleryForm />
          )}
        </div>
      </main>
    </div>
  );
}
