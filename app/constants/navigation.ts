import { cdn } from "@/lib/cdn";

// ── Types ──────────────────────────────────────────────────────────────────

type NavLink = { label: string; href: string };

/** A plain top-level link — no panel, no image. */
type SimpleNavItem = {
  type: "simple";
  label: string;
  href: string;
};

/** A top-level link that opens a submenu panel with an image + link columns. */
type SubmenuNavItem = {
  type: "submenu";
  label: string;
  href: string;
  image: string;          // required — what makes it a submenu item
  col1Title?: string;
  col1Links: NavLink[];
  col2Title?: string;
  col2Links?: NavLink[];
};

export type NavItem = SimpleNavItem | SubmenuNavItem;

// ── Data ───────────────────────────────────────────────────────────────────
// Order here drives render order in the navbar.

export const NAV_ITEMS: NavItem[] = [
  {
    type: "simple",
    label: "About",
    href: "/about",
  },
  {
    type: "submenu",
    label: "Ecosystem",
    href: "/ecosystem",
    image: cdn("/temp/home/theme/sens-sensibility.jpg"),
    col1Links: [
      { label: "Circle",  href: "/edition/schedule" },
      { label: "Elevate", href: "/ecosystem/elevate" },
      { label: "Objects", href: "/ecosystem/objects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    type: "submenu",
    label: "2026 Edition",
    href: "/edition",
    image: cdn("/qr/qr-ticket.png"),
    col1Links: [
      { label: "Theme",    href: "/edition/theme" },
      { label: "Brands",   href: "/edition/brands" },
      { label: "Core",     href: "/edition/core" },
      { label: "Schedule", href: "/edition/schedule" },
      { label: "Contact",  href: "/contact" },
    ],
  },
  {
    type: "simple",
    label: "Collaborate",
    href: "/collaborate",
  },
  {
    type: "simple",
    label: "Magazine",
    href: "/magazine",
  },
];

// ── Derived slices — no manual lists, no casts, always in sync ─────────────

/** All items that have a submenu panel. Typed as SubmenuNavItem[]. */
export const SUBMENU_NAV_ITEMS = NAV_ITEMS.filter(
  (item): item is SubmenuNavItem => item.type === "submenu"
);