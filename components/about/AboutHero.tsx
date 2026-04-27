"use client";

import React, { useState, useEffect } from "react";

type Slide = {
  bgText: string;
  label: string;
  statement: string;
};

const SLIDES: Slide[] = [
  { 
    bgText: "THE PHILOSOPHY", 
    label: "The Philosophy", 
    statement: "Design POV is built on a simple belief: design is not neutral."
  },
  { 
    bgText: "WHY WE EXIST", 
    label: "Why We Exist", 
    statement: "To move beyond transactional formats that prioritise display over dialogue."
  },
  { 
    bgText: "WHAT MAKES US DIFFERENT", 
    label: "What Makes Us Different", 
    statement: "We don't exist in isolation. We’re built through collaboration and experienced in context."
  },
];

const DesignHero: React.FC<{}> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative w-full h-full bg-white px-6 md:px-10  md:pt-24 pt-12 pb-5 md:pb-10 flex flex-col font-display overflow-hidden">
      
      {/* 1. HEADER - Background text now matches the 3 labels exactly */}
      <div className="relative h-[120px] md:h-[120px] mb-6 md:mb-0">
        {SLIDES.map((slide, index) => (
          <h1
            key={index}
            className={`absolute top-0 left-0 text-[#E5E5E5] lg:text-black/10 text-[40px] md:text-5xl lg:text-[65px] font-bold uppercase leading-none tracking-tighter whitespace-wrap transition-opacity duration-700 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.bgText}
          </h1>
        ))}
      </div>

      {/* 2. CONTENT WRAPPER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 lg:gap-0 mb-0 md:mb-16">
        
        {/* LIST SECTION */}
        <div 
          className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {SLIDES.map((item, index) => {
            const isActive = currentIndex === index;

            return (
              <div
                key={item.label}
                onClick={() => setCurrentIndex(index)}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) setCurrentIndex(index);
                }}
                className={`flex items-center cursor-pointer transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-30 lg:opacity-40"
                }`}
              >
                <span className="text-xl mr-3 font-light">—</span>
                <p className="text-black text-[18px] lg:text-[16px] font-medium lg:font-semibold lg:uppercase tracking-tight lg:tracking-widest">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* MISSION STATEMENT (DYNAMIC) */}
        <div className="relative w-full lg:max-w-[700px] h-[100px] sm:h-[80px] lg:h-[110px]">
          {SLIDES.map((slide, index) => (
            <p 
              key={index}
              className={`absolute bottom-0 left-0 lg:right-0 text-left lg:text-right text-black text-[22px] sm:text-2xl md:text-3xl lg:text-[34px] font-medium leading-[1.2] lg:leading-[1.1] tracking-tight transition-all duration-700 transform ${
                currentIndex === index 
                  ? "opacity-100 " 
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {slide.statement}
            </p>
          ))}
        </div>
      </div>

      {/* 3. HERO IMAGE */}
      <div className="group w-full aspect-[16/6] overflow-hidden bg-gray-100 mt-12 md:mt-0 ">
        <img
          src="/temp/about/1.png"
          alt="Design POV"
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />
      </div>
      
    </section>
  );
};

export default DesignHero;