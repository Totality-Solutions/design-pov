"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import { Container } from "../common/Container";

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
  {
    name: "Visitor",
    images: [
    '/temp/home/theme/WEBSITE_THEME BANNER_2.jpg.jpeg',
    '/temp/home/theme/WEBSITE_THEME BANNER_3.jpg.jpeg',
    '/temp/home/theme/WEBSITE_THEME BANNER_1.jpg.jpeg',
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
    >
    </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%]">

        {/* ===== LEFT ===== */}
        <div className="flex flex-col ">
          {modules.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(item.name)}
              onMouseLeave={() => setActive(null)}
              className={`group flex justify-between items-center py-5 cursor-pointer transition-all  ${
                active === item.name
                  ? "bg-black text-white"
                  : "text-black"
              }`}
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

        {/* ===== RIGHT ===== */}
        <div
          className={`relative overflow-hidden transition-colors ${
            active ? "bg-black" : "bg-white"
          }`}
        >
          {/* FIXED GRID */}
          <div className="absolute inset-0 grid grid-cols-2 ">

            {/* LEFT COLUMN */}
<div className="relative h-full flex flex-col ">

  {/* TOP SLOT */}
  <div className="relative flex-1">
    {modules.map((mod, i) => (
      <img
        key={i + "-top"}
        src={mod.images[0]}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity  ${
          active === mod.name ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
  </div>

  {/* BOTTOM SLOT */}
  <div className="relative flex-1">
    {modules.map((mod, i) => (
      <img
        key={i + "-bottom"}
        src={mod.images[1]}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity  ${
          active === mod.name ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
  </div>

</div>

            {/* RIGHT COLUMN */}
            <div className="relative">
              {modules.map((mod, i) => (
                <img
                  key={i + "-right"}
                  src={mod.images[2]}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity  ${
                    active === mod.name ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </Container>
  );
}