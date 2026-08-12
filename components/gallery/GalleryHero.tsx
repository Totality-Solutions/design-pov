"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Plus, X } from "lucide-react";
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
  isFormOpen,
  onToggleForm,
  onFormSuccess,
  onFormError,
}: GalleryHeroProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!filterOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-20 z-30"
    >
      <div className="w-full bg-white border-b border-black px-6 lg:px-20 pt-4 flex items-start gap-10">
        {GALLERY_YEARS.map((year) => (
          <button
            key={year.id}
            onClick={() => onYearChange(year.id)}
            className={`pb-3 text-[15px] font-(family-name:--font-family) leading-6 whitespace-nowrap cursor-pointer transition-all duration-200 ${
              activeYear === year.id
                ? "text-black border-b-2 border-black font-medium"
                : "text-black/50 border-b-2 border-transparent"
            }`}
          >
            {year.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2 pb-3 shrink-0 pl-4">
          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={() => setFilterOpen((prev) => !prev)}
              className={`w-[40px] h-[40px] flex items-center justify-center border transition-colors cursor-pointer ${
                activeCategory !== "all" || filterOpen
                  ? "bg-black text-white border-black"
                  : "border-black/20 text-black/60 hover:border-black hover:text-black"
              }`}
              aria-label="Filter by category"
            >
              <Filter className="w-4.5 h-4.5" strokeWidth={2} />
            </button>

            {filterOpen && (
              <div
                ref={filterRef}
                className="absolute top-full right-0 mt-2 z-20 bg-white border border-gray-200 shadow-lg min-w-[160px] py-1"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onCategoryChange(cat.id);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-(family-name:--font-family) transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onToggleForm}
            className="w-[40px] h-[40px] flex items-center justify-center border border-black/20 text-black/60 hover:border-black hover:text-black transition-colors cursor-pointer"
            aria-label={isFormOpen ? "Close form" : "Open form"}
          >
            {isFormOpen ? (
              <X className="w-4.5 h-4.5" strokeWidth={2} />
            ) : (
              <Plus className="w-4.5 h-4.5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <GallerySubmissionForm isOpen={isFormOpen} onClose={onToggleForm} onSuccess={onFormSuccess} onError={onFormError} />
    </motion.div>
  );
}
