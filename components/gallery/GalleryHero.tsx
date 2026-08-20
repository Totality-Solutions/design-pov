"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Plus, X } from "lucide-react";
import type { GalleryItem, GalleryCategory, GalleryYear } from "./types";
import GallerySubmissionForm from "./GallerySubmissionForm";

interface GalleryHeroProps {
  categories: GalleryCategory[];
  years: GalleryYear[];
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
  categories,
  years,
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
      className="fixed bottom-0 left-0 right-0 sm:sticky sm:bottom-auto sm:top-20 sm:left-auto sm:right-auto z-30"
    >
      <div className="w-full bg-black px-6 lg:px-20 py-2.5 flex items-center gap-10">
        {years.map((year) => (
          <button
            key={year.id}
            onClick={() => onYearChange(year.id)}
            className={`pb-1 text-[14px] font-(family-name:--font-family) leading-5 whitespace-nowrap cursor-pointer transition-all duration-200 border-b-2 ${
              activeYear === year.id
                ? "text-white border-white font-medium"
                : "text-white/50 border-transparent"
            }`}
          >
            {year.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2 shrink-0 pl-4">
          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={() => setFilterOpen((prev) => !prev)}
              className={`w-8 h-8 flex items-center justify-center border transition-colors cursor-pointer ${
                activeCategory !== "all" || filterOpen
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/60 hover:border-white hover:text-white"
              }`}
              aria-label="Filter by category"
            >
              <Filter className="w-4 h-4" strokeWidth={2} />
            </button>

            {filterOpen && (
              <div
                ref={filterRef}
                className="absolute bottom-full right-0 mb-2 sm:bottom-auto sm:top-full sm:mb-0 sm:mt-2 z-20 bg-white border border-gray-200 shadow-lg min-w-[160px] py-1"
              >
                {categories.map((cat) => (
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
            className="w-8 h-8 flex items-center justify-center border hover:border-white hover:text-white hover:bg-transparent bg-white text-black transition-colors cursor-pointer"
            aria-label={isFormOpen ? "Close form" : "Open form"}
          >
            {isFormOpen ? (
              <X className="w-4 h-4" strokeWidth={2} />
            ) : (
              <Plus className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <GallerySubmissionForm isOpen={isFormOpen} onClose={onToggleForm} onSuccess={onFormSuccess} onError={onFormError} />
    </motion.div>
  );
}
