"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CTABtn from "@/components/common/CTABtn";

const LOGOS = Array(15).fill("https://placehold.co/125x67/000000/FFFFFF/png?text=POV");

export default function NotFound() {
  return (
    // min-h-screen allows the content to dictate height, justify-center keeps it centered
    <main className="min-h-screen w-full bg-white font-['Montserrat'] flex flex-col justify-center overflow-hidden">
      
      <div className="w-full">
        {/* --- ERROR CODE --- */}
        <div className="w-full border-b border-black flex justify-center items-center py-6 ">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#010101] leading-none tracking-tighter">
            404
          </h1>
        </div>

        {/* --- MESSAGE 1 --- */}
        <div className="w-full border-b border-black flex justify-center items-center px-6 pt-2 md:pt-4 pb-1 md:pb-2">
          <p className="text-center text-[#010101] text-sm md:text-base lg:text-xl font-medium whitespace-nowrap truncate tracking-tight">
            The space you’re looking for couldn’t be found
          </p>
        </div>

        {/* --- MESSAGE 2 --- */}
        <div className="w-full border-b border-black flex justify-center items-center px-6 pt-2 md:pt-4 pb-1 md:pb-2">
          <p className="text-center text-[#010101] text-sm md:text-base lg:text-xl font-medium whitespace-nowrap truncate tracking-tight">
            Design, culture, and innovation guide you back.
          </p>
        </div>

        {/* --- AUTO ROLL MARQUEE --- */}
        <div className="w-full overflow-hidden flex items-center relative py-6 md:py-8">
          <motion.div 
            className="flex gap-6 md:gap-10 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...LOGOS, ...LOGOS].map((src, index) => (
              <div key={index} className="relative shrink-0 w-[80px] h-[40px] md:w-[100px] md:h-[55px]">
                <Image 
                  src={src} 
                  alt="Brand logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- CTA BUTTON SECTION --- */}
        <div className="w-full flex justify-center items-center px-6 py-8">
          <CTABtn
            label="Explore the Show"
            iconType="arrow"
            btnBg="var(--primary-blue)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-white)"
            borderColor="var(--primary-blue)"
            borderHoverColor="var(--primary-blue)"
            lineColor="transparent"
            lineHoverColor="transparent"
            bottomKey1Width="40px"
            bottomKey2Width="12px"
            bottomKey1Right="50px"
            bottomKey2Right="15px"
            href="/"
          />
        </div>
      </div>
    </main>
  );
}