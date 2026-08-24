"use client";

import { useState } from "react";
import type { BrandPartnerTypeRow } from "@/types";
import { useToast } from "./ToastProvider";

const inputCls = "border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white transition-colors";

export default function BrandPartnerTypesTable({ initialData }: { initialData: BrandPartnerTypeRow[] }) {
  const { showSuccess, showError } = useToast();
  const [rows, setRows]       = useState<BrandPartnerTypeRow[]>(initialData);
  const [editing, setEditing] = useState<Record<string, { title: string; sort_order: number }>>({});
  const [saving, setSaving]   = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newRow, setNewRow]   = useState({ type: "", title: "", sort_order: initialData.length + 1 });
  const [creating, setCreating] = useState(false);
  const [error, setError]     = useState("");

  const sorted = [...rows].sort((a, b) => a.sort_order - b.sort_order);

  function startEdit(row: BrandPartnerTypeRow) {
    setEditing((e) => ({ ...e, [row.id]: { title: row.title, sort_order: row.sort_order } }));
  }

  function cancelEdit(id: string) {
    setEditing((e) => { const n = { ...e }; delete n[id]; return n; });
  }

  async function saveEdit(id: string) {
    setSaving(id);
    const res = await fetch(`/api/cms/brand-partner-types/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing[id]),
    });
    setSaving(null);
    if (res.ok) {
      const { data } = await res.json();
      setRows((r) => r.map((row) => row.id === id ? { ...row, ...data } : row));
      cancelEdit(id);
      showSuccess("Type updated.");
    } else {
      showError("Couldn't save changes. Please try again.");
    }
  }

  async function toggleActive(row: BrandPartnerTypeRow) {
    setSaving(row.id);
    const res = await fetch(`/api/cms/brand-partner-types/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    setSaving(null);
    if (res.ok) {
      setRows((r) => r.map((r2) => r2.id === row.id ? { ...r2, active: !r2.active } : r2));
      showSuccess(!row.active ? "Type shown on site." : "Type hidden from site.");
    } else {
      showError("Couldn't update this type. Please try again.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this type? Partners assigned to it won't be deleted but their section won't appear until reassigned.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/brand-partner-types/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setRows((r) => r.filter((row) => row.id !== id));
      showSuccess("Type deleted.");
    } else {
      showError("Couldn't delete this type. Please try again.");
    }
  }

  async function handleCreate() {
    setError("");
    const typeKey = newRow.type.trim().toLowerCase().replace(/\s+/g, "_");
    if (!typeKey) { setError("Type key is required."); return; }
    if (!newRow.title.trim()) { setError("Display title is required."); return; }

    setCreating(true);
    const res = await fetch("/api/cms/brand-partner-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: typeKey, title: newRow.title.trim(), sort_order: newRow.sort_order, active: true }),
    });
    setCreating(false);

    if (res.ok) {
      const { data } = await res.json();
      setRows((r) => [...r, data]);
      setNewRow({ type: "", title: "", sort_order: rows.length + 2 });
      setShowNew(false);
      showSuccess("Type created.");
    } else {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Failed to create. Try again.");
      showError("Couldn't create this type. Please try again.");
    }
  }

  return (
    <div>
      {/* Header action */}
      <div className="mb-4">
        <button
          onClick={() => { setShowNew((v) => !v); setError(""); }}
          className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          {showNew ? "Cancel" : "+ New Type"}
        </button>
      </div>

      {/* New type inline form */}
      {showNew && (
        <div className="bg-white border border-black/10 p-5 mb-4 flex flex-wrap gap-4 items-end">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Type Key <span className="normal-case">(snake_case)</span></p>
            <input
              value={newRow.type}
              onChange={(e) => setNewRow((n) => ({ ...n, type: e.target.value }))}
              placeholder="e.g. hospitality_partner"
              className={`${inputCls} w-52`}
            />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Display Title</p>
            <input
              value={newRow.title}
              onChange={(e) => setNewRow((n) => ({ ...n, title: e.target.value }))}
              placeholder="e.g. HOSPITALITY PARTNERS"
              className={`${inputCls} w-64`}
            />
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Sort Order</p>
            <input
              type="number"
              value={newRow.sort_order}
              onChange={(e) => setNewRow((n) => ({ ...n, sort_order: Number(e.target.value) }))}
              className={`${inputCls} w-20`}
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="bg-black text-white px-5 py-2 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-40"
          >
            {creating ? "Creating..." : "Create"}
          </button>
          {error && <p className="text-red-500 text-sm w-full mt-1">{error}</p>}
        </div>
      )}

      {/* Info banner */}
      <p className="text-[11px] text-gray-400 mb-3">
        Section order on the site follows <strong>Sort Order</strong>. Lower number = appears first. Click <strong>Edit</strong> to rename a title or change its order.
      </p>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-black/10 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-12">#</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Type Key</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Display Title</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-28">Sort Order</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-24">Status</th>
              <th className="px-5 py-3 w-32" />
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                  No types yet. Click &quot;+ New Type&quot; to add one.
                </td>
              </tr>
            )}
            {sorted.map((row, i) => {
              const isEditing = !!editing[row.id];
              const draft     = editing[row.id];
              return (
                <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                  {/* Index */}
                  <td className="px-5 py-3 text-gray-300 tabular-nums text-xs">{i + 1}</td>

                  {/* Type key — immutable */}
                  <td className="px-5 py-3">
                    <code className="text-[11px] bg-gray-100 px-2 py-0.5 text-gray-600 rounded-sm">{row.type}</code>
                  </td>

                  {/* Title — editable */}
                  <td className="px-5 py-3">
                    {isEditing ? (
                      <input
                        value={draft.title}
                        onChange={(e) => setEditing((ed) => ({ ...ed, [row.id]: { ...ed[row.id], title: e.target.value } }))}
                        className={`${inputCls} w-full`}
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium text-black">{row.title}</span>
                    )}
                  </td>

                  {/* Sort order — editable */}
                  <td className="px-5 py-3">
                    {isEditing ? (
                      <input
                        type="number"
                        value={draft.sort_order}
                        onChange={(e) => setEditing((ed) => ({ ...ed, [row.id]: { ...ed[row.id], sort_order: Number(e.target.value) } }))}
                        className={`${inputCls} w-20`}
                      />
                    ) : (
                      <span className="tabular-nums text-gray-500">{row.sort_order}</span>
                    )}
                  </td>

                  {/* Active toggle */}
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleActive(row)}
                      disabled={saving === row.id}
                      className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-colors disabled:opacity-40 ${
                        row.active
                          ? "bg-black text-white border-black"
                          : "border-black/20 text-gray-400 hover:border-black hover:text-black"
                      }`}
                    >
                      {saving === row.id && !isEditing ? "..." : row.active ? "Active" : "Hidden"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => saveEdit(row.id)}
                            disabled={saving === row.id}
                            className="text-[11px] uppercase tracking-widest text-black hover:text-green-700 transition-colors disabled:opacity-40"
                          >
                            {saving === row.id ? "..." : "Save"}
                          </button>
                          <button
                            onClick={() => cancelEdit(row.id)}
                            className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(row)}
                            className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            disabled={deleting === row.id}
                            className="text-[11px] uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40"
                          >
                            {deleting === row.id ? "..." : "Delete"}
                          </button>
                        </>
                      )}
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
