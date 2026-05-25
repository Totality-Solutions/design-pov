"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CTAStrip from '@/components/common/CTAStrip';
import CTABtn from '../common/CTABtn';
import SectionHeading from '../common/SectionHeading';

import { cdn } from '@/lib/cdn'

interface Pillar {
  id: string;
  title: string;
  description: string;
  image: any;
  buttonLabel: string;
  buttonHref?: string;
}

const PILLAR_DATA: Pillar[] = [
  {
    id: "arch",
    title: "Architect Firms (The Core):",
    description: "Shape the vision: translating ideas into immersive, narrative-led environments.",
    image: cdn('/temp/about/1600-x-1200.png'),
    buttonLabel: "Explore",
    buttonHref:"/edition/core"
  },
  {
    id: "brand",
    title: "Home & Lifestyle Brands:",
    description: "Enable the narrative: bringing material, product, and innovation into context.",
    image: cdn('/temp/about/1600-x-1200.-1.png'),
    buttonLabel: "Explore",
    buttonHref:"/edition/brands"
  },
  {
    id: "build",
    title: "Build Partners:",
    description: "Realise the vision: transforming concepts into precise, tangible spaces.",
    image: cdn('/temp/about/build-partner.png'),
    buttonLabel: "Explore",
    buttonHref:"/edition/theme"
  }
];

const TheThreePillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    if (window.innerWidth >= 768) {
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
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. SECTION HEADER */}
      <SectionHeading 
        titleMain="Our " 
        titleBold="Pillars" 
        sticky={!isMobile} 
        stickyTop="lg:top-20"
        isSectionHovered={isHovered} 
      >
        {/* <div className="hidden md:flex gap-[60px] lg:gap-[100px]">
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Vol. 01</span>
        </div> */}
      </SectionHeading>

      <div className="relative flex flex-col md:flex-row items-start w-full">
        
        {/* DESKTOP SIDEBAR - Unchanged */}
        <div className="hidden lg:flex w-[388px] 2xl:w-[25vw] sticky top-0 h-screen pl-[70px] py-20 flex-col justify-end pb-20 border-r border-[#DFDFDF] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-[40px]"
            >
              <div className="flex flex-col gap-2.5 max-w-[288px] 2xl:max-w-[500px]">
                <h3 className="text-[22px] 2xl:text-[24px] font-bold text-black tracking-wider uppercase">
                  {PILLAR_DATA[activePillar].title}
                </h3>
                <p className="text-base 2xl:text-[18px] font-normal text-black opacity-70 leading-[1.3]">
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
                href={PILLAR_DATA[activePillar].buttonHref}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SCROLLING CONTENT Area with Mobile Stacking */}
        <div className="flex-1 w-full bg-white">
          {PILLAR_DATA.map((pillar, index) => (
            <div 
              key={pillar.id}
              data-index={index}
              /* STACKING LOGIC: 
                 - sticky top-0: makes the card stick to top
                 - bg-white: hides the card underneath
                 - shadow: adds depth to the stack
                 - z-index: ensures the last card is at bottom, or you can manually set it
              */
              className="pillar-image-trigger w-full lg:h-screen flex pt-4 pb-8 lg:pt-0 lg:pb-0 flex-col md:border-b border-[#DFDFDF] last:border-b-0 relative 
                         sticky lg:top-0 top-20 lg:relative bg-white"
              style={{ zIndex: index + 1 }}
            >
              {/* MOBILE ONLY TEXT */}
              <div className="lg:hidden flex flex-col py-4 pb-8 px-6 gap-6 bg-white border-b border-[#DFDFDF]">
                <div className="flex flex-col gap-3">
                  <h3 className="text-[20px] font-bold text-black tracking-tight uppercase leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black opacity-70 leading-[1.4]">
                    {pillar.description}
                  </p>
                </div>
                <div>
                  <CTABtn label={pillar.buttonLabel} href="#tickets" />
                </div>
              </div>

              {/* IMAGE CONTAINER */}
              <div className="p-6 md:p-[40px] flex items-center justify-center bg-white md:bg-transparent">
                <div className="w-full h-[45vh] md:h-[90vh] aspect-[3/2] relative overflow-hidden">
                  <Image 
                    src={pillar?.image} 
                    alt={pillar?.title} 
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FULL WIDTH CTA STRIP */}
      <div className="w-full z-10 bg-white border-t border-b border-[#DFDFDF]">
        <CTAStrip
          title="Become a part of a design led platform like no other."
          ctaLabel="Apply Now"
          ctaHref="/collaborate"
          hoverBgColor="#000000"
          textColor="var(--primary-red)"
          hoverTextColor="var(--color-white)"
        />
      </div>
    </section>
  );
};

export default TheThreePillars;