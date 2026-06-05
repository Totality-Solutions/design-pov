"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { cdn } from "@/lib/cdn";

// IMPORT YOUR FORMS
import FormInner from "@/components/common/FormInner";
import ParticipationForm from "@/components/ecosystem/ParticipationForm";
import MagazineSubmissionForm from "@/components/magazine/SubmissionForm";
import ParticipationPopupForm from "@/components/edition26/brands/ParticipationPopupForm"; 

interface FAQPopupProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string | null;
}

export default function FAQPopup({ isOpen, onClose, formId }: FAQPopupProps) {
  
  // Lock background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Function to render the correct modal layout based on formId
  const renderModalContent = () => {
    // 1. If it is the Participation Form, render your custom complete layout
    if (formId === "participate-form") {
      return <ParticipationPopupForm onClose={onClose} />;
    }

    // 2. For all other forms, determine title & component, then wrap in the shared layout
    let title = "General Enquiry";
    let component = <FormInner category="General Enquiry" />;

    switch (formId) {
      case "magazine-form":
        title = "Magazine Submission";
        component = <div className="px-2 md:px-6 pb-8"><MagazineSubmissionForm /></div>;
        break;
      case "core-form":
        title = "The Core";
        component = <div className="px-8 md:px-16 pb-8 md:pb-12"><FormInner category="Core" /></div>;
        break;
      case "sponsorship-form":
        title = "Sponsorship";
        component = <div className="px-8 md:px-16 pb-8 md:pb-12"><FormInner category="Sponsorship" /></div>;
        break;
      case "circle-form":
        title = "The Circle";
        component = <div className="px-8 md:px-16 pb-8 md:pb-12"><FormInner category="The Circle" /></div>;
        break;
      case "media-enquiry-form":
        title = "Media Enquiry";
        component = <div className="px-8 md:px-16 pb-8 md:pb-12"><FormInner category="Media Enquiry" /></div>;
        break;
    }

    // Shared layout for non-participation forms
    return (
      <div className="relative w-full max-w-[1100px] h-[90vh] bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-black hover:bg-neutral-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* LEFT COLUMN */}
        <div className="hidden lg:flex flex-col relative bg-red-600 p-8 md:p-12 items-center min-h-full">
          <div className="flex-grow flex items-center justify-center">
            <div className="relative w-40 h-20 md:w-80 md:h-40 opacity-90">
              <Image
                src={cdn("/logo/Logo.svg")}
                alt="Design POV Logo"
                fill
                loading="lazy"
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-full text-center md:pb-6">
            <h2 className="text-black text-md md:text-xl font-medium uppercase tracking-[0.1em] leading-tight font-['Montserrat']">
              Design Done Differently
            </h2>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white border-[10px] border-red-600 flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-3 px-8 md:px-16 pt-8 md:pt-12 pb-6 flex-shrink-0">
            <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
            <h3 className="text-black text-2xl font-medium tracking-tight font-['Montserrat'] uppercase">
              {title}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {component}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
          />

          {/* MODAL WRAPPER */}
          {/* Notice we removed the layout classes from here, so it wraps your custom component cleanly */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full flex justify-center"
          >
            {renderModalContent()}
          </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
}