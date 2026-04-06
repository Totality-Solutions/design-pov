"use client";

import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Image from "next/image";
import { motion, useSpring, AnimatePresence } from 'framer-motion';

// 1. Data Set with Mobile (Fixed), Tablet (New), and Desktop (Fixed)
const themeData = [
  { 
    id: 1, w: 220, h: 280, img: "/temp/theme/2.png",
    desktop: { top: '5%', left: '5%' },
    tablet: { top: '5.5%', left: '10%' }, // In-between
    mobile: { top: '6%', left: '16%' } 
  },
  { 
    id: 2, w: 320, h: 320, img: "/temp/theme/2.png",
    desktop: { top: '10%', left: '70%' },
    tablet: { top: '14%', left: '62%' },
    mobile: { top: '18%', left: '50%' } 
  },
  { 
    id: 3, w: 320, h: 200, img: "/temp/theme/3.png",
    desktop: { top: '35%', left: '40%' },
    tablet: { top: '35.5%', left: '35%' },
    mobile: { top: '36%', left: '30%' } 
  },
  { 
    id: 4, w: 200, h: 260, img: "/temp/theme/4.png",
    desktop: { top: '55%', left: '15%' },
    tablet: { top: '54%', left: '15%' },
    mobile: { top: '53%', left: '15%' } 
  },
  { 
    id: 5, w: 280, h: 350, img: "/temp/theme/6.png",
    desktop: { top: '65%', left: '75%' },
    tablet: { top: '66.5%', left: '62%' },
    mobile: { top: '68%', left: '50%' } 
  },
  { 
    id: 6, w: 200, h: 180, img: "/temp/theme/6.png",
    desktop: { top: '80%', left: '5%' },
    tablet: { top: '81%', left: '10%' },
    mobile: { top: '82%', left: '15%' } 
  },
  { 
    id: 7, w: 220, h: 330, img: "/temp/theme/7.png",
    desktop: { top: '85%', left: '60%' },
    tablet: { top: '86%', left: '57%' },
    mobile: { top: '87%', left: '55%' } 
  },
];

const Theme2026: NextPage = () => {
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isInsideSection, setIsInsideSection] = useState(false);
  const [isOverCard, setIsOverCard] = useState(false);
  
  // Explicit device state management
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  const springConfig = { damping: 30, stiffness: 500 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setDevice('desktop');
      else if (width >= 768) setDevice('tablet');
      else setDevice('mobile');
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const introTimer = setTimeout(() => {
      setIsIntroActive(false);
      setHighlightedIndices([]);
    }, 4000);

    const interval = setInterval(() => {
      if (!isIntroActive || window.innerWidth < 1024) return;
      setHighlightedIndices([Math.floor(Math.random() * themeData.length)]);
      setTimeout(() => setHighlightedIndices([]), 150);
    }, 450);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(introTimer);
      clearInterval(interval);
    };
  }, [isIntroActive, cursorX, cursorY]);

  return (
    <section 
      onMouseEnter={() => setIsInsideSection(true)}
      onMouseLeave={() => setIsInsideSection(false)}
      className={`relative w-full bg-white h-[180vh] md:h-[260vh] lg:h-[350vh] overflow-visible ${device === 'desktop' ? 'cursor-none' : 'cursor-default'}`}
    >
      
      {/* 1. STICKY BACKGROUND TEXT LAYER */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none z-0 px-6">
        <div className="text-center">
          <h2 className="font-['Montserrat'] text-[40px] md:text-[56px] lg:text-[72px] font-bold text-black leading-none uppercase select-none">
            THEME 2026
          </h2>
          <p className="font-['Montserrat'] text-[16px] md:text-[20px] lg:text-[24px] font-medium text-black/80 mt-2 select-none">
            The New Language of Space
          </p>
        </div>
      </div>

      {/* 2. FLOATING VIEW CURSOR */}
      <AnimatePresence>
        {device === 'desktop' && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100]"
            style={{ x: cursorX, y: cursorY }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isInsideSection ? 1 : 0, 
                opacity: isInsideSection ? 1 : 0,
                width: 100,
                height: 100 
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full font-['Montserrat'] font-bold text-[12px] uppercase tracking-[0.2em] shadow-lg
                         backdrop-blur-[6px] bg-white/5 border-t-[0.1px] border-l-[2px]  border-r-[2px] border-white/30"
            >
              <span className={`${isOverCard ? 'text-white' : 'text-black'} transition-colors duration-300`}>
                View
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SCROLLING FOREGROUND CARDS LAYER */}
      <div className="absolute top-0 left-0 w-full h-full z-10 px-4 md:px-10">
        {themeData.map((item, i) => {
          const isHighlighted = highlightedIndices.includes(i);
          
          // Selection logic for responsive positioning and sizing
          const currentPos = item[device];
          const responsiveScale = device === 'desktop' ? 1 : device === 'tablet' ? 0.8 : 0.5;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setIsOverCard(true)}
              onMouseLeave={() => setIsOverCard(false)}
              className="absolute overflow-hidden group shadow-lg rounded-sm bg-white"
              style={{ 
                width: item.w * responsiveScale, 
                height: item.h * responsiveScale, 
                top: currentPos.top, 
                left: currentPos.left 
              }}
              animate={{
                scale: isHighlighted ? 1.05 : 1,
              }}
            >
              <div className={`absolute inset-0 transition-opacity duration-500 
                ${device === 'desktop' ? 'group-hover:opacity-0' : 'opacity-100'}`}>
                <Image
                  src={item.img}
                  alt="Theme Design"
                  fill
                  sizes={device === 'desktop' ? "30vw" : "50vw"}
                  className="object-cover"
                />
              </div>

              {device === 'desktop' && (
                <div className="absolute inset-0 bg-[var(--primary-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}

              {/* Mobile/Tablet Clickability Indicator */}
              {device !== 'desktop' && (
                <div className="absolute top-[45%] right-[45%] z-20">
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-white/20"></span>
                  </span>
                </div>
              )}
              
              <div className="absolute inset-0 border border-black/5" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Theme2026;