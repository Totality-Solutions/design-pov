"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Logo {
  src: string;
  name: string;
}

interface BrandLogoProps {
  title: string;
  logos: Logo[];
}

export default function BrandLogo({ title, logos }: BrandLogoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 8 : 12);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section ke top par scroll karne ka logic
  useEffect(() => {
    // Sirf tab scroll kare jab user pagination use kare (page 1 se aage badhe)
    if (currentPage > 0 && sectionRef.current) {
      const navbarOffset = 100; // Agar upar sticky navbar hai toh uske liye space
      const elementPosition = sectionRef.current.offsetTop;

      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  const totalPages = Math.ceil(logos.length / itemsPerPage);
  const showPagination = logos.length > itemsPerPage;
  const currentLogos = logos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section ref={sectionRef} className="w-full bg-white font-montserrat scroll-mt-24 px-4">
      
      {/* 1. Heading Row */}
      <div className="w-full px-2 md:px-4">
        <h2 className="text-[22px] font-bold py-4 px-1 md:px-6 uppercase border-b border-black leading-[36px] tracking-wider text-black">
          {title}
        </h2>
      </div>

      {/* 2. Content Container (Right Aligned 75%) */}
      <div className="w-full flex flex-col items-end">
        
        <div className="w-full lg:w-[75%]">
          
          {/* Logo Grid - Vertical Gap Reduced */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center px-6 py-2 " // aspect ratio hataya aur padding kam ki
              >
                <div className="relative w-full flex flex-col items-center justify-center">
                  <div className="h-32 flex items-center justify-center w-full border-b border-gray-200"> {/* Logo height fix ki taaki alignment sahi rahe */}
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      className="w-full h-full max-w-[180px] object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Row */}
          {showPagination && (
            <div className="w-full p-8 md:p-14 flex justify-end items-center gap-8">
              <div className="font-medium text-base tracking-tighter">
                <span className="text-black">{String(currentPage).padStart(2, '0')} </span>
                <span className="text-black/30 mx-1">/</span>
                <span className="text-black/30">{String(totalPages).padStart(2, '0')}</span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 transition-all hover:scale-110 disabled:opacity-10"
                  aria-label="Previous Page"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 transition-all hover:scale-110 disabled:opacity-10"
                  aria-label="Next Page"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}