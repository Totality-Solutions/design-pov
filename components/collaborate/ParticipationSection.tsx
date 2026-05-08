"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import { Container } from "../common/Container";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import CTABtn from "../common/CTABtn";
import ParticipationPopup from "./ParticipationPopup";

const modules = [
  { name: "Circle", href: "/edition/schedule", description: "A collaborative space for unfiltered dialogue, bringing together diverse voices to shape the cultural and creative landscape." },
  { name: "Core", href: "/edition/core", description: "The architectural foundation of our vision, where structural integrity meets the fluid needs of modern society through innovative design." },
  { name: "Object", href: "/ecosystem/objects", description: "Exploring the boundary between art and utility through a curated collection of physical artifacts that redefine spaces." },
  { name: "Elevate", href: "/ecosystem/elevate", description: "A dedicated platform designed to amplify emerging talent and high-concept projects within the global design community." },
  { name: "Brand Participations", href: "/edition/brand", description: "Bridging the gap between corporate identity and immersive physical experience design through spatial storytelling." },
  { name: "Partnership", href: "/edition/brand", description: "Empowering the creative economy by providing brands with high-impact platforms to integrate with global design movements." },
  { name: "Media Enquiry", href: "/contact", description: "For press kits, interview requests, and media collaborations, reach out to our communications team for official insights." },
];

export default function ParticipationSection() {
  const [active, setActive] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container className="w-full bg-white" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <SectionHeading titleMain="Featured " titleBold="Story" sticky={false} isSectionHovered={isHovered} className=' !border-t-0' />

      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col">
        {modules.map((item, index) => {
          const isActive = active === item.name;
        
          return (
            <div key={index} className="border-b border-neutral-100 overflow-hidden">
              
              {/* HEADER ROW */}
              <div
                className={`flex justify-between items-center py-6 px-4 transition-colors duration-300 ${
                  isActive ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {/* ✅ TITLE → NAVIGATION */}
                <a href={item.href} className="text-lg font-medium tracking-tight">
                  {item.name}
                </a>
                              
                {/* Animated Icon */}
                <motion.button
                  initial="initial"
                  animate={isActive ? "hover" : "initial"}
                  onClick={() => setActive(isActive ? null : item.name)}
                  className="relative w-8 h-8 flex items-center justify-center"
                >
                  <motion.div
                    className="relative w-4 h-4 flex items-center justify-center"
                    variants={{ 
                      initial: { rotate: 0 }, 
                      hover: { rotate: 45 } 
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Horizontal line (Always visible) */}
                    <div className="absolute w-full h-[1.5px] bg-current" />

                    {/* Vertical line (Appears to complete the X) */}
                    <motion.div 
                      className="absolute w-[1.5px] h-full bg-current" 
                      variants={{ 
                        initial: { opacity: 0 }, 
                        hover: { opacity: 1 } 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.button>
              </div>
              
              {/* ACCORDION */}
              <motion.div
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                }}
                className="bg-black overflow-hidden"
              >
                <div className="px-6 py-4">
                  <p className="text-white text-[15px] opacity-80">
                    {item.description}
                  </p>
                </div>
              
                <div
                  className="px-4 py-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(item.name);
                  }}
                >
                  <CTABtn
                    label="Apply Now"
                    iconType="arrow"
                    btnBg="var(--primary-blue)"
                    textColor="white"
                    borderColor="var(--primary-blue)"
                    href="javascript:void(0)"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:grid grid-cols-[70%_30%]">
        {/* Left Column */}
        <div className="flex flex-col">
          {modules.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(item.name)}
              onMouseLeave={() => setActive(null)}
              className={`group flex justify-between items-center py-5 transition-all ${
                active === item.name ? "bg-black text-white" : "text-black"
              }`}
            >
              {/* 1. Project Name with Redirect and Underline */}
              <a 
                href={item.href}
                className="relative text-lg md:text-xl font-medium px-14 cursor-pointer w-fit
                  after:content-[''] 
                  after:absolute 
                  after:left-14 
                  after:bottom-0 
                  after:h-[1px] 
                  after:w-[calc(100%-112px)] 
                  after:bg-current 
                  after:scale-x-0 
                  after:origin-right 
                  after:transition-transform 
                  after:duration-300 
                  after:ease-out
                  hover:after:scale-x-100 
                  hover:after:origin-left"
              >
                {item.name}
              </a>
            
              {/* 2. Apply Now - Opens Popup Only */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(item.name);
                }}
                className="text-sm md:text-base opacity-70 group-hover:opacity-100 transition px-14 relative cursor-pointer w-fit
                  after:content-[''] 
                  after:absolute 
                  after:left-14 
                  after:bottom-0 
                  after:h-[1px] 
                  after:w-[calc(100%-112px)] 
                  after:bg-white 
                  after:scale-x-0 
                  after:origin-right 
                  after:transition-transform 
                  after:duration-300 
                  after:ease-out
                  hover:after:scale-x-100 
                  hover:after:origin-left"
              >
                Apply Now
              </div>
            </div>
          ))}
        </div>
        
        {/* Right Column (Purely Text-based) */}
        <div className={`relative transition-colors ${active ? "bg-black" : "bg-white"}`}>
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <AnimatePresence mode="wait">
              {modules.map((mod) => active === mod.name && (
                <motion.div 
                  key={mod.name} 
                  initial={{ opacity: 0, x: 10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }} 
                  className="text-left"
                >
                  <h4 className="text-white text-3xl font-medium mb-2">{mod.name}</h4>
                  <p className="text-white text-base lg:text-lg opacity-80">{mod.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ParticipationPopup isOpen={!!selectedCategory} onClose={() => setSelectedCategory(null)} category={selectedCategory || ""} />
    </Container>
  );
}