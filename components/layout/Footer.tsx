

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

  // --- Responsive Column Width Logic ---
  // Large: 260px | Medium: 200px | Below md: Tablet Component
  const currentColWidth = elementWidth > 1280 ? 260 : 200;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (containerRef.current) {
        setElementWidth(containerRef.current.offsetWidth);
      }
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
        animate={{ backgroundColor: isPastHalfway ? "#000000" : "#ffffff" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden flex items-center w-full"
        style={{ height: "654px", isolation: "isolate" }}
      >
        {/* LAYER 1: AUTOMATICALLY SCALED FLARES */}
        <div className="absolute inset-0 z-10 flex flex-row justify-end px-6 md:px-10 lg:px-[64px] items-center pointer-events-none overflow-hidden">
          <div className="flex gap-0 h-full lg:pr-20">
            {[0, 1, 2, 3].map((i) => {
              const img = i < 2 ? navLinks.Partners.img : i === 2 ? navLinks.AboutUs.img : navLinks.Originals.img;
              return (
                <div key={i} className="relative h-full overflow-hidden" style={{ width: currentColWidth }}>
                  <MagneticFollowFlare
                    index={i}
                    mouseX={mouseX}
                    imageSrc={img}
                    colWidth={currentColWidth}
                    isPastHalfway={isPastHalfway}
                    parentWidth={elementWidth}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* LAYER 2: CONTENT */}
        <div className="relative z-20 w-full h-full flex flex-row justify-between px-6 md:px-10 lg:px-[64px] items-center mix-blend-difference pointer-events-none">
          {/* Left Section */}
          <div className="flex flex-col justify-between h-full py-10 lg:py-[70px] w-full max-w-[240px] lg:max-w-[302px]">
            <div className="flex flex-col gap-[30px] lg:gap-[47px]">
              <h1 className="text-[28px] md:text-[36px] lg:text-[44px] font-black tracking-tighter text-white leading-none font-['Montserrat']">
                DESIGN <span className="font-light">POV</span>
              </h1>
              <div className="text-white font-['Montserrat'] text-[10px] lg:text-[12px] opacity-80 space-y-4 lg:space-y-6">
                <p className="break-words leading-relaxed">
                  designpovindia.com<br/>
                  hello@designpovindia.com
                </p>
                <div className="flex gap-3 lg:gap-4 pointer-events-auto">
                  {["IG", "BI", "IN"].map((id) => (
                    <span key={id} className="border border-white/20 w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white hover:text-black transition-colors">{id}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white text-[10px] lg:text-[12px] font-['Montserrat'] uppercase tracking-[0.1em]">© 2026 Design POV India.</p>
          </div>

          {/* Right Section (Links) */}
          <div className="flex gap-0 h-full py-16 lg:py-[84px] lg:pr-20 pointer-events-auto">
            <FooterTextColumn title="Partners" items={navLinks.Partners.items} subText="Privacy policy" width={currentColWidth} />
            <FooterTextColumn title="About us" items={navLinks.AboutUs.items} subText="Terms of Use" width={currentColWidth} />
            <FooterTextColumn title="Originals" items={navLinks.Originals.items} subText="Made by Design POV" width={currentColWidth} />
          </div>
        </div>

        {/* GRAIN OVERLAY */}
        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://res.cloudinary.com/dn7noog99/image/upload/v1711281898/noise_vms8cy.png')]" />
      </motion.footer>
    </Container>
  );
};

const MagneticFollowFlare = ({ index, mouseX, imageSrc, colWidth, isPastHalfway, parentWidth }: any) => {
  const BASE_FLARE_WIDTH = 1017;
  const responsiveScale = Math.min(parentWidth / 1600, 1); 
  const sizeReductionFactor = Math.pow(0.85, index);
  const finalWidth = BASE_FLARE_WIDTH * responsiveScale * sizeReductionFactor;
  
  const baseCenter = (colWidth / 2) - (finalWidth / 2);
  const movementRange = 100 * responsiveScale * sizeReductionFactor; // Slightly reduced for better md-screen stability

  const rawX = useTransform(
    mouseX,
    [0, parentWidth * 0.4, parentWidth * 0.5, parentWidth * 0.6, parentWidth],
    [
      baseCenter - movementRange, 
      baseCenter - movementRange, 
      baseCenter, 
      baseCenter + movementRange, 
      baseCenter + movementRange
    ]
  );

  const smoothFlareX = useSpring(rawX, { stiffness: 80, damping: 15 });

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        width: `${finalWidth}px`,
        height: "100%",
        left: smoothFlareX,
        top: "0",
      }}
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

const FooterTextColumn = ({ title, items, subText, width }: any) => (
  <div className="flex flex-col justify-between h-full px-4 lg:px-6" style={{ width: `${width}px` }}>
    <div className="flex flex-col gap-4 lg:gap-[24px]">
      <h3 className="text-white text-[11px] lg:text-[14px] font-['Montserrat'] uppercase tracking-[0.15em] font-medium">{title}</h3>
      <ul className="flex flex-col gap-3 lg:gap-5">
        {items.map((item: string) => (
          <li key={item} className="text-white/60 text-[12px] lg:text-[14px] font-['Montserrat'] hover:text-white cursor-pointer transition-colors font-light whitespace-nowrap">{item}</li>
        ))}
      </ul>
    </div>
    <p className="text-white/40 text-[10px] lg:text-[12px] font-['Montserrat'] uppercase cursor-pointer hover:text-white transition-colors tracking-wide leading-tight">{subText}</p>
  </div>
);

export default Footer;