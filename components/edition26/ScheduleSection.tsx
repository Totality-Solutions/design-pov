"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';

const SCHEDULE_DATA = {
  "15": {
    digit: "1",
    description: "The Circle created a live space for open, unfiltered dialogue - bringing together voices shaping India’s cultural landscape.",
  },
  "16": {
    digit: "2",
    description: "Architectural blueprints of tomorrow: where structural integrity meets the fluid needs of a modern society.",
  },
  "17": {
    digit: "3",
    description: "Defining the bridge between brand identity and physical experience design through immersive installations.",
  }
};

type DateKey = "15" | "16" | "17";
const DATES: DateKey[] = ["15", "16", "17"];

const ScheduleSection = () => {
  const [activeDate, setActiveDate] = useState<DateKey>("15");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveDate((prev) => {
      const currentIndex = DATES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % DATES.length;
      return DATES[nextIndex];
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = (date: DateKey) => {
    setActiveDate(date);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      className="w-full relative min-h-screen lg:min-h-[500px] flex flex-col font-display overflow-hidden bg-black"
      onMouseEnter={() => {
        setIsAutoPlaying(false);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsAutoPlaying(true);
        setIsHovered(false);
      }}
    >
      {/* 1. CONSTANT BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/temp/about/1.png" // Your constant image path
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Constant Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/40" />  */}
      </div>

      {/* 2. CONTENT LAYER (Foreground) */}
      <div className="relative z-10 flex flex-col h-full flex-1">
        
        {/* HEADING (Transparent background to show constant image behind) */}
        <SectionHeading 
          titleMain="Circle Schedule " 
          titleBold="2026" 
          sticky={false}
          bgColor="transparent" 
          textColor="text-white"
          isSectionHovered={isHovered} 
        >
          <div className="hidden md:flex gap-[100px]">
            <span className="opacity-60 text-[16px] lg:text-lg font-medium text-white">POV_Insights</span>
            <span className="opacity-60 text-[16px] lg:text-lg font-medium text-white">Volume_01</span>
          </div>
        </SectionHeading>

        {/* 3. PRIMARY CONTAINER (Solid Black Background) */}
        <div className="relative w-full flex flex-col lg:flex-row items-stretch px-[20px] lg:px-[60px] overflow-hidden min-h-[350px] bg-black">
          
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[15%] flex flex-row lg:flex-col justify-between lg:justify-center py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/20 z-10">
            <div className="text-white">
              <h3 className="text-[32px] lg:text-[42px] font-bold leading-[0.8] tracking-tighter flex items-baseline">
                <span>DAY&nbsp;0</span>
                <AnimatePresence mode="wait">
                  <motion.span key={activeDate} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {SCHEDULE_DATA[activeDate].digit}
                  </motion.span>
                </AnimatePresence>
              </h3>
              <p className="text-[18px] lg:text-[20px] font-medium uppercase lg:normal-case">Schedule</p>
            </div>

            {/* Mobile Date Picker */}
            <div className="flex lg:hidden items-center gap-4 pt-2">
              <div className="flex gap-3">
                {DATES.map((date) => (
                  <div key={date} className="relative flex items-center justify-center w-[32px] h-[32px]">
                     {activeDate === date && (
                        <>
                          <motion.div layoutId="verticalLineMobile" className="absolute w-[1px] bg-white pointer-events-none" style={{ top: '-100px', bottom: '100%', left: '50%' }} transition={{ type: "spring", bounce: 0, duration: 0.6 }} />
                          <motion.div layoutId="activeIndicatorMobile" className="absolute inset-0 bg-white" transition={{ type: "spring", bounce: 0, duration: 0.6 }} />
                        </>
                      )}
                    <button onClick={() => handleInteraction(date)} className={`relative z-10 text-[18px] font-bold transition-colors duration-300 ${activeDate === date ? "text-black" : "text-white/40"}`}>
                      {date}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:flex-1 flex flex-col lg:flex-row items-center relative py-8 lg:py-0">
            <div className="flex-1 lg:pl-10 lg:pr-10 z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeDate + "desc"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-white text-[16px] lg:text-[20px] font-normal leading-[1.4] tracking-tight"
                >
                  {SCHEDULE_DATA[activeDate].description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* DESKTOP DATE SELECTOR */}
            <div className="hidden lg:flex w-[300px] items-start pl-10 justify-end relative h-full">
              <div className="flex items-center gap-8 z-20 h-full">
                <div className="flex items-center gap-6 h-full">
                  {DATES.map((date) => (
                    <div key={date} className="relative flex items-center justify-center w-[32px] h-[32px]" onMouseEnter={() => handleInteraction(date)}>
                      {activeDate === date && (
                        <>
                          <motion.div layoutId="verticalLine" className="absolute w-[1px] bg-white" style={{ top: '-600px', bottom: '-600px', left: '50%' }} transition={{ type: "spring", bounce: 0, duration: 0.6 }} />
                          <motion.div layoutId="activeIndicator" className="absolute inset-0 bg-white" transition={{ type: "spring", bounce: 0, duration: 0.6 }} />
                        </>
                      )}
                      <button className={`relative z-10 text-[18px] font-semibold transition-colors ${activeDate === date ? "text-black" : "text-white/40"}`}>
                        {date}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="text-white text-[18px] font-semibold uppercase">May-26</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;