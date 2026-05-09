export type Department = "marketing" | "sales" | "core" | "rsvp";

const SALES_KEYS = ["sponsor", "exhibit", "brand", "brands", "partner", "partnership", "media enquiry"];
const CORE_KEYS  = ["speak", "curate", "elevate", "core", "core participation", "speaker", "curator"];
const RSVP_KEYS  = ["rsvp", "circle", "schedule", "circle participation"];

export function getDepartment(type = "", category = ""): Department {
  const t = type.toLowerCase();
  const c = category.toLowerCase();
  if (CORE_KEYS.some((k) => t.includes(k) || c.includes(k)))  return "core";
  if (SALES_KEYS.some((k) => t.includes(k) || c.includes(k))) return "sales";
  if (RSVP_KEYS.some((k) => t.includes(k) || c.includes(k)))  return "rsvp";
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
