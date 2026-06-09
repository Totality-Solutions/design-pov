"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cdn } from "@/lib/cdn";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);
      if (isLg) setMobileOpen(false);
    };

    const handleScroll = () => {
      const adSection = document.getElementById("ad-section");
      if (!adSection) {
        setIsSticky(window.scrollY > 0);
        return;
      }
      const adBottom = adSection.getBoundingClientRect().bottom;
      setIsSticky(adBottom <= 0);
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

  const isSubmenuLabel = (label: string) =>
    label === "2026 Edition" || label === "Ecosystem";

  return (
    <nav onMouseLeave={() => setActiveMenu(null)} className="relative w-full z-[1000]">
      <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
        <div className="flex justify-center px-10 py-8">
          <Link href="https://www.kajariaceramics.com/" target="_blank">
            <div className="w-fit bg-white p-5">
              <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
                Advertisement
              </div>
              <div className="w-full h-[280px] flex items-center justify-center text-gray-300">
                <Image
                  src={cdn("/temp/ads/1.png")}
                  alt="Ad"
                  width={1900}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <header
        id="main-navbar"
        className={`w-full bg-white border-b border-gray-100 transition-all duration-300 z-[2100] fixed top-0 ${
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
                    onMouseEnter={() =>
                      setActiveMenu(isSubmenuLabel(label) ? label : null)
                    }
                    className={`relative text-[16px] font-medium whitespace-nowrap transition-colors py-1 group ${
                      isActive
                        ? "text-primary-blue"
                        : "text-black hover:text-primary-blue"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-primary-blue transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
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
            className="lg:hidden p-2 relative z-[2101] flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 ease-in-out ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 ease-in-out mt-[5px] ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 ease-in-out mt-[5px] ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {isSticky && <div className="hidden lg:block h-[88px] w-full" />}

      <div
        className={`hidden lg:block bg-white transition-all duration-300 overflow-hidden z-1100 ${
          activeMenu ? "h-fit" : "h-0"
        } ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
        style={{ top: isSticky ? "80px" : "100%" }}
      >
        <Container className="h-full">
          {activeMenu && (
            <div className="flex h-fit px-10 py-10 gap-16 text-black">
              <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
                {isDesktop && NAV_DATA[activeMenu].filetype === "video" ? (
                  <video
                    src={NAV_DATA[activeMenu].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : NAV_DATA[activeMenu].filetype === "image" ? (
                  <img
                    src={NAV_DATA[activeMenu].image}
                    alt={activeMenu}
                    className="w-full h-full object-contain opacity-100"
                  />
                ) : null}
              </div>

              {isSubmenuLabel(activeMenu) ? (
                <div className="w-[40%] flex gap-12 justify-start">
                  <div className="flex flex-col justify-start">
                    {NAV_DATA[activeMenu].col1Title && (
                      <h3 className="text-lg font-bold mb-6">
                        {NAV_DATA[activeMenu].col1Title}
                      </h3>
                    )}
                    <div className="flex flex-col gap-4">
                      {NAV_DATA[activeMenu].col1Links?.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="hover:text-primary-blue font-normal transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {NAV_DATA[activeMenu].col2Links &&
                    NAV_DATA[activeMenu].col2Links!.length > 0 && (
                      <div className="flex flex-col justify-start">
                        {NAV_DATA[activeMenu].col2Title && (
                          <h3 className="text-lg font-bold mb-6">
                            {NAV_DATA[activeMenu].col2Title}
                          </h3>
                        )}
                        <div className="flex flex-col gap-4">
                          {NAV_DATA[activeMenu].col2Links?.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="hover:text-blue-500 transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="w-[40%] flex flex-col justify-start">
                  <h3 className="text-lg font-bold mb-6">
                    {NAV_DATA[activeMenu].col1Title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {NAV_DATA[activeMenu].col1Links?.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="hover:text-blue-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </div>

      <div
        className={`fixed inset-0 bg-white z-[2000] transition-transform duration-500 ease-in-out lg:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {NAV_LABELS.map((label) => {
              const isActive = pathname === NAV_DATA[label].mainHref;
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
                    {isSubmenuLabel(label) && (
                      <button
                        className="p-4"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === label ? null : label
                          )
                        }
                      >
                        <Image
                          src={cdn("/icons/Menu-close.svg")}
                          alt="toggle"
                          width={20}
                          height={20}
                          className={`transition-transform duration-200 ease-in-out ${
                            activeMenu === label
                              ? "scale-75"
                              : "scale-150"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {isSubmenuLabel(label) && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeMenu === label
                          ? "max-h-screen"
                          : "max-h-0"
                      }`}
                    >
                      {NAV_DATA[label].col1Links?.map((link) => (
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
            <Link
              href="https://povindex.designpovindia.com/home"
              target="_blank"
              className="flex items-center justify-center"
            >
              <Image
                src={cdn("/qr/qr-ticket.png")}
                alt="toggle"
                width={1000}
                height={100}
                className="transition-transform duration-200 ease-in-out bg-black"
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
