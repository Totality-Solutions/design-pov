// Server-side spam checks for public forms that send email. Client-side
// validation alone doesn't help: bots post straight to the API route.
//
// The form sends two extra fields:
//   HONEYPOT_FIELD — a hidden input real visitors never see or fill
//   STARTED_AT_FIELD — when the form was first shown (ms since epoch)

// Not "website": the gallery form has a real field by that name.
export const HONEYPOT_FIELD = "homepage";
export const STARTED_AT_FIELD = "startedAt";

/** Faster than any person can fill in a form. */
const MIN_FILL_MS = 3_000;

/**
 * Silent bot signals: a filled honeypot, or a form submitted implausibly
 * fast. Callers should answer "success" without saving or emailing, so the
 * bot doesn't learn it was caught. Returns the reason, or null.
 */
export function detectBot(body: Record<string, unknown>): string | null {
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD] !== "") return "honeypot";
  const startedAt = Number(body[STARTED_AT_FIELD]);
  if (!Number.isFinite(startedAt) || startedAt <= 0) return "no-timestamp";
  if (Date.now() - startedAt < MIN_FILL_MS) return "too-fast";
  return null;
}

/**
 * Random-letter filler like "YRCQmCbAsWKHrJiCB": a long run of letters with
 * no spaces that flips from lower to upper case several times. Real words,
 * names and sentences almost never do (“McDonald” flips once).
 */
export function looksRandom(value: string): boolean {
  return value
    .trim()
    .split(/\s+/)
    .some((token) => token.length >= 10 && /^[A-Za-z]+$/.test(token) && (token.match(/[a-z][A-Z]/g)?.length ?? 0) >= 3);
}

// Best-effort per-IP limit. Instances are reused under Fluid Compute, so this
// catches bursts from one source; it isn't a global guarantee.
const hits = new Map<string, number[]>();

export function isRateLimited(ip: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear(); // keep memory bounded
  return recent.length > limit;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** For any user-supplied value placed into email HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
