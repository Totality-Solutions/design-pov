"use client";
import { cdn } from "@/lib/cdn";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ThemeIntro() {
  // Motion Blur Animation Variants
  const blurVariants = {
    initial: {
      filter: "blur(0px)",
      scaleX: 1,
      x: 0,
      opacity: 0, // Initially hidden
    },
    hover: {
      filter: "blur(2px)", 
      scaleX: 1.03, 
      x: 0, 
      opacity: 0.6,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative w-full py-12 px-6 md:px-10 overflow-hidden font-montserrat min-h-[60vh] flex items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cdn("/temp/theme/theme-bg.png")}
          alt="Theme Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-10">
        {/* Top Paragraph */}
        <div className="mb-12">
          <p className="text-[16px] md:text-[18px] text-black/90 font-medium leading-relaxed">
            Every creative mind brings a unique perspective shaped by memory, intention, and imagination. 
            At Design POV, the theme acts not as a constraint, but as a catalyst—guiding inspiration, 
            collaboration, and storytelling. Shared by all architecture and design firms, it becomes 
            a common language that ties together installations and spatial narratives. Each participant 
            interprets it in their own way, creating diverse expressions that come together as 
            one cohesive, living dialogue.
          </p>
        </div>

        {/* Main Heading Container */}
        {/* 'whileHover' here ensures the child motion.span reacts correctly */}
        <motion.div 
          initial="initial"
          whileHover="hover"
          className="mb-12 cursor-default w-fit"
        >
          <h1 className="text-h1-mobile md:text-h1-tab lg:text-h1 font-bold text-black uppercase leading-tight tracking-tighter">
            THEME 2026 :{" "}
            <span className="relative inline-block overflow-visible">
              {/* Base Static Text */}
              <span className="italic font-bold">SENSE & SENSIBILITY</span>
              
              {/* Animated Motion Layer - Image effect achieved via variants */}
              <motion.span
                variants={blurVariants}
                className="absolute inset-0 italic font-bold pointer-events-none select-none whitespace-nowrap"
                aria-hidden="true"
              >
                SENSE & SENSIBILITY
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Bottom Paragraph */}
        <div className="">
          <p className="text-[16px] md:text-[18px] text-black/90 font-medium leading-relaxed">
            Good design isn't just seen, it's experienced. "Sense & Sensibility" explores how spaces, 
            objects, and environments interact with all five senses and the emotions they evoke. 
            It encourages architects and designers to go beyond the visual, crafting designs that 
            feel alive. It calls on brands to present materials, finishes, and innovations in 
            ways that stir instinct, memory, and emotion. At its heart, this theme celebrates 
            the sensorial symphony that great design orchestrates.
          </p>
        </div>
      </div>
    </section>
  );
}