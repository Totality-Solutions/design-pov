"use client";

import { useState } from "react";

type Department = "all" | "marketing" | "sales" | "core" | "rsvp";

type Mail = {
  id: string;
  department: string;
  form_type: string;
  category: string;
  subject: string;
  from_name: string;
  from_email: string;
  from_phone: string;
  message: string;
  extra_data: Record<string, any>;
  is_read: boolean;
  created_at: string;
};

const DEPT_COLORS: Record<string, string> = {
  marketing: "bg-blue-50 text-blue-600 border-blue-200",
  sales:     "bg-purple-50 text-purple-600 border-purple-200",
  core:      "bg-green-50 text-green-600 border-green-200",
  rsvp:      "bg-orange-50 text-orange-600 border-orange-200",
};

export default function PovMailInbox({ initialMails }: { initialMails: Mail[] }) {
  const [mails, setMails]             = useState<Mail[]>(initialMails);
  const [activeTab, setActiveTab]     = useState<Department>("all");
  const [search, setSearch]           = useState("");
  const [activeId, setActiveId]       = useState<string | null>(null);
  const [showForward, setShowForward] = useState<Mail | null>(null);
  const [showCreate, setShowCreate]   = useState(false);
  const [deleting, setDeleting]       = useState<string | null>(null);

  // ── Derived ─────────────────────────────────────────────
  const counts = mails.reduce<Record<string, number>>((acc, m) => {
    acc[m.department] = (acc[m.department] || 0) + 1;
    acc.all = (acc.all || 0) + 1;
    return acc;
  }, {});

  const unread = mails.reduce<Record<string, number>>((acc, m) => {
    if (!m.is_read) {
      acc[m.department] = (acc[m.department] || 0) + 1;
      acc.all = (acc.all || 0) + 1;
    }
    return acc;
  }, {});

  const filtered = mails.filter((m) => {
    const matchDept = activeTab === "all" || m.department === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q || m.from_name?.toLowerCase().includes(q) || m.from_email?.toLowerCase().includes(q) || m.subject?.toLowerCase().includes(q) || m.category?.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  const activeMail = mails.find((m) => m.id === activeId) ?? null;

  // ── Actions ──────────────────────────────────────────────
  async function markRead(id: string, is_read: boolean) {
    await fetch("/api/cms/pov-mail", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_read }) });
    setMails((prev) => prev.map((m) => m.id === id ? { ...m, is_read } : m));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this mail entry?")) return;
    setDeleting(id);
    const res = await fetch("/api/cms/pov-mail", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setDeleting(null);
    if (res.ok) {
      setMails((prev) => prev.filter((m) => m.id !== id));
      if (activeId === id) setActiveId(null);
    }
  }

  function openMail(mail: Mail) {
    setActiveId(mail.id);
    if (!mail.is_read) markRead(mail.id, true);
  }

  function copyToClipboard(mail: Mail) {
    const lines = [
      `Subject: ${mail.subject || "—"}`,
      `Department: ${mail.department}`,
      `From: ${mail.from_name || "—"} <${mail.from_email || "—"}>`,
      `Phone: ${mail.from_phone || "—"}`,
      `Category: ${mail.category || "—"}`,
      `Date: ${new Date(mail.created_at).toLocaleString("en-IN")}`,
      mail.message ? `\nMessage:\n${mail.message}` : "",
      ...Object.entries(mail.extra_data || {}).map(([k, v]) => `${k}: ${v}`),
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines);
  }

  const TABS: { key: Department; label: string }[] = [
    { key: "all",       label: "All" },
    { key: "marketing", label: "Marketing" },
    { key: "sales",     label: "Sales" },
    { key: "core",      label: "Core" },
    { key: "rsvp",      label: "RSVP" },
  ];

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* ── Left: Department tabs ── */}
      <div className="w-44 shrink-0 flex flex-col gap-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center justify-between px-4 py-2.5 text-[11px] uppercase tracking-widest transition-colors text-left ${
              activeTab === key ? "bg-black text-white" : "text-gray-600 hover:bg-white hover:text-black"
            }`}
          >
            <span>{label}</span>
            <span className="flex items-center gap-1">
              {unread[key] ? <span className="bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{unread[key]}</span> : null}
              <span className="opacity-50 text-[10px]">{counts[key] || 0}</span>
            </span>
          </button>
        ))}
        <div className="mt-auto pt-4">
          <button onClick={() => setShowCreate(true)} className="w-full bg-black text-white px-3 py-2 text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-colors">
            + New Entry
          </button>
        </div>
      </div>

      {/* ── Center: Mail list ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-black/10">
        {/* Search bar */}
        <div className="border-b border-black/10 px-4 py-3">
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none text-black placeholder:text-gray-400"
          />
        </div>

        {/* Mail list */}
        <div className="flex-1 overflow-y-auto divide-y divide-black/5">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-sm text-gray-400">No mails found.</div>
          ) : filtered.map((mail) => (
            <div
              key={mail.id}
              onClick={() => openMail(mail)}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeId === mail.id ? "bg-gray-50 border-l-2 border-black" : ""} ${!mail.is_read ? "bg-blue-50/40" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {!mail.is_read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />}
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${!mail.is_read ? "font-semibold text-black" : "text-gray-800"}`}>
                      {mail.from_name || mail.from_email || "Unknown"}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">{mail.subject || mail.category || "—"}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[9px] uppercase tracking-wider border px-1.5 py-0.5 ${DEPT_COLORS[mail.department] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
                    {mail.department}
                  </span>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    {new Date(mail.created_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-black/5 text-[10px] text-gray-400">
          {filtered.length} of {mails.length} mails
        </div>
      </div>

      {/* ── Right: Detail panel ── */}
      <div className="w-[380px] shrink-0 flex flex-col bg-white border border-black/10 overflow-y-auto">
        {!activeMail ? (
          <div className="flex items-center justify-center flex-1 text-sm text-gray-400">Select a mail to view</div>
        ) : (
          <div className="p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`text-[9px] uppercase tracking-wider border px-2 py-0.5 ${DEPT_COLORS[activeMail.department] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  {activeMail.department}
                </span>
                <h2 className="text-base font-semibold mt-2">{activeMail.subject || activeMail.category || "No Subject"}</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">{new Date(activeMail.created_at).toLocaleString("en-IN")}</p>
              </div>
            </div>

            {/* Sender info */}
            <div className="border border-black/10 divide-y divide-black/5">
              {[
                ["From",     activeMail.from_name],
                ["Email",    activeMail.from_email],
                ["Phone",    activeMail.from_phone],
                ["Category", activeMail.category],
                ["Type",     activeMail.form_type],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="flex px-3 py-2">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 w-20 shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm text-black">{value}</span>
                </div>
              ))}
            </div>

            {/* Message */}
            {activeMail.message && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Message</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{activeMail.message}</p>
              </div>
            )}

            {/* Extra data */}
            {Object.keys(activeMail.extra_data || {}).length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Additional Details</p>
                <div className="border border-black/10 divide-y divide-black/5">
                  {Object.entries(activeMail.extra_data).filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="flex px-3 py-2">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 w-24 shrink-0 pt-0.5">{k}</span>
                      <span className="text-sm text-black break-all">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10">
              <button onClick={() => setShowForward(activeMail)} className="px-4 py-2 text-[10px] uppercase tracking-widest bg-black text-white hover:bg-neutral-800 transition-colors">
                Forward
              </button>
              <button onClick={() => copyToClipboard(activeMail)} className="px-4 py-2 text-[10px] uppercase tracking-widest border border-black/20 hover:border-black transition-colors">
                Copy
              </button>
              <button
                onClick={() => markRead(activeMail.id, !activeMail.is_read)}
                className="px-4 py-2 text-[10px] uppercase tracking-widest border border-black/20 hover:border-black transition-colors"
              >
                {activeMail.is_read ? "Mark Unread" : "Mark Read"}
              </button>
              <button
                onClick={() => handleDelete(activeMail.id)}
                disabled={deleting === activeMail.id}
                className="px-4 py-2 text-[10px] uppercase tracking-widest text-red-500 border border-red-200 hover:bg-red-50 disabled:opacity-40 transition-colors"
              >
                {deleting === activeMail.id ? "..." : "Delete"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Forward Modal ── */}
      {showForward && <ForwardModal mail={showForward} onClose={() => setShowForward(null)} />}

      {/* ── Create Modal ── */}
      {showCreate && <CreateMailModal onClose={() => setShowCreate(false)} onCreate={(m) => { setMails((prev) => [m, ...prev]); setShowCreate(false); }} />}
    </div>
  );
}

function ForwardModal({ mail, onClose }: { mail: Mail; onClose: () => void }) {
  const [to, setTo]         = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent]      = useState(false);
  const [error, setError]    = useState("");

  async function send() {
    if (!to) return;
    setSending(true);
    setError("");
    const res = await fetch("/api/cms/pov-mail/forward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, mail }),
    });
    setSending(false);
    if (res.ok) { setSent(true); setTimeout(onClose, 1500); }
    else { const j = await res.json(); setError(j.error || "Failed to send"); }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 shadow-xl">
        <h2 className="text-sm font-semibold mb-1">Forward Mail</h2>
        <p className="text-[11px] text-gray-400 mb-5">{mail.subject || mail.category}</p>
        {sent ? (
          <p className="text-green-600 text-sm">Sent successfully!</p>
        ) : (
          <>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1.5">To Email *</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              autoFocus
              className="border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black w-full mb-4"
              placeholder="recipient@example.com"
            />
            {error && <p className="text-red-600 text-xs mb-3">{error}</p>}
            <div className="flex gap-3">
              <button onClick={send} disabled={sending || !to} className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-colors">
                {sending ? "Sending..." : "Send"}
              </button>
              <button onClick={onClose} className="border border-black/20 px-6 py-2.5 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black transition-colors">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CreateMailModal({ onClose, onCreate }: { onClose: () => void; onCreate: (m: Mail) => void }) {
  const [form, setForm] = useState({ department: "marketing", category: "", subject: "", from_name: "", from_email: "", from_phone: "", message: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/cms/pov-mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { const { data } = await res.json(); onCreate(data); }
    else { const j = await res.json(); setError(j.error || "Failed"); }
  }

  const inp = "border border-black/20 px-3 py-2 text-sm outline-none focus:border-black w-full bg-white";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-sm font-semibold mb-5">New Manual Entry</h2>
        <form onSubmit={submit} className="space-y-4">
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Department *</label>
              <select value={form.department} onChange={(e) => set("department", e.target.value)} className={inp}>
                {["marketing", "sales", "core", "rsvp"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Category</label>
              <input value={form.category} onChange={(e) => set("category", e.target.value)} className={inp} placeholder="e.g. Phone call" />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Subject</label>
            <input value={form.subject} onChange={(e) => set("subject", e.target.value)} className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Name</label>
              <input value={form.from_name} onChange={(e) => set("from_name", e.target.value)} className={inp} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Email *</label>
              <input required type="email" value={form.from_email} onChange={(e) => set("from_email", e.target.value)} className={inp} />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Phone</label>
            <input value={form.from_phone} onChange={(e) => set("from_phone", e.target.value)} className={inp} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Notes / Message</label>
            <textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows={3} className={inp + " resize-y"} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-colors">
              {saving ? "Saving..." : "Create"}
            </button>
            <button type="button" onClick={onClose} className="border border-black/20 px-6 py-2.5 text-[11px] uppercase tracking-widest text-gray-500 hover:border-black transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
