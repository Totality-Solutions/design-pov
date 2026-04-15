"use client";

import React from "react";
import Image from "next/image";

export default function MagazineHero() {
  return (
    <section 
      className="relative w-full flex flex-col items-center justify-end bg-[#f3f3f3]" >
      {/* THE IMAGE DIRECTLY IN COMPONENT */}
      <div className="relative w-full h-screen max-w-[1440px] overflow-hidden">
        <Image
          src="/temp/ecosystem.png" // Replace with your actual asset path
          alt="Magazine Hero Banner"
          fill
          priority
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Since justify-content is flex-end and padding-bottom is 175px, 
          this space remains open for the visual 'magazine' feel 
          you described in the Figma layout.
      */}
    </section>
  );
}