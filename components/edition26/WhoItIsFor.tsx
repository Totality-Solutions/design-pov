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
];

// Triple copy for seamless looping
const loopLines = [...lines, ...lines, ...lines];

export default function WhoItIsFor() {
  const controls = useAnimation();

  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * IMPORTANT:
   * line height must match actual row height
   */
  const lineHeight = 52;

  const originalLength = lines.length;

  useEffect(() => {
    let current = 0;

    const runAnimation = async () => {
      while (true) {
        current++;

        // ACTIVE LINE CHANGES IMMEDIATELY
        setActiveIndex(current % originalLength);

        /**
         * OFFSET:
         * keeps active line centered & visible
         */
        const targetY =
          -(current * lineHeight) + lineHeight ;

        // SMOOTH SCROLL
        await controls.start({
          y: targetY,
          transition: {
            duration: 0.45,
            ease: [0.25, 1, 0.5, 1],
          },
        });

        // HOLD ACTIVE LINE
        await new Promise((resolve) =>
          setTimeout(resolve, 2200)
        );

        /**
         * SILENT RESET
         */
        if (current >= originalLength * 2) {
          current = originalLength;

          controls.set({
            y:
              -(originalLength * lineHeight) +
              lineHeight * 2,
          });
        }
      }
    };

    runAnimation();
  }, [controls]);

  return (
    <section className="w-full bg-black">
      <SectionHeading
        titleMain="WHO"
        titleBold="IT IS FOR"
        bgColor="bg-black"
        textColor="text-white"
        className="border-b border-white/10"
      />

      <div className="relative flex h-[180px] md:h-[220px] overflow-hidden">
        
        {/* LEFT */}
        <div className="relative flex-1 overflow-hidden px-6 md:px-10">
          
          {/* TOP FADE */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-16 w-full bg-gradient-to-b from-black via-black to-transparent" />

          {/* BOTTOM FADE */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-24 w-full bg-gradient-to-t from-black via-black to-transparent" />

          {/* CENTER GLOW */}
          {/* <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-[70px] -translate-y-1/2 bg-white/[0.03] blur-3xl" /> */}

          {/* SCROLLER */}
          <motion.div
            animate={controls}
            initial={{
              y: lineHeight * 2,
            }}
            className="flex flex-col"
          >
            {loopLines.map((line, index) => {
              const isActive =
                index % originalLength === activeIndex;

              return (
                <div
                  key={index}
                  className={`
                    h-[52px]
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
            w-[30%]
            min-w-[180px]
            items-center
            justify-center
            px-4
          "
        >
          <div className="absolute inset-0 bg-gradient-to-l from-white/[0.03] to-transparent" />

          <CTABtn
            label="FAQ"
            href="/faq"
            showButtonBg={true}
            btnBg="var(--color-white)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-black)"
            borderColor="var(--color-black)"
            borderHoverColor="var(--color-black)"
          />
        </div>
      </div>
    </section>
  );
}