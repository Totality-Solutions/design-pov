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

const HoverCard = ({ project, isDesktop }: any) => {
  const [isBlinking, setIsBlinking] = useState(false);

  const handleHover = () => {
    if (!isDesktop || isBlinking) return;
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 450);
  };

  const getAnimationState = () => {
    if (!isDesktop) return { filter: "grayscale(0%)", opacity: 1, scale: 1 };

    if (isBlinking) {
      return {
        filter: ["grayscale(0%)", "grayscale(100%)", "grayscale(0%)", "grayscale(100%)", "grayscale(0%)"],
        opacity: [1, 0.5, 1, 0.5, 1],
      };
    }

    return { filter: "grayscale(0%)", opacity: 1, scale: 1 };
  };

  return (
    <Link href={project.url} passHref>
      <motion.div
        onMouseEnter={handleHover}
        animate={getAnimationState()}
        transition={{
          duration: 0.4,
          times: isBlinking ? [0, 0.25, 0.5, 0.75, 1] : undefined,
          ease: "linear",
        }}
        className="group relative flex flex-col items-center bg-white overflow-hidden cursor-pointer"
      >
        <div className="relative w-full aspect-[177/159] overflow-hidden bg-[#F5F5F5]">
          <Image
            src={project.img}
            alt={project.title}
            fill
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-[50px]">
          {projects.map((project) => (
            <HoverCard
              key={project.id}
              project={project}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Core2026;