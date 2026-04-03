"use client";

import React, { useState, useEffect } from "react";

type Slide = {
  bgText: string;
  label: string;
};

const SLIDES: Slide[] = [
  { bgText: "DESIGN POV", label: "" },
  { bgText: "THE PHILOSOPHY", label: "The Philosophy" },
  { bgText: "WHY WE EXIST", label: "Why We Exist" },
  { bgText: "WHAT MAKES US DIFFERENT", label: "What Makes Us Different" },
];

const typingSpeed = 80;
const deletingSpeed = 40;
const pauseTime = 1200;

const DesignHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentText = SLIDES[currentIndex].bgText;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section className="relative w-full h-full bg-white px-6 md:px-12 lg:px-20 pt-24 pb-10 flex flex-col font-['Montserrat',sans-serif] overflow-hidden">
      
      {/* 1. TYPEWRITER HEADER */}
      {/* Mobile: Light gray/Smaller | Desktop: Black-opacity/Huge */}
      <div className="relative h-[120px] md:h-[120px] mb-12 md:mb-0">
        <h1 className="absolute top-0 left-0 text-[#E5E5E5] lg:text-black/10 text-[40px] md:text-5xl lg:text-[65px] font-bold uppercase leading-none tracking-tighter whitespace-wrap">
          {displayText}
        </h1>
      </div>

      {/* 2. CONTENT WRAPPER */}
      {/* Desktop: Horizontal (lg:flex-row) | Mobile: Vertical (flex-col) */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 lg:gap-0 mb-0 md:mb-16">
        
        {/* LIST SECTION */}
        <div className="flex flex-col gap-3 md:gap-4 mb-12 md:mb-0">
          {SLIDES.slice(1).map((item, index) => {
            const itemIndex = index + 1;
            const isActive = currentIndex === itemIndex;

            return (
              <div
                key={item.label}
                onClick={() => {
                  setCurrentIndex(itemIndex);
                  setDisplayText("");
                  setIsDeleting(false);
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) { // Only hover on desktop
                    setCurrentIndex(itemIndex);
                    setDisplayText("");
                    setIsDeleting(false);
                  }
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

        {/* MISSION STATEMENT */}
        <div className="max-w-full lg:max-w-[700px]">
          <p className="text-left lg:text-right text-black text-[22px] sm:text-2xl md:text-3xl lg:text-[34px] font-medium leading-[1.2] lg:leading-[1.1] tracking-tight">
            This is the moment Design POV stops being{" "}
            <span className="font-bold">“a show”</span> and becomes{" "}
            <span className="font-bold">“a design institution.”</span>
          </p>
        </div>
      </div>

      {/* 3. HERO IMAGE */}
      {/* Fixed aspect-video to keep it cinematic across all devices */}
      <div className="w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden bg-gray-100 mt-12 md:mt-0 rounded-sm">
        <img
          src="https://placehold.co/1920x1080" 
          alt="Design POV"
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />
      </div>
      
    </section>
  );
};

export default DesignHero;