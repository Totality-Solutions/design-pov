"use client";

import React, { useState } from "react";
import Hero from "@/components/home/Hero";
import WhatPOV from "@/components/home/WhatPOV";
import Theme from "@/components/home/Theme";
import Ecosystem from "@/components/home/Ecosystem";
import FeaturedDesigners from "@/components/home/Featured";
import ClientLogo from "@/components/home/ClientLogo";
import FeaturedStory from "@/components/home/FeaturedStory";
import CTAStrip from "@/components/common/CTAStrip";
import PopupForm from "@/components/common/PopupForm"; // 1. Import the Form
import ScrollMaskText from "@/components/home/ScrollRevealText";

export default function HomePage() {
  // 2. Define the state to control the popup
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Hero />
      <ScrollMaskText/>
      <WhatPOV />
      <Theme />
      <Ecosystem />
      <FeaturedDesigners />
      <FeaturedStory />
      
      <div className="w-full z-10 bg-white border-b">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          // 3. Pass the open function to onClick
          onClick={() => setIsFormOpen(true)} 
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>

      <ClientLogo />

      {/* 4. Place the PopupForm component here */}
      <PopupForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
}