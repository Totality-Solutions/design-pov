"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cdn } from "@/lib/cdn";
import { NAV_ITEMS } from "@/app/constants/navigation";
import { useNavbar } from "./NavbarProvider";
import CTABtn from "../common/CTABtn";

export function NavbarHeader({ hideTickets }: { hideTickets: boolean }) {
  const pathname = usePathname();
  const { isSticky, mobileOpen, setMobileOpen, handleNavEnter, closeAll } = useNavbar();

  return (
    <>
      <header
        id="main-navbar"
        className={`w-full bg-white border-b border-gray-100 z-[2100] fixed top-0 ${
          isSticky ? "lg:fixed lg:top-0 lg:left-0" : "lg:relative lg:top-auto"
        }`}
      >
        <div className="flex justify-between items-center px-6 lg:px-10 py-5">

          {/* Logo */}
          <div className="flex-shrink-0 relative z-[2101]">
            <Link href="/" onClick={closeAll}>
              <Image
                src={cdn("/logo/Logo.svg")}
                alt="Design POV"
                width={220} height={40}
                className="object-contain w-[180px] lg:w-[220px]"
                priority
              />
            </Link>
          </div>

          {/* Desktop nav */}
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
                label="Buy Tickets" iconType="arrow"
                btnBg="transparent" btnHoverBg="var(--primary-blue)"
                textColor="black"
                href="https://tktplz.events/gjdlb5-design-pov"
              />
            )}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 relative z-[2101] flex items-center justify-center w-10 h-10"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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

      {/* Sticky spacer */}
      {isSticky && <div className="hidden lg:block h-[88px] w-full" />}
    </>
  );
}