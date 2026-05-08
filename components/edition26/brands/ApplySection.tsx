"use client";

import React, { useState, useEffect } from "react";
import CTABtn from "../../common/CTABtn";

type ApplyCardProps = {
  title: string;
  description: string;
  buttonText: string;
  isInitiallyDark: boolean;
  href?: string;
};

const ApplyCard = ({
  title,
  description,
  buttonText,
  isInitiallyDark,
  href = "#",
}: ApplyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on mobile/tab to handle default hover state
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        flex-1 p-10 md:p-14 flex flex-col gap-8 justify-between border-t border-gray-200 
        md:border-t-0 md:border-l first:border-l-0
        transition-all duration-500 ease-in-out font-montserrat
        
        ${isInitiallyDark ? "bg-black text-white" : "bg-white text-black"}
        
        md:bg-white md:text-black md:hover:bg-black md:hover:text-white
        group
      `}
    >
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold">{title}</h3>

        <p
          className={`
            text-lg leading-relaxed transition-opacity duration-500 
            ${isInitiallyDark ? "opacity-80" : "text-gray-700"} 
            md:text-gray-700 md:group-hover:text-white md:group-hover:opacity-80
          `}
        >
          {description}
        </p>
      </div>

      <div className="w-fit">
        <CTABtn
          label={buttonText}
          iconType="arrow"
          btnBg="transparent"
          btnHoverBg="var(--primary-blue)"
          borderColor="var(--color-black)"
          borderHoverColor="var(--primary-blue)"
          // FIX: Mobile par agar card dark hai toh text white hona chahiye
          textColor={isInitiallyDark ? (isMobile ? "white" : "black") : "black"}
          href={href}
          // Mobile par default hover state dikhayega, Desktop par card hover par
          forceHover={isMobile ? true : isHovered}
          className="md:group-hover:!text-white" 
        />
      </div>
    </div>
  );
};

const ApplySection = () => {
  return (
    <section className="w-full flex flex-col border-t border-gray-200 bg-white mt-12">
      <div className="w-full flex flex-col md:flex-row min-h-[350px]">
        <ApplyCard
          isInitiallyDark={true}
          title="Become a Partner"
          description="Align with a platform shaping design culture and create meaningful visibility through considered partnerships."
          buttonText="Apply as a Partner"
          href="/partner-apply"
        />

        <ApplyCard
          isInitiallyDark={false}
          title="Join as a Participant"
          description="Collaborate within the ecosystem to present your work in context - where it’s experienced, not just seen."
          buttonText="Apply as a Participant"
          href="/participant-apply"
        />
      </div>
    </section>
  );
};

export default ApplySection;