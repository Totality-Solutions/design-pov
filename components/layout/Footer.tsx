"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Home } from "lucide-react";

import FooterTablet from "./FooterTablet";
import { Container } from "../common/Container";
import Link from "next/link";

const navLinks = {
  Partners: {
    title: "Ecosystem",
    href: "/ecosystem",
    img: "/image1.svg",
    items: [
      { title: "Circle", href: "/edition/schedule" },
      { title: "Elevate", href: "/ecosystem/elevate" },
      { title: "Objects", href: "/ecosystem/objects" },
    ],
  },

  AboutUs: {
    title: "2026 Edition",
    href: "/edition",
    img: "/image2.svg",
    items: [
      { title: "Theme", href: "/edition/theme" },
      { title: "Brands", href: "/edition/brands" },
      { title: "Core", href: "/edition/core" },
      { title: "Schedule", href: "/edition/schedule" },
    ],
  },

  Originals: {
    title: "Quick Links",
    href: "",
    img: "/image3.svg",
    items: [
      { title: "About", href: "/about" },
      { title: "Home", href: "/" },
      { title: "Collaborate", href: "/collaborate" },
      { title: "Magazine", href: "/magazine" },
      { title: "Contact", href: "/contact" },
      { title: "POV Index", href: "https://povindex.designpovindia.com/" },
    ],
  },
};

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);

  const [isPastHalfway, setIsPastHalfway] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [elementWidth, setElementWidth] = useState(1600);

  const [currentColWidth, setCurrentColWidth] = useState(260);
  const [baseFlareWidth, setBaseFlareWidth] = useState(1017);

  const [showHiringCard, setShowHiringCard] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      if (containerRef.current) {
        setElementWidth(containerRef.current.offsetWidth);
      }

      const root = document.documentElement;
      const cssColWidth = getComputedStyle(root).getPropertyValue("--footer-col-width");
      const cssFlareWidth = getComputedStyle(root).getPropertyValue("--base-flare-width");

      if (cssColWidth) setCurrentColWidth(parseInt(cssColWidth, 10));
      if (cssFlareWidth) setBaseFlareWidth(parseInt(cssFlareWidth, 10));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    mouseX.set(currentX);
    setIsPastHalfway(currentX > rect.width / 2);
  };

  if (isMobile) {
    return (
      <Container className="!px-0">
        <FooterTablet navLinks={navLinks} />
      </Container>
    );
  }

  return (
    <div className="!px-0 border-t border-black/10">
      <motion.footer
        ref={containerRef}
        onMouseMove={handleMouseMove}
        animate={{
          backgroundColor: isPastHalfway ? "#000000" : "#ffffff",
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden w-full flex items-center"
        style={{
          minHeight: "600px",
          isolation: "isolate",
        }}
      >
        {/* LAYER 1: FLARES */}
        <div
          className="absolute inset-0 z-10 flex justify-end pointer-events-none overflow-hidden"
          style={{ paddingLeft: "var(--footer-px)" }}
        >
          <div className="flex h-full" style={{ gap: "var(--footer-gap-links)" }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-full overflow-hidden"
                style={{ width: "var(--footer-col-width)" }}
              >
                <MagneticFollowFlare
                  index={i}
                  mouseX={mouseX}
                  imageSrc={i < 2 ? navLinks.Partners.img : i === 2 ? navLinks.AboutUs.img : navLinks.Originals.img}
                  colWidth={currentColWidth}
                  baseFlareWidth={baseFlareWidth}
                  isPastHalfway={isPastHalfway}
                  parentWidth={elementWidth}
                />
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT - Interaction Fix (pointer-events-auto for links) */}
        <div
          className="relative z-20 w-full h-full flex flex-col justify-between mix-blend-difference "
          style={{
            paddingLeft: "var(--footer-px)",
            paddingTop: "70px", 
            paddingBottom: "60px", 
          }}
        >
          {/* TOP SECTION */}
          <div className="flex justify-between items-start">
            {/* LEFT: Logo and Contact */}
            <div className="flex flex-col gap-[32px] max-w-[302px]">
              <img
                src="/DesignPOV.png"
                alt="Design POV Logo"
                className="w-full max-w-[280px]"
              />
              <div className="text-white text-[12px] opacity-80">
                <div className="leading-relaxed ">
                  <Link href="mailto:marketing@designpovindia.com">designpovindia.com</Link>
                </div>
                <div className="leading-relaxed mb-4">  
                  <Link href="mailto:sales@designpovindia.com">sales@designpovindia.com</Link>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                  {[
                    {
                      id: "IG",
                      href: "https://www.instagram.com/designpov.india?igsh=bnVnZTRxajRoY2g4",
                    },
                    {
                      id: "FB",
                      href: "https://www.facebook.com/share/1GiQ7sWhVw/?mibextid=wwXIfr",
                    },
                    {
                      id: "IN",
                      href: "https://www.linkedin.com/company/design-pov/",
                    },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        border border-white/20
                        w-[28px] h-[28px]
                        flex items-center justify-center
                        text-[10px] font-bold
                        cursor-pointer
                        hover:bg-white
                        hover:text-black
                        transition-colors
                      "
                    >
                      {item.id}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Main Navigation Columns */}
            <div className="flex pointer-events-auto" style={{ gap: "var(--footer-gap-links)"}}>
              <FooterTextColumn {...navLinks.Partners} />
              <FooterTextColumn {...navLinks.AboutUs} />
              <FooterTextColumn {...navLinks.Originals} />
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col gap-10" style={{
            paddingRight: "var(--footer-px)",
          }}>
            <div className="flex justify-between items-end">
              {/* Hiring Card */}
              <div className="w-[170px] pointer-events-auto relative">
                <motion.div
                  initial={false}
                  animate={{
                    height: showHiringCard ? "auto" : 0,
                    opacity: showHiringCard ? 1 : 0,
                    marginBottom: showHiringCard ? 0 : -8,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="bg-black border border-white relative">
                    <button
                      onClick={() => setShowHiringCard(false)}
                      className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-black bg-white rounded-full text-[10px] z-10"
                    >
                      ✕
                    </button>
                    <div className="p-3">
                      <img
                        src="/temp/hiring.svg"
                        alt="Hiring"
                        className="w-[120px] lg:w-[140px] object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <a
                  href="/contact"
                  className="relative z-20 bg-white text-black px-5 py-3 text-[11px] font-bold uppercase tracking-wide flex items-center justify-between w-full hover:bg-neutral-200 transition-all"
                >
                  Join our Team
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
              </div>

              {/* Totality Branding */}
              <a href="https://www.totality.solutions" target="_blank" rel="noopener noreferrer" className="flex flex-col items-end pointer-events-auto">
                <p className="text-white text-[12px] mb-2 uppercase tracking-widest font-medium">
                  An IP by:
                </p>
                <img
                  src="/logo/Totality.svg"
                  alt="Totality"
                  className="w-[120px] lg:w-[140px] object-contain brightness-0 invert"
                />
              </a>
            </div>

            {/* Legal Row */}
            <div className="w-full pointer-events-auto">
              <div className="w-full border-t border-white/80 mb-6" />
              <div className="flex justify-between items-center text-white text-[12px] lg:text-[14px]  font-medium">
                <p>© 2026 Design POV India. All rights reserved.</p>
                <div className="flex gap-20">
                  <Link href="/legal/privacy-policy"><p className="cursor-pointer hover:text-neutral-400 transition">Privacy Policy</p></Link>
                  <Link href="/legal/terms-of-use"><p className="cursor-pointer hover:text-neutral-400 transition">Terms of Use</p></Link>
                  <a href="https://www.totality.solutions" target="_blank" rel="noopener noreferrer">Developed by Totality Solutions</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grain Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://res.cloudinary.com/dn7noog99/image/upload/v1711281898/noise_vms8cy.png')]" />
      </motion.footer>
    </div>
  );
};

const MagneticFollowFlare = ({ index, mouseX, imageSrc, colWidth, baseFlareWidth, isPastHalfway, parentWidth }: any) => {
  const responsiveScale = Math.max(0.7, Math.min(parentWidth / 1600, 1));
  const finalWidth = Math.max(800, Math.min(baseFlareWidth * (parentWidth / 1600), baseFlareWidth));
  const baseCenter = colWidth / 2 - finalWidth / 2;
  const offsets = isPastHalfway ? [120, 80, 40, 0] : [0, -40, -80, -120];
  const startingOffset = (offsets[index] || 0) * responsiveScale;
  const movementRange = 100 * responsiveScale;

  const rawX = useTransform(
    mouseX,
    [0, parentWidth * 0.4, parentWidth * 0.5, parentWidth * 0.6, parentWidth],
    [
      baseCenter + startingOffset - movementRange,
      baseCenter + startingOffset - movementRange,
      baseCenter + startingOffset,
      baseCenter + startingOffset + movementRange,
      baseCenter + startingOffset + movementRange,
    ]
  );

  const smoothFlareX = useSpring(rawX, { stiffness: 80, damping: 20 }); // Slightly higher damping to prevent "stuck" feeling

  return (
    <motion.div
      className="absolute h-full flex items-center justify-center"
      style={{ width: `${finalWidth}px`, left: smoothFlareX, top: 0 }}
    >
      <motion.img
        src={imageSrc}
        alt="flare"
        animate={{
          mixBlendMode: isPastHalfway ? "screen" : "darken",
          opacity: isPastHalfway ? 0.7 : 0.4,
          filter: isPastHalfway ? "blur(0px)" : "blur(2px)",
        }}
        className="w-full h-auto object-contain"
      />
    </motion.div>
  );
};

const FooterTextColumn = ({ title, href, items }: any) => (
  <div
    className="flex flex-col pl-4"
    style={{ width: "var(--footer-col-width)" }}
  >
    <div className="flex flex-col gap-[32px]">

      <Link href={href}>
        <h3 className="text-white text-[16px] font-medium tracking-[0.05em] hover:opacity-70 transition-opacity cursor-pointer">
          {title}
        </h3>
      </Link>

      <ul className="flex flex-col gap-3">
        {items.map((item: any) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="text-white text-[14px] font-light whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Footer;