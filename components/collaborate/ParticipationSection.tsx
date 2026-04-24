"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import { Container } from "../common/Container";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import CTABtn from "../common/CTABtn";

const modules = [
 {
    name: "Circle",
    description: "A collaborative space for unfiltered dialogue, bringing together diverse voices to shape the cultural and creative landscape.",
  },
  {
    name: "Core",
    description: "The architectural foundation of our vision, where structural integrity meets the fluid needs of modern society through innovative design.",
  },
  {
    name: "Object",
    description: "Exploring the boundary between art and utility through a curated collection of physical artifacts that redefine spaces.",
  },
  {
    name: "Elevate",
    description: "A dedicated platform designed to amplify emerging talent and high-concept projects within the global design community.",
  },
  {
    name: "Brand Participations",
    description: "Bridging the gap between corporate identity and immersive physical experience design through spatial storytelling.",
  },
  {
    name: "Sponsorships",
    description: "Empowering the creative economy by providing brands with high-impact platforms to integrate with global design movements.",
  },
  {
    name: "Media Enquiry",
    description: "For press kits, interview requests, and media collaborations, reach out to our communications team for official insights.",
  },
];

export default function ParticipationSection() {
  const [active, setActive] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container className="w-full bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <SectionHeading
        titleMain="Featured "
        titleBold="Story"
        sticky={false}
        isSectionHovered={isHovered}
        className=' !border-t-0'
      />

      {/* ==========================================================
          MOBILE & TABLET VIEW
      ========================================================== */}
      <div className="md:hidden flex flex-col">
        {modules.map((item, index) => {
          const isActive = active === item.name;

          return (
            <div
              key={index}
              className="border-b border-neutral-100 overflow-hidden"
              onClick={() => setActive(isActive ? null : item.name)}
            >
              <div className={`flex justify-between items-center py-6 px-4 transition-colors duration-300 ${isActive ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <span className="text-lg font-medium tracking-tight uppercase">
                  {item.name}
                </span>
                <span className="text-xl">
                  {isActive ? <FiMinus /> : <FiPlus />}
                </span>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 1] }}
                className="bg-black overflow-hidden"
              >
                <div className="px-6 py-4">
                  <p className="text-white text-[15px] font-normal leading-relaxed opacity-80">
                    {item.description}
                  </p>
                </div>

                <div className="px-4 py-8 flex justify-start">
                  <CTABtn
                    label="Apply Now"
                    iconType="arrow"
                    btnBg="var(--color-white)"
                    btnHoverBg="var(--primary-blue)"
                    textColor="var(--color-black)"
                    borderColor="var(--color-white)"
                    borderHoverColor="transparent"
                    lineColor="var(--color-black)"
                    lineHoverColor="var(--color-black)"
                    bottomKey1Width="40px"
                    bottomKey2Width="12px"
                    bottomKey1Right="50px"
                    bottomKey2Right="15px"
                    href="#apply"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ==========================================================
          DESKTOP VIEW (Images Removed, Text Added)
      ========================================================== */}
      <div className="hidden md:grid grid-cols-[70%_30%]">
        {/* Left Column */}
        <div className="flex flex-col">
          {modules.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(item.name)}
              onMouseLeave={() => setActive(null)}
              className={`group flex justify-between items-center py-5 cursor-pointer transition-all ${active === item.name ? "bg-black text-white" : "text-black"}`}
            >
              <div className="text-lg md:text-xl font-medium px-14">
                {item.name}
              </div>
              <div className="text-sm md:text-base opacity-70 group-hover:opacity-100 transition px-14">
                Apply Now
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (Purely Text-based now) */}
        <div className={`relative overflow-hidden transition-colors ${active ? "bg-black" : "bg-white"}`}>
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <AnimatePresence mode="wait">
              {modules.map((mod, i) => (
                active === mod.name && (
                  <motion.div
                    key={mod.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-left"
                  >
                    <h4 className="text-white text-3xl font-medium tracking-tight mb-2">
                      {mod.name}
                    </h4>
                    <p className="text-white text-base lg:text-lg font-normal leading-relaxed">
                      {mod.description}
                    </p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Container>
  );
}