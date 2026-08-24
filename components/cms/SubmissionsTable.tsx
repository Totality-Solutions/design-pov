"use client";

import { useState } from "react";

const MAILBOX_OPTIONS = [
  { value: "all", label: "All Mailboxes" },
  { value: "marketing@designpovindia.com", label: "Marketing" },
  { value: "sales@designpovindia.com", label: "Sales" },
  { value: "core@designpovindia.com", label: "Core" },
  { value: "rsvp@designpovindia.com", label: "RSVP" },
  { value: "hr@totality.solutions", label: "HR" },
];

const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "custom", label: "Custom Range" },
];

const ATTACHMENT_OPTIONS = [
  { value: "all", label: "All Submissions" },
  { value: "with", label: "With Attachment" },
  { value: "without", label: "Without Attachment" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

type Submission = {
  id: string;
  type: string;
  category: string;
  name: string;
  email: string;
  contact: string;
  file_name: string;
  to_email: string;
  created_at: string;
};

// Returns the [start, end] bounds (inclusive) for a given date range, or null for "all"
function getDateRangeBounds(range: string, customStart: string, customEnd: string): { start: Date; end: Date } | null {
  const now = new Date();

  if (range === "week") {
    const day = now.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;
    const start = new Date(now);
    start.setDate(now.getDate() - diffToMonday);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (range === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (range === "custom") {
    if (!customStart || !customEnd) return null;
    const start = new Date(customStart);
    start.setHours(0, 0, 0, 0);
    const end = new Date(customEnd);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  return null;
}

export default function SubmissionsTable({ initialData }: { initialData: Submission[] }) {
  const [rows, setRows] = useState(initialData);
  const [filter, setFilter] = useState("all");
  const [mailFilter, setMailFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [attachmentFilter, setAttachmentFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const types = ["all", ...Array.from(new Set(initialData.map((r) => r.category || r.type).filter(Boolean)))];

  const dateBounds = getDateRangeBounds(dateRange, customStart, customEnd);

  const filtered = rows
    .filter((r) => {
      const matchType = filter === "all" || (r.category || r.type) === filter;
      const matchMail = mailFilter === "all" || r.to_email === mailFilter;
      const matchSearch =
        !search ||
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.email?.toLowerCase().includes(search.toLowerCase());
      const matchAttachment =
        attachmentFilter === "all" ||
        (attachmentFilter === "with" ? !!r.file_name : !r.file_name);
      const matchDate = !dateBounds || (() => {
        const created = new Date(r.created_at);
        return created >= dateBounds.start && created <= dateBounds.end;
      })();
      return matchType && matchMail && matchSearch && matchAttachment && matchDate;
    })
    .sort((a, b) => {
      const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    setDeleting(id);

    const res = await fetch("/api/cms/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setDeleting(null);
    if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function exportCsv() {
    if (dateRange === "custom" && (!customStart || !customEnd)) {
      alert("Please pick both a start and end date for a custom export.");
      return;
    }

    const seen = new Set<string>();
    const deduped = filtered.filter((r) => {
      const key = `${r.email?.toLowerCase().trim()}|${r.contact?.trim()}|${r.category || r.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const headers = ["ID", "Type", "Category", "Name", "Email", "Phone", "To Email", "File", "Date"];
    const csvRows = [
      headers.join(","),
      ...deduped.map((r) =>
        [
          r.id,
          r.type,
          r.category,
          r.name,
          r.email,
          r.contact,
          r.to_email,
          r.file_name,
          new Date(r.created_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" }),
        ]
          .map((v) => `"${v ?? ""}"`)
          .join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const suffix = dateRange === "custom" ? `${customStart}_to_${customEnd}` : dateRange;
    a.download = `submissions-${suffix}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white flex-1 min-w-[200px]"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Types" : t}
            </option>
          ))}
        </select>

        <select
          value={mailFilter}
          onChange={(e) => setMailFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          {MAILBOX_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          value={attachmentFilter}
          onChange={(e) => setAttachmentFilter(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          {ATTACHMENT_OPTIONS.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
        >
          {DATE_RANGE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {dateRange === "custom" && (
          <>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
            />
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black bg-white"
            />
          </>
        )}

        <button
          onClick={exportCsv}
          className="border border-black px-5 py-2 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-black/10 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No submissions found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {["Date", "Category", "Name", "Email", "Phone", "To Email", "File", ""].map((h) => (
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
                <tr key={row.id} className="border-b border-black/5 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(row.created_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-black/5 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                      {row.category || row.type || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{row.email || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{row.contact || "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{row.to_email || "—"}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{row.file_name || "—"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deleting === row.id}
                      className="text-[10px] uppercase tracking-wider text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
                    >
                      {deleting === row.id ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-3 text-[11px] text-gray-400">{filtered.length} of {rows.length} submissions</p>
    </div>
  );
}
