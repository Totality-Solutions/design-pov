"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { normalizeBrandPartner } from "@/lib/brandPartners";
import type { BrandPartnerRow } from "@/types";

const TYPE_LABELS: Record<string, string> = {
  sponsor:                   "Sponsor",
  brand:                     "Brand",
  brand_collaborator:        "Brand Collaborator",
  build_partner:             "Build Partner",
  gifting_partner:           "Gifting Partner",
  media_partner:             "Media Partner",
  digital_media_partner:     "Digital Media Partner",
  ticketing_partner:         "Ticketing Partner",
  sensory_collaborator:      "Sensory Collaborator",
  key_execution_partner:     "Key Execution Partner",
  operation_partner:         "OPERATIONS PARTNER",
  curatorial_partner:        "Curatorial Partner",
  experience_partner:        "Experience Partner",
  learning_partner:          "Learning Partner",
  knowledge_partner:         "Knowledge Partner",
  visual_experience_partner: "Visual Experience Partner",
  workshop_partner:          "Workshop Partner",
  community_partner:         "Community Partner",
  red_room_partner:          "Red Room Partner",
};

export default function BrandPartnersTable({ initialData }: { initialData: BrandPartnerRow[] }) {
  const [rows, setRows]         = useState<BrandPartnerRow[]>(initialData);
  const [search, setSearch]     = useState("");
  const [typeFilter, setType]   = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => { setRows(initialData); }, [initialData]);

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name?.toLowerCase().includes(q);
    const matchType   = typeFilter === "all" || r.type === typeFilter;
    return matchSearch && matchType;
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this partner? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/brand-partners/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function toggleActive(row: BrandPartnerRow) {
    setToggling(row.id);
    const res = await fetch(`/api/cms/brand-partners/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    setToggling(null);
    if (res.ok) setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, active: !r.active } : r));
  }

  const active = rows.filter((r) => r.active).length;
  const hidden = rows.filter((r) => !r.active).length;

  const uniqueTypes = Array.from(new Set(rows.map((r) => r.type))).sort();

  return (
    <div>
      {/* Stats */}
      <div className="flex gap-6 mb-6">
        {[
          { label: "Total",  value: rows.length },
          { label: "Active", value: active },
          { label: "Hidden", value: hidden },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-black/10 px-5 py-3 min-w-[90px]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">{s.label}</p>
            <p className="text-xl font-semibold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white w-56 transition-colors"
        />
        <select
          value={typeFilter}
          onChange={(e) => setType(e.target.value)}
          className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white transition-colors"
        >
          <option value="all">All Types</option>
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>{TYPE_LABELS[t] ?? t}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-black/10 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-16">Logo</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Name</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Type</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-28">Tier</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Order</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-24">Status</th>
              <th className="px-5 py-3 w-28" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-gray-400">
                  {search || typeFilter !== "all" ? "No partners match your filters." : 'No partners yet. Click "+ New Partner" to add one.'}
                </td>
              </tr>
            )}
            {filtered.map((row) => {
              const cdnLogo = row.logo ? normalizeBrandPartner(row).logo : "";
              return (
                <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                  {/* Logo */}
                  <td className="px-5 py-3">
                    <div className="relative w-14 h-10 bg-gray-50 overflow-hidden flex items-center justify-center">
                      {cdnLogo ? (
                        <Image src={cdnLogo} alt={row.name} fill className="object-contain p-1" sizes="56px" unoptimized />
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-5 py-3">
                    <p className="font-medium text-black">{row.name}</p>
                    {row.website && (
                      <a href={row.website} target="_blank" className="text-[10px] text-blue-500 hover:underline truncate block max-w-[200px]">
                        {row.website}
                      </a>
                    )}
                  </td>

                  {/* Type */}
                  <td className="px-5 py-3">
                    <span className="text-[10px] uppercase tracking-widest border border-black/15 px-2 py-0.5 text-gray-600">
                      {TYPE_LABELS[row.type] ?? row.type}
                    </span>
                  </td>

                  {/* Tier */}
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.tier || "—"}</td>

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
                        href={`/cms/brand-partners/${row.id}/edit`}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
