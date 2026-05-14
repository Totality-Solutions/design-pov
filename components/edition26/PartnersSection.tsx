"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import { normalizeBrandPartner } from "@/lib/brandPartners";
import type { BrandPartnerRow, BrandPartnerTypeRow } from "@/types";

type PartnerEntry = { id: string; type: string; name: string; logo: string };

const EXCLUDED_TYPES = new Set(["brand", "brand_collaborator"]);

const PartnersSection: React.FC = () => {
  const [allPartners, setAllPartners] = useState<PartnerEntry[]>([]);
  const [types, setTypes]             = useState<BrandPartnerTypeRow[]>([]);
  const [suppressed, setSuppressed]   = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab]     = useState("");
  const [isMobile, setIsMobile]       = useState(false);
  const [isHovered, setIsHovered]     = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/cms/brand-partners").then((r) => r.ok ? r.json() : null),
      fetch("/api/cms/brand-partner-types").then((r) => r.ok ? r.json() : null),
    ]).then(([partnersJson, typesJson]) => {
      if (typesJson?.data) {
        // Only keep active types; collect inactive ones for suppression
        const active   = (typesJson.data as BrandPartnerTypeRow[]).filter((t) => t.active !== false);
        const inactive = new Set((typesJson.data as BrandPartnerTypeRow[]).filter((t) => t.active === false).map((t) => t.type));
        setTypes(active);
        setSuppressed(inactive);
      }
      if (partnersJson?.data) {
        const mapped = (partnersJson.data as BrandPartnerRow[])
          .filter((p) => !EXCLUDED_TYPES.has(p.type))
          .map((p) => {
            const item = normalizeBrandPartner(p);
            return { id: item.id, type: item.type, name: item.name, logo: item.logo };
          });
        setAllPartners(mapped);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Build label map from CMS types
  const labelMap = Object.fromEntries(types.map((t) => [t.type, t.title]));
  function getLabel(type: string) {
    return labelMap[type] ?? type.replace(/_/g, " ").toUpperCase();
  }

  // Tabs ordered by brand_partner_types sort_order, then any unknown types appended
  const presentTypes  = new Set(allPartners.map((p) => p.type));
  const cmsTypeKeys   = types.map((t) => t.type);
  const orderedTabs   = [
    ...types.filter((t) => presentTypes.has(t.type) && !EXCLUDED_TYPES.has(t.type)).map((t) => t.type),
    ...Array.from(presentTypes).filter((t) => !cmsTypeKeys.includes(t) && !EXCLUDED_TYPES.has(t) && !suppressed.has(t)),
  ];

  // Auto-select first tab once data loads
  useEffect(() => {
    if (orderedTabs.length && (!activeTab || !orderedTabs.includes(activeTab))) {
      setActiveTab(orderedTabs[0]);
    }
  }, [orderedTabs.join(",")]);

  const handleTabClick = (type: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(type);
    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const filtered     = allPartners.filter((p) => p.type === activeTab);
  const isFirstTab   = activeTab === orderedTabs[0];
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
            {orderedTabs.map((type) => (
              <button
                key={type}
                onClick={(e) => handleTabClick(type, e)}
                className={`py-[18px] text-[15px] md:text-[18px] transition-all duration-300 border-b-2 whitespace-nowrap outline-none relative ${
                  activeTab === type
                    ? "border-[#E02914] text-[#E02914] font-semibold"
                    : "border-transparent text-[#999999] hover:text-black font-medium"
                }`}
              >
                {getLabel(type)}
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
                    isFirstTab
                      ? "aspect-9/5 lg:aspect-6/3 pt-4 md:pt-8 mx-4"
                      : "aspect-9/5 lg:aspect-6/3 p-4 mx-4"
                  }`}
                >
                  {partner ? (
                    <>
                      {isFirstTab && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">
                          <h4 className="text-black text-[10px] font-medium leading-tight capitalize">
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
