"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Blog, blogs } from "@/data/magazineData";

export default function BlogsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // clientWidth ki jagah ek single card ki width calculate kar rahe hain
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstItem ? firstItem.offsetWidth + 24 : 300; // 24 is the gap (gap-6)

      scrollRef.current.scrollTo({
        left: direction === "left" 
          ? scrollRef.current.scrollLeft - cardWidth 
          : scrollRef.current.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="flex items-center gap-4">
        
        {/* LEFT BUTTON (Outside) */}
        <button
          onClick={() => scroll("left")}
          className="flex-shrink-0 w-10 h-10 items-center justify-center hidden md:flex hover:text-primary-red transition-color duration-300"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* CAROUSEL CONTAINER */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogs.map((item: Blog) => (
            <div
              key={item.id}
              className="
                flex-shrink-0
                w-[85%]
                sm:w-[calc(50%-12px)]
                lg:w-[calc(25%-18px)]
                group cursor-pointer
              "
              onClick={() => window.location.href = `/magazine/${item.slug}`}
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/40">
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
          ))}
        </div>

        {/* RIGHT BUTTON (Outside) */}
        <button
          onClick={() => scroll("right")}
          className="flex-shrink-0 w-10 h-10 items-center justify-center hidden md:flex hover:text-primary-red transition-color duration-300"
        >
          <FiChevronRight size={24} />
        </button>
      </div>


    </section>
  );
}