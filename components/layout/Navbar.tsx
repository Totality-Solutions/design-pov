"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "2026", href: "/2026" },
  { label: "Core", href: "/2026/core" },
  { label: "Journal", href: "/journal" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Apply", href: "/apply" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled
          ? "bg-pov-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="container-pov flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="text-label text-pov-white tracking-[0.3em]">
          DESIGN POV
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-label link-pov transition-colors duration-300",
                pathname?.startsWith(link.href)
                  ? "text-pov-clay"
                  : "text-pov-mist hover:text-pov-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/2026/visit"
            className="text-label border border-pov-clay text-pov-clay px-4 py-2 hover:bg-pov-clay hover:text-pov-black transition-all duration-300"
          >
            Attend 2026
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-pov-white p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={clsx(
                "block h-px bg-current transition-all duration-300",
                menuOpen ? "rotate-45 translate-y-2" : ""
              )}
            />
            <span
              className={clsx(
                "block h-px bg-current transition-all duration-300",
                menuOpen ? "opacity-0" : ""
              )}
            />
            <span
              className={clsx(
                "block h-px bg-current transition-all duration-300",
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-500",
          menuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <nav className="container-pov pb-8 flex flex-col gap-6 border-t border-white/5 pt-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-editorial text-pov-white hover:text-pov-clay transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/2026/visit"
            className="text-label border border-pov-clay text-pov-clay px-4 py-3 text-center hover:bg-pov-clay hover:text-pov-black transition-all duration-300 mt-2"
          >
            Attend 2026
          </Link>
        </nav>
      </div>
    </header>
  );
}
