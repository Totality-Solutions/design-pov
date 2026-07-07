"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Folder, Plus } from "lucide-react";

export default function FeaturedFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock background scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button (The "Plus" icon you mentioned) */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Open Form"
        >
          <Plus size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-start bg-black/60 backdrop-blur-sm p-4 md:p-10">
            {/* The Modal Container */}
            <motion.div
              initial={{ y: "-10vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-10vh", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-[1200px] bg-white flex flex-col shadow-2xl overflow-hidden"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              {/* --- TOP BLACK STRIP --- */}
              <div className="bg-black text-white flex items-center justify-between h-[50px]">
                {/* Left Tab */}
                <div className="flex items-center h-full bg-[#1A1A1A] px-4 min-w-[250px] border-r border-[#333]">
                  <Folder size={16} className="text-gray-400 mr-3" />
                  <span className="text-sm text-gray-300 font-medium truncate flex-1">
                    Get Featured o... (Form)
                  </span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="ml-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {/* Right Global Close */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-4 h-full flex items-center text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* --- SCROLLABLE CONTENT AREA --- */}
              <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                
                {/* Header */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
                    <span className="text-black">•</span> Get Featured on Design POV
                  </h2>
                  <p className="text-gray-600">
                    Submit your project for editorial review and a chance to be featured in the Design POV Gallery.
                  </p>
                </div>

                {/* Two Column Grid */}
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
                    {/* Project Title (Full Width) */}
                    <div>
                      <label className="block text-sm text-gray-800 mb-2">Project Title</label>
                      <input 
                        type="text" 
                        placeholder="Title*" 
                        className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm"
                      />
                    </div>

                    {/* 2-Column Inputs */}
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

                    {/* Project Story (Full Width) */}
                    <div>
                      <label className="block text-sm text-gray-800 mb-2">Project Story</label>
                      <textarea 
                        placeholder="Project Story" 
                        rows={4}
                        className="w-full bg-[#F5F5F5] p-3 outline-none focus:ring-1 focus:ring-black placeholder-gray-400 text-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                      <button className="border border-black px-6 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                        Send for Consideration
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}