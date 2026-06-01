"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Logo {
  src: string;
  name: string;
}

interface BrandLogoProps {
  title: string;
  logos: Logo[];
}

export default function BrandLogo({
  title,
  logos,
}: BrandLogoProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(12);

  const sectionRef =
    useRef<HTMLDivElement>(null);

  // RESPONSIVE ITEMS COUNT
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(
        window.innerWidth < 1024 ? 8 : 12
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const totalPages = Math.ceil(
    logos.length / itemsPerPage
  );

  const showPagination =
    logos.length > itemsPerPage;

  const currentLogos = logos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white font-montserrat scroll-mt-24 px-4 relative"
    >
      {/* HEADING */}
      <div className="w-full px-2 md:px-4 sticky top-20 z-30 bg-white">
        <h2 className="text-[22px] font-bold py-4 px-1 md:px-6 uppercase border-b border-black leading-[36px] tracking-wider text-black">
          {title}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="w-full flex flex-col items-end">
        <div className="w-full lg:w-[75%]">

          {/* LOGO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentLogos.map((logo, index) => (
              <div
                key={index}
                /* Applied the aspect ratios from your reference */
                className="relative aspect-[9/4] lg:aspect-[6/3] flex items-center justify-center p-4 lg:p-2 transition-colors duration-300 hover:bg-gray-50/50 overflow-hidden"
              >
                {/* SHOW TEXT ONLY FOR PARTNERS */}
                {title === "PARTNERS" && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
                    <h4 className="text-black text-[9px] md:text-[11px] font-medium leading-tight tracking-wide uppercase">
                      {logo.name}
                    </h4>
                  </div>
                )}

                {/* LOGO CONTAINER */}
                {/* 
          Removed 'h-32' and used 'w-full h-full' to let the aspect ratio 
          of the parent control the dimensions. 
      */}
                <div className="w-full h-full flex items-center justify-center border-b mx-6 border-pov-black/30">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={180}
                    height={80}
                    /* Added the padding and scale from your reference to match the look */
                    className="max-w-full max-h-full object-contain scale-95 transition-all px-[8px] pt-[8px] duration-500"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {showPagination && (
            <div className="w-full p-8 md:p-14 flex justify-end items-center gap-8">

              {/* PAGE COUNT */}
              <div className="font-medium text-base tracking-tighter">

                <span className="text-black">
                  {String(currentPage).padStart(
                    2,
                    "0"
                  )}{" "}
                </span>

                <span className="text-black/30 mx-1">
                  /
                </span>

                <span className="text-black/30">
                  {String(totalPages).padStart(
                    2,
                    "0"
                  )}
                </span>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.max(p - 1, 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="p-2 transition-all hover:scale-110 disabled:opacity-10"
                  aria-label="Previous Page"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(
                        p + 1,
                        totalPages
                      )
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="p-2 transition-all hover:scale-110 disabled:opacity-10"
                  aria-label="Next Page"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="1.5"
                  >
                    <path d="M9 18l6-6-6-6" />
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