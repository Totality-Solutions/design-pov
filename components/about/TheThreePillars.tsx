"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CTAStrip from '@/components/common/CTAStrip';
import CTABtn from '../common/CTABtn';
import SectionHeading from '../common/SectionHeading';

// Assets
import Img1 from '@/public/temp/about/1.png'
import Img2 from '@/public/temp/about/2.png'
import Img3 from '@/public/temp/about/3.png'

interface Pillar {
  id: string;
  title: string;
  description: string;
  image: any;
  buttonLabel: string;
}

const PILLAR_DATA: Pillar[] = [
  {
    id: "arch",
    title: "ARCHITECTS",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: Img1,
    buttonLabel: "Default"
  },
  {
    id: "brand",
    title: "BRANDS",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: Img2,
    buttonLabel: "Default"
  },
  {
    id: "build",
    title: "BUILD PARTNERS",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: Img3,
    buttonLabel: "Default"
  }
];

const TheThreePillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover for the dot animation

  useEffect(() => {
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
    <section 
      className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      {/* 1. FLEXIBLE SECTION HEADER */}
      <SectionHeading 
        titleMain="The Three " 
        titleBold="Pillars" 
        sticky={true}
        stickyTop="top-0"
        isSectionHovered={isHovered} 
        className='z-[9999]'
      >
        {/* Right side content: Passing multiple elements as children */}
        <div className="hidden md:flex gap-[60px] lg:gap-[100px]">
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Design POV</span>
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Vol. 01</span>
        </div>
        
        {/* You could even add a CTA here if needed */}
        {/* <CTABtn label="Contact" href="/contact" ... /> */}
      </SectionHeading>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative flex flex-col md:flex-row items-start">
        
        {/* DESKTOP ONLY SIDEBAR */}
        <div className="hidden md:flex w-[388px] sticky top-[90px] h-[calc(100vh-90px)] pl-[70px] pt-[60px] pb-[60px] flex-col justify-end border-r border-[#DFDFDF] bg-white overflow-hidden">
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
              <CTABtn
                label={PILLAR_DATA[activePillar].buttonLabel}
                iconType="arrow"
                btnBg="var(--color-white)"
                btnHoverBg="var(--primary-blue)"
                textColor="var(--color-black)"
                borderColor="var(--color-black)"
                borderHoverColor="transparent"
                lineColor="var(--color-white)"
                lineHoverColor="var(--primary-blue)"
                bottomKey1Width="40px"
                bottomKey2Width="12px"
                bottomKey1Right="50px"
                bottomKey2Right="15px"
                href="#tickets"
              />
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
              {/* MOBILE ONLY TEXT */}
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
                  <CTABtn
                    label={pillar.buttonLabel}
                    iconType="arrow"
                    btnBg="var(--color-white)"
                    btnHoverBg="var(--primary-blue)"
                    textColor="var(--color-black)"
                    borderColor="var(--color-black)"
                    borderHoverColor="transparent"
                    lineColor="var(--color-white)"
                    lineHoverColor="var(--primary-blue)"
                    bottomKey1Width="40px"
                    bottomKey2Width="12px"
                    bottomKey1Right="50px"
                    bottomKey2Right="15px"
                    href="#tickets"
                  />
                </div>
              </div>

              {/* IMAGE CONTAINER */}
              <div className="p-6 md:p-[40px] flex items-center justify-center">
                <div className="w-full h-[35vh] md:h-[85vh] relative transition-all duration-1000 ease-in-out">
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
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref="#"
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
    </section>
  );
};

export default TheThreePillars;