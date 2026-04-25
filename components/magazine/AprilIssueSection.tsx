"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";

const ISSUE_DATA = [
  {
    category: "Architecture",
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    author: "Design POV",
    date: "26 feb, 2026",
    image: "/temp/1.jpg",
  },
  {
    category: "Architecture",
    title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    author: "Design POV",
    date: "26 feb, 2026",
    image: "/temp/3.jpg",
  },
];

const AprilIssueSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="w-full bg-white font-['Montserrat'] pb-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. HEADER SECTION */}
      <SectionHeading
        titleMain="The "
        titleBold="April Issue"
        isSectionHovered={isHovered}
      >
      <CTABtn
        label="View Issues"
        btnBg="transparent"
        btnHoverBg="var(--primary-blue)"
        textColor="rgba(0,0,0,0.7)"     
        borderColor="rgba(0,0,0,0.5)"
        borderHoverColor="transparent"     
        lineColor="white"
        lineHoverColor="transparent"                     
        bottomKey1Width="40px"
        bottomKey2Width="12px"
        bottomKey1Right="50px"
        bottomKey2Right="15px"                      
        href="#tickets"
      />
      </SectionHeading>

      <div className="px-6 md:px-[60px] mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[80%_1fr] gap-6 items-stretch">
          
          {/* LEFT 80% SIDE: Main Articles */}
          <div className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {ISSUE_DATA.map((item, index) => (
                <div key={index} className="group cursor-pointer flex flex-col h-full">
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100 flex-grow">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* TEXT CONTENT BLOCK */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                      
                      <span className="text-[12px] text-white/60 uppercase tracking-wider font-medium mb-1">
                        {item.category}
                      </span>

                      {/* TITLE: Truncated to 1 line, expands on hover */}
                      <div className="grid grid-rows-[auto] transition-all duration-500 ease-in-out">
                        <h3 className="text-[18px] font-semibold text-white leading-[1.3] transition-all duration-500 line-clamp-1 group-hover:line-clamp-none">
                          {item.title}
                        </h3>
                      </div>

                      {/* META INFO: Revealed on hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2 text-[11px] text-white/40 pt-2 border-t border-white/10 mt-2">
                          <span>by {item.author}</span>
                          <span className="opacity-30">|</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Advertisement column */}
          <div className="flex flex-col h-full">
            {/* CLEAN AD LABEL */}
            <div className="py-2 px-4 bg-gray-300">
              <span className="text-[14px] text-black font-medium">
                Advertisement
              </span>
            </div>

            {/* AD IMAGE CONTAINER */}
            <div className="relative group overflow-hidden bg-gray-100 flex-grow flex flex-col justify-end min-h-[400px]">
              <Image
                src="/temp/2.jpg"
                alt="Advertisement"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90 opacity-90 z-10" />

              {/* CENTER HOVER BUTTON */}
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white text-black px-7 py-3 text-[13px] font-medium shadow-lg hover:bg-gray-100 transition-colors">
                  Visit Ads
                </button>
              </div>

              {/* BOTTOM AD TEXT */}
              <div className="relative z-20 p-8 text-center">
                <p className="text-[11px] text-white/60 leading-relaxed uppercase tracking-widest">
                  Creative Direction by <br />
                  <span className="text-white font-semibold">Xianoo Khan [@ixianoo]</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section> 
  );
};

export default AprilIssueSection;