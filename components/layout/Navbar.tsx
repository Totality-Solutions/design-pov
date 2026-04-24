"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo/Logo.svg";

import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";
import { NAV_DATA, NAV_LABELS } from "@/app/constants/navigation";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);

      if (isLg) {
        setMobileOpen(false);
      }
    };

    const handleScroll = () => {
  const adSection = document.getElementById("ad-section");

  if (!adSection) return;

  const adBottom = adSection.getBoundingClientRect().bottom;

  // Stick only when entire ad section is above viewport
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
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  return (
    <nav
      onMouseLeave={() => setActiveMenu(null)}
      className="relative w-full z-[1000]"
    >
      {/* =========================
          TOP ADVERTISEMENT SECTION
      ========================== */}
      <div id="ad-section" className="hidden lg:flex flex-col bg-white">
        <div className="flex justify-center px-10 py-8">
          <div className="w-full max-w-[1100px]">
            <div className="text-[11px] text-gray-400 mb-2 uppercase tracking-wider">
              Advertisement
            </div>

            <div className="w-full h-[280px] border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300">
              Banner Space
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <header
        id="main-navbar"
        className={`w-full bg-white border-gray-100 border-b border-gray-100 z-[1200] ${
          isSticky
            ? "fixed top-0 left-0 w-full"
            : "relative w-full"
        }`}
      >
        <Container>
          <div className="flex justify-between items-center px-6 lg:px-10 py-5">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Design POV"
                  width={220}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Right Side → Links + Button */}
            <div className="hidden lg:flex items-center gap-10">

              {/* Nav Links */}
              <div className="flex items-center gap-10">
                {NAV_LABELS.map((label) => (
                  <a
                    key={label}
                    href={NAV_DATA[label].mainHref}
                    onMouseEnter={() => setActiveMenu(label)}
                    className="text-black text-[16px] font-medium whitespace-nowrap hover:text-blue-500 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
              
              {/* CTA Button */}
              <CTABtn
                label="Buy Tickets"
                iconType="arrow"
                btnBg="black"
                btnHoverBg="var(--primary-blue)"
                textColor="white"
                borderColor="transparent"
                borderHoverColor="var(--primary-blue)"
                lineColor="transparent"
                lineHoverColor="var(--primary-blue)"
                bottomKey1Width="40px"
                bottomKey2Width="12px"
                bottomKey1Right="50px"
                bottomKey2Right="15px"
                href="#tickets"
              />
            </div>
              
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="relative w-6 h-[14px]">
                <span className="absolute top-0 w-full h-[2px] bg-black" />
                <span className="absolute top-[6px] w-full h-[2px] bg-black" />
                <span className="absolute bottom-0 w-full h-[2px] bg-black" />
              </div>
            </button>
          </div>
        </Container>
      </header>

      {/* Spacer when navbar becomes fixed */}
      {isSticky && <div className="h-[88px]" />}

      {/* =========================
          DESKTOP SUBMENU
      ========================== */}
      <div
        className={`hidden lg:block bg-white transition-all duration-300 overflow-hidden z-[1100] ${
          activeMenu ? "h-[450px]" : "h-0"
        } ${
          isSticky
            ? "fixed left-0 right-0"
            : "absolute left-0 right-0"
        }`}
        style={{
          top: isSticky ? "80px" : "100%",
        }}
      >
        <Container className="h-full">
          {activeMenu && (
              
              <div className="flex h-full px-10 py-10 gap-16 text-black">

                {/* Video → 70% */}
                <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
                  {isDesktop && (
                    <video
                      src={NAV_DATA[activeMenu].video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                    />
                  )}

                  <div className="absolute bottom-8 left-8 text-white">
                    <h2 className="text-2xl font-bold">{activeMenu}</h2>
                    <p className="text-sm opacity-70">
                      Explore the perspective
                    </p>
                  </div>
                </div>

                {/* Links → 30% */}
                <div className="w-[40%] flex flex-col justify-start">
                  {NAV_DATA[activeMenu].col1Title && (
                    <h3 className="text-lg font-bold mb-6">
                      {NAV_DATA[activeMenu].col1Title}
                    </h3>
                  )}

                  <div className="flex flex-col gap-4">
                    {NAV_DATA[activeMenu].col1Links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="hover:text-gray-500 text-black font-normal transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

              </div>



          )}
        </Container>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <div
        className={`fixed inset-0 bg-white z-[1500] transition-transform duration-500 lg:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {NAV_LABELS.map((label) => (
              <div key={label} className="border-b border-gray-100">
                <button
                  className="w-full px-8 py-6 text-left text-lg"
                  onClick={() =>
                    setActiveMenu(
                      activeMenu === label ? null : label
                    )
                  }
                >
                  {label}
                </button>
              </div>
            ))}
          </div>

          <div className="p-10 border-t">
            <CTABtn
              label="Buy Tickets"
              iconType="arrow"
              btnBg="black"
              btnHoverBg="#0000B3"
              textColor="white"
              borderColor="white"
              borderHoverColor="#0000B3"
              lineColor="white"
              lineHoverColor="white"
              bottomKey1Width="40px"
              bottomKey2Width="12px"
              bottomKey1Right="50px"
              bottomKey2Right="15px"
              href="#tickets"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}