"use client";

import React, { useRef, useMemo } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Blog, blogs } from "@/data/magazineData";

interface CarouselProps {
  filter: string;
}

export default function BlogsCarousel({ filter }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredBlogs = useMemo(() => {
    if (filter === "Magazine") return blogs;
    return blogs.filter(item => item.category.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstItem ? firstItem.offsetWidth + 24 : 300;

      scrollRef.current.scrollTo({
        left: direction === "left" 
          ? scrollRef.current.scrollLeft - cardWidth 
          : scrollRef.current.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-12 px-10">
      {/* Container is relative so buttons can sit at the far edges */}
      <div className="relative flex items-center w-full">
        
        {/* LEFT BUTTON - Absolutely positioned to the left */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-[-40px] z-10 flex-shrink-0 w-10 h-10 items-center justify-center hidden md:flex hover:text-red-600 transition-colors duration-300 disabled:opacity-20"
          disabled={filteredBlogs.length === 0}
        >
          <FiChevronLeft size={24} />
        </button>

        {/* CAROUSEL CONTENT */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full "
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item: Blog) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group cursor-pointer"
                onClick={() => window.location.href = `/magazine/${item.slug}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={item.thumbnail || item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[16px] text-black/60">
                    {item.category}
                  </span>

                  <h3 className="text-base md:text-[18px] font-medium leading-tight text-black line-clamp-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 text-[11px] font-medium text-black/60 uppercase">
                    <span>{item.author}</span>
                    <span className="w-1 h-1 rounded-full bg-black/20" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* FALLBACK UI */
            <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg">
              <p className="font-['Montserrat'] text-gray-400 text-lg uppercase tracking-widest">
                No articles found in {filter}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT BUTTON - Absolutely positioned to the right */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-[-40px] z-10 flex-shrink-0 w-10 h-10 items-center justify-center hidden md:flex hover:text-red-600 transition-colors duration-300 disabled:opacity-20"
          disabled={filteredBlogs.length === 0}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}