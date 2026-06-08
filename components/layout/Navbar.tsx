"use client";

import { useEffect, useState, useRef } from "react";
import { cdn } from "@/lib/cdn";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"; 
import Menu from "@/components/icons/Menu.svg";
import Close from "@/components/icons/Menu-close.svg";

import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";
import { NAV_DATA, NAV_LABELS } from "@/app/constants/navigation";
import { useGlobalSettings } from "@/hooks/useGlobalSettings";

export default function Navbar() {
  const { hideTickets } = useGlobalSettings();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);
      if (isLg) setMobileOpen(false);
    };

let ticking = false;

const handleScroll = () => {
  const adSection = document.getElementById("ad-section");

  if (!adSection) {
    setIsSticky(window.scrollY > 0);
  } else {
    const adBottom =
      adSection.offsetTop + adSection.offsetHeight;
    setIsSticky(window.scrollY >= adBottom);
  }
};

    checkScreenSize();
    handleScroll();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // 🔥 Smooth hover
const handleMouseEnter = (label: string) => {
  if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

  // instant first response
  if (!activeMenu) {
    setActiveMenu(label);
    return;
  }

  // small delay only when switching menus
  hoverTimeout.current = setTimeout(() => {
    if (activeMenu !== label) setActiveMenu(label);
  }, 40);
};

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  return (
    <nav className="relative w-full z-[1000]">

      <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
        <div className="flex justify-center px-10 py-8">
          <Link href="https://www.kajariaceramics.com/" target="_blank">
            <div className="w-fit bg-white p-5">
              <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
                Advertisement
              </div>
              <div className="w-full h-[280px] flex items-center justify-center text-gray-300">
                <Image src={cdn("/temp/ads/1.png")} alt="Ad" width={1900} height={100} className="w-full h-full object-contain" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* NAVBAR */}
      <header
        className={`w-full bg-white border-b border-gray-100 transition-all duration-300 z-[2100] fixed top-0 ${isSticky ? "lg:fixed lg:top-0 lg:left-0" : "lg:relative"
          }`}
      >
        <div className="flex justify-between items-center px-6 lg:px-10 py-5">

          {/* Logo */}
          <Link href="/">
            <Image
              src={cdn("/logo/Logo.svg")}
              alt="Design POV"
              width={220}
              height={40}
              className="w-[180px] lg:w-[220px]"
            />
          </Link>

            {/* <CTABtn
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-10">
              {NAV_LABELS.map((label) => {
                const isActive = pathname === NAV_DATA[label].mainHref;
                
                return (
                  <Link
                    key={label}
                    href={NAV_DATA[label].mainHref}
                    onMouseEnter={() => setActiveMenu(label === "2026 Edition" || label === "Ecosystem" ? label : null)}
                    className={`relative text-[16px] font-medium whitespace-nowrap transition-colors py-1 group ${
                      isActive ? "text-primary-blue" : "text-black hover:text-primary-blue"
                    }`}
                  >
                    {label}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-primary-blue transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* ─── 3. DESKTOP TICKET BUTTON CONDITION ──────────────── */}
            {hideTickets === false && (
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
          {/* Hamburger / Cross Button */}
          <button
            className="lg:hidden p-2 relative z-[2101] flex items-center justify-center w-10 h-10"
            onClick={() => setMobileOpen(!mobileOpen)}
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
                    <Image
                      src={cdn("/icons/Menu-close.svg")}
                      alt="close"
                      fill
                      className="object-contain"
                    />
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
                    <Image
                      src={cdn("/icons/Menu.svg")}
                      alt="menu"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </header>

      {isSticky && <div className="hidden lg:block h-[88px] w-full" />}

      {/* 🔥 SUBMENU */}
      <div
        onMouseEnter={() => activeMenu && setActiveMenu(activeMenu)}
        onMouseLeave={handleMouseLeave}
        className={`hidden lg:block bg-white overflow-hidden transition-all duration-300 ${activeMenu ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          } ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
        style={{ top: isSticky ? "80px" : "100%" }}
      >
        <Container>
          <div className="flex px-10 py-10 gap-16">

            {/* 🔥 MEDIA (FIXED HERE) */}
            <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
              {NAV_LABELS.map((label) => {
                const data = NAV_DATA[label];

                return (
                  <div
  key={label}
  className={`absolute inset-0 transition-opacity duration-300 ${
    activeMenu === label ? "opacity-100 z-10" : "opacity-0 z-0"
  }`}
>
  {data.filetype === "image" && data.image && (
    <Image
      src={data.image}
      alt={label}
      fill
      loading="lazy"
      className="object-contain"
    />
  )}
</div>
                );
              })}
            </div>

            {/* LINKS */}
            {activeMenu && (
              <div className="w-[40%]">
                <h3 className="text-lg font-bold mb-6">
                  {NAV_DATA[activeMenu].col1Title}
                </h3>

                <div className="flex flex-col gap-4">
                  {NAV_DATA[activeMenu].col1Links?.map((link) => {
                    const isSubActive = pathname === link.href;

                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setActiveMenu(null)} // ✅ close submenu
                        className={`relative transition-colors ${isSubActive
                            ? "text-primary-blue font-medium"
                            : "text-black hover:text-primary-blue cursor-pointer"
                          }`}
                      >
                        {link.label}

                        {/* ✅ Active underline */}

                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* =========================
          MOBILE MENU OVERLAY
      ========================== */}
      <div
        className={`fixed inset-0 bg-white z-[2000] transition-transform duration-500 ease-in-out lg:hidden ${mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {NAV_LABELS.map((label) => {
              const isSubActive = NAV_DATA[label].col1Links?.some(
                (link) => pathname === link.href
              );

              const isActive =
                pathname === NAV_DATA[label].mainHref || isSubActive;

              return (
                <div key={label} className="border-b border-gray-100">
                  <div className="flex items-center justify-between pr-4">
                    <Link
                      href={NAV_DATA[label].mainHref}
                      className={`flex-1 px-8 py-6 text-left text-lg font-medium transition-colors ${
                        isActive ? "text-primary-blue" : "text-black"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                    {(label === "2026 Edition" || label === "Ecosystem") && (
                      <button
                        className="p-4"
                        onClick={() =>
                          setActiveMenu(activeMenu === label ? "" : label)
                        }
                      >
                        <Image
                          src={cdn("/icons/Menu-close.svg")} 
                          alt="toggle"
                          width={20}
                          height={20}
                          className={`transition-transform duration-200 ease-in-out ${activeMenu === label ? "scale-75" : "scale-150"
                            }`}
                        />
                      </button>
                    )}
                  </div>

                  {(activeMenu === "2026 Edition" || activeMenu === "Ecosystem") &&(
                      <div className={`overflow-hidden transition-all duration-300 ${activeMenu === label ? "max-h-screen" : "max-h-0"}`}>
                        {NAV_DATA[label].col1Links?.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => {
                            setMobileOpen(false);
                            setActiveMenu(null); // ✅ close submenu
                          }}
                          className={`block px-12 py-4 text-sm border-b border-black/10 ${pathname === link.href
                                ? "text-primary-blue font-medium"
                              : "text-black"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                        )}
                </div>
              );
            })}
            <Link href="https://povindex.designpovindia.com/home" target="_blank" className="flex items-center justify-center  ">
              <Image
                src={cdn("/qr/qr-ticket.png")}
                alt="toggle"
                width={1000}
                height={100}
                className={`transition-transform duration-200 ease-in-out bg-black `}
              />
            </Link>
          </div>
          
          {/* ─── 5. CONDITIONAL MOBILE DRAWER CTA CONTAINER ───────── */}
          {hideTickets === false && (
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
