"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Added Link import
import Logo from "@/public/logo/Logo.svg";
import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";

// Import modularized data
import { NAV_DATA, NAV_LABELS } from "@/app/constants/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);
      if (isLg) setMobileOpen(false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    
    const onScroll = () => {
  setScrolled(window.scrollY > 350);
};
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const isVisible = scrolled || mobileOpen;
  
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  return (
    <nav onMouseLeave={() => setActiveMenu(null)} className="relative w-full z-[1000] overflow-x-clip">
      
      {/* 1. INITIAL HERO AREA (Desktop) */}
      <div ref={heroRef} className="hero !h-[450px] hidden lg:flex flex-col bg-white">
        <div className="row1 flex justify-between items-center px-10 py-5">
          {/* Logo with Link to Home */}
          <Link href="/" className="cursor-pointer">
            <Image src={Logo} alt="Design POV" width={250} height={40} style={{ objectFit: "contain" }} />
          </Link>
          
          <div className="row1Links flex gap-6">
            {NAV_LABELS.map((label) => (
              <a 
                key={label} 
                href={NAV_DATA[label].mainHref} 
                className="topLink text-black font-medium" 
                onMouseEnter={() => setActiveMenu(label)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="adds flex-1 flex items-center justify-center overflow-hidden bg-gray-50/30">
          <div className="adContainer max-w-full text-center">
            <div className="adLabel text-[10px] text-gray-400 mb-1 uppercase tracking-widest">Advertisement</div>
            <div className="adBox border border-dashed border-gray-200 w-[728px] h-[90px] flex items-center justify-center text-gray-300">
                Banner Space
            </div>
          </div>
        </div>

        <div className="row2 flex justify-end px-10 py-5">
          <div className="row2Right flex items-center gap-6">
            <a href="#tickets" className="ticketsLink text-black font-semibold">Tickets ₹1500</a>
            <CTABtn 
              label="Buy Tickets" 
              btnBg="transparent" 
              btnHoverBg="black" 
              textColor="black" 
              borderColor="black" 
              borderHoverColor="white" 
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

      {/* 2. STICKY NAVBAR */}
<header
  className={`fixed top-0 inset-x-0 z-[1600] transition-all duration-300 ${
    scrolled
      ? "bg-black backdrop-blur-md text-white shadow-lg opacity-100"
      : "hidden text-white opacity-100"
  }`}
>
        <Container>
          <div className="flex justify-between items-center px-5 py-4 lg:py-5 lg:px-14">
            <div className="stickyLeft">
              {/* Logo with Link to Home for Sticky Nav */}
              <Link href="/" className="cursor-pointer">
                <Image 
                  src={Logo} 
                  alt="Logo" 
                  width={150} 
                  height={30} 
                  className={`object-contain transition-all duration-300 ${scrolled || mobileOpen ? "invert" : "invert-0"}`} 
                />
              </Link>
            </div>
            
            <div className="hidden lg:flex gap-8 items-center">
              {NAV_LABELS.map((label) => (
                <a 
                  key={label} 
                  href={NAV_DATA[label].mainHref} 
                  onMouseEnter={() => setActiveMenu(label)} 
                  className="text-[16px] hover:text-blue-400 transition-colors"
                >
                  {label}
                </a>
              ))}
              
              <CTABtn
                label="Buy Tickets"
                iconType="arrow"
                btnBg="black" 
                btnHoverBg="#0000B3" 
                textColor="white"
                borderColor={scrolled ? "white" : "black"}
                borderHoverColor="#0000B3"
                lineColor={scrolled ? "black" : "white"}
                lineHoverColor="white"
                bottomKey1Width="40px"
                bottomKey2Width="12px"
                bottomKey1Right="50px"
                bottomKey2Right="15px"
                href="#tickets"
              />
            </div>

            <button 
              className="lg:hidden p-2 flex items-center justify-center relative w-10 h-10 z-[1601]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <span className="w-6 h-[1.5px] bg-white transition-all duration-300" />
              ) : (
                <div className={`relative w-6 h-[14px] transition-colors duration-300 ${scrolled ? "text-white" : "text-black"}`}>
                  <span className="absolute right-0 top-0 w-3 h-[2px] bg-current -skew-x-[35deg]" />
                  <span className="absolute right-[4px] top-[6px] w-3 h-[2px] bg-current -skew-x-[35deg]" />
                  <span className="absolute left-0 bottom-0 w-3 h-[2px] bg-current -skew-x-[35deg]" />
                </div>
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* 3. DESKTOP SUBMENU */}
      <div
        className={`hidden lg:block fixed inset-x-0 bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden z-[1150] ${
          activeMenu ? "h-[450px]" : "h-0"
        }`}
        style={{ top: scrolled ? "70px" : "120px" }}
      >
        <Container className="h-full">
          {activeMenu && (
            <div className="flex h-full py-10 gap-16 text-black">
              <div className="flex-[1.2] relative overflow-hidden bg-black">
                {isDesktop && <video src={NAV_DATA[activeMenu].video} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80" />}
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-2xl font-bold">{activeMenu}</h2>
                  <p className="text-sm opacity-70">Explore the perspective</p>
                </div>
              </div>
              <div className="flex-[1.5] flex gap-10">
                <div className="w-[1px] bg-gray-100 h-full" />
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col1Title}</h3>
                  <div className="flex flex-col gap-4">
                    {NAV_DATA[activeMenu].col1Links.map(l => (
                      <a key={l.label} href={l.href} className="text-gray-500 text-lg hover:text-black transition-colors">{l.label}</a>
                    ))}
                  </div>
                </div>
                <div className="w-[1px] bg-gray-100 h-full" />
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col2Title}</h3>
                  <div className="flex flex-col gap-4">
                    {NAV_DATA[activeMenu].col2Links.map(l => (
                      <a key={l.label} href={l.href} className="text-gray-500 text-lg hover:text-black transition-colors">{l.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* 4. MOBILE DRAWER */}
      <div className={`fixed inset-0 bg-white z-[1500] transition-transform duration-500 ease-in-out lg:hidden ${
        mobileOpen ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="pt-24 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto border-t border-gray-100">
            {NAV_LABELS.map((label) => (
              <div key={label} className="border-b border-gray-100">
                <button 
                  className="w-full flex justify-between items-center px-8 py-6 text-gray-400 text-lg font-light transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === label ? null : label);
                  }}
                >
                  <span className={activeMenu === label ? "text-black font-normal" : ""}>{label}</span>
                  <span className="w-5 h-[1px] bg-gray-300" /> 
                </button>
                
                {activeMenu === label && (
                  <div className="bg-gray-50/50 px-10 py-6 grid grid-cols-2 gap-8 border-t border-gray-50 animate-in fade-in duration-300">
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-4 font-bold">{NAV_DATA[label].col1Title}</p>
                      {NAV_DATA[label].col1Links.map(link => (
                        <a key={link.label} href={link.href} className="block text-gray-500 mb-3 text-sm" onClick={() => setMobileOpen(false)}>{link.label}</a>
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-4 font-bold">{NAV_DATA[label].col2Title}</p>
                      {NAV_DATA[label].col2Links.map(link => (
                        <a key={link.label} href={link.href} className="block text-gray-500 mb-3 text-sm" onClick={() => setMobileOpen(false)}>{link.label}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-12 flex justify-center items-center bg-white border-t border-gray-50">
            <a href="#tickets" className="bg-[#0000CC] text-white px-10 py-3 flex items-center gap-4 rounded-sm shadow-lg active:scale-95 transition-transform">
              <span className="text-xs opacity-60">—</span>
              <span className="text-[15px] font-medium tracking-wide">Buy Tickets</span>
            </a>
          </div>
        </div>
      </div>

      <div className="lg:hidden h-[70px] bg-white" />
    </nav>
  );
}