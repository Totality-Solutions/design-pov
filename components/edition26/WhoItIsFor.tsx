"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import CTABtn from "@/components/common/CTABtn";
import SectionHeading from "@/components/common/SectionHeading";

const lines = [
  "Architects & Interior Designers",
  "Homeowners & Collectors",
  "Developers & Decision-Makers",
  "Artists & Cultural Thinkers",
  "Dreamers & Design Aspirants",
];

export default function WhoItIsFor() {
  const controls = useAnimation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lineHeight, setLineHeight] = useState(38);

  const padding = 2;
  const originalLength = lines.length;

  // 2 empty rows + real lines + 2 empty rows
  const displayLines = [
    ...Array(padding).fill(""),
    ...lines,
    ...Array(padding).fill(""),
  ];

  // Responsive line height
  useEffect(() => {
    const updateLineHeight = () => {
      if (window.innerWidth >= 768) {
        setLineHeight(52); // desktop
      } else {
        setLineHeight(42); // mobile + tablet
      }
    };

    updateLineHeight();

    window.addEventListener("resize", updateLineHeight);

    return () => {
      window.removeEventListener("resize", updateLineHeight);
    };
  }, []);

  useEffect(() => {
    let current = 0;
    let dir = 1;
    let cancelled = false;

    const runAnimation = async () => {
      // Wait one frame so framer-motion controls are attached to the DOM
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      );

      if (cancelled) return;

      setActiveIndex(0);

      await new Promise((resolve) => setTimeout(resolve, 2200));

      if (cancelled) return;

      while (!cancelled) {
        current += dir;

        setActiveIndex(current);

        const targetY = -(current * lineHeight);

        await controls.start({
          y: targetY,
          transition: {
            duration: 0.45,
            ease: [0.25, 1, 0.5, 1],
          },
        });

        if (cancelled) return;

        await new Promise((resolve) => setTimeout(resolve, 2200));

        if (cancelled) return;

        if (current >= originalLength - 1) dir = -1;
        else if (current <= 0) dir = 1;
      }
    };

    runAnimation();

    return () => {
      cancelled = true;
    };
  }, [controls, lineHeight]);

  return (
    <section
      className="w-full py-6 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="For those who consume & create design:"
        sticky={true}
        isSectionHovered={isHovered}
      />

      <div className="relative flex flex-col md:flex-row px-6 md:px-10 md:h-[270px] w-full overflow-hidden bg-black">
        
        {/* LEFT */}
        <div className="relative flex-1 overflow-hidden w-full md:px-10 max-h-[140px] md:max-h-none">

          {/* TOP FADE */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-[60px] md:h-[104px] w-full bg-linear-to-b from-black via-black/80 to-transparent" />

          {/* BOTTOM FADE */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[60px] md:h-[104px] w-full bg-linear-to-t from-black via-black/80 to-transparent" />

          {/* SCROLLER */}
          <motion.div
            animate={controls}
            initial={{ y: 0 }}
            className="flex flex-col text-center"
          >
            {displayLines.map((line, index) => {
              const isActive = index === activeIndex + padding;

              return (
                <div
                  key={index}
                  className={`
                    h-[38px] md:h-[52px]
                    flex
                    items-center
                    whitespace-nowrap
                    tracking-[-0.04em]
                    select-none
                    transition-all
                    duration-300
                    origin-left
                    ${
                      isActive
                        ? "text-white text-[22px] md:text-[26px] font-semibold"
                        : "text-neutral-700 text-[16px] md:text-[18px] font-medium"
                    }
                  `}
                >
                  {line}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* RIGHT CTA */}
        <div
          className="
            relative
            flex
            items-start
            justify-start
            md:items-center
            md:justify-center
            pb-4
            md:py-0
          "
        >
          <div className="absolute inset-0 bg-gradient-to-l from-white/[0.03] to-transparent" />

          <CTABtn
            label="FAQ"
            href="/faq"
            showButtonBg={true}
            btnBg="var(--primary-blue)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-white)"
            borderColor="var(--primary-blue)"
            borderHoverColor="var(--primary-blue)"
          />
        </div>
      </div>
    </section>
  );
}