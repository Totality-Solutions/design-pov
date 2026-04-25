"use client";

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const projects = [
  { id: 1, title: "Design Studio", img: "/temp/theme/11.png", url: "#" },
  { id: 2, title: "Design Studio", img: "/temp/theme/2.png", url: "#" },
  { id: 3, title: "Design Studio", img: "/temp/theme/3.png", url: "#" },
  { id: 4, title: "Design Studio", img: "/temp/theme/4.png", url: "#" },
  { id: 5, title: "Design Studio", img: "/temp/theme/6.png", url: "#" },
  { id: 6, title: "Design Studio", img: "/temp/theme/11.png", url: "#" },
  { id: 7, title: "Design Studio", img: "/temp/theme/2.png", url: "#" },
  { id: 8, title: "Design Studio", img: "/temp/theme/3.png", url: "#" },
  { id: 9, title: "Design Studio", img: "/temp/theme/4.png", url: "#" },
  { id: 10, title: "Design Studio", img: "/temp/theme/6.png", url: "#" },
];

const HoverCard = ({ project, index, isIntroActive, highlightedIndices, isDesktop }: any) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const isHighlighted = highlightedIndices.includes(index);

  const handleHover = () => {
    if (!isDesktop || isIntroActive || isBlinking) return;
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 450);
  };

  const getAnimationState = () => {
    // 1. Mobile logic
    if (!isDesktop) return { filter: "grayscale(0%)", opacity: 1, scale: 1 };

    // 2. Intro Animation Logic (Strobe)
    if (isIntroActive) {
      return {
        filter: isHighlighted ? "grayscale(0%)" : "grayscale(100%)",
        opacity: isHighlighted ? 1 : 0.1,
        scale: isHighlighted ? 1.05 : 1,
      };
    }

    // 3. Hover Blink Logic (Post-Intro)
    if (isBlinking) {
      return {
        filter: ["grayscale(0%)", "grayscale(100%)", "grayscale(0%)", "grayscale(100%)", "grayscale(0%)"],
        opacity: [1, 0.5, 1, 0.5, 1],
      };
    }

    // 4. Default Rest State (Full Color)
    return { filter: "grayscale(0%)", opacity: 1, scale: 1 };
  };

  return (
    <Link href={project.url} passHref>
      <motion.div
        onMouseEnter={handleHover}
        initial={isDesktop ? { opacity: 0.1, filter: "grayscale(100%)" } : false}
        animate={getAnimationState()}
        transition={{
          duration: isIntroActive ? 0.15 : 0.4, // Faster strobe duration
          times: isBlinking ? [0, 0.25, 0.5, 0.75, 1] : undefined,
          ease: "linear",
        }}
        className="group relative flex flex-col items-center bg-white overflow-hidden"
      >
        <div className="relative w-full aspect-[177/159] overflow-hidden bg-[#F5F5F5]">
          <Image
            src={project.img}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 20vw"
            className="object-cover transition-transform duration-700 lg:group-hover:scale-110"
          />
        </div>

        <div className="w-full flex items-center justify-between p-[15px]">
          <span className="font-['Montserrat'] text-[14px] text-black font-medium">
            {project.title}
          </span>
          <div className="w-[11px] h-[11px] border-[1.5px] border-black lg:group-hover:bg-black transition-colors" />
        </div>
      </motion.div>
    </Link>
  );
};

const Core2026: NextPage = () => {
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Strobe Logic
  useEffect(() => {
    if (!isIntroActive || !isDesktop) return;

    const interval = setInterval(() => {
      // Pick 2-3 random indices
      const randomCount = Math.floor(Math.random() * 2) + 2; 
      const newIndices = Array.from({ length: randomCount }, () =>
        Math.floor(Math.random() * projects.length)
      );
      setHighlightedIndices(newIndices);

      // Brief pause where they are highlighted
      const timeout = setTimeout(() => setHighlightedIndices([]), 300);
      return () => clearTimeout(timeout);
    }, 500); // Overall speed of the "strobe" effect

    return () => clearInterval(interval);
  }, [isIntroActive, isDesktop]);

  return (
    <section
      className="min-h-max w-full bg-white flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Core "
        titleBold="Collection"
        sticky={false}
        isSectionHovered={isHovered}
      />

      <main className="w-full max-w-[1420px] pt-[20px] px-6 lg:px-[50px] pb-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-[50px]"
          // Trigger logic
          onViewportEnter={() => {
            if (isDesktop && !isIntroActive) {
              setIsIntroActive(true);
              // After 4 seconds, end the strobe and let cards settle into full color
              setTimeout(() => {
                setIsIntroActive(false);
                setHighlightedIndices([]);
              }, 4000);
            }
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, i) => (
            <HoverCard
              key={project.id}
              project={project}
              index={i}
              isIntroActive={isIntroActive}
              highlightedIndices={highlightedIndices}
              isDesktop={isDesktop}
            />
          ))}
        </motion.div>
      </main>
    </section>
  );
};

export default Core2026;