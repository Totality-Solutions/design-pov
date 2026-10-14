"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/common/Container";
import { DEFAULT_ELEVATE } from "@/lib/elevateContent";

function Word({ word, progress, range }: any) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["rgb(163 163 163)", "rgb(0 0 0)"]);

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-2">
      {word}
    </motion.span>
  );
}

function WordReveal({ text, progress, range }: any) {
  const words = text.split(" ");
  const [startRange, endRange] = range;
  const step = (endRange - startRange) / words.length;

  return (
    <p className="leading-[1.3] text-h3-mobile md:text-h3-tab lg:text-h3 font-medium tracking-[-0.02em] m-0">
      {words.map((word: string, i: number) => {
        const start = startRange + i * step;
        const end = start + step;
        return (
          <Word key={i} word={word} progress={progress} range={[start, end]} />
        );
      })}
    </p>
  );
}

const ElevateHero = ({ paragraphs = DEFAULT_ELEVATE.intro.paragraphs }: { paragraphs?: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Desktop: the paragraphs share the first 90% of the scroll, one after another.
  const span = 0.9 / Math.max(paragraphs.length, 1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size to toggle between Plain Text and Sticky Reveal
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Container>
      <section ref={containerRef} className={isMobile ? "relative py-16 px-6" : "relative h-[200vh] w-full"}>
        {isMobile ? (
          <div className="pt-15  px-6 text-center">
            <div className="max-w-5xl space-y-10">
              {paragraphs.map((text, i) => (
                <p key={i} className="text-h3-mobile font-medium leading-[1.3] text-justify text-neutral-900 pb-4 last:pb-0">
                  {text}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="px-10 text-center ">
              {paragraphs.map((text, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="h-4" aria-hidden="true" />}
                  <WordReveal text={text} progress={smoothProgress} range={[i * span, (i + 1) * span]} />
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default ElevateHero;