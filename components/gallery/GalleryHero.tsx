"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, X, Upload } from "lucide-react";
import { GALLERY_CATEGORIES } from "./galleryData";
import type { GalleryItem } from "./types";

interface GalleryHeroProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  selectedItem?: GalleryItem | null;
  onBack?: () => void;
  isFormOpen: boolean;
  onToggleForm: () => void;
}

export default function GalleryHero({
  activeCategory,
  onCategoryChange,
  selectedItem,
  onBack,
  isFormOpen,
  onToggleForm,
}: GalleryHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-20 z-20"
    >
      <div className="w-full bg-black px-6 lg:px-15 py-4 flex items-center">
        <div className="flex items-center gap-6 w-full">
          {selectedItem ? (
            // <div className="flex items-center self-stretch flex-1">
            //   <div className="flex items-center self-stretch px-6 border-l border-white">
            //     <Image
            //       src="/icon/gallery.svg"
            //       alt="Gallery"
            //       width={24}
            //       height={24}
            //       className="w-6 h-6"
            //     />
            //   </div>
            //   <div className="flex items-center self-stretch gap-[10px] px-6 bg-white/10 border-l border-white">
            //     <span className="text-white font-(family-name:--font-family) text-[16px] font-normal leading-[20px]">
            //       Project name
            //     </span>
            //     <button
            //       onClick={onBack}
            //       className="relative w-[42px] h-[42px] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            //       aria-label="Back to gallery"
            //     >
            //       <div
            //         className="absolute outline outline-2 outline-white"
            //         style={{
            //           width: "19.77px",
            //           height: "1px",
            //           left: "14px",
            //           top: "14px",
            //           transform: "rotate(42deg)",
            //           transformOrigin: "top left",
            //         }}
            //       />
            //     </button>
            //   </div>
            // </div>
            <div className="flex items-center gap-3 border-l border-white pl-6">
              <span className="text-white font-(family-name:--font-family) text-[16px] font-normal leading-[20px]">
                Gallery
              </span>
              <Image
                src="/icon/gallery.svg"
                alt="Gallery"
                width={20}
                height={20}
                className="w-6 h-6"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 border-l border-white pl-6">
              <span className="text-white font-(family-name:--font-family) text-[16px] font-normal leading-[20px]">
                Gallery
              </span>
              <Image
                src="/icon/gallery.svg"
                alt="Gallery"
                width={20}
                height={20}
                className="w-6 h-6"
              />
            </div>
          )}
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
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="w-full bg-white overflow-hidden border-b border-black"
          >
            <div className="px-20 py-8">
              <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
                <span className="text-black">•</span> Get Featured on Design POV
              </h2>
              <p className="text-gray-600 mb-8">
                Submit your project for editorial review and a chance to be featured in the Design POV Gallery.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* LEFT: Upload Area */}
                <div className="bg-[#F8F8F8] border-2 border-transparent hover:border-gray-300 transition-colors flex flex-col items-center justify-center p-10 min-h-[400px] cursor-pointer group">
                  <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-md flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Upload size={20} className="text-black" />
                  </div>
                  <h3 className="font-medium text-black mb-1">Upload Project Images</h3>
                  <p className="text-sm text-gray-400 text-center mb-8">
                    Drag & drop your files here<br />or click to upload.
                  </p>
                  <div className="mt-auto flex flex-col items-center gap-2 text-xs text-gray-400">
                    <p>Upload 2–10 images for review.</p>
                    <p>Max total upload size: 20 MB.</p>
                  </div>
                </div>

                {/* RIGHT: Form Fields */}
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm text-gray-800 mb-2">Project Title</label>
                    <input
                      type="text"
                      placeholder="Title*"
                      className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-800 mb-2">Contributor Name</label>
                      <input
                        type="text"
                        placeholder="xyz solutions"
                        className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="xyz@gmail.com"
                        className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-2">Studio / Organization</label>
                      <input
                        type="text"
                        placeholder="xyz solutions"
                        className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-800 mb-2">Website</label>
                      <input
                        type="text"
                        placeholder="www.https://abc.com"
                        className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-800 mb-2">Project Story</label>
                    <textarea
                      placeholder="Project Story"
                      rows={4}
                      className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm resize-none"
                    />
                  </div>
                  <div className="mt-4">
                    <button className="border border-black px-6 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                      Send for Consideration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
