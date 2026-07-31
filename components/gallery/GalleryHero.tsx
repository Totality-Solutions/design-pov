"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { GALLERY_CATEGORIES, GALLERY_YEARS } from "./galleryData";
import type { GalleryItem } from "./types";
import GallerySubmissionForm from "./GallerySubmissionForm";

interface GalleryHeroProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeYear: string;
  onYearChange: (year: string) => void;
  selectedItem?: GalleryItem | null;
  onBack?: () => void;
  isFormOpen: boolean;
  onToggleForm: () => void;
  onFormSuccess?: () => void;
  onFormError?: (message: string) => void;
}

export default function GalleryHero({
  activeCategory,
  onCategoryChange,
  activeYear,
  onYearChange,
  selectedItem,
  onBack,
  isFormOpen,
  onToggleForm,
  onFormSuccess,
  onFormError,
}: GalleryHeroProps) {
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-20 z-30"
    >
      <div className="w-full bg-black px-6 lg:px-15 py-4 flex items-center">
        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center gap-3 border-l border-white pl-6">
            <span className="text-white font-(family-name:--font-family) text-[16px] font-normal leading-[20px]">
              Gallery
            </span>

            <Image
              src="/folder.svg"
              alt="Gallery"
              width={20}
              height={20}
              className="w-5.75 h-5.75 text-white"
            />
          </div>

          <div className="flex-1" />

          <button
            onClick={onToggleForm}
            className="w-[48px] h-[49px] flex items-center justify-center hover:bg-white/10 transition-colors rounded-md"
            aria-label={isFormOpen ? "Close form" : "Open form"}
          >
            {isFormOpen ? (
              <X className="w-6 h-6 text-white" strokeWidth={2} />
            ) : (
              <Plus className="w-6 h-6 text-white" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <div className="w-full bg-white border-b border-black px-6 lg:px-20 pt-4 flex items-start gap-10 overflow-x-auto">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`pb-3 text-[15px] font-(family-name:--font-family) leading-6 whitespace-nowrap cursor-pointer transition-all duration-200 ${
              activeCategory === cat.id
                ? "text-black border-b-2 border-black font-medium"
                : "text-black/50 border-b-2 border-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1 pb-3 shrink-0 pl-4">
          {GALLERY_YEARS.map((year) => (
            <button
              key={year.id}
              onClick={() => onYearChange(year.id)}
              className={`px-3 py-1 text-[13px] font-(family-name:--font-family) leading-5 border transition-all duration-200 cursor-pointer ${
                activeYear === year.id
                  ? "bg-black text-white border-black"
                  : "border-black/20 text-black/60 hover:border-black hover:text-black"
              }`}
            >
              {year.label}
            </button>
          ))}
        </div>
      </div>

      <GallerySubmissionForm isOpen={isFormOpen} onClose={onToggleForm} onSuccess={onFormSuccess} onError={onFormError} />
    </motion.div>
  );
}