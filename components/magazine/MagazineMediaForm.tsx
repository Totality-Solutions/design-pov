"use client";

import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import FormInner from '@/components/common/FormInner'; // Importing the shared internal form logic

export default function MagazineMediaForm() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      className="w-full bg-white font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Media Enquiry"
        isSectionHovered={isHovered}
      />
      
      <div className="px-6 md:px-10">
        {/* 
          Using the common FormInner component.
          The category is explicitly set to "Media Partner" for backend tracking.
        */}
        <FormInner category="Media Partner" />
      </div>
    </section>
  );
}