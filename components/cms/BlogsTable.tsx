"use client";

import { useState } from "react";
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
  const [rows, setRows] = useState(initialData);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = rows.filter((r) => {
    const matchStatus = filter === "all" || r.status === filter;
    const matchSearch = !search || r.title?.toLowerCase().includes(search.toLowerCase()) || r.author?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
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
    const res = await fetch(`/api/cms/blogs/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, status: next } : r));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white flex-1 min-w-[200px]"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      <div className="bg-white border border-black/10 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No blog posts found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {["Date", "Title", "Category", "Author", "Status", "Featured", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(row.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[240px]">
                    <span className="line-clamp-1">{row.title}</span>
                    <span className="text-[10px] text-gray-400">/{row.slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-black/5 px-2 py-0.5 text-[10px] uppercase tracking-wider">{row.category || "—"}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.author || "—"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(row)}
                      className={`px-3 py-1 text-[9px] uppercase tracking-widest border transition-colors ${
                        row.status === "published"
                          ? "bg-black text-white border-black"
                          : "border-black/20 text-gray-500 hover:border-black"
                      }`}
                    >
                      {row.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-gray-500">
                    {row.is_featured ? "★ Yes" : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-4">
                      <Link
                        href={`/cms/blogs/${row.id}/edit`}
                        className="text-[10px] uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(row.id)}
                        disabled={deleting === row.id}
                        className="text-[10px] uppercase tracking-wider text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
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
