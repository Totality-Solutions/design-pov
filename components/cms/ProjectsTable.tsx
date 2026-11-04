"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cdn } from "@/lib/cdn";
import { useToast } from "./ToastProvider";

type ProjectRow = {
  id: string;
  title: string;
  architects: string | null;
  slug: string;
  category: string | null;
  city: string | null;
  country: string | null;
  status: string;
  cover_image: string | null;
  gallery: { src: string }[] | null;
  published_on: string | null;
};

export default function ProjectsTable({ initialData }: { initialData: ProjectRow[] }) {
  const { showSuccess, showError } = useToast();
  const [rows, setRows] = useState(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => setRows(initialData), [initialData]);

  const q = search.toLowerCase();
  const filtered = rows.filter(
    (r) =>
      (statusFilter === "all" || r.status === statusFilter) &&
      (!q || [r.title, r.architects, r.city, r.country, r.category].some((v) => v?.toLowerCase().includes(q)))
  );

  async function toggleStatus(row: ProjectRow) {
    const next = row.status === "published" ? "draft" : "published";
    setBusy(row.id);
    const res = await fetch(`/api/cms/projects/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(null);
    if (res.ok) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)));
      showSuccess(next === "published" ? "Project published." : "Project moved to draft.");
    } else showError("Couldn't update this project. Please try again.");
  }

  async function handleDelete(row: ProjectRow) {
    if (!confirm(`Delete “${row.title}” and all its uploaded photos? This cannot be undone.`)) return;
    setBusy(row.id);
    const res = await fetch(`/api/cms/projects/${row.id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      showSuccess("Project deleted.");
    } else showError("Couldn't delete this project. Please try again.");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search name, architects, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white flex-1 min-w-[200px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white border border-black/10 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No projects yet. Click “+ New Project” to add one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-gray-50/50">
                {["", "Project", "Category", "Location", "Photos", "Published", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const cover = row.cover_image || row.gallery?.[0]?.src;
                return (
                  <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 w-20">
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cdn(cover)} alt="" className="w-16 h-12 object-cover border border-black/10" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100" />
                      )}
                    </td>
                    <td className="px-4 py-3 max-w-[280px]">
                      <p className="font-medium text-black line-clamp-1">{row.title}</p>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{row.architects || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{row.category || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{[row.city, row.country].filter(Boolean).join(", ") || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 tabular-nums">{row.gallery?.length ?? 0}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{row.published_on || "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStatus(row)}
                        disabled={busy === row.id}
                        title="Click to toggle"
                        className={`px-3 py-1 text-[9px] uppercase tracking-widest border transition-colors disabled:opacity-40 ${
                          row.status === "published"
                            ? "bg-black text-white border-black hover:bg-neutral-700"
                            : "border-black/20 text-gray-500 hover:border-black hover:text-black"
                        }`}
                      >
                        {busy === row.id ? "..." : row.status || "draft"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <Link href={`/cms/projects/${row.id}/edit`} className="text-[10px] uppercase tracking-wider text-blue-600 hover:text-blue-800 whitespace-nowrap">Edit</Link>
                        <Link href={`/magazine/projects/${row.slug}`} target="_blank" className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-black whitespace-nowrap">View ↗</Link>
                        <button onClick={() => handleDelete(row)} disabled={busy === row.id} className="text-[10px] uppercase tracking-wider text-red-400 hover:text-red-600 disabled:opacity-40">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-3 text-[11px] text-gray-400">{filtered.length} of {rows.length} projects</p>
    </div>
  );
}
