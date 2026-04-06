"use client";

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

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

const fullProjects = [...projects, ...Array(10 - projects.length).fill(projects[0]).map((p, i) => ({...p, id: i + 6}))];

const Core2026: NextPage = () => {
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false); // Default to false for SSR
  const totalCards = fullProjects.length;

  // Detect Screen Size
  useEffect(() => {
    const checkScreen = () => {
      // 1024px is usually the threshold for Desktop (LG in Tailwind)
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Strobe Logic
  useEffect(() => {
    if (!isIntroActive || !isDesktop) return; // Disable strobe on mobile/tab

    const interval = setInterval(() => {
      const randomCount = Math.floor(Math.random() * 1) + 3; 
      const newIndices = Array.from({ length: randomCount }, () => 
        Math.floor(Math.random() * totalCards)
      );
      setHighlightedIndices(newIndices);
      setTimeout(() => {
        if(isIntroActive) setHighlightedIndices([]);
      }, 450); 
    }, 700);

    return () => clearInterval(interval);
  }, [totalCards, isIntroActive, isDesktop]);

  // Intro Timer
  useEffect(() => {
    if (!isDesktop) {
      setIsIntroActive(false); // Immediately end intro for mobile
      return;
    }
    const introTimer = setTimeout(() => {
      setIsIntroActive(false);
      setHighlightedIndices([]); 
    }, 5000); 
    return () => clearTimeout(introTimer);
  }, [isDesktop]);

  return (
    <div className="min-h-max w-full bg-white flex flex-col items-center select-none">
      <nav className="w-full h-[60px] border-y border-[#DFDFDF] flex items-center justify-between px-6 lg:px-[53px] sticky top-0 bg-white z-50">
        <div className="flex items-center gap-[10px]">
          <div className="relative w-[33px] h-[33px]">
            <div className="absolute inset-0 m-auto w-[13px] h-[13px] bg-[#E02914] opacity-20 blur-[6px] rounded-full" />
            <div className="absolute inset-0 m-auto w-[7px] h-[7px] bg-[#E02914] rounded-full" />
          </div>
          <div className="font-['Montserrat'] text-[18px] lg:text-[22px] font-medium text-black">
            Core_<span className="font-bold">2026</span>
          </div>
        </div>
        <div className="font-['Montserrat'] text-[14px] lg:text-[18px] opacity-60">Lorem Ipsum</div>
      </nav>

      <main className="w-full max-w-[1420px] pt-[30px] lg:pt-[50px] px-6 lg:px-[50px] pb-20">
        {/* Responsive Grid: 1 col mobile, 2 col tab, 5 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-[50px]">
          {fullProjects.map((project, i) => {
            const isHighlighted = highlightedIndices.includes(i);

            return (
              <Link href={project.url} key={project.id} passHref>
                <motion.div
                  // Animations and Hovers only apply if isDesktop is true
                  animate={isDesktop ? {
                    filter: (isIntroActive && isHighlighted) ? "grayscale(0%)" : "grayscale(100%)",
                    opacity: (isIntroActive && isHighlighted) ? 1 : 0.1,
                    scale: (isIntroActive && isHighlighted) ? 1.03 : 1,
                  } : { 
                    filter: "grayscale(0%)", 
                    opacity: 1, 
                    scale: 1 
                  }}
                  whileHover={isDesktop ? { 
                    filter: "grayscale(0%)", 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.2, ease: "easeOut" } 
                  } : {}}
                  transition={{ 
                    duration: isIntroActive ? 0.2 : 0.5, 
                    ease: "easeInOut" 
                  }}
                  className="group relative flex flex-col items-center bg-white rounded-sm overflow-hidden"
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
                    {/* Only show/animate icon background on desktop */}
                    <div className="w-[11px] h-[11px] border-[1.5px] border-black lg:group-hover:bg-black transition-colors" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Core2026;