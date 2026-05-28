"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { blogs as staticBlogs } from "@/data/magazineData";
import { NormalizedBlog, normalizeStaticBlog } from "@/lib/blog";

interface CarouselProps {
  filter: string;
  allBlogs?: NormalizedBlog[];
}

export default function BlogsCarousel({ filter, allBlogs }: CarouselProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sourceBlogs: NormalizedBlog[] = allBlogs && allBlogs.length > 0
    ? allBlogs
    : [...staticBlogs].sort((a, b) => (b.id as number) - (a.id as number)).map(normalizeStaticBlog);

  const filteredBlogs = useMemo(() => {
    return filter === "Magazine"
      ? [...sourceBlogs]
      : sourceBlogs.filter(item => item.category.toLowerCase() === filter.toLowerCase());
  }, [filter, sourceBlogs]);

  // Function to calculate if buttons should be enabled/disabled
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Using a 1px threshold to account for sub-pixel rounding
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Re-check scroll buttons whenever the filter changes or component mounts
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [filteredBlogs]);

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
    <section className="w-full bg-white py-6 px-6 lg:px-10">
      <div className="relative flex items-center w-full group/carousel">

        {/* Left Button */}
        {filteredBlogs.length > 0 && (
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-[-10px] z-10 flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white items-center justify-center flex transition-all duration-300 
              ${!canScrollLeft ? "opacity-0 cursor-default" : "opacity-100 hover:bg-red-600 cursor-pointer"}`}
          >
            <FiChevronLeft size={20} />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group cursor-pointer"
                onClick={() => router.push(`/magazine/${item.slug}`)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={item.thumbnail || item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] text-black/60">{item.category}</span>
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
            <div className="w-full py-36 flex flex-col items-center justify-center">
              <p className="font-['Montserrat'] text-black text-lg">No Articles found in {filter}</p>
            </div>
          )}
        </div>

        {/* Right Button */}
        {filteredBlogs.length > 0 && (
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-[-10px] z-10 flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white items-center justify-center flex transition-all duration-300 
              ${!canScrollRight ? "opacity-0 cursor-default" : "opacity-100 hover:bg-red-600 cursor-pointer"}`}
          >
            <FiChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
}