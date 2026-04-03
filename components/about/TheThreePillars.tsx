"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CTAStrip from '@/components/common/CTAStrip';
import CTABtn from '../common/CTABtn';

interface Pillar {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
}

const PILLAR_DATA: Pillar[] = [
  {
    id: "arch",
    title: "ARCHITECTS",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/940x1000",
    buttonLabel: "Default"
  },
  {
    id: "brand",
    title: "BRANDS",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/940x1001",
    buttonLabel: "Default"
  },
  {
    id: "build",
    title: "BUILD PARTNERS",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "https://placehold.co/940x1002",
    buttonLabel: "Default"
  }
];

const TheThreePillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  useEffect(() => {
    // Only run IntersectionObserver on Desktop to handle sticky text swap
    if (window.innerWidth < 768) return;

    const elements = document.querySelectorAll('.pillar-image-trigger');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActivePillar(index);
          }
        });
      },
      { threshold: 0.6, rootMargin: "-10% 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
      {/* 1. STICKY SECTION HEADER */}
      <div className="sticky top-0 z-50 w-full h-[60px] bg-white border-b border-[#DFDFDF] px-6 md:px-[70px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-[14px] h-[14px] bg-[#E02914] opacity-20 rounded-full blur-[6px]" />
            <div className="w-[7px] h-[7px] bg-[#E02914] rounded-full" />
          </div>
          <h2 className="text-[18px] md:text-[22px] leading-none text-black">
            The_Three_<span className="font-bold">Pillars</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-lg font-medium">Design POV</span>
          <span className="opacity-60 text-lg font-medium">Vol. 01</span>
        </div>
        {/* Mobile secondary text placeholder to match your header screenshot */}
        <div className="md:hidden text-xs opacity-40 uppercase font-medium">Lorem Ipsum</div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative flex flex-col md:flex-row items-start">
        
        {/* DESKTOP ONLY SIDEBAR (Hidden on Mobile) */}
        <div className="hidden md:flex w-[388px] sticky top-[60px] h-[calc(100vh-60px)] pl-[70px] pt-[60px] pb-[60px] flex-col justify-end border-r border-[#DFDFDF] bg-white overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-[40px]"
            >
              <div className="flex flex-col gap-2.5 max-w-[288px]">
                <h3 className="text-[22px] font-bold text-black tracking-wider uppercase">
                  {PILLAR_DATA[activePillar].title}
                </h3>
                <p className="text-base font-normal text-black opacity-70 leading-[1.3]">
                  {PILLAR_DATA[activePillar].description}
                </p>
              </div>
              <CTABtn label={PILLAR_DATA[activePillar].buttonLabel} href="#" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE + RIGHT COLUMN SCROLLING AREA */}
        <div className="flex-1 w-full bg-white md:bg-[#FAFAFA]">
          {PILLAR_DATA.map((pillar, index) => (
            <div 
              key={pillar.id}
              data-index={index}
              className="pillar-image-trigger w-full flex flex-col border-b border-[#DFDFDF] last:border-b-0"
            >
              {/* MOBILE ONLY TEXT (Shown only on small screens) */}
              <div className="md:hidden flex flex-col p-8 gap-6 bg-white">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold text-black tracking-tight uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black opacity-70 leading-[1.4]">
                    {pillar.description}
                  </p>
                </div>
                <div>
                  <CTABtn label={pillar.buttonLabel} href="#" />
                </div>
              </div>

              {/* IMAGE CONTAINER (Used for both Mobile and Desktop) */}
              <div className="p-6 md:p-[40px] flex items-center justify-center">
                <div className="w-full h-[35vh] md:h-[85vh] relative overflow-hidden grayscale md:hover:grayscale-0 transition-all duration-1000 ease-in-out">
                  <Image 
                    src={pillar.image} 
                    alt={pillar.title} 
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FULL WIDTH CTA STRIP */}
      <div className="w-full z-10 bg-white border-t border-[#DFDFDF]">
        <CTAStrip 
          src="https://placehold.co/1320x120" 
          alt="Dialogue Section"
          width={1920} 
          height={140} 
          title="Where Design Meets Dialogue"
          label="Apply As a Designer"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default TheThreePillars;