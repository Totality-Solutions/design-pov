"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pin } from "lucide-react";
import { useToast } from "./ToastProvider";

type GalleryRow = {
  id: string;
  title: string;
  image_src: string;
  category: string;
  year: number;
  sort_order: number;
  active: boolean;
  pinned_at: string | null;
  like_count: number | null;
  created_at: string;
};

export default function GalleryTable({ initialData }: { initialData: GalleryRow[] }) {
  const { showSuccess, showError } = useToast();
  const [rows, setRows] = useState<GalleryRow[]>(initialData);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [pinning, setPinning] = useState<string | null>(null);

  useEffect(() => setRows(initialData), [initialData]);

  const years = useMemo(
    () => Array.from(new Set(rows.map((r) => r.year))).sort((a, b) => b - a),
    [rows]
  );
  const categories = useMemo(
    () => Array.from(new Set(rows.map((r) => r.category))).sort(),
    [rows]
  );

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || r.title?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q);
    const matchesYear = yearFilter === "all" || String(r.year) === yearFilter;
    const matchesCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchesSearch && matchesYear && matchesCategory;
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/gallery/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== id));
      showSuccess("Image deleted.");
    } else {
      showError("Couldn't delete this image. Please try again.");
    }
  }

  async function toggleActive(row: GalleryRow) {
    setToggling(row.id);
    const res = await fetch(`/api/cms/gallery/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    setToggling(null);
    if (res.ok) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, active: !r.active } : r)));
      showSuccess(!row.active ? "Image shown on site." : "Image hidden from site.");
    } else {
      showError("Couldn't update this image. Please try again.");
    }
  }

  async function togglePinned(row: GalleryRow) {
    const pinned_at = row.pinned_at ? null : new Date().toISOString();
    setPinning(row.id);
    const res = await fetch(`/api/cms/gallery/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned_at }),
    });
    setPinning(null);
    if (res.ok) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, pinned_at } : r)));
      showSuccess(pinned_at ? "Image pinned to top of gallery." : "Image unpinned.");
    } else {
      showError("Couldn't update this image. Please try again.");
    }
  }

  const active = rows.filter((r) => r.active).length;
  const pinned = rows.filter((r) => r.pinned_at).length;

  return (
    <div>
      {/* Stats */}
      <div className="flex gap-6 mb-6">
        {[
          { label: "Total", value: rows.length },
          { label: "Active", value: active },
          { label: "Pinned", value: pinned },
          { label: "Likes", value: rows.reduce((sum, r) => sum + (r.like_count ?? 0), 0) },
          { label: "Years", value: years.length },
          { label: "Categories", value: categories.length },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-black/10 px-5 py-3 min-w-[90px]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">{s.label}</p>
            <p className="text-xl font-semibold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-3 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or category..."
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white w-64 transition-colors"
        />
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white transition-colors"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white transition-colors"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-28">Image</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Title</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Category</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Year</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Likes</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Status</th>
              <th className="px-5 py-3 w-28" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-gray-400">
                  {search || yearFilter !== "all" || categoryFilter !== "all"
                    ? "No images match your filters."
                    : "No images yet."}
                </td>
              </tr>
            )}
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <button
                        onClick={() => togglePinned(row)}
                        disabled={pinning === row.id}
                        aria-label={row.pinned_at ? "Unpin image" : "Pin image"}
                        className={`w-7 h-7 flex items-center justify-center border transition-colors cursor-pointer disabled:opacity-40 ${
                          row.pinned_at
                            ? "bg-black text-white border-black"
                            : "border-black/15 text-gray-300 hover:border-black hover:text-black"
                        }`}
                      >
                        <Pin className={`w-3.5 h-3.5 ${row.pinned_at ? "fill-current" : ""}`} strokeWidth={2} />
                      </button>
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-0 mb-2 z-20 whitespace-nowrap bg-black text-white text-[11px] px-2.5 py-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150"
                      >
                        {row.pinned_at
                          ? "Pinned to top of gallery (All tab) — click to unpin"
                          : "Pin to top of gallery (All tab)"}
                      </span>
                    </div>
                    <div className="relative w-12 h-10 bg-gray-100 overflow-hidden">
                      {row.image_src ? (
                        <Image src={row.image_src} alt={row.title} fill className="object-cover" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="font-medium text-black">{row.title}</p>
                </td>
                <td className="px-5 py-3 text-gray-500">{row.category}</td>
                <td className="px-5 py-3 text-gray-500 tabular-nums">{row.year}</td>
                <td className="px-5 py-3 text-gray-500 tabular-nums">{row.like_count ?? 0}</td>
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
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      href={`/cms/gallery/${row.id}/edit`}
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
