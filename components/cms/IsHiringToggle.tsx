"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function IsHiringToggle() {
  const { showSuccess, showError } = useToast();
  // We initialize it directly as a simple local UI state toggle first
  // to ensure it never gets permanently stuck on "Loading..."
  const [isHiring, setIsHiring] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function handleToggle(checked: boolean) {
    setIsHiring(checked);
    setIsSaving(true);

    try {
      const res = await fetch("/api/cms/global-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHiring: checked }),
      });
      if (!res.ok) throw new Error("Update failed");
      showSuccess(checked ? "Careers module turned on." : "Careers module turned off.");
    } catch (err) {
      console.error("Failed to sync state:", err);
      setIsHiring(!checked);
      showError("Couldn't save this change. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="bg-white border border-black/10 p-4 w-full max-w-xs shadow-sm">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-semibold">
        Global Careers Module
      </p>
      
      <label className="inline-flex items-center gap-3 cursor-pointer group select-none w-full justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-black uppercase tracking-wider">
            {isHiring ? "Hiring Active" : "Hiring Paused"}
          </span>
          <span className="text-[10px] text-gray-400 lowercase italic">
            {isSaving ? "syncing..." : isHiring ? "modal is active" : "modal is hidden"}
          </span>
        </div>

        <div className="relative shrink-0">
          <input
            type="checkbox"
            checked={isHiring}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 transition-colors duration-200" />
        </div>
      </label>
    </div>
  );
}