
"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react"; 
import Logo from "@/public/logo/Logo.svg";
import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";

// --- Types ---
type SubLink = { label: string; href: string };
type SubmenuContent = {
  video: string;
  col1Title: string;
  col1Links: SubLink[];
  col2Title: string;
  col2Links: SubLink[];
};

const NAV_DATA: Record<string, SubmenuContent> = {
  About: {
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_30MB.mp4",
    col1Title: "Company",
    col1Links: [{ label: "Our Story", href: "#" }, { label: "Mission", href: "#" }, { label: "Team", href: "#" }],
    col2Title: "Impact",
    col2Links: [{ label: "Sustainability", href: "#" }, { label: "Community", href: "#" }, { label: "Report", href: "#" }],
  },
  "26 Edition": {
    video: "/video1.mp4",
    col1Title: "Theme",
    col1Links: [{ label: "Theme", href: "#" }, { label: "Brands", href: "#" }, { label: "Core", href: "#" }],
    col2Title: "Details",
    col2Links: [{ label: "Schedule", href: "#" }, { label: "Art", href: "#" }, { label: "Speakers", href: "#" }],
  },
  Collaborate: {
    video: "/video2.mp4",
    col1Title: "Partnerships",
    col1Links: [{ label: "Brands", href: "#" }, { label: "Agencies", href: "#" }, { label: "Creators", href: "#" }],
    col2Title: "Opportunities",
    col2Links: [{ label: "Sponsorship", href: "#" }, { label: "Exhibit", href: "#" }, { label: "Press Kit", href: "#" }],
  },
  Magazine: {
    video: "/video3.mp4",
    col1Title: "Content",
    col1Links: [{ label: "Latest Issue", href: "#" }, { label: "Interviews", href: "#" }, { label: "Archive", href: "#" }],
    col2Title: "Contribute",
    col2Links: [{ label: "Submissions", href: "#" }, { label: "Guidelines", href: "#" }, { label: "Work With Us", href: "#" }],
  },
  Ecosystem: {
    video: "/video4.mp4",
    col1Title: "Network",
    col1Links: [{ label: "Design Hub", href: "#" }, { label: "Blogs", href: "#" }, { label: "Directory", href: "#" }],
    col2Title: "Resources",
    col2Links: [{ label: "Tools", href: "#" }, { label: "Case Studies", href: "#" }, { label: "Forum", href: "#" }],
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // Threshold for scroll logic
      const heroH = heroRef.current?.offsetHeight ?? 450;
      setScrolled(window.scrollY > 50); // Small threshold for mobile responsiveness
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  return (
    <nav onMouseLeave={() => setActiveMenu(null)} className="relative w-full z-[1000] overflow-x-clip">
      
      {/* 1. INITIAL HERO AREA (Desktop Only) */}
      <div ref={heroRef} className="hero !h-[450px] hidden lg:flex flex-col bg-white">
        <div className="row1 flex justify-between items-center px-10 py-5">
          <Image src={Logo} alt="Design POV" width={250} height={40} style={{ objectFit: "contain" }} />
          <div className="row1Links flex gap-6">
            {Object.keys(NAV_DATA).map((label) => (
              <a 
                key={label} 
                href="#" 
                className="topLink"
                onMouseEnter={() => setActiveMenu(label)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="adds flex-1 flex items-center justify-center overflow-hidden">
          <div className="adContainer max-w-full">
            <div className="adLabel">Advertisement</div>
            <div className="adBox">
                <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto" />
            </div>
          </div>
        </div>

        <div className="row2 flex justify-end px-10 py-5">
          <div className="row2Right flex items-center gap-6">
            <a href="#tickets" className="ticketsLink">Tickets ₹1500</a>
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

      {/* 2. STICKY NAVBAR (Dynamic Mobile Logic) */}
      <header
        className={`fixed top-0 inset-x-0 transition-all duration-300 ease-in-out z-[1200] ${
          // Logic: If scrolled OR menu is open, show Black BG. Otherwise: Desktop hidden, Mobile White/Transparent.
          scrolled || mobileOpen 
            ? "bg-black text-white translate-y-0 shadow-lg" 
            : "bg-white lg:bg-transparent text-black lg:-translate-y-full lg:opacity-0"
        }`}
      >
        <Container>
          <div className="flex justify-between items-center px-5 py-4 lg:py-5 lg:px-14">
            <div className="stickyLeft">
              <Image 
                src={Logo} 
                alt="Logo" 
                width={150} 
                height={30} 
                className={`object-contain transition-all duration-300 ${
                  scrolled || mobileOpen ? "invert" : "invert-0"
                }`} 
              />
            </div>
            
            <div className="hidden lg:flex gap-8 items-center">
              {Object.keys(NAV_DATA).map((label) => (
                <a
                  key={label}
                  href="#"
                  onMouseEnter={() => setActiveMenu(label)}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {label}
                </a>
              ))}
              <CTABtn
                label="Buy Tickets"
                iconType="arrow"
                btnBg={scrolled ? "var(--color-black)" : "transparent"}
                btnHoverBg="var(--primary-blue)"
                textColor={scrolled ? "var(--color-white)" : "black"}
                borderColor={scrolled ? "var(--color-white)" : "black"}
                borderHoverColor="var(--primary-blue)"
                lineColor="var(--color-black)"
                lineHoverColor="var(--color-black)"
                bottomKey1Width="40px"
                bottomKey2Width="12px"
                bottomKey1Right="50px"
                bottomKey2Right="15px"
                href="#tickets"
              />
            </div>

            {/* Mobile Hamburger Button - Color switches with scroll */}
            <button 
              className={`lg:hidden p-2 transition-colors duration-300 ${
                scrolled || mobileOpen ? "text-white" : "text-black"
              }`} 
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </Container>
      </header>

      {/* 3. DESKTOP SUBMENU (Mega Menu) */}
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
                <video src={NAV_DATA[activeMenu].video} autoPlay muted loop className="w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h2 className="text-2xl font-bold">{activeMenu}</h2>
                  <p className="text-sm opacity-70">Explore the perspective</p>
                </div>
              </div>
              <div className="flex-[1.5] flex gap-10">
                <div className="w-[1px] bg-gray-100 h-full" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-6">{NAV_DATA[activeMenu].col1Title}</h3>
                  <div className="flex flex-col gap-4">
                    {NAV_DATA[activeMenu].col1Links.map(l => (
                      <a key={l.label} href={l.href} className="text-gray-500 text-lg hover:text-black transition-colors">{l.label}</a>
                    ))}
                  </div>
                </div>
                <div className="w-[1px] bg-gray-100 h-full" />
                <div className="flex-1">
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
      <div className={`fixed inset-0 bg-black z-[1100] transition-transform duration-500 lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="pt-24 px-6 h-full overflow-y-auto pb-10">
            {Object.keys(NAV_DATA).map((label) => (
                <div key={label} className="border-b border-white/10 py-5">
                    <button 
                        className="flex justify-between items-center w-full text-white text-xl font-medium"
                        onClick={() => setActiveMenu(activeMenu === label ? null : label)}
                    >
                        {label}
                        <ChevronRight className={`transition-transform duration-300 ${activeMenu === label ? "rotate-90 text-blue-400" : ""}`} />
                    </button>
                    
                    {activeMenu === label && (
                        <div className="mt-5 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">{NAV_DATA[label].col1Title}</p>
                                {NAV_DATA[label].col1Links.map(link => (
                                    <a key={link.label} href={link.href} className="block text-white/70 mb-2 text-sm">{link.label}</a>
                                ))}
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">{NAV_DATA[label].col2Title}</p>
                                {NAV_DATA[label].col2Links.map(link => (
                                    <a key={link.label} href={link.href} className="block text-white/70 mb-2 text-sm">{link.label}</a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            <div className="mt-10 flex flex-col items-center gap-6">
                 <CTABtn
                    label="Buy Tickets"
                    iconType="arrow"
                    btnBg="var(--color-white)"
                    btnHoverBg="var(--primary-blue)"
                    textColor="var(--color-black)"
                    borderColor="var(--color-white)"
                    borderHoverColor="var(--primary-blue)"
                    lineColor="var(--color-black)"
                    lineHoverColor="var(--color-black)"
                    bottomKey1Width="40px"
                    bottomKey2Width="12px"
                    bottomKey1Right="50px"
                    bottomKey2Right="15px"
                    href="#tickets"
                 />
            </div>
        </div>
      </div>
      
      {/* Mobile spacer so header doesn't cover top content initially */}
      <div className="lg:hidden h-[70px] bg-white" />
    </nav>
  );
}