"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';

const SCHEDULE_DATA = {
  "15": {
    digit: "1",
    description: "The Circle created a live space for open, unfiltered dialogue - bringing together voices shaping India’s cultural landscape.",
    image: "/images/day1.jpg"
  },
  "16": {
    digit: "2",
    description: "Architectural blueprints of tomorrow: where structural integrity meets the fluid needs of a modern society.",
    image: "/images/day2.jpg"
  },
  "17": {
    digit: "3",
    description: "Defining the bridge between brand identity and physical experience design through immersive installations.",
    image: "/images/day3.jpg"
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
      className="w-full bg-black pb-10 flex flex-col font-display"
      onMouseEnter={() => {
        setIsAutoPlaying(false);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsAutoPlaying(true);
        setIsHovered(false);
      }}
    >

      <SectionHeading 
        titleMain="Circle Schedule " 
        titleBold="2026" 
        sticky={false}
        bgColor = "black"
        textColor="text-white"
        isSectionHovered={isHovered} 
      >
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">POV_Insights</span>
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Volume_01</span>
        </div>
      </SectionHeading>

      {/* 2. PRIMARY CONTAINER */}
      <div className="relative w-full flex flex-col lg:flex-row items-stretch border-t border-b border-white/20 px-[20px] lg:px-[60px] overflow-hidden min-h-[220px]">
        
        {/* LEFT COLUMN - Static Label */}
        <div className="w-full lg:w-[15%] flex flex-row lg:flex-col justify-between lg:justify-center py-6 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/20 z-10">
          <div className="text-white">
            <h3 className="text-[32px] lg:text-[42px] font-bold leading-[0.8] tracking-tighter flex items-baseline">
              <span>DAY&nbsp;0</span>
              <AnimatePresence mode="wait">
                <motion.span key={activeDate} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {SCHEDULE_DATA[activeDate].digit}
                </motion.span>
              </AnimatePresence>
            </h3>
            <p className="text-[18px] lg:text-[20px] font-medium  uppercase lg:normal-case">Schedule</p>
          </div>

          {/* Mobile Only Date Picker with Vertical Line */}
          <div className="flex lg:hidden items-center gap-4 pt-2">
            <div className="flex gap-3">
              {DATES.map((date) => (
                <div key={date} className="relative flex items-center justify-center w-[32px] h-[32px]">
                   {activeDate === date && (
                      <>
                        {/* Vertical line joining from top only */}
                        <motion.div 
                          layoutId="verticalLineMobile" 
                          className="absolute w-[1px] bg-white pointer-events-none" 
                          style={{ top: '-100px', bottom: '100%', left: '50%' }} 
                          transition={{ type: "spring", bounce: 0, duration: 0.6 }} 
                        />
                        <motion.div 
                          layoutId="activeIndicatorMobile" 
                          className="absolute inset-0 bg-white" 
                          transition={{ type: "spring", bounce: 0, duration: 0.6 }} 
                        />
                      </>
                    )}
                  <button 
                    onClick={() => handleInteraction(date)} 
                    className={`relative z-10 text-[18px] font-bold transition-colors duration-300 ${activeDate === date ? "text-black" : "text-white/40"}`}
                  >
                    {date}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col text-white text-[14px] font-bold uppercase leading-none">
              <span>May</span><span>2026</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:flex-1 flex flex-col lg:flex-row items-center relative py-8 lg:py-0">
          
          <div className="flex-1 lg:pl-10 lg:pr-10 z-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeDate + "desc"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="text-white text-[16px] lg:text-[18px] font-normal leading-[1.4] tracking-tight"
              >
                {SCHEDULE_DATA[activeDate].description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-[260px] aspect-video relative overflow-hidden z-10 mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeDate + "img"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={SCHEDULE_DATA[activeDate].image}
                className="w-full h-full object-cover grayscale"
              />
            </AnimatePresence>
          </div>

          {/* DESKTOP ONLY DATE SELECTOR */}
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
                    <button className={`relative z-10 text-[18px] font-semibold ${activeDate === date ? "text-black" : "text-white/40"}`}>
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
    </section>
  );
};

export default ScheduleSection;