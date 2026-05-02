"use client";

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const projects = [
  { id: 1, title: "Abin", img: "/temp/home/core/Abin.jpg", url: "#" },
  { id: 2, title: "ADND", img: "/temp/home/core/ADND.jpg", url: "#" },
  { id: 3, title: "ALARA STUDIO", img: "/temp/home/core/ALARA STUDIO.jpg", url: "#" },
  { id: 4, title: "BALDIWALA EDGE", img: "/temp/home/core/BALDIWALA EDGE.jpg", url: "#" },
  { id: 5, title: "CITYSPACE", img: "/temp/home/core/CITYSPACE.png", url: "#" },
  { id: 6, title: "DESIGN HEX", img: "/temp/home/core/DESIGN HEX.jpg", url: "#" },
  { id: 7, title: "DSP DESIGN", img: "/temp/home/core/DSP DESIGN.jpg", url: "#" },
  { id: 8, title: "JANNAT VASI", img: "/temp/home/core/JANNAT VASI.jpg", url: "#" },
  { id: 9, title: "NA ARCHITECT", img: "/temp/home/core/NA ARCHITECT.jpg", url: "#" },
  { id: 10, title: "POONAM AKASH", img: "/temp/home/core/POONAM AKASH.jpg", url: "#" },
  { id: 11, title: "SANJAY PURI", img: "/temp/home/core/SANJAY PURI.jpg", url: "#" },
  { id: 12, title: "SAV", img: "/temp/home/core/SAV.jpg", url: "#" },
  { id: 13, title: "SHROFFLEON", img: "/temp/home/core/SHROFFLEON.jpg", url: "#" },
  { id: 14, title: "SPARC DESIGN", img: "/temp/home/core/SPARC DESIGN.jpg", url: "#" },
  { id: 15, title: "STUDIO ARCHOHM", img: "/temp/home/core/STUDIO ARCHOHM.jpg", url: "#" },
  { id: 16, title: "TALATI & PARTNER", img: "/temp/home/core/TALATI & PARTNER.jpg", url: "#" },
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
          <span className="font-['Montserrat'] text-[14px] text-black uppercase font-medium">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[50px]">
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