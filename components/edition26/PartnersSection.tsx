"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "../common/SectionHeading";

const CATEGORIES = [
  "Partners",
  "Build Partners",
  "Key execution Partner",
  "Gifting Partners",
  "Media Partners",
  "Digital Media Partners",
  "Ticketing Partners",
  "Sensory Collaborator",
  "Curatorial Partner",
  "Experience Partner",
  "Learning Partner",
  "Visual Experience Partner",
  "Workshop Partner",
];

const PartnersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Partners");
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (
    cat: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveTab(cat);

    const target = e.currentTarget;

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const partners = [
    // MAIN PARTNERS
    {
      id: 1,
      category: "Partners",
      name: "PRESENTING PARTNER",
      logo: "/temp/edition/sponsors/1.png",
    },
    {
      id: 2,
      category: "Partners",
      name: "POWERED BY",
      logo: "/temp/edition/sponsors/2.png",
    },
    {
      id: 7,
      category: "Partners",
      name: "NETWORK PARTNER",
      logo: "/temp/edition/sponsors/3.png",
    },
    {
      id: 9,
      category: "Partners",
      name: "LOUNGE PARTNER",
      logo: "/temp/edition/sponsors/4.png",
    },
    {
      id: 12,
      category: "Partners",
      name: "COLOUR PARTNER",
      logo: "/temp/edition/sponsors/5.png",
    },

    // BUILD PARTNERS
    {
      id: 3,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/1.png",
    },
    {
      id: 10,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/3.png",
    },
    {
      id: 13,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/4.png",
    },
    {
      id: 15,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/5.png",
    },
    {
      id: 16,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/6.png",
    },
    {
      id: 17,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/7.png",
    },
    {
      id: 18,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/8.png",
    },
    {
      id: 19,
      category: "Build Partners",
      logo: "/temp/edition/build-partners/9.png",
    },

    // GIFTING PARTNERS
    {
      id: 40,
      category: "Gifting Partners",
      logo: "/temp/edition/gifting-partners/1.png",
    },
    {
      id: 41,
      category: "Gifting Partners",
      logo: "/temp/edition/gifting-partners/2.png",
    },
    {
      id: 42,
      category: "Gifting Partners",
      logo: "/temp/edition/gifting-partners/4.png",
    },

    // MEDIA PARTNERS
    {
      id: 50,
      category: "Media Partners",
      logo: "/temp/edition/media-partners/1.png",
    },
    {
      id: 51,
      category: "Media Partners",
      logo: "/temp/edition/media-partners/2.png",
    },
    {
      id: 52,
      category: "Media Partners",
      logo: "/temp/edition/media-partners/3.png",
    },

    // DIGITAL MEDIA PARTNERS
    {
      id: 60,
      category: "Digital Media Partners",
      logo: "/temp/edition/media-partners/4.png",
    },

    // TICKETING PARTNERS
    {
      id: 70,
      category: "Ticketing Partners",
      logo: "/temp/edition/ticketing-partners/1.png",
    },
    {
      id: 71,
      category: "Ticketing Partners",
      logo: "/temp/edition/ticketing-partners/2.png",
    },

    // SENSORY
    {
      id: 80,
      category: "Sensory Collaborator",
      logo: "/temp/edition/sensory/12.png",
    },

    // KEY EXECUTION
    {
      id: 90,
      category: "Key execution Partner",
      logo: "/temp/edition/key-execution/1.jpg",
    },

    // CURATORIAL
    {
      id: 100,
      category: "Curatorial Partner",
      logo: "/temp/edition/curatorial-partner/1.png",
    },

    // EXPERIENCE
    {
      id: 110,
      category: "Experience Partner",
      logo: "/temp/edition/experience-partner/1.png",
    },

    // LEARNING
    {
      id: 120,
      category: "Learning Partner",
      logo: "/temp/edition/learning-partner/1.png",
    },

    // VISUAL EXPERIENCE
    {
      id: 130,
      category: "Visual Experience Partner",
      logo: "/temp/edition/visual-experience-partner/1.png",
    },

    // WORKSHOP
    {
      id: 140,
      category: "Workshop Partner",
      logo: "/temp/edition/workshop-partner/1.png",
    },
  ];

  const filtered = partners.filter(
    (p) => p.category === activeTab
  );

  const columns = isMobile ? 1 : 1;

  const remainder = filtered.length % columns;

  const paddingNeeded =
    remainder === 0 ? 0 : columns - remainder;

  const displayCount =
    filtered.length === 0
      ? columns
      : filtered.length + paddingNeeded;

  const gridCells = Array.from({
    length: displayCount,
  });

  return (
    <section
      className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="POV PARTNERS"
        sticky={false}
        bgColor="black"
        isSectionHovered={isHovered}
      >
        <div className="flex">
          <a
            href="/edition/brands"
            className="opacity-100 hover:cursor-pointer hover:underline hover:text-primary-red text-sm md:text-lg font-medium text-black"
          >
            View Brands
          </a>
        </div>
      </SectionHeading>

      {/* TABS */}
      <div
        ref={scrollContainerRef}
        className="w-full bg-white border-b border-[#EEEEEE] overflow-x-auto scroll-smooth no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-6 md:gap-10 px-5 lg:px-[60px] min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={(e) => handleTabClick(cat, e)}
              className={`py-[18px] text-[15px] md:text-[18px] transition-all duration-300 border-b-2 whitespace-nowrap outline-none relative ${
                activeTab === cat
                  ? "border-[#E02914] text-[#E02914] font-semibold"
                  : "border-transparent text-[#999999] hover:text-black font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="w-full bg-white pb-12">
        <div
          className={`grid border-t border-[#EEEEEE] ${
            activeTab === "Partners"
              ? "grid-cols-2 md:grid-cols-6"
              : "grid-cols-2 md:grid-cols-6"
          }`}
        >
          {gridCells.map((_, index) => {
            const partner = filtered[index];

            const isMain =
              activeTab === "Partners";

            return (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center border-b border-pov-black/30 transition-colors duration-300 hover:bg-gray-50/50 overflow-hidden ${
                  isMain
                    ? "aspect-[16/13] mx-4"
                    : "aspect-[16/13] p-4 mx-4"
                }`}
              >
                {partner ? (
                  <>
                    {/* ALWAYS VISIBLE TEXT */}
                    {isMain && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
                        <h4 className="text-black text-[9px] md:text-[12px] font-medium leading-tight ">
                          {partner.name}
                        </h4>

                        {/* <p className="text-black/50 text-[10px] md:text-xs mt-1 uppercase tracking-wide">
                          {partner.category}
                        </p> */}
                      </div>
                    )}

                    {/* LOGO */}
                    <img
                      src={partner.logo}
                      alt={
                        partner.name || "Partner Logo"
                      }
                      className={`object-contain transition-all duration-500 ${
                        isMain
                          ? "max-w-[85%] max-h-[80%]"
                          : "max-w-[75%] max-h-[80%]"
                      }`}
                    />
                  </>
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;