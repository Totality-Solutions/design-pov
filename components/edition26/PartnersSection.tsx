"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import { normalizeBrandPartner } from "@/lib/brandPartners";
import type { BrandPartnerRow } from "@/types";

const TYPE_TO_CATEGORY: Record<string, string> = {
  sponsor:                   "Partners",
  build_partner:             "Build Partners",
  key_execution_partner:     "Key execution Partner",
  gifting_partner:           "Gifting Partners",
  media_partner:             "Media Partners",
  digital_media_partner:     "Digital Media Partner",
  red_room_partner:          "Red Room Partner",
  ticketing_partner:         "TICKETING PARTNER",
  sensory_collaborator:      "Sensory Collaborator",
  curatorial_partner:        "Curatorial Partner",
  experience_partner:        "Experience Partner",
  knowledge_partner:         "Knowledge Partner",
  learning_partner:          "Learning Partner",
  visual_experience_partner: "Visual Experience Partner",
  workshop_partner:          "Workshop Partner",
  operation_partner:         "OPERATIONS PARTNER",
  community_partner:         "Community Partner",
};


const CATEGORY_ORDER = [
  "Partners",
  "Build Partners",
  "Key execution Partner",
  "Gifting Partners",
  "Media Partners",
  "Digital Media Partner",
  "Red Room Partner",
  "TICKETING PARTNER",
  "Sensory Collaborator",
  "Curatorial Partner",
  "Experience Partner",
  "Knowledge Partner",
  "Learning Partner",
  "Visual Experience Partner",
  "Workshop Partner",
  "OPERATIONS PARTNER",
  "Community Partner",
];

type PartnerEntry = { id: string; category: string; name: string; logo: string };

const PartnersSection: React.FC = () => {
  const [allPartners, setAllPartners] = useState<PartnerEntry[]>([]);
  const [activeTab, setActiveTab]     = useState("Partners");
  const [isMobile, setIsMobile]       = useState(false);
  const [isHovered, setIsHovered]     = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/cms/brand-partners")
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (!json?.data) return;
        const mapped = (json.data as BrandPartnerRow[])
          .filter((p) => p.type !== "brand" && p.type !== "brand_collaborator")
          .map((p) => {
            const item     = normalizeBrandPartner(p);
            const category = TYPE_TO_CATEGORY[item.type] ?? item.type;
            const name     = item.name;
            return { id: item.id, category, name, logo: item.logo };
          });
        setAllPartners(mapped);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Build ordered tab list from present categories
  const presentCategories = new Set(allPartners.map((p) => p.category));
  const categories = [
    ...CATEGORY_ORDER.filter((c) => presentCategories.has(c)),
    ...[...presentCategories].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  // Reset activeTab if it's no longer present after data loads
  const resolvedTab = categories.includes(activeTab) ? activeTab : (categories[0] ?? "Partners");

  const handleTabClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(cat);
    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const filtered = allPartners.filter((p) => p.category === resolvedTab);
  const isMain   = resolvedTab === "Partners";

  const columns      = isMobile ? 1 : 1;
  const remainder    = filtered.length % columns;
  const paddingNeeded = remainder === 0 ? 0 : columns - remainder;
  const displayCount  = filtered.length === 0 ? columns : filtered.length + paddingNeeded;
  const gridCells     = Array.from({ length: displayCount });

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

      <div className="px-6 lg:px-10">
        {/* TABS */}
        <div
          ref={scrollContainerRef}
          className="w-full bg-white overflow-x-auto scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-6 md:gap-10 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={(e) => handleTabClick(cat, e)}
                className={`py-[18px] text-[15px] md:text-[18px] transition-all duration-300 border-b-2 whitespace-nowrap outline-none relative ${
                  resolvedTab === cat
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
          <div className="grid border-t border-[#EEEEEE] grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {gridCells.map((_, index) => {
              const partner = filtered[index];
              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center justify-center border-b border-pov-black/30 transition-colors duration-300 hover:bg-gray-50/50 overflow-hidden ${
                    isMain
                      ? "aspect-9/5 lg:aspect-6/3 pt-4 md:pt-8 mx-4"
                      : "aspect-9/5 lg:aspect-6/3 p-4 mx-4"
                  }`}
                >
                  {partner ? (
                    <>
                      {isMain && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
                          <h4 className="text-black text-[10px] font-medium leading-tight uppercase">
                            {partner.name}
                          </h4>
                        </div>
                      )}
                      <img
                        src={partner.logo}
                        alt={partner.name || "Partner Logo"}
                        className="max-w-[75%] h-full object-contain transition-all duration-500"
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
