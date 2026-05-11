"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CTABtn from "../../common/CTABtn";
import ParticipationPopup from "@/components/collaborate/ParticipationPopup";
import ParticipationPopupForm from "./ParticipationPopupForm";

type ApplyCardProps = {
  title: string;
  description: string;
  buttonText: string;
  isInitiallyDark: boolean;
  onClick: () => void;
};

const ApplyCard = ({
  title,
  description,
  buttonText,
  isInitiallyDark,
  onClick,
}: ApplyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          textColor={
            isInitiallyDark
              ? isMobile
                ? "white"
                : "black"
              : "black"
          }
          forceHover={isMobile ? true : isHovered}
          className="md:group-hover:!text-white"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

const ApplySection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCategory, setPopupCategory] = useState("");

  const [isParticipationPopupOpen, setIsParticipationPopupOpen] =
    useState(false);

  const openPopup = (category: string) => {
    setPopupCategory(category);
    setIsPopupOpen(true);
  };

  return (
    <>
      <section className="w-full flex flex-col border-t border-gray-200 bg-white mt-12">
        <div className="w-full flex flex-col md:flex-row min-h-[350px]">

          {/* PARTNER */}
          <ApplyCard
            isInitiallyDark={true}
            title="Become a Partner"
            description="Align with a platform shaping design culture and create meaningful visibility through considered partnerships."
            buttonText="Apply as a Partner"
            onClick={() => openPopup("Partner")}
          />

          {/* PARTICIPANT */}
          <ApplyCard
            isInitiallyDark={false}
            title="Join as a Participant"
            description="Collaborate within the ecosystem to present your work in context - where it’s experienced, not just seen."
            buttonText="Apply as a Participant"
            onClick={() => setIsParticipationPopupOpen(true)}
          />

        </div>
      </section>
      {/* PARTICIPATION POPUP */}
      <AnimatePresence>
        {isParticipationPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            
            {/* BACKDROP - Click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsParticipationPopupOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
      
            {/* FORM MODAL */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full flex justify-center"
            >
              <ParticipationPopupForm onClose={() => setIsParticipationPopupOpen(false)} />
            </motion.div>
            
          </div>
        )}
      </AnimatePresence>
      <ParticipationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        category={popupCategory}
      />
    </>
  );
};

export default ApplySection;