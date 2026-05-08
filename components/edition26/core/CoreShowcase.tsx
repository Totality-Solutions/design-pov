"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ShowcaseModal } from './ShowcaseModal';
import { coreData, CoreItem } from "@/data/coreData";

const StatusDot = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-[25px] h-[25px] flex items-center justify-center shrink-0">
    <div
      className={`absolute w-[16px] h-[16px] rounded-full blur-[8px] transition-all duration-500 ease-out ${isActive ? "opacity-80 scale-125" : "opacity-0 scale-0"}`}
      style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%)' }}
    />
    <div className={`relative w-[7px] h-[7px] rounded-full z-10 bg-primary-red transition-all duration-500 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
  </div>
);

export const CoreShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDesigner, setSelectedDesigner] = useState<CoreItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const designerId = searchParams.get('designer');
    if (designerId) {
      const item = coreData.find(d => d.id === designerId);
      if (item) setSelectedDesigner(item);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- DESKTOP SCROLL LOGIC (TOUCH NAY KARNA) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollPoints = coreData.map((_, i) => i / (coreData.length - 1));
  const transformPoints = coreData.map((_, i) => `${25 - (i * 50)}%`);
  const yTranslate = useTransform(scrollYProgress, scrollPoints, transformPoints);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      const index = Math.min(
        Math.round(latest * (coreData.length - 1)),
        coreData.length - 1
      );
      if (index !== activeIndex) setActiveIndex(index);
    }
  });

  return (
    <>
      <section 
        ref={containerRef} 
        className={`relative bg-white ${isMobile ? 'h-auto py-10' : 'h-[800vh]'}`}
      >
        <div className={`
          w-full flex items-center justify-between px-6 md:px-20
          ${isMobile ? 'relative flex-col' : 'sticky top-0 h-screen overflow-hidden'}
        `}>
          
          {/* Left Column (Desktop Only) */}
          <div className="w-[25%] hidden lg:flex flex-col gap-8">
            {coreData.slice(0, 8).map((item, i) => (
              <motion.div
                key={item.id}
                animate={{ opacity: activeIndex === i ? 1 : 0.15, x: activeIndex === i ? 10 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 cursor-default"
              >
                <StatusDot isActive={activeIndex === i} />
                <h3 className="text-body-tab font-semibold ">{item.label}</h3>
              </motion.div>
            ))}
          </div>

          {/* Middle Stack: Mobile (Natural) vs Desktop (Sticky) */}
          <div className={`relative w-full lg:w-[450px] ${isMobile ? 'h-auto pt-0' : 'h-full overflow-hidden'}`}>
            <motion.div 
              style={{ y: isMobile ? 0 : yTranslate }} 
              className={`flex flex-col w-full ${isMobile ? 'h-auto gap-3' : 'h-full'}`}
            >
              {coreData.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.div 
                    key={item.id} 
                    // Mobile-only active detection via Viewport
                    onViewportEnter={() => isMobile && setActiveIndex(i)}
                    viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
                    
                    className={`
                      relative w-full flex-shrink-0 cursor-pointer group transition-all duration-500
                      ${isMobile ? 'h-[45vh] mb-4' : 'h-1/2'}
                    `}
                    onClick={() => setSelectedDesigner(item)}
                  >
                    <div className="relative w-full h-full p-2 md:p-8">
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        sizes="(max-width: 1024px) 100vw, 450px"
                        className={`object-contain transition-all duration-700 ${
                          isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-30'
                        }`}
                      />
                    </div>
                    
                    {/* Active Overlay for Mobile Viewport */}
                    <motion.div 
                      animate={{ opacity: isActive ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="border border-white/20 px-4 py-2 bg-black/60 backdrop-blur-md lg:hidden">
                        <p className="text-[10px] text-white font-bold tracking-widest uppercase">
                          View Designer
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column (Desktop Only) */}
          <div className="w-[25%] hidden lg:flex flex-col gap-8 text-right">
            {coreData.slice(8, 16).map((item, i) => (
              <motion.div
                key={item.id}
                animate={{ opacity: activeIndex === i + 8 ? 1 : 0.15, x: activeIndex === i + 8 ? -10 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-end gap-4 cursor-default"
              >
                <h3 className="text-body-tab font-semibold ">{item.label}</h3>
                <StatusDot isActive={activeIndex === i + 8} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ShowcaseModal 
        isOpen={!!selectedDesigner} 
        onClose={() => setSelectedDesigner(null)} 
        data={selectedDesigner} 
      />
    </>
  );
};