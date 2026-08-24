"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

type Speaker = { name: string; role: "speaker" | "moderator" };

type InitialData = {
  id?: string;
  title?: string;
  subtitle?: string | null;
  day?: number;
  start_time?: string;
  end_time?: string;
  venue?: string;
  category_tag?: string | null;
  partners?: string[] | null;
  speakers?: Speaker[] | null;
  is_invite_only?: boolean;
  invite_only_link?: string | null;
  description?: string | null;
  sort_order?: number;
};

export default function ScheduleForm({ initialData }: { initialData?: InitialData }) {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const isEdit = !!initialData?.id;

  const [title, setTitle]             = useState(initialData?.title ?? "");
  const [subtitle, setSubtitle]       = useState(initialData?.subtitle ?? "");
  const [day, setDay]                 = useState(String(initialData?.day ?? "1"));
  const [startTime, setStartTime]     = useState(initialData?.start_time ?? "");
  const [endTime, setEndTime]         = useState(initialData?.end_time ?? "");
  const [venue, setVenue]             = useState(initialData?.venue ?? "Circle");
  const [categoryTag, setCategoryTag] = useState(initialData?.category_tag ?? "");
  const [partnersRaw, setPartnersRaw] = useState((initialData?.partners ?? []).join(", "));
  const [isInviteOnly, setIsInviteOnly] = useState(initialData?.is_invite_only ?? false);
  const [inviteLink, setInviteLink]   = useState(initialData?.invite_only_link ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [sortOrder, setSortOrder]     = useState(String(initialData?.sort_order ?? "0"));
  const [speakers, setSpeakers]       = useState<Speaker[]>(
    (initialData?.speakers ?? []).map((s) => ({ name: s.name, role: (s.role ?? "speaker") as "speaker" | "moderator" }))
  );

  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  function addSpeaker() { setSpeakers((prev) => [...prev, { name: "", role: "speaker" }]); }
  function removeSpeaker(i: number) { setSpeakers((prev) => prev.filter((_, idx) => idx !== i)); }
  function updateSpeaker(i: number, field: keyof Speaker, value: string) {
    setSpeakers((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const partners = partnersRaw.split(",").map((p) => p.trim()).filter(Boolean);
    const payload = {
      title,
      subtitle: subtitle || null,
      day: parseInt(day),
      start_time: startTime,
      end_time: endTime,
      venue,
      category_tag: categoryTag || null,
      partners,
      speakers: speakers.filter((s) => s.name.trim()),
      is_invite_only: isInviteOnly,
      invite_only_link: isInviteOnly ? inviteLink || null : null,
      description: description || null,
      sort_order: parseInt(sortOrder) || 0,
    };

    try {
      const url = isEdit ? `/api/cms/schedule/${initialData!.id}` : "/api/cms/schedule";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Save failed");
        showError("Couldn't save this schedule item. Please try again.");
        setSaving(false);
        return;
      }
      showSuccess(isEdit ? "Schedule item updated." : "Schedule item created.");
      router.push("/cms/schedule");
      router.refresh();
    } catch (e: any) {
      setError(e.message || "Network error");
      showError("Couldn't save this schedule item. Please try again.");
      setSaving(false);
    }
  }

  const inputClass = "w-full border border-black/20 px-4 py-2.5 text-sm outline-none focus:border-black bg-white";
  const labelClass = "block text-[10px] uppercase tracking-widest text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Title */}
      <div>
        <label className={labelClass}>Title *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Session title" />
      </div>

      {/* Subtitle */}
      <div>
        <label className={labelClass}>Subtitle / Theme</label>
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputClass} placeholder="Optional subtitle or theme" />
      </div>

      {/* Day + Sort Order */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Day *</label>
          <select required value={day} onChange={(e) => setDay(e.target.value)} className={inputClass}>
            <option value="1">Day 01 — May 15, 2026</option>
            <option value="2">Day 02 — May 16, 2026</option>
            <option value="3">Day 03 — May 17, 2026</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Sort Order</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputClass} min="0" />
        </div>
      </div>

      {/* Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Time *</label>
          <input required value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputClass} placeholder="e.g. 12:30 PM" />
        </div>
        <div>
          <label className={labelClass}>End Time *</label>
          <input required value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputClass} placeholder="e.g. 1:30 PM" />
        </div>
      </div>

      {/* Venue */}
      <div>
        <label className={labelClass}>Venue *</label>
        <select required value={venue} onChange={(e) => setVenue(e.target.value)} className={inputClass}>
          <option value="Circle">Circle</option>
          <option value="Show floor">Show floor</option>
          <option value="Workshop Zone">Workshop Zone</option>
        </select>
      </div>

      {/* Category Tag */}
      <div>
        <label className={labelClass}>Category Tag</label>
        <input value={categoryTag} onChange={(e) => setCategoryTag(e.target.value)} className={inputClass} placeholder="e.g. Epistle, Workshop, POV Elevate" />
      </div>

      {/* Partners */}
      <div>
        <label className={labelClass}>Partners (comma-separated)</label>
        <input value={partnersRaw} onChange={(e) => setPartnersRaw(e.target.value)} className={inputClass} placeholder="e.g. Epistle, Happy Hikkups" />
      </div>

      {/* Speakers */}
      <div>
        <label className={labelClass}>Speakers</label>
        <div className="space-y-2">
          {speakers.map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={s.name}
                onChange={(e) => updateSpeaker(i, "name", e.target.value)}
                placeholder="Speaker name"
                className="flex-1 border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white"
              />
              <select
                value={s.role}
                onChange={(e) => updateSpeaker(i, "role", e.target.value)}
                className="border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white"
              >
                <option value="speaker">Speaker</option>
                <option value="moderator">Moderator</option>
              </select>
              <button
                type="button"
                onClick={() => removeSpeaker(i)}
                className="px-3 py-2 text-red-400 hover:text-red-600 text-sm border border-red-100 hover:border-red-300 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpeaker}
            className="text-[11px] uppercase tracking-widest border border-black/20 px-4 py-2 hover:bg-black hover:text-white transition-colors"
          >
            + Add Speaker
          </button>
        </div>
      </div>

      {/* Invite Only */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isInviteOnly}
            onChange={(e) => setIsInviteOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">Invite Only</span>
        </label>
        {isInviteOnly && (
          <div>
            <label className={labelClass}>Invite-Only Link</label>
            <input value={inviteLink} onChange={(e) => setInviteLink(e.target.value)} className={inputClass} placeholder="https://..." />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} placeholder="Short description of the event" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-6 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-40"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Event"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/cms/schedule")}
          className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
