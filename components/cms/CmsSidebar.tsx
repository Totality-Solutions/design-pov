"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown, FiRefreshCw } from "react-icons/fi";
import CmsLogout from "./CmsLogout";

type NavLink = { href: string; label: string };
type NavGroup = { label: string; links: NavLink[] };

// Top-level links first, then collapsible groups. The group holding the
// current page opens automatically.
const topLinks: NavLink[] = [{ href: "/cms/dashboard", label: "Dashboard" }];

const groups: NavGroup[] = [
  {
    label: "Pages",
    links: [
      { href: "/cms/home",        label: "Home" },
      { href: "/cms/about",       label: "About" },
      { href: "/cms/collaborate", label: "Collaborate" },
      { href: "/cms/contact",     label: "Contact" },
      { href: "/cms/faq",         label: "FAQ" },
      { href: "/cms/legal",       label: "Legal" },
    ],
  },
  {
    label: "Edition",
    links: [
      { href: "/cms/edition",     label: "Edition Page" },
      { href: "/cms/theme",       label: "Theme" },
      { href: "/cms/studios",     label: "Studios (Core)" },
      { href: "/cms/schedule",    label: "Schedule" },
      { href: "/cms/brands-page", label: "Brands Page" },
    ],
  },
  {
    label: "Ecosystem",
    links: [
      { href: "/cms/ecosystem", label: "Ecosystem Page" },
      { href: "/cms/objects",   label: "Objects" },
      { href: "/cms/elevate",   label: "Elevate" },
    ],
  },
  {
    label: "Magazine",
    links: [
      { href: "/cms/magazine", label: "Magazine Page" },
      { href: "/cms/blogs",    label: "Blogs" },
    ],
  },
  {
    label: "Media",
    links: [{ href: "/cms/gallery", label: "Gallery" }],
  },
  {
    label: "Partners",
    links: [
      { href: "/cms/brand-partners",      label: "Brand Partners" },
      { href: "/cms/brand-partner-types", label: "Partner Types" },
    ],
  },
  {
    label: "Inbox",
    links: [
      { href: "/cms/submissions", label: "Submissions" },
      { href: "/cms/pov-mail",    label: "POV Mail" },
    ],
  },
];

/** Exact match, or a child route (e.g. /cms/blogs/123/edit) — but never a sibling that only shares a prefix. */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function CmsSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  const activeGroup = groups.find((g) => g.links.some((l) => isActive(pathname, l.href)))?.label;
  const [open, setOpen] = useState<Set<string>>(() => new Set(activeGroup ? [activeGroup] : []));

  // Navigating into another group opens it (without closing the others).
  useEffect(() => {
    if (activeGroup) setOpen((prev) => (prev.has(activeGroup) ? prev : new Set(prev).add(activeGroup)));
  }, [activeGroup]);

  const toggle = (label: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  function handleRefresh() {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  }

  const linkCls = (active: boolean, nested: boolean) =>
    `flex items-center ${nested ? "pl-9 pr-6 py-2.5" : "px-6 py-3"} text-[11px] uppercase tracking-widest transition-colors ${
      active ? "bg-black text-white" : "text-gray-600 hover:text-black hover:bg-gray-50"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-black/10 flex flex-col z-10">
      <div className="shrink-0 px-6 py-7 border-b border-black/10 flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">Design POV</p>
          <p className="text-sm font-semibold mt-0.5">CMS</p>
        </div>
        <button
          onClick={handleRefresh}
          title="Refresh data"
          className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
        >
          <FiRefreshCw size={14} className={spinning ? "animate-spin" : ""} />
        </button>
      </div>

      {/* min-h-0 lets the nav shrink below its content so it scrolls instead of overflowing the fixed panel */}
      <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-4">
        {topLinks.map((link) => (
          <Link key={link.href} href={link.href} className={linkCls(isActive(pathname, link.href), false)}>
            {link.label}
          </Link>
        ))}

        {groups.map((group) => {
          const isOpen = open.has(group.label);
          const holdsActive = group.label === activeGroup;
          return (
            <div key={group.label} className="mt-1">
              <button
                type="button"
                onClick={() => toggle(group.label)}
                aria-expanded={isOpen}
                className={`w-full flex items-center justify-between px-6 py-3 text-[11px] uppercase tracking-widest transition-colors hover:bg-gray-50 ${
                  holdsActive ? "text-black font-semibold" : "text-gray-600 hover:text-black"
                }`}
              >
                {group.label}
                <FiChevronDown size={13} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="pb-1">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} className={linkCls(isActive(pathname, link.href), true)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="shrink-0 px-6 py-5 border-t border-black/10">
        <CmsLogout />
      </div>
    </aside>
  );
}
