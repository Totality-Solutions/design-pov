"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    description: string;
    images: string[];
    websiteUrl: string;
    instagramUrl: string;
  } | null;
}

export const ShowcaseModal = ({ isOpen, onClose, data }: ShowcaseModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. Prevent Background Scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 2. Auto-moving Carousel Logic
  useEffect(() => {
    if (!isOpen || !data) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Changes image every 3 seconds

    return () => clearInterval(interval);
  }, [isOpen, currentSlide, data]);

  if (!data) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % data.images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + data.images.length) % data.images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-[1200px] h-[700px] md:h-[min(600px,90vh)] bg-white flex flex-col md:flex-row overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-8 right-8 text-black hover:text-primary-red transition-color">
              <X size={28} />
            </button>

            {/* LEFT COLUMN: Carousel */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-zinc-100 overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex h-full"
              >
                {data.images.map((img, i) => (
                  <div key={i} className="relative w-full h-full flex-shrink-0">
                    <Image
                      src={img}
                      alt={`${data.name} slide ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button 
                  onClick={prevSlide}
                  className="pointer-events-auto p-2 text-white/50 hover:text-white transition-colors"
                >
                  <ChevronLeft size={32} strokeWidth={1} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="pointer-events-auto p-2 text-white/50 hover:text-white transition-colors"
                >
                  <ChevronRight size={32} strokeWidth={1} />
                </button>
              </div>

              {/* Pagination Dashes */}
              <div className="absolute bottom-6 left-0 w-full flex justify-center gap-1 z-10">
                {data.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={currentSlide === i}
                    className={`h-[6px] transition-all rounded-full duration-300 ease-in-out ${
                      currentSlide === i 
                        ? "w-1.5 bg-primary-red opacity-100" 
                        : "w-1.5 bg-black"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-between bg-white">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-semibold leading-tight my-6">
                  {data.name}
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-black font-normal max-w-md">
                  {data.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <a 
                    href={data.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black hover:text-primary-red transition-colors duration-300"
                  >
                    <Globe size={24} strokeWidth={1.5} />
                  </a>
                  <a 
                    href={data.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black hover:text-primary-red transition-colors duration-300"
                  >
                    <Instagram size={24} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};