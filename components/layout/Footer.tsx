"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import FooterTablet from "./FooterTablet";
import { Container } from "../common/Container";

const navLinks = {
  Partners: { items: ["Tickets", "Ecosystem"], img: "/image1.svg" },
  AboutUs: { items: ["Program", "Designers"], img: "/image2.svg" },
  Originals: { items: ["Objects", "Elevate", "Edits"], img: "/image3.svg" },
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
    <Container className="max-w-none !px-0">
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
          height: "600px",
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
          className="relative z-20 w-full h-full flex flex-col justify-between mix-blend-difference pointer-events-none"
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
                <p className="leading-relaxed mb-6">
                  designpovindia.com
                  <br />
                  hello@designpovindia.com
                </p>

                <div className="flex gap-4 pointer-events-auto">
                  {["IG", "BI", "IN"].map((id) => (
                    <span
                      key={id}
                      className="border border-white/20 w-[28px] h-[28px] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white hover:text-black transition-colors"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Main Navigation Columns */}
            <div className="flex pointer-events-auto" style={{ gap: "var(--footer-gap-links)"}}>
              <FooterTextColumn title="Partners" items={navLinks.Partners.items} />
              <FooterTextColumn title="About us" items={navLinks.AboutUs.items} />
              <FooterTextColumn title="Originals" items={navLinks.Originals.items} />
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
              <div className="flex flex-col items-end">
                <p className="text-white text-[12px] mb-2 uppercase tracking-widest font-medium">
                  An IP by:
                </p>
                <img
                  src="/logo/Totality.svg"
                  alt="Totality"
                  className="w-[120px] lg:w-[140px] object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Legal Row */}
            <div className="w-full pointer-events-auto">
              <div className="w-full border-t border-white/80 mb-6" />
              <div className="flex justify-between items-center text-white text-[11px] lg:text-[12px] uppercase tracking-widest font-medium">
                <p>© 2026 Design POV India. All rights reserved.</p>
                <div className="flex gap-20">
                  <p className="cursor-pointer hover:text-neutral-400 transition">Privacy Policy</p>
                  <p className="cursor-pointer hover:text-neutral-400 transition">Terms of Use</p>
                  <p className="cursor-pointer hover:text-neutral-400 transition">Made by Design POV</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grain Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://res.cloudinary.com/dn7noog99/image/upload/v1711281898/noise_vms8cy.png')]" />
      </motion.footer>
    </Container>
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

const FooterTextColumn = ({ title, items }: any) => (
  <div className="flex flex-col pl-4" style={{ width: "var(--footer-col-width)"}}>
    <div className="flex flex-col gap-[32px]">
      <h3 className="text-white text-[14px] font-medium tracking-[0.15em] uppercase">
        {title}
      </h3>
      <ul className="flex flex-col gap-5">
        {items.map((item: string) => (
          <li
            key={item}
            className="text-white text-[14px] font-light cursor-pointer whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Footer;