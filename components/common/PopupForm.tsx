"use client";

import React from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import CTABtn from "./CTABtn";

// Example logo asset: Ensure this exists in your /public directory or change the src
import LogoImage from "@/public/logo/Logo.svg"; 

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupForm({ isOpen, onClose }: PopupFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* BACKDROP: Closes form when clicking outside */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-[1100px] min-h-[500px] md:min-h-[600px] bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-black hover:bg-neutral-100 rounded-full transition-colors md:text-black"
        >
          <FiX size={24} />
        </button>

        {/* LEFT COLUMN: BRANDING & LOGO */}
        <div className="hidden lg:block relative bg-red-600 p-8 md:p-12 flex flex-col items-center min-h-[200px] md:min-h-full">
          
          {/* Logo - Vertically & Horizontally Centered */}
          <div className="flex-grow flex items-center justify-center">
            <div className="relative w-40 h-20 md:w-80 md:h-40 opacity-90">
                <Image 
                    src={LogoImage} 
                    alt="Design POV Logo" 
                    fill 
                    priority
                    className="object-contain" 
                />
            </div>
          </div>
          
          {/* Bottom Center Text */}
          <div className="w-full text-center md:pb-6">
            <h2 className="text-black text-md md:text-xl font-medium uppercase tracking-[0.1em] leading-tight font-['Montserrat']">
              Design Done Differently
            </h2>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM (With added 10px Red Border) */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-between border-[10px] border-red-600">
          
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 bg-black rounded-full" />
            <h3 className="text-black text-2xl font-medium tracking-tight font-['Montserrat']">
              Join <span className="font-bold">Design POV</span>
            </h3>
          </div>

          <form className="space-y-6 flex-grow" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-black text-[14px] font-medium tracking-wide font-['Montserrat']">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Full Name*"
                className="w-full px-5 py-4 bg-zinc-100 text-sm font-['Montserrat'] outline-none focus:ring-1 focus:ring-black transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black text-[14px] font-medium tracking-wide font-['Montserrat']">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input 
                type="email" 
                placeholder="xyz@gmail.com"
                className="w-full px-5 py-4 bg-zinc-100 text-sm font-['Montserrat'] outline-none focus:ring-1 focus:ring-black transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black text-[14px] font-medium tracking-wide font-['Montserrat']">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input 
                type="tel" 
                placeholder="+91"
                className="w-full px-5 py-4 bg-zinc-100 text-sm font-['Montserrat'] outline-none focus:ring-1 focus:ring-black transition-all"
              />
            </div>

            <div className="pt-4">
                <CTABtn
                  label="Submit"
                  btnBg="var(--color-black)"
                  btnHoverBg="var(--primary-red)"
                  textColor="var(--color-white)"
                  borderColor="transparent"
                  borderHoverColor="transparent"
                  lineColor="var(--color-white)"
                  lineHoverColor="var(--primary-red)"
                  bottomKey1Width="30px"
                  bottomKey2Width="10px"
                  bottomKey1Right="40px"
                  bottomKey2Right="10px"
                  href="#"
                />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}