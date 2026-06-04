export type Department = "marketing" | "sales" | "hr";

const SALES_KEYS = ["core", "partner", "partnership"];
// Add keywords that should route to the HR department
const HR_KEYS = ["hr", "career", "job", "resume", "hiring", "recruit"];

export function getDepartment(type = "", category = ""): Department {
  const t = type.toLowerCase();
  const c = category.toLowerCase();

  // 1. Check for Sales
  if (SALES_KEYS.some((k) => t.includes(k) || c.includes(k))) {
    return "sales";
  }
  
  // 2. Check for HR
  if (HR_KEYS.some((k) => t.includes(k) || c.includes(k))) {
    return "hr";
  }

  // 3. Default to Marketing
  return "marketing";
}

export const DEPARTMENT_LABELS: Record<Department, string> = {
  marketing: "Marketing",
  sales: "Sales",
  hr: "HR",
};

export const DEPARTMENT_EMAILS: Record<Department, string> = {
  marketing: process.env.MAIL_MARKETING || "marketing@designpovindia.com",
  sales:     process.env.MAIL_SALES     || "sales@designpovindia.com",
  hr:        process.env.MAIL_HR        || "hr@totality.solutions",
};