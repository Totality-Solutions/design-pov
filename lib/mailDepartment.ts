export type Department = "marketing" | "sales" | "core" | "rsvp";

const RSVP_KEYS = ["rsvp", "ticket"];
const CORE_KEYS = ["core"];
const SALES_KEYS = ["partner", "partnership", "sponsor", "sponsorship", "brand"];

export function getDepartment(type?: string | null, category?: string | null): Department {
  const t = (type || "").toLowerCase();
  const c = (category || "").toLowerCase();

  // 1. Check for RSVP
  if (RSVP_KEYS.some((k) => t.includes(k) || c.includes(k))) {
    return "rsvp";
  }

  // 2. Check for Core
  if (CORE_KEYS.some((k) => t.includes(k) || c.includes(k))) {
    return "core";
  }

  // 3. Check for Sales
  if (SALES_KEYS.some((k) => t.includes(k) || c.includes(k))) {
    return "sales";
  }

  // 4. Default to Marketing
  return "marketing";
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  marketing: "Marketing",
  sales: "Sales",
  core: "Core",
  rsvp: "RSVP",
};

export const DEPARTMENT_EMAILS: Record<Department, string> = {
  marketing: process.env.MAIL_MARKETING || "marketing@designpovindia.com",
  sales:     process.env.MAIL_SALES     || "sales@designpovindia.com",
  core:      process.env.MAIL_CORE      || "core@designpovindia.com",
  rsvp:      process.env.MAIL_RSVP      || "rsvp@designpovindia.com",
};

export function getToEmail(type?: string | null, category?: string | null): string {
  return DEPARTMENT_EMAILS[getDepartment(type, category)];
}
