"use client";

import React from 'react';
import type { NextPage } from 'next';
import ClientLogo from "../home/ClientLogo"; // Tera component yahan se import ho raha hai

const BrandsSection: NextPage = () => {
  return (
    <section className="w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
      {/* 1. HEADER AREA */}
      <div className="w-full px-5 lg:px-[60px] py-[25px] border-b border-[#EEEEEE] flex items-center justify-start">
        <div className="flex items-center gap-[12px]">
          
          {/* Component 222 (Red Dot Indicator) */}
          <div className="relative w-[28px] h-[28px] flex items-center justify-center">
            <div className="absolute w-[12px] h-[12px] bg-[#E02914] opacity-30 rounded-full blur-[4px]" />
            <div className="w-[6px] h-[6px] bg-[#E02914] rounded-full relative z-10" />
          </div>

          {/* Brands_2026 Text */}
          <h2 className="text-[20px] md:text-[22px] tracking-tight text-black">
            <span className="font-normal">Brands_</span>
            <span className="font-bold">2026</span>
          </h2>
        </div>
      </div>

      {/* 2. CALLING YOUR COMPONENT DIRECTLY */}
      <ClientLogo />

    </section>
  );
};

export default BrandsSection;