"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import FormInner from '@/components/common/FormInner';
import LogoImage from "@/public/logo/Logo.svg";

interface ParticipationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function ParticipationPopup({ isOpen, onClose, category }: ParticipationPopupProps) {

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[1100px] min-h-[500px] md:min-h-[600px] bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl max-h-[90vh]"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 text-black hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* LEFT COLUMN: BRANDING */}
            <div className="hidden lg:flex flex-col relative bg-red-600 p-8 md:p-12 items-center min-h-full">
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
              <div className="w-full text-center md:pb-6">
                <h2 className="text-black text-md md:text-xl font-medium uppercase tracking-[0.1em] leading-tight font-['Montserrat']">
                  Design Done Differently
                </h2>
              </div>
            </div>

            {/* RIGHT COLUMN: FORM */}
            <div className="bg-white p-8 md:p-16 flex flex-col border-[10px] border-red-600 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                <h3 className="text-black text-2xl font-medium tracking-tight font-['Montserrat'] uppercase">
                  {category}
                </h3>
              </div>
              <FormInner category={category} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}