"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { DesignObjectItem } from "@/types";
import { normalizeObject } from "@/lib/objects";
import type { DesignObject } from "@/types";

const ShowcaseModal = dynamic(
  () => import("../../edition26/core/ShowcaseModal").then(m => m.ShowcaseModal),
  { ssr: false }
);

const ObjectsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedObject, setSelectedObject] = useState<DesignObjectItem | null>(null);
  const [objects, setObjects] = useState<DesignObjectItem[]>([]);

  // Fetch objects
  useEffect(() => {
    fetch("/api/cms/objects")
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (json?.data?.length) {
          setObjects((json.data as DesignObject[]).map(normalizeObject));
        }
      })
      .catch(() => {});
  }, []);

  // Function to calculate if buttons should be enabled/disabled
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Re-check scroll buttons whenever objects change or component mounts
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [objects]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstItem ? firstItem.offsetWidth + 24 : 300; // 24px accounts for gap-6
      scrollRef.current.scrollTo({
        left: direction === "left"
          ? scrollRef.current.scrollLeft - cardWidth
          : scrollRef.current.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section className="w-full bg-white py-6 px-6 lg:px-10 mt-14">
        <div className="relative flex items-center w-full group/carousel">

          {/* Left Button */}
          {objects.length > 0 && (
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-[-20px] z-10 flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white items-center justify-center flex transition-all duration-300 
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
            {objects.length > 0 ? (
              objects.map((obj, i) => (
                <div
                  key={obj.id || i}
                  className="flex-shrink-0 w-[calc(50%-12px)] lg:w-[calc(25%-18px)] group cursor-pointer"
                  onClick={() => setSelectedObject(obj)}
                >
                  <div className="relative w-full h-40 lg:h-90 overflow-hidden bg-gray-100">
                    <Image
                      src={obj.src}
                      alt={obj.label || "Design Object"}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full py-36 flex flex-col items-center justify-center">
                <p className="font-['Montserrat'] text-black text-lg">Loading Objects</p>
              </div>
            )}
          </div>

          {/* Right Button */}
          {objects.length > 0 && (
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-[-20px] z-10 flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white items-center justify-center flex transition-all duration-300 
                ${!canScrollRight ? "opacity-0 cursor-default" : "opacity-100 hover:bg-red-600 cursor-pointer"}`}
            >
              <FiChevronRight size={20} />
            </button>
          )}
        </div>
        
      </section>

      {/* Linked Showcase Modal */}
      <ShowcaseModal
        isOpen={!!selectedObject}
        onClose={() => setSelectedObject(null)}
        data={selectedObject}
      />
    </>
  );
};

export default ObjectsCarousel; 