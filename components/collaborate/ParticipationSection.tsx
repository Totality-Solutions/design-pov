"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import { Container } from "../common/Container";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import CTABtn from "../common/CTABtn";

const modules = [
  {
    name: "Core",
    images: [
      '/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg',
    ],
  },
  {
    name: "Circle",
    images: [
      '/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg',
    ],
  },
  {
    name: "Objects",
    images: [
      '/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg',
    ],
  },
  {
    name: "Brands",
    images: [
      '/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg',
    ],
  },
  {
    name: "Sponsorship",
    images: [
      '/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_4.jpg.jpeg',
      '/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg',
    ],
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
        titleMain="Featured_"
        titleBold="Story"
        sticky={false}
        isSectionHovered={isHovered}
        className=' !border-t-0'
      />

      {/* ==========================================================
          MOBILE & TABLET VIEW (Accordion style)
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
              {/* Header Bar */}
              <div className={`flex justify-between items-center py-6 px-4 transition-colors duration-300 ${isActive ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <span className="text-lg font-medium tracking-tight uppercase">
                  {item.name}
                </span>
                <span className="text-xl">
                  {isActive ? <FiMinus /> : <FiPlus />}
                </span>
              </div>

              {/* Collapsible Content */}
              <motion.div
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 1] }}
                className="bg-black overflow-hidden"
              >
                {/* Image Grid Block */}
                <div className="px-4 pt-4">
                  <div className="grid grid-cols-2 gap-2 h-64">
                    <div className="flex flex-col gap-2">
                       <img src={item.images[0]} className="h-[calc(50%-4px)] w-full object-cover" alt="" />
                       <img src={item.images[1]} className="h-[calc(50%-4px)] w-full object-cover" alt="" />
                    </div>
                    <img src={item.images[2]} className="h-full w-full object-cover" alt="" />
                  </div>
                </div>

                {/* Separate Button Block (Clearly below the images) */}
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
          DESKTOP VIEW (Original Side-by-Side)
      ========================================================== */}
      <div className="hidden md:grid grid-cols-[70%_30%]">
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

        <div className={`relative overflow-hidden transition-colors ${active ? "bg-black" : "bg-white"}`}>
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative h-full flex flex-col">
              <div className="relative flex-1">
                {modules.map((mod, i) => (
                  <img
                    key={i + "-top"}
                    src={mod.images[0]}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active === mod.name ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              </div>
              <div className="relative flex-1">
                {modules.map((mod, i) => (
                  <img
                    key={i + "-bottom"}
                    src={mod.images[1]}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active === mod.name ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              {modules.map((mod, i) => (
                <img
                  key={i + "-right"}
                  src={mod.images[2]}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active === mod.name ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}