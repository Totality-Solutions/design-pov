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

const fullProjects = [...projects, ...Array(10 - projects.length).fill(projects[0]).map((p, i) => ({...p, id: i + 6}))];

const Core2026: NextPage = () => {
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isIntroActive, setIsIntroActive] = useState(false); // Start false, trigger on view
  const [isDesktop, setIsDesktop] = useState(false); 
  const [isHovered, setIsHovered] = useState(false);
  const totalCards = fullProjects.length;

  // Detect Screen Size
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Strobe Logic
  useEffect(() => {
    if (!isIntroActive || !isDesktop) return; 

    const interval = setInterval(() => {
      const randomCount = 3; 
      const newIndices = Array.from({ length: randomCount }, () => 
        Math.floor(Math.random() * totalCards)
      );
      setHighlightedIndices(newIndices);
      
      const timeout = setTimeout(() => {
        setHighlightedIndices([]);
      }, 450);

      return () => clearTimeout(timeout);
    }, 700);

    return () => clearInterval(interval);
  }, [isIntroActive, isDesktop, totalCards]);

  return (
    <section className="min-h-max w-full bg-white flex flex-col items-center select-none" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Core " 
        titleBold="2026" 
        sticky={false}
        isSectionHovered={isHovered} 
      />
    
      <main className="w-full max-w-[1420px] pt-[30px] lg:pt-[50px] px-6 lg:px-[50px] pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-[50px]">
          {fullProjects.map((project, i) => {
            const isHighlighted = highlightedIndices.includes(i);

            return (
              <Link href={project.url} key={project.id} passHref>
                <motion.div
                  // This triggers the intro only when the first element is seen
                  onViewportEnter={() => {
                    if (isDesktop && !isIntroActive) {
                      setIsIntroActive(true);
                      setTimeout(() => setIsIntroActive(false), 5000);
                    }
                  }}
                  viewport={{ once: true, amount: 0.2 }}
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
                    <div className="w-[11px] h-[11px] border-[1.5px] border-black lg:group-hover:bg-black transition-colors" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </main>
    </section>
  );
};

export default Core2026;