"use client";

import React, { useState } from "react";
import CTAStrip from "@/components/common/CTAStrip";
import PopupForm from "@/components/common/PopupForm";

const ShowDeckCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="w-full z-10 bg-white border-b">
        <CTAStrip
          title="Our highlights from Design POV 2025"
          ctaLabel="Download Show Deck"
          onClick={() => setIsFormOpen(true)}
          hoverBgColor="#000000"
          textColor="var(--primary-red)"
          hoverTextColor="var(--color-white)"
          floatingImage="/temp/ctastrip/2.png"
          floatingImageHeight={160}
          floatingImageWidth={225}
        />
      </div>

      <PopupForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default ShowDeckCTA;