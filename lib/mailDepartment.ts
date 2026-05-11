export type Department = "marketing" | "sales";

// Core, Partnership → sales
// Circle, Elevate, Brand Participations, Media Enquiry, Object, Contact → marketing (default)
const SALES_KEYS = ["core", "partner", "partnership"];

export function getDepartment(type = "", category = ""): Department {
  const t = type.toLowerCase();
  const c = category.toLowerCase();
  if (SALES_KEYS.some((k) => t.includes(k) || c.includes(k))) return "sales";
  return "marketing";
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  marketing: "Marketing",
  sales: "Sales",
};

export const DEPARTMENT_EMAILS: Record<Department, string> = {
  marketing: process.env.MAIL_MARKETING || "marketing@designpovindia.com",
  sales:     process.env.MAIL_SALES     || "sales@designpovindia.com",
};
