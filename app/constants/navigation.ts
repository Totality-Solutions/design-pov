import { cdn } from "@/lib/cdn";

// --- Types ---
export type SubLink = {
  label: string;
  href: string;
};

export type SubmenuContent = {
  mainHref: string;
  video?: string;
  image?: string;
  filetype?: "video" | "image" | "none";
  col1Title?: string;
  col1Links?: SubLink[];
  col2Title?: string;
  col2Links?: SubLink[];
};

// --- Navigation Data ---
// OPTIMISATION: Items with no submenu content (About, Collaborate, Magazine)
// are marked filetype:"none" so the submenu panel is never triggered for them.
// Only "2026 Edition" and "Ecosystem" have submenus — matching the component logic.
export const NAV_DATA: Record<string, SubmenuContent> = {
  About: {
    mainHref: "/about",
    filetype: "none",
  },
  Ecosystem: {
    mainHref: "/ecosystem",
    // OPTIMISATION: Use a smaller/optimised image here if possible.
    // The submenu image is 60% wide on desktop — a 800px wide image is plenty.
    image: cdn("/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg"),
    filetype: "image",
    col1Links: [
      { label: "Circle",  href: "/edition/schedule" },
      { label: "Elevate", href: "/ecosystem/elevate" },
      { label: "Objects", href: "/ecosystem/objects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  "2026 Edition": {
    mainHref: "/edition",
    image: cdn("/qr/Ticket-2027.png"),
    filetype: "image",
    col1Links: [
      { label: "Theme",    href: "/edition/theme" },
      { label: "Brands",   href: "/edition/brands" },
      { label: "Core",     href: "/edition/core" },
      { label: "Schedule", href: "/edition/schedule" },
      { label: "Contact",  href: "/contact" },
    ],
  },
  Collaborate: {
    mainHref: "/collaborate",
    filetype: "none",
    col1Title: "Partnerships",
    col1Links: [
      { label: "Brands",   href: "/collaborate/brands" },
      { label: "Agencies", href: "/collaborate/agencies" },
      { label: "Creators", href: "/collaborate/creators" },
    ],
    col2Title: "Opportunities",
    col2Links: [
      { label: "Sponsorship", href: "/collaborate/sponsorship" },
      { label: "Exhibit",     href: "/collaborate/exhibit" },
      { label: "Press Kit",   href: "/collaborate/press" },
    ],
  },
  Magazine: {
    mainHref: "/magazine",
    filetype: "none",
    col1Title: "Content",
    col1Links: [
      { label: "Latest Issue", href: "/magazine/latest" },
      { label: "Interviews",   href: "/magazine/interviews" },
      { label: "Archive",      href: "/magazine/archive" },
    ],
    col2Title: "Contribute",
    col2Links: [
      { label: "Submissions", href: "/magazine/submissions" },
      { label: "Guidelines",  href: "/magazine/guidelines" },
      { label: "Work With Us", href: "/magazine/jobs" },
    ],
  },
};

// Derived list of labels in insertion order
export const NAV_LABELS = Object.keys(NAV_DATA);

// Labels that actually have a submenu panel
export const SUBMENU_LABELS = NAV_LABELS.filter(
  (label) => NAV_DATA[label].filetype !== "none"
);