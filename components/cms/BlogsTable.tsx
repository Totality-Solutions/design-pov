"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: string;
  is_featured: boolean;
  created_at: string;
};

export default function BlogsTable({ initialData }: { initialData: Blog[] }) {
  const [rows, setRows]       = useState<Blog[]>(initialData);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch]   = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => { setRows(initialData); }, [initialData]);

  const categories = ["all", ...Array.from(new Set(initialData.map((r) => r.category).filter(Boolean))).sort()];

  const filtered = rows.filter((r) => {
    const matchStatus   = statusFilter === "all"   || r.status === statusFilter;
    const matchCategory = categoryFilter === "all" || r.category === categoryFilter;
    const q = search.toLowerCase();
    const matchSearch   = !q || r.title?.toLowerCase().includes(q) || r.author?.toLowerCase().includes(q) || r.slug?.toLowerCase().includes(q);
    return matchStatus && matchCategory && matchSearch;
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/blogs/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function toggleStatus(row: Blog) {
    const next = row.status === "published" ? "draft" : "published";
    setToggling(row.id);
    const res = await fetch(`/api/cms/blogs/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setToggling(null);
    if (res.ok) setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, status: next } : r));
  }

  const published = rows.filter((r) => r.status === "published").length;
  const drafts    = rows.filter((r) => r.status === "draft").length;

  return (
    <div>
      {/* Stats strip */}
      <div className="flex gap-6 mb-6">
        {[
          { label: "Total",     value: rows.length },
          { label: "Published", value: published },
          { label: "Drafts",    value: drafts },
          { label: "Featured",  value: rows.filter((r) => r.is_featured).length },
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
          placeholder="Search title, author, slug..."
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No blog posts found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-gray-50/50">
                {["Date", "Title", "Category", "Author", "Status", "Featured", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                  {/* Date */}
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                    {new Date(row.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>

                  {/* Title + slug */}
                  <td className="px-4 py-3 max-w-[260px]">
                    <p className="font-medium text-black line-clamp-1">{row.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">/{row.slug}</p>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="bg-black/5 px-2 py-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">
                      {row.category || "—"}
                    </span>
                  </td>

                  {/* Author */}
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{row.author || "—"}</td>

                  {/* Status toggle */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(row)}
                      disabled={toggling === row.id}
                      title="Click to toggle"
                      className={`px-3 py-1 text-[9px] uppercase tracking-widest border transition-colors disabled:opacity-40 ${
                        row.status === "published"
                          ? "bg-black text-white border-black hover:bg-neutral-700"
                          : "border-black/20 text-gray-500 hover:border-black hover:text-black"
                      }`}
                    >
                      {toggling === row.id ? "..." : row.status || "draft"}
                    </button>
                  </td>

                  {/* Featured */}
                  <td className="px-4 py-3 text-center text-sm">
                    {row.is_featured ? <span className="text-yellow-500">★</span> : <span className="text-gray-200">★</span>}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/cms/blogs/${row.id}/edit`}
                        className="text-[10px] uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/magazine/${row.slug}`}
                        target="_blank"
                        className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-black transition-colors whitespace-nowrap"
                      >
                        View ↗
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-3 text-[11px] text-gray-400">{filtered.length} of {rows.length} posts</p>
    </div>
  );
}
