"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/common/Container";

const text1 =
  `Design POV has always believed that meaningful visibility comes from intent, context, and reaching the right audience. POV Elevate extends this philosophy beyond the show floor as an exclusive initiative for brands within the ecosystem, helping create lasting impressions and meaningful relationships.`;

const text2 =
  `Through curated offline events, tailored programming, access to discerning audiences, media and F&B partnerships, and strategic online amplification, brands are positioned in front of the people who matter. POV Elevate enables collaboration with Design POV beyond the traditional playbook.`;

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

const ElevateHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
          <div className="pt-32 pb-16 px-6 text-center">
            <div className="max-w-5xl space-y-10">
              <p className="text-h3-mobile font-medium leading-[1.3] text-justify text-neutral-900 pb-4">
                {text1}
              </p>
              <p className="text-h3-mobile font-medium leading-[1.3] text-justify text-neutral-900">
                {text2}
              </p>
            </div>
          </div>
        ) : (
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="px-10 text-center ">
              <WordReveal
                text={text1}
                progress={smoothProgress}
                range={[0, 0.45]}
              />
              <div className="h-4" aria-hidden="true" />
              <WordReveal
                text={text2}
                progress={smoothProgress}
                range={[0.45, 0.9]}
              />
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default ElevateHero;