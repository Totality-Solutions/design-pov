"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface Props {
  navLinks: any;
}

const FooterTablet = ({ navLinks }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const [elementWidth, setElementWidth] = useState(0);

  // Auto-animation logic for Mobile/Tablet
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setElementWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    // Moves the flares automatically every 3 seconds
    const interval = setInterval(() => {
      if (elementWidth > 0) {
        const targetX = Math.random() * elementWidth;
        mouseX.set(targetX);
      }
    }, 3000);

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearInterval(interval);
    };
  }, [elementWidth, mouseX]);

  return (
    <motion.footer
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full bg-[#000000] py-16 px-6 sm:px-10 flex flex-col font-['Montserrat'] text-white overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      {/* LAYER 1: AUTO-MOVING FLARES */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <div className="flex h-full justify-end" style={{ gap: "20px" }}>
          {[0, 1, 2].map((i) => {
            const linkValues = Object.values(navLinks) as {
              img: string;
            }[];

            const currentImg =
              linkValues[i % linkValues.length]?.img || "";

            return (
              <div
                key={i}
                className="relative h-full w-[150px] sm:w-[200px] overflow-hidden"
              >
                <MagneticFollowFlare
                  index={i}
                  mouseX={mouseX}
                  imageSrc={currentImg}
                  parentWidth={elementWidth}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* LAYER 2: CONTENT */}
      <div className="relative z-20 flex flex-col lg:flex-row justify-between items-start gap-12 mix-blend-difference">
        
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <div className="w-full max-w-[200px]">
            <img
              src="/DesignPOV.png"
              alt="Design POV Logo"
              className="w-full h-auto block"
            />
          </div>

          <div className="text-[13px] opacity-70 space-y-2">
            <p>designpovindia.com</p>
            <p>hello@designpovindia.com</p>
          </div>

          <div className="flex gap-3">
            {["IG", "BI", "IN"].map((id) => (
              <span
                key={id}
                className="border border-white/20 w-9 h-9 flex items-center justify-center text-[11px] font-bold"
              >
                {id}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT NAV */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 w-full lg:w-auto">
          {Object.entries(navLinks).map(
            ([key, value]: [string, any]) => (
              <div key={key} className="flex flex-col gap-5">
                
                {/* TITLE */}
                <Link href={value.href}>
                  <h3 className="text-[11px] uppercase tracking-widest font-medium opacity-50 hover:opacity-100 transition-opacity">
                    {value.title ||
                      key.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                </Link>

                {/* ITEMS */}
                <ul className="flex flex-col gap-3">
                  {value.items.map((item: any) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-[14px] opacity-80 font-light hover:opacity-100 transition-opacity"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      {/* BOTTOM LEGAL ROW */}
      <div className="relative z-20 mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-40 text-[10px] uppercase tracking-[0.2em] mix-blend-difference">
        <p>© 2026 Design POV India.</p>

        <div className="flex gap-8">
          <Link
            href="/legal/privacy-policy"
            className="cursor-pointer hover:text-white transition"
          >
            Privacy Policy
          </Link>

          <Link
            href="/legal/terms-of-use"
            className="cursor-pointer hover:text-white transition"
          >
            Terms of Use
          </Link>
        </div>
      </div>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://res.cloudinary.com/dn7noog99/image/upload/v1711281898/noise_vms8cy.png')]" />
    </motion.footer>
  );
};

const MagneticFollowFlare = ({
  index,
  mouseX,
  imageSrc,
  parentWidth,
}: any) => {
  const baseWidth = 600;
  const baseCenter = -baseWidth / 4;

  const smoothX = useSpring(mouseX, {
    stiffness: 10,
    damping: 20,
  });

  const xTransform = useTransform(
    smoothX,
    [0, parentWidth || 1000],
    [baseCenter - 100, baseCenter + 100]
  );

  return (
    <motion.div
      className="absolute h-full flex items-center justify-center"
      style={{
        width: `${baseWidth}px`,
        x: xTransform,
        top: 0,
        left: "-50%",
        opacity: 0.6,
      }}
    >
      <motion.img
        src={imageSrc}
        alt="flare"
        className="w-full h-auto object-contain"
        style={{ filter: "blur(15px)" }}
      />
    </motion.div>
  );
};

export default FooterTablet;