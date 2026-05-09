"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CmsLogout from "./CmsLogout";

const links = [
  { href: "/cms/dashboard",   label: "Dashboard" },
  { href: "/cms/pov-mail",    label: "POV Mail" },
  { href: "/cms/submissions", label: "Submissions" },
  { href: "/cms/blogs",       label: "Blogs" },
  { href: "/cms/theme",       label: "Theme" },
];

export default function CmsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-black/10 flex flex-col z-10">
      <div className="px-6 py-7 border-b border-black/10">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">Design POV</p>
        <p className="text-sm font-semibold mt-0.5">CMS</p>
      </div>

      <nav className="flex-1 py-4">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/cms/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-6 py-3 text-[11px] uppercase tracking-widest transition-colors ${
                active ? "bg-black text-white" : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-black/10">
        <CmsLogout />
      </div>
    </aside>
  );
}
