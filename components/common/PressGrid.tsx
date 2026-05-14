"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PressItem {
  category: string;
  title: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

interface PressGridProps {
  data: PressItem[];
  titleMain: string;
  titleBold?: string;
  rightLabel?: string;
}

export default function PressGrid({
  data,
  titleMain,
  titleBold,
  rightLabel,
}: PressGridProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check if we can scroll left or right
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Allow a 1px margin of error for sub-pixel rendering
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      const width = window.innerWidth;
      if (width >= 1024) setShowButtons(data.length > 4);
      else if (width >= 640) setShowButtons(data.length > 2);
      else setShowButtons(data.length > 1);
      
      // Initial check for button states
      setTimeout(updateScrollButtons, 100);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [data.length]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstItem ? firstItem.offsetWidth + 24 : 300;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollRef.current.scrollLeft - cardWidth
            : scrollRef.current.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="w-full bg-white font-['Montserrat']"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain={titleMain}
        titleBold={titleBold}
        isSectionHovered={isHovered}
      >
        {rightLabel && (
          <div className="hidden md:flex">
            <span className="text-lg font-medium text-black">
              {rightLabel}
            </span>
          </div>
        )}
      </SectionHeading>

      <div className="px-6 md:px-[60px] pb-12 relative flex items-center group/container">
        {/* Left Button */}
        {showButtons && (
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-2 lg:left-8 z-10 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white flex items-center justify-center transition-all duration-300 
              ${!canScrollLeft ? "opacity-0 cursor-default" : "opacity-100 hover:bg-red-600 cursor-pointer"}`}
          >
            <FiChevronLeft size={20} />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.map((item, index) => (
            <Link
              key={index}
              href={item.slug}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group cursor-pointer block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base md:text-[18px] font-medium leading-tight text-black line-clamp-2 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Button */}
        {showButtons && (
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-2 lg:right-8 z-10 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white flex items-center justify-center transition-all duration-300 
              ${!canScrollRight ? "opacity-0 cursor-default" : "opacity-100 hover:bg-red-600 cursor-pointer"}`}
          >
            <FiChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}