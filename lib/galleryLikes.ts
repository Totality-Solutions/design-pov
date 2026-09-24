import { randomUUID } from "crypto";
import type { NextRequest, NextResponse } from "next/server";

// Anonymous visitor id — stands in for a user account since the site has no
// login. Clearing cookies / incognito gets a fresh id, which is an accepted
// trade-off for gallery likes.
export const VISITOR_COOKIE = "pov_vid";
const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string | undefined): value is string {
  return !!value && UUID_RE.test(value);
}

export function getVisitorId(req: NextRequest): string | null {
  const id = req.cookies.get(VISITOR_COOKIE)?.value;
  return isUuid(id) ? id : null;
}

export function newVisitorId(): string {
  return randomUUID();
}

export function setVisitorCookie(res: NextResponse, visitorId: string) {
  res.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: VISITOR_COOKIE_MAX_AGE,
  });
}

// Best-effort per-IP rate limit. State lives in the function instance's
// memory, so it's per-instance rather than global — enough to stop a naive
// script hammering the like button, not a determined attacker.
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

export function isRateLimited(req: NextRequest): boolean {
  const ip = clientIp(req);
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || entry.resetAt <= now) {
    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 5000) {
      for (const [key, value] of hits) if (value.resetAt <= now) hits.delete(key);
    }
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}
