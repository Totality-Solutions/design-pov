"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cdn } from "@/lib/cdn";
import { useToast } from "./ToastProvider";
import { uploadViaApi } from "@/lib/cmsUpload";
import { UploadProgressPanel, toEntries, type UploadEntry } from "./UploadProgress";

type CollaborateImageRow = {
  id: string;
  image: string;
  alt: string;
  sort_order: number;
  active: boolean;
  created_at: string;
};

const ACCEPTED = "image/jpeg,image/jpg,image/png,image/webp";

export default function CollaborateImagesTable({ initialData }: { initialData: CollaborateImageRow[] }) {
  const { showSuccess, showError } = useToast();
  const [rows, setRows]         = useState<CollaborateImageRow[]>(initialData);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [entries, setEntries] = useState<UploadEntry[]>([]);
  const uploading = entries.some((e) => e.status === "waiting" || e.status === "uploading");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setRows(initialData); }, [initialData]);

  // Uploads each file to S3, then creates all rows in one request, appended
  // after the current last image. Files that fail to upload are skipped.
  const patchEntry = (i: number, patch: Partial<UploadEntry>) =>
    setEntries((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));

  async function handleBulkUpload(files: File[]) {
    if (files.length === 0) return;
    const folder = `temp/collaborate/${new Date().getFullYear()}`;
    const uploaded: { index: number; url: string }[] = [];

    setEntries(toEntries(files));
    for (let i = 0; i < files.length; i++) {
      patchEntry(i, { status: "uploading" });
      try {
        const url = await uploadViaApi(files[i], folder, { onProgress: (progress) => patchEntry(i, { progress }) });
        uploaded.push({ index: i, url });
        // Not "done" until the row is saved below.
        patchEntry(i, { progress: 1 });
      } catch (err: any) {
        patchEntry(i, { status: "error", error: err.message });
      }
    }

    if (uploaded.length > 0) {
      const startOrder = rows.reduce((max, r) => Math.max(max, r.sort_order ?? 0), 0) + 1;
      const res = await fetch("/api/cms/collaborate-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(uploaded.map(({ url }, i) => ({ image: url, alt: "", sort_order: startOrder + i }))),
      });
      if (res.ok) {
        const { data } = await res.json();
        setRows((prev) => [...prev, ...data]);
        uploaded.forEach(({ index }) => patchEntry(index, { status: "done" }));
        showSuccess(`${uploaded.length} image${uploaded.length === 1 ? "" : "s"} added to the Collaborate page.`);
      } else {
        const json = await res.json().catch(() => ({}));
        uploaded.forEach(({ index }) =>
          patchEntry(index, { status: "error", error: `Uploaded, but couldn't be added to the list: ${json.error || res.status}` })
        );
      }
    }

    const failed = files.length - uploaded.length;
    if (failed > 0) showError(`${failed} image${failed === 1 ? "" : "s"} failed to upload. See the list for details.`);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/cms/collaborate-images/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== id));
      showSuccess("Image deleted.");
    } else {
      showError("Couldn't delete this image. Please try again.");
    }
  }

  async function toggleActive(row: CollaborateImageRow) {
    setToggling(row.id);
    const res = await fetch(`/api/cms/collaborate-images/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !row.active }),
    });
    setToggling(null);
    if (res.ok) {
      setRows((prev) => prev.map((r) => r.id === row.id ? { ...r, active: !r.active } : r));
      showSuccess(!row.active ? "Image shown on site." : "Image hidden from site.");
    } else {
      showError("Couldn't update this image. Please try again.");
    }
  }

  const active = rows.filter((r) => r.active).length;
  const hidden = rows.filter((r) => !r.active).length;

  return (
    <div>
      {/* Stats + bulk upload */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div className="flex gap-6">
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

        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="border border-black/20 bg-white px-5 py-2.5 text-[11px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Multiple"}
          </button>
          <p className="text-[11px] text-gray-400">JPG, PNG or WEBP · added to the end of the list</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED}
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              handleBulkUpload(files);
            }}
          />
        </div>
      </div>

      <div className="mb-6 -mt-3">
        <UploadProgressPanel entries={entries} onDismiss={() => setEntries([])} nextStep={null} />
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-[#fafafa]">
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-32">Image</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal">Description</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Order</th>
              <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-400 font-normal w-20">Status</th>
              <th className="px-5 py-3 w-28" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">
                  No images yet. Click &quot;Upload Multiple&quot; or &quot;+ New Image&quot; to add some.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50/60 transition-colors">
                {/* Thumbnail */}
                <td className="px-5 py-3">
                  <div className="relative w-24 h-14 bg-gray-100 overflow-hidden">
                    {row.image ? (
                      <Image src={cdn(row.image)} alt={row.alt} fill className="object-cover" sizes="96px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>
                    )}
                  </div>
                </td>

                {/* Description */}
                <td className="px-5 py-3 text-gray-500">{row.alt || "—"}</td>

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
                      href={`/cms/collaborate/${row.id}/edit`}
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
