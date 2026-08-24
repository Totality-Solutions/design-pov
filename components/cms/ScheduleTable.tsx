"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "./ToastProvider";

type ScheduleEvent = {
  id: string;
  title: string;
  day: number;
  venue: string;
  start_time: string;
  end_time: string;
  category_tag: string | null;
  is_invite_only: boolean;
  speakers: Array<{ name: string; role?: string }> | null;
  partners: string[] | null;
  created_at: string;
};

const DAY_LABELS: Record<number, string> = { 1: "Day 01 — May 15", 2: "Day 02 — May 16", 3: "Day 03 — May 17" };
const VENUES = ["Circle", "Show floor", "Workshop Zone"];

export default function ScheduleTable({ initialData }: { initialData: ScheduleEvent[] }) {
  const { showSuccess, showError } = useToast();
  const [rows, setRows] = useState<ScheduleEvent[]>(initialData);
  const [dayFilter, setDayFilter] = useState("all");
  const [venueFilter, setVenueFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => { setRows(initialData); }, [initialData]);

  const filtered = rows.filter((r) => {
    const matchDay   = dayFilter === "all" || r.day === parseInt(dayFilter);
    const matchVenue = venueFilter === "all" || r.venue === venueFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || r.title?.toLowerCase().includes(q) || r.category_tag?.toLowerCase().includes(q);
    return matchDay && matchVenue && matchSearch;
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this schedule event? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/schedule/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== id));
      showSuccess("Schedule event deleted.");
    } else {
      showError("Couldn't delete this event. Please try again.");
    }
  }

  return (
    <div>
      {/* Stats strip */}
      <div className="flex gap-6 mb-6">
        {[
          { label: "Total",       value: rows.length },
          { label: "Day 01",      value: rows.filter((r) => r.day === 1).length },
          { label: "Day 02",      value: rows.filter((r) => r.day === 2).length },
          { label: "Day 03",      value: rows.filter((r) => r.day === 3).length },
          { label: "Invite Only", value: rows.filter((r) => r.is_invite_only).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-black/10 px-5 py-3">
            <p className="text-[9px] uppercase tracking-widest text-gray-400">{label}</p>
            <p className="text-xl font-semibold mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white flex-1 min-w-[200px]"
        />
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          <option value="all">All Days</option>
          <option value="1">Day 01 — May 15</option>
          <option value="2">Day 02 — May 16</option>
          <option value="3">Day 03 — May 17</option>
        </select>
        <select
          value={venueFilter}
          onChange={(e) => setVenueFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          <option value="all">All Venues</option>
          {VENUES.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No events found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-gray-50/50">
                {["Day", "Time", "Title", "Venue", "Category", "Speakers", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const speakers = (row.speakers ?? []).filter(s => s.role !== "moderator");
                const moderator = (row.speakers ?? []).find(s => s.role === "moderator");
                return (
                  <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-black text-white text-[9px] px-2 py-0.5 uppercase tracking-wider">
                        Day 0{row.day}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {row.start_time} – {row.end_time}
                    </td>
                    <td className="px-4 py-3 max-w-[220px]">
                      <p className="font-medium text-black line-clamp-1">{row.title}</p>
                      {row.is_invite_only && (
                        <span className="text-[9px] uppercase tracking-wider text-amber-600">Invite Only</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{row.venue}</td>
                    <td className="px-4 py-3">
                      {row.category_tag ? (
                        <span className="bg-black/5 px-2 py-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">
                          {row.category_tag}
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[160px]">
                      {speakers.length > 0 ? (
                        <span className="line-clamp-2">{speakers.map(s => s.name).join(", ")}</span>
                      ) : <span className="text-gray-300">—</span>}
                      {moderator && <p className="text-[10px] text-gray-400 mt-0.5">Mod: {moderator.name}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/cms/schedule/${row.id}/edit`}
                          className="text-[10px] uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(row.id)}
                          disabled={deleting === row.id}
                          className="text-[10px] uppercase tracking-wider text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
                        >
                          {deleting === row.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-3 text-[11px] text-gray-400">{filtered.length} of {rows.length} events</p>
    </div>
  );
}
