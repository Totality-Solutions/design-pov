

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import FooterTablet from "./FooterTablet";
import { Container } from "../common/Container";

const COL_WIDTH = 260;

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Now only switches to Tablet/Mobile view below 768px
      // This ensures 1024px screens still see the animation.
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
      <Container>
        <FooterTablet navLinks={navLinks} />
      </Container>
    );
  }

  return (
    <Container>
      <motion.footer
        ref={containerRef}
        onMouseMove={handleMouseMove}
        animate={{ backgroundColor: isPastHalfway ? "#000000" : "#ffffff" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden flex items-center justify-between w-full"
        style={{ height: "654px", isolation: "isolate" }}
      >
        {/* LAYER 1: FLARES */}
        <div className="absolute inset-0 z-10 flex flex-row justify-end px-6 md:px-[64px] items-center pointer-events-none overflow-hidden">
          <div className="flex gap-0 h-full md:pr-20">
            {[0, 1, 2, 3].map((i) => {
              const img = i < 2 ? navLinks.Partners.img : i === 2 ? navLinks.AboutUs.img : navLinks.Originals.img;
              return (
                <div key={i} className="relative h-full overflow-hidden" style={{ width: COL_WIDTH }}>
                  <MagneticFollowFlare
                    mouseX={mouseX}
                    imageSrc={img}
                    colWidth={COL_WIDTH}
                    isPastHalfway={isPastHalfway}
                    parentWidth={elementWidth}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* LAYER 2: CONTENT */}
        <div className="relative z-20 w-full h-full flex flex-row justify-between px-6 md:px-[64px] items-center mix-blend-difference pointer-events-none">
          <div className="flex flex-col justify-between h-full py-[70px] w-[200px] md:w-[302px]">
            <div className="flex flex-col gap-[30px] md:gap-[47px]">
              <h1 className="text-[32px] md:text-[44px] font-black tracking-tighter text-white leading-none font-['Montserrat']">
                DESIGN <span className="font-light">POV</span>
              </h1>
              <div className="text-white font-['Montserrat'] text-[10px] md:text-[12px] opacity-80 space-y-6">
                <p className="break-words">designpovindia.com<br/>hello@designpovindia.com</p>
                <div className="flex gap-4 pointer-events-auto">
                  {["IG", "BI", "IN"].map((id) => (
                    <span key={id} className="border border-white/20 w-[24px] h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-white hover:text-black transition-colors">{id}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white text-[10px] md:text-[12px] font-['Montserrat'] uppercase tracking-[0.1em]">© 2026 Design POV India.</p>
          </div>

          <div className="flex gap-0 h-full py-[84px] md:pr-20 pointer-events-auto overflow-x-hidden">
            <FooterTextColumn title="Partners" items={navLinks.Partners.items} subText="Privacy policy" width={COL_WIDTH} />
            <FooterTextColumn title="About us" items={navLinks.AboutUs.items} subText="Terms of User" width={COL_WIDTH} />
            <FooterTextColumn title="Originals" items={navLinks.Originals.items} subText="Made by Design POV" width={COL_WIDTH} />
          </div>
        </div>

        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] mix-blend-overlay bg-[url('https://res.cloudinary.com/dn7noog99/image/upload/v1711281898/noise_vms8cy.png')]" />
      </motion.footer>
    </Container>
  );
};

const MagneticFollowFlare = ({ mouseX, imageSrc, colWidth, isPastHalfway, parentWidth }: any) => {
  const FLARE_WIDTH = 717;
  const baseCenter = (colWidth / 2) - (FLARE_WIDTH / 2);

  const rawX = useTransform(
    mouseX,
    [0, parentWidth * 0.4, parentWidth * 0.5, parentWidth * 0.6, parentWidth],
    [baseCenter - 110, baseCenter - 110, baseCenter, baseCenter + 110, baseCenter + 110]
  );

  const smoothFlareX = useSpring(rawX, { stiffness: 80, damping: 15 });

  return (
    <motion.div
      className="absolute"
      style={{
        width: `${FLARE_WIDTH}px`,
        height: "678px",
        left: smoothFlareX,
        top: "26px",
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
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

const FooterTextColumn = ({ title, items, subText, width }: any) => (
  <div className="hidden sm:flex flex-col justify-between h-full px-4" style={{ width: `${width}px` }}>
    <div className="flex flex-col gap-[24px]">
      <h3 className="text-white text-[12px] md:text-[14px] font-['Montserrat'] uppercase tracking-[0.15em] font-medium">{title}</h3>
      <ul className="flex flex-col gap-5">
        {items.map((item: string) => (
          <li key={item} className="text-white/60 text-[12px] md:text-[14px] font-['Montserrat'] hover:text-white cursor-pointer transition-colors font-light">{item}</li>
        ))}
      </ul>
    </div>
    <p className="text-white/40 text-[12px] md:text-[14px] font-['Montserrat'] uppercase cursor-pointer hover:text-white transition-colors tracking-wide">{subText}</p>
  </div>
);

export default Footer;
