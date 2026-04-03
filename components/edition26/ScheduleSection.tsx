"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setActiveDate((prev) => {
      const currentIndex = DATES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % DATES.length;
      return DATES[nextIndex];
    });
  }, []);

  // Auto-cycle logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000); // Change slide every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = (date: DateKey) => {
    setActiveDate(date);
    setIsAutoPlaying(false); // Stop auto-playing when user manually interacts
  };

  return (
    <section 
      className="w-full bg-black pt-8 pb-10 flex flex-col font-['Montserrat',sans-serif]"
      onMouseEnter={() => setIsAutoPlaying(false)} // Pause on hover
      onMouseLeave={() => setIsAutoPlaying(true)}  // Resume when mouse leaves
    >
      
      {/* 1. HEADER */}
      <div className="flex items-center gap-3 pb-6 px-[60px]">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-[14px] h-[14px] bg-[#E02914] opacity-20 rounded-full blur-[6px]" />
          <div className="w-[7px] h-[7px] bg-[#E02914] rounded-full" />
        </div>
        <h2 className="text-[20px] text-white leading-none tracking-tight">
          <span className="font-medium">Schedule_</span>
          <span className="font-bold">2026</span>
        </h2>
      </div>

      {/* 2. PRIMARY CONTAINER (20% | 80%) */}
      <div className="relative w-full flex flex-col md:flex-row items-stretch border-t border-b border-white/20 px-[40px] overflow-hidden min-h-[220px]">
        
        {/* LEFT COLUMN - Static Label */}
        <div className="w-full md:w-[15%] flex flex-col justify-center py-8 md:py-0 border-b md:border-b-0 md:border-r border-white/20 z-10">
          <div className="text-white">
            <h3 className="text-[26px] font-medium leading-[0.9] tracking-tighter flex items-baseline">
              <span>DAY&nbsp;0</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeDate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }} // Slightly slower for auto-cycle feel
                >
                  {SCHEDULE_DATA[activeDate].digit}
                </motion.span>
              </AnimatePresence>
            </h3>
            <p className="text-[20px] font-medium mt-1">Schedule</p>
          </div>
        </div>

        {/* RIGHT COLUMN - Nested content */}
        <div className="w-full md:w-full flex flex-col md:flex-row items-center relative py-10 md:py-0">
          
          <div className="flex-1 pl-4 pr-4 z-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeDate + "desc"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white text-[18px] md:text-[18px] font-normal leading-[1.4] tracking-tight"
              >
                {SCHEDULE_DATA[activeDate].description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="w-full md:w-[260px] aspect-video relative overflow-hidden z-10 mt-6 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeDate + "img"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={SCHEDULE_DATA[activeDate].image}
                className="w-full h-full object-cover grayscale"
              />
            </AnimatePresence>
          </div>

          <div className="w-full md:w-[300px] flex items-start top-10 pl-4 justify-center md:justify-end relative mt-10 md:mt-0 h-full">
            <div className="flex items-center gap-8 z-20">
              <div className="flex items-center gap-6">
                {DATES.map((date) => (
                  <div 
                    key={date} 
                    className="relative flex items-center justify-center w-[32px] h-[32px]"
                    onMouseEnter={() => handleInteraction(date)}
                  >
                    {activeDate === date && (
                      <>
                        <motion.div 
                          layoutId="verticalLine"
                          className="absolute hidden md:block w-[1px] bg-white pointer-events-none"
                          style={{ 
                              top: '-600px', 
                              bottom: '-600px',
                              left: '50%',
                              translateX: '-50%' 
                          }}
                          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                        />
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-white"
                          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                        />
                      </>
                    )}
                    <button
                      onClick={() => handleInteraction(date)}
                      className={`relative z-10 text-[18px] font-semibold transition-colors duration-300 ${
                        activeDate === date ? "text-black" : "text-white/40"
                      }`}
                    >
                      {date}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-start text-white gap-1">
                <span className="text-[18px] font-semibold uppercase tracking-wide">May-26</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;