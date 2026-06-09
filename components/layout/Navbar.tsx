"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { cdn } from "@/lib/cdn";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";
import { NAV_ITEMS, SUBMENU_NAV_ITEMS, type NavItem } from "@/app/constants/navigation";

export default function Navbar() {
  const pathname    = usePathname();
  const [hideTickets, setHideTickets] = useState(true);
  const [activeMenu, setActiveMenu]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [isSticky,   setIsSticky]     = useState(false);
  const leaveTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY     = useRef(0);
  const ticking     = useRef(false);

  // Fetch CMS settings on mount — button starts hidden, shown only if API says so
  useEffect(() => {
    let cancelled = false;
    fetch("/api/cms/global-settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setHideTickets(!!data.hideTickets);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    const handleScroll = () => {
      if (ticking.current) return;
      requestAnimationFrame(() => {
        const adSection = document.getElementById("ad-section");
        setIsSticky(adSection ? adSection.getBoundingClientRect().bottom <= 0 : window.scrollY > 0);
        ticking.current = false;
      });
      ticking.current = true;
    };
    checkScreenSize();
    handleScroll();
    window.addEventListener("resize", checkScreenSize, { passive: true });
    window.addEventListener("scroll",  handleScroll,    { passive: true });
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll",  handleScroll);
    };
  }, []);

  // FIX 3 — iOS Safari body scroll lock.
  // overflow:hidden on <body> is ignored by iOS Safari — the page keeps
  // scrolling behind the overlay which causes continuous repaint → tab crash.
  // Fix: capture scroll position, fix <body> in place at that offset,
  // then restore on close.
  useEffect(() => {
    if (mobileOpen) {
      scrollY.current = window.scrollY;
      document.body.style.position   = "fixed";
      document.body.style.top        = `-${scrollY.current}px`;
      document.body.style.left       = "0";
      document.body.style.right      = "0";
      document.body.style.overflow   = "hidden";
    } else {
      document.body.style.position   = "";
      document.body.style.top        = "";
      document.body.style.left       = "";
      document.body.style.right      = "";
      document.body.style.overflow   = "";
      // Restore scroll position silently
      window.scrollTo(0, scrollY.current);
    }
    return () => {
      document.body.style.position   = "";
      document.body.style.top        = "";
      document.body.style.left       = "";
      document.body.style.right      = "";
      document.body.style.overflow   = "";
    };
  }, [mobileOpen]);

  const handleNavEnter = useCallback((item: NavItem) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(item.type === "submenu" ? item.label : null);
  }, []);

  const handleNavLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  return (
    <nav onMouseLeave={handleNavLeave} className="relative w-full z-[1000]">

      {/* ── AD BANNER ─────────────────────────────── */}
      <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
        <div className="flex justify-center px-10 py-8">
          <Link href="https://www.kajariaceramics.com/" target="_blank">
            <div className="w-fit bg-white p-5">
              <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
                Advertisement
              </div>
              <div className="w-full h-[280px] flex items-center justify-center">
                <Image
                  src={cdn("/temp/ads/1.png")}
                  alt="Ad"
                  width={1900}
                  height={100}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ── MAIN NAVBAR ───────────────────────────── */}
      <header
        id="main-navbar"
        className={`w-full bg-white border-b border-gray-100 z-[2100] fixed top-0 ${
          isSticky ? "lg:fixed lg:top-0 lg:left-0" : "lg:relative lg:top-auto"
        }`}
      >
        <div className="flex justify-between items-center px-6 lg:px-10 py-5">

          <div className="flex-shrink-0 relative z-[2101]">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src={cdn("/logo/Logo.svg")}
                alt="Design POV"
                width={220}
                height={40}
                className="object-contain w-[180px] lg:w-[220px]"
                priority
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-10">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => handleNavEnter(item)}
                    className={`relative text-[16px] font-medium whitespace-nowrap transition-colors py-1 group ${
                      isActive ? "text-primary-blue" : "text-black hover:text-primary-blue"
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-primary-blue transition-[width] duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                );
              })}
            </div>
{!hideTickets && (
  <CTABtn
    label="Buy Tickets"
    iconType="arrow"
    btnBg="transparent"
    btnHoverBg="var(--primary-blue)"
    textColor="black"
    href="https://tktplz.events/gjdlb5-design-pov"
  />
)}
          </div>

          <button
            className="lg:hidden p-2 relative z-[2101] flex items-center justify-center w-10 h-10"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <div className="relative w-6 h-6">
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}
                    className="absolute inset-0"
                  >
                    <Image src={cdn("/icons/Menu-close.svg")} alt="close" fill className="object-contain" />
                  </motion.div>
                ) : (
                  <motion.div key="menu"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }}
                    className="absolute inset-0"
                  >
                    <Image src={cdn("/icons/Menu.svg")} alt="menu" fill className="object-contain" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </header>

      {isSticky && <div className="hidden lg:block h-[88px] w-full" />}

      {/* ── DESKTOP SUBMENU ───────────────────────────────────────────────
          FIX 1 — removed will-change-[transform,opacity].
          will-change was forcing GPU layer allocation on mobile devices
          even though this element is display:none below lg breakpoint,
          combining with the image preload to cause OOM crashes.
          opacity + translateY transitions are still GPU-composited by the
          browser automatically — will-change is only needed when the browser
          can't figure that out on its own, which is not the case here.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        onMouseEnter={cancelLeave}
        onMouseLeave={handleNavLeave}
        className={`hidden lg:block bg-white z-[1100]
          transition-[opacity,transform] duration-150 ease-out
          ${activeMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
          }
          ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
        style={{ top: isSticky ? "80px" : "100%" }}
      >
        <Container>
          {SUBMENU_NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex h-fit px-10 py-10 gap-16 text-black transition-opacity duration-100 ${
                activeMenu === item.label
                  ? "opacity-100"
                  : "opacity-0 absolute pointer-events-none"
              }`}
            >
              <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
                <Image
                  src={item.image}
                  alt={item.label}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-[40%] flex gap-12 justify-start">
                <div className="flex flex-col justify-start">
                  {item.col1Title && (
                    <h3 className="text-lg font-bold mb-6">{item.col1Title}</h3>
                  )}
                  <div className="flex flex-col gap-4">
                    {item.col1Links.map((link) => (
                      <Link key={link.label} href={link.href}
                        className="hover:text-primary-blue font-normal transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {item.col2Links && item.col2Links.length > 0 && (
                  <div className="flex flex-col justify-start">
                    {item.col2Title && (
                      <h3 className="text-lg font-bold mb-6">{item.col2Title}</h3>
                    )}
                    <div className="flex flex-col gap-4">
                      {item.col2Links.map((link) => (
                        <Link key={link.label} href={link.href}
                          className="hover:text-blue-500 transition-colors">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Container>
      </div>

      {/* ── MOBILE MENU ───────────────────────────── */}
      <div className={`fixed inset-0 bg-white z-[2000] transition-transform duration-500 ease-in-out lg:hidden ${
        mobileOpen ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {NAV_ITEMS.map((item) => {
              const isActive    = pathname === item.href;
              const hasSubmenu  = item.type === "submenu";
              return (
                <div key={item.label} className="border-b border-gray-100">
                  <div className="flex items-center justify-between pr-4">
                    <Link
                      href={item.href}
                      className={`flex-1 px-8 py-6 text-left text-lg font-medium transition-colors
                        border-l-[3px] ${
                          isActive
                            ? "text-primary-blue border-primary-blue"
                            : "text-black border-transparent"
                        }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>

                    {hasSubmenu && (
                      <button
                        className="p-4"
                        onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                      >
                        <Image
                          src={cdn("/icons/Menu-close.svg")}
                          alt="toggle"
                          width={20}
                          height={20}
                          className={`transition-transform duration-200 ${
                            activeMenu === item.label ? "scale-75" : "scale-150"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* FIX 4 — transition-[max-height] instead of transition-all.
                      transition-all reflows every CSS property on every frame.
                      Scoping to max-height limits reflow to one property only. */}
                  {hasSubmenu && (
                    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      activeMenu === item.label ? "max-h-96" : "max-h-0"
                    }`}>
                      {item.col1Links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block px-12 py-4 text-sm text-black font-normal border-b border-gray-100"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link href="https://povindex.designpovindia.com/home" target="_blank"
              className="flex items-center justify-center">
              {/* FIX 5 — sized for mobile viewport, not 1000px.
                  Next.js was serving a 1000px image on a ~390px screen. */}
              <Image
                src={cdn("/qr/qr-ticket.png")}
                alt="QR ticket"
                width={390}
                height={390}
                className="w-full bg-black"
              />
            </Link>
          </div>

          {!hideTickets && (
            <div className="p-10 border-t bg-white">
              <CTABtn
                label="Buy Tickets"
                iconType="arrow"
                btnBg="var(--primary-blue)"
                textColor="white"
                href="https://tktplz.events/gjdlb5-design-pov"
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
