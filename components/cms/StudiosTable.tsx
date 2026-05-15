"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cdn } from "@/lib/cdn";
import type { StudioRow } from "@/types";

export default function StudiosTable({ initialData }: { initialData: StudioRow[] }) {
  const [rows, setRows]         = useState<StudioRow[]>(initialData);
  const [search, setSearch]     = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => { setRows(initialData); }, [initialData]);

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return !q || r.label.toLowerCase().includes(q) || r.architects?.some((a) => a.toLowerCase().includes(q));
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this studio? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/studios/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function toggleActive(row: StudioRow) {
    setToggling(row.id);
    const res = await fetch(`/api/cms/studios/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    setToggling(null);
    if (res.ok) setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, active: !r.active } : r));
  }

  const active = rows.filter((r) => r.active).length;

  return (
    <div>
      {/* Stats */}
      <div className="flex gap-6 mb-6">
        {[
          { label: "Total",  value: rows.length },
          { label: "Active", value: active },
          { label: "Hidden", value: rows.length - active },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-black/10 px-5 py-3 min-w-[90px]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">{s.label}</p>
            <p className="text-xl font-semibold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by studio or architect name..."
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white w-72 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-black/10 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-16">Logo</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Studio</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Architects</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Order</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-24">Status</th>
              <th className="px-5 py-3 w-28" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                  {search ? "No studios match your search." : 'No studios yet. Click "Seed Default Data" or "+ New Studio" to add one.'}
                </td>
              </tr>
            )}
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                {/* Logo */}
                <td className="px-5 py-3">
                  <div className="relative w-14 h-10 bg-gray-50 overflow-hidden flex items-center justify-center">
                    {row.logo ? (
                      <Image src={cdn(row.logo)} alt={row.label} fill className="object-contain p-1" sizes="56px" unoptimized />
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </div>
                </td>

                {/* Studio */}
                <td className="px-5 py-3">
                  <p className="font-medium text-black">{row.label}</p>
                  {row.website && (
                    <a href={row.website} target="_blank" className="text-[10px] text-blue-500 hover:underline truncate block max-w-[200px]">
                      {row.website}
                    </a>
                  )}
                </td>

                {/* Architects */}
                <td className="px-5 py-3 text-gray-500 text-xs">
                  {(row.architects ?? []).join(", ") || "—"}
                </td>

                {/* Sort order */}
                <td className="px-5 py-3 text-gray-500 tabular-nums">{row.sort_order}</td>

                {/* Active toggle */}
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleActive(row)}
                    disabled={toggling === row.id}
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-colors disabled:opacity-40 ${
                      row.active
                        ? "bg-black text-white border-black"
                        : "border-black/20 text-gray-400 hover:border-black hover:text-black"
                    }`}
                  >
                    {toggling === row.id ? "..." : row.active ? "Active" : "Hidden"}
                  </button>
                </td>

                {/* Actions */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      href={`/cms/studios/${row.id}/edit`}
                      className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deleting === row.id}
                      className="text-[11px] uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                      {deleting === row.id ? "..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
