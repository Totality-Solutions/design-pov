"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CoreItem } from "@/data/coreData";

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CoreItem | null;
}

export const ShowcaseModal = ({
  isOpen,
  onClose,
  data,
}: ShowcaseModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (data) {
      setCurrentSlide(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [data]);

  useEffect(() => {
    if (!isOpen || !data) return;
    const interval = setInterval(() => {
      const totalImages = data.additionalImages.length + 1;
      setCurrentSlide((prev) => (prev + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  const images = [data.src, ...data.additionalImages];
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  console.log(data)
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key={data.label}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[1200px] h-[80vh] md:h-[600px] bg-white flex flex-col md:flex-row overflow-hidden shadow-2xl rounded-sm"
          >
            {/* LEFT: Carousel */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-full bg-zinc-100 overflow-hidden">
              <motion.div
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex h-full"
              >
                {images.map((img, i) => (
                  <div key={i} className="relative w-full h-full flex-shrink-0">
                    <Image
                      src={img}
                      alt={`${data.label} slide ${i}`}
                      fill
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button onClick={prevSlide} className="pointer-events-auto p-2 text-white/70 hover:text-white transition-opacity">
                  <ChevronLeft size={36} strokeWidth={1.5} />
                </button>
                <button onClick={nextSlide} className="pointer-events-auto p-2 text-white/70 hover:text-white transition-opacity">
                  <ChevronRight size={36} strokeWidth={1.5} />
                </button>
              </div>

              <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-[6px] transition-all duration-300 rounded-full ${
                      currentSlide === i ? "w-6 bg-white" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Content Section */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-white relative">
              
              {/* STICKY HEADER: Title and Close Button */}
              <div className="flex items-start justify-between px-8 md:px-12 pb-4 py-2 md:py-6 bg-white z-20">
                <h2 className="text-2xl md:text-4xl font-semibold leading-tight text-black pr-8">
                  {data.label}
                </h2>
                <motion.button
                  onClick={onClose}
                  initial="initial"
                  whileHover="hover" // This triggers the "hover" variant in all children
                  className="relative w-8 h-8 group flex items-center justify-center"
                >
                  {/* Red background */}
                  <div className="absolute inset-0 bg-primary-red opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full" />
                              
                  {/* Icon Container */}
                  <motion.div
                    className="relative w-full h-full flex items-center justify-center z-10"
                    variants={{
                      initial: { rotate: 45 },
                      hover: { rotate: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Horizontal line (Static) */}
                    <div className="absolute w-[16px] h-[1.5px] bg-black" />
                  
                    {/* Vertical line (Fades out) */}
                    <motion.div
                      className="absolute w-[1.5px] h-[16px] bg-black"
                      variants={{
                        initial: { opacity: 1 },
                        hover: { opacity: 0 }
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.button>
              </div>

              {/* SCROLLABLE BODY: Description */}
              <div
                ref={scrollContainerRef}
                className="flex-grow overflow-y-auto px-8 md:px-12 pb-6 custom-scrollbar"
              >
                <div className="text-sm md:text-base text-zinc-700 leading-relaxed space-y-4">
                  {data.description.split('\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* STICKY FOOTER: Social Links */}
              <div className="flex justify-between items-center gap-6 px-8 md:pl-12 py-4 border-t border-zinc-100 bg-white">
                <div className="flex items-center gap-4">
                  {data.website && (
                    <a
                      href={data.website === "#" ? undefined : data.website}
                      target={data.website === "#" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={(e) => data.website === "#" && e.preventDefault()}
                      className={`border border-black/20 w-9 h-9 flex items-center justify-center text-[11px] font-bold ${
                        data.website === "#" ? "text-zinc-300 cursor-not-allowed" : "text-black hover:text-primary-red"
                      }`}
                      title={data.website === "#" ? "Website coming soon" : "Visit Website"}
                    >
                      WB
                    </a>
                  )}

                  {data.instagram && (
                    <a
                      href={data.instagram === "#" ? undefined : data.instagram}
                      target={data.instagram === "#" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={(e) => data.instagram === "#" && e.preventDefault()}
                      className={`border border-black/20 w-9 h-9 flex items-center justify-center text-[11px] font-bold ${
                        data.instagram === "#" ? "text-zinc-300 cursor-not-allowed" : "text-black hover:text-primary-red"
                      }`}
                      title={data.instagram === "#" ? "Instagram coming soon" : "Follow on Instagram"}
                    >
                      IG
                    </a>
                  )}

                </div>
                <a href={data.website} target="_blank">
                  <Image src={data?.logo } alt="Design POV Logo" width={100} height={100} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};