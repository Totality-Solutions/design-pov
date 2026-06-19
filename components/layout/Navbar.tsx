"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { cdn } from "@/lib/cdn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";
import { NAV_DATA, NAV_LABELS, SUBMENU_LABELS } from "@/app/constants/navigation";
import { AnimatePresence, motion } from "framer-motion";

function useDesktopImagePreload() {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    SUBMENU_LABELS.forEach((label) => {
      const src = NAV_DATA[label].image;
      if (!src) return;
      const img = document.createElement("img");
      img.src = src;
    });
  }, []);
}

export default function Navbar() {
  const pathname = usePathname();

  const [activeMenu,  setActiveMenu]  = useState<string | null>(null);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isSticky,    setIsSticky]    = useState(false);
  const [hideTickets, setHideTickets] = useState(false);

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY    = useRef(0);

  useDesktopImagePreload();

  useEffect(() => {
    async function syncNavbarControls() {
      try {
        const res = await fetch("/api/cms/global-settings");
        if (res.ok) {
          const data = await res.json();
          setHideTickets(!!data.hideTickets);
        }
      } catch (err) {
        console.error("[Navbar] Failed to fetch layout control flags:", err);
      }
    }
    syncNavbarControls();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    const handleScroll = () => {
      const adSection = document.getElementById("ad-section");
      if (!adSection) { setIsSticky(window.scrollY > 0); return; }
      setIsSticky(adSection.getBoundingClientRect().bottom <= 0);
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

  useEffect(() => {
    const unlock = () => {
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.left     = "";
      document.body.style.right    = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY.current);
    };
    if (mobileOpen) {
      scrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top      = `-${scrollY.current}px`;
      document.body.style.left     = "0";
      document.body.style.right    = "0";
      document.body.style.overflow = "hidden";
    } else {
      unlock();
    }
    return unlock;
  }, [mobileOpen]);

  const handleNavEnter = useCallback((label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(SUBMENU_LABELS.includes(label) ? label : null);
  }, []);

  const handleNavLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  // Close submenu immediately on link click
  const closeMenu = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(null);
  }, []);

  return (
    <nav onMouseLeave={handleNavLeave} className="relative w-full z-[1000]">

      {/* ── AD BANNER ─────────────────────────────────────────────────── */}
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

      {/* ── MAIN NAVBAR ───────────────────────────────────────────────── */}
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
              {NAV_LABELS.map((label) => {
                const isActive = pathname === NAV_DATA[label].mainHref;
                return (
                  <Link
                    key={label}
                    href={NAV_DATA[label].mainHref}
                    onMouseEnter={() => handleNavEnter(label)}
                    className={`relative text-[16px] font-medium whitespace-nowrap transition-colors py-1 group ${
                      isActive ? "text-black border-b border-primary-blue" : "text-black hover:text-primary-blue"
                    }`}
                  >
                    {label}
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
            className="lg:hidden p-2 relative z-[2101] flex flex-col items-center justify-center w-10 h-10 gap-[5px]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image src={cdn("/icons/Menu-close.svg")} alt="close" fill className="object-contain" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
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

      {/* ── DESKTOP SUBMENU ───────────────────────────────────────────── */}
      <div
        onMouseEnter={cancelLeave}
        onMouseLeave={handleNavLeave}
        className={`hidden lg:block bg-white z-[1100]
          transition-[opacity,transform] duration-150 ease-out
          ${activeMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
          }
          ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
        style={{ top: isSticky ? "80px" : "100%" }}
      >
        <Container>
          {SUBMENU_LABELS.map((label) => {
            const item = NAV_DATA[label];
            return (
              <div
                key={label}
                className={`flex h-fit px-10 py-10 gap-16 text-black transition-opacity duration-100 ${
                  activeMenu === label
                    ? "opacity-100"
                    : "opacity-0 absolute pointer-events-none"
                }`}
              >
                {/* Media panel */}
                <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
                  {item.filetype === "video" && item.video ? (
                    <video
                      src={item.video}
                      autoPlay muted loop playsInline
                      preload="none"
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : item.filetype === "image" && item.image ? (
                    <img
                      src={item.image}
                      alt={label}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>

                {/* Links panel */}
                <div className="w-[40%] flex gap-12 justify-start">
                  {item.col1Links && item.col1Links.length > 0 && (
                    <div className="flex flex-col justify-start">
                      {item.col1Title && (
                        <h3 className="text-lg font-bold mb-6">{item.col1Title}</h3>
                      )}
                      <div className="flex flex-col gap-4">
                        {item.col1Links.map((link) => {
                          // Active = current pathname matches this link's href
                          const isLinkActive = pathname === link.href;
                          return (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={closeMenu}
                              className={`font-normal transition-colors hover:text-primary-blue ${
                                isLinkActive ? "text-primary-blue" : "text-black"
                              }`}
                            >
                              <span className={`w-fit ${isLinkActive ? "text-black  border-b-2 border-primary-blue" : ""}`}>{link.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {item.col2Links && item.col2Links.length > 0 && (
                    <div className="flex flex-col justify-start">
                      {item.col2Title && (
                        <h3 className="text-lg font-bold mb-6">{item.col2Title}</h3>
                      )}
                      <div className="flex flex-col gap-4">
                        {item.col2Links.map((link) => {
                          const isLinkActive = pathname === link.href;
                          return (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={closeMenu}
                              className={`font-normal transition-colors hover:text-primary-blue ${
                                isLinkActive ? "text-primary-blue" : "text-black"
                              }`}
                            >
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Container>
      </div>

      {/* ── MOBILE MENU ───────────────────────────────────────────────── */}
      <div className={`fixed inset-0 bg-white z-[2000] transition-transform duration-300 ease-in-out lg:hidden ${
        mobileOpen ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {NAV_LABELS.map((label) => {
              const isActive   = pathname === NAV_DATA[label].mainHref;
              const hasSubmenu = SUBMENU_LABELS.includes(label);
              return (
                <div key={label} className="border-b border-gray-100">
                  <div className="flex items-center justify-between pr-4">
                    <Link
                      href={NAV_DATA[label].mainHref}
                      className={`flex-1 px-8 py-6 text-left text-lg font-medium transition-colors border-l-[3px] 
                        text-black border-transparent`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className={`${isActive ? 'border-b-2 border-primary-blue' : 'text-black'}`}>{label}</span>
                    </Link>
                    {hasSubmenu && (
                      <button
                        className="p-4"
                        onClick={() => setActiveMenu(activeMenu === label ? null : label)}
                        aria-label="Toggle submenu"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20" height="20" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={`transition-transform duration-200 ${
                            activeMenu === label ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {hasSubmenu && (
                    <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      activeMenu === label ? "max-h-96" : "max-h-0"
                    }`}>
                      {NAV_DATA[label].col1Links?.map((link) => {
                        const isLinkActive = pathname === link.href;
                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            className={`block px-12 py-4 text-sm font-normal border-b border-gray-100 transition-colors ${
                              isLinkActive ? "" : "text-black"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <p className={`w-fit ${isLinkActive ? "text-black  border-b-2 border-primary-blue" : ""}`}>{link.label}</p>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="https://povindex.designpovindia.com/home"
              target="_blank"
              className="flex items-center justify-center"
            >
              <img
                src={cdn("/qr/Ticket-2027.png")}
                alt="QR ticket"
                width={390}
                height={390}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  maxWidth: 390,
                  height: "auto",
                  display: "block",
                  backgroundColor: "black",
                }}
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