"use client";

import React, { useState } from "react";
import { cdn } from "@/lib/cdn";
import CTAStrip from "@/components/common/CTAStrip";
import PopupForm from "@/components/common/PopupForm";

const ShowDeckCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="w-full z-10 bg-white border-t border-b border-black/20">
        <CTAStrip
          title="Highlights: Design POV 2025"
          ctaLabel="Download Show Deck"
          onClick={() => setIsFormOpen(true)}
          hoverBgColor="#000000"
          textColor="var(--primary-red)"
          hoverTextColor="var(--color-white)"
          floatingImage={cdn("/temp/ctastrip/3.png")}
          floatingImageHeight={107}
          floatingImageWidth={200}
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