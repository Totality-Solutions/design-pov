"use client";

// Visible upload status for the CMS: a per-file list for bulk uploads and a
// one-line bar for single fields. Stays on screen until dismissed, so a
// failure can't be missed the way a toast can.

export type UploadStatus = "waiting" | "uploading" | "done" | "error";

export type UploadEntry = {
  name: string;
  size: number;
  status: UploadStatus;
  progress: number; // 0–1
  error?: string;
};

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

function Spinner() {
  return <span className="inline-block w-3.5 h-3.5 border-2 border-black/15 border-t-black rounded-full animate-spin shrink-0" />;
}

function StatusIcon({ status }: { status: UploadStatus }) {
  if (status === "uploading") return <Spinner />;
  if (status === "done") return <span className="w-3.5 text-center text-green-600 text-sm leading-none shrink-0">✓</span>;
  if (status === "error") return <span className="w-3.5 text-center text-red-500 text-sm leading-none shrink-0">✕</span>;
  return <span className="w-3.5 h-3.5 rounded-full border-2 border-black/10 shrink-0" />;
}

function Bar({ progress, status }: { progress: number; status: UploadStatus }) {
  const color = status === "error" ? "bg-red-400" : status === "done" ? "bg-green-500" : "bg-black";
  return (
    <div className="h-1 w-full bg-black/5 overflow-hidden">
      <div className={`h-full ${color} transition-[width] duration-200`} style={{ width: `${Math.round(progress * 100)}%` }} />
    </div>
  );
}

/** Per-file list for bulk uploads. */
export function UploadProgressPanel({
  entries,
  onDismiss,
  nextStep = "click Save Section to publish",
}: {
  entries: UploadEntry[];
  onDismiss: () => void;
  /** What the user should do once files are uploaded; null when nothing is needed. */
  nextStep?: string | null;
}) {
  if (entries.length === 0) return null;

  const done = entries.filter((e) => e.status === "done").length;
  const failed = entries.filter((e) => e.status === "error").length;
  const finished = done + failed === entries.length;
  const current = entries.findIndex((e) => e.status === "uploading");

  const headline = !finished
    ? `Uploading ${current + 1} of ${entries.length}... please keep this page open`
    : failed === 0
      ? `All ${done} file${done === 1 ? "" : "s"} uploaded${nextStep ? ` — ${nextStep}` : ""}`
      : done === 0
        ? `Upload failed for ${failed === 1 ? "the file" : `all ${failed} files`}`
        : `${done} uploaded, ${failed} failed${nextStep ? ` — ${nextStep}` : ""}`;

  const tone = !finished
    ? "border-black/20 bg-white"
    : failed === 0
      ? "border-green-200 bg-green-50"
      : "border-red-200 bg-red-50";

  return (
    <div className={`border ${tone} mt-3`} role="status" aria-live="polite">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-black/5">
        <p className="text-[12px] font-medium text-black flex items-center gap-2">
          {!finished && <Spinner />}
          {headline}
        </p>
        {finished && (
          <button type="button" onClick={onDismiss} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black">
            Dismiss
          </button>
        )}
      </div>
      <ul className="max-h-64 overflow-y-auto divide-y divide-black/5">
        {entries.map((e, i) => (
          <li key={i} className="px-4 py-2 space-y-1.5">
            <div className="flex items-center gap-3 text-[12px]">
              <StatusIcon status={e.status} />
              <span className="flex-1 truncate text-black">{e.name}</span>
              <span className="text-gray-400 tabular-nums shrink-0">
                {e.status === "uploading" ? `${Math.round(e.progress * 100)}% · ` : ""}
                {formatSize(e.size)}
              </span>
            </div>
            {(e.status === "uploading" || e.status === "done") && <Bar progress={e.progress} status={e.status} />}
            {e.status === "error" && <p className="text-[11px] text-red-600 pl-6.5">{e.error}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One-line status for single-file fields. */
export function SingleUploadStatus({ entry, onDismiss }: { entry: UploadEntry | null; onDismiss: () => void }) {
  if (!entry) return null;
  return (
    <div className="mt-1.5 space-y-1" role="status" aria-live="polite">
      <div className="flex items-center gap-2 text-[12px]">
        <StatusIcon status={entry.status} />
        <span className={`flex-1 truncate ${entry.status === "error" ? "text-red-600" : "text-gray-600"}`}>
          {entry.status === "uploading" && `Uploading ${entry.name} — ${Math.round(entry.progress * 100)}% of ${formatSize(entry.size)}`}
          {entry.status === "done" && `Uploaded ${entry.name}`}
          {entry.status === "error" && (entry.error || `Couldn't upload ${entry.name}`)}
        </span>
        {entry.status !== "uploading" && (
          <button type="button" onClick={onDismiss} className="text-gray-400 hover:text-black text-xs px-1" aria-label="Dismiss">
            ✕
          </button>
        )}
      </div>
      {entry.status === "uploading" && <Bar progress={entry.progress} status="uploading" />}
    </div>
  );
}

/** Helper: start tracking a list of files as "waiting". */
export function toEntries(files: File[]): UploadEntry[] {
  return files.map((f) => ({ name: f.name, size: f.size, status: "waiting", progress: 0 }));
}
