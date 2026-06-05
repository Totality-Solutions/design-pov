"use client";

import { useState, useEffect } from "react";

export default function HideTicketsToggle() {
  const [hideTickets, setHideTickets] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // 1. Fetch only the ticket visibility status on mount
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/cms/global-settings");
        if (res.ok) {
          const data = await res.json();
          setHideTickets(!!data.hideTickets);
        }
      } catch (err) {
        console.error("Failed to load ticketing status:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatus();
  }, []);

  // 2. Handle immediate database mutation on change
  async function handleToggle(checked: boolean) {
    setHideTickets(checked);
    setIsSaving(true);
    try {
      const res = await fetch("/api/cms/global-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hideTickets: checked }), // Sends only this column field
      });
      if (!res.ok) throw new Error("Update failed");
    } catch (err) {
      console.error("Failed to update ticketing status:", err);
      setHideTickets(!checked); // Revert UI state on network failure
      alert("Failed to save ticketing changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-4 text-[10px] uppercase tracking-widest text-gray-400 bg-white border border-black/10 max-w-xs shadow-sm">
        <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
        Syncing Ticket Status...
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/10 p-5 w-full max-w-xs shadow-sm">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2.5 font-semibold">
        Global Ticket Actions
      </p>
      
      <label className="inline-flex items-center gap-3 cursor-pointer group select-none w-full justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-black uppercase tracking-wider">
            {hideTickets ? "Buttons Hidden" : "Buttons Visible"}
          </span>
          <span className="text-[10px] text-gray-400 lowercase italic">
            {isSaving ? "syncing status..." : hideTickets ? "tickets closed" : "tickets live for sales"}
          </span>
        </div>

        <div className="relative shrink-0">
          <input
            type="checkbox"
            checked={hideTickets}
            onChange={(e) => handleToggle(e.target.checked)}
            disabled={isSaving}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 transition-colors duration-200" />
        </div>
      </label>
    </div>
  );
}