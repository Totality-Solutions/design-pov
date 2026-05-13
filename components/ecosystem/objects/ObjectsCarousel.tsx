"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DesignObjectItem } from "@/types";
import { normalizeObject } from "@/lib/objects";
import type { DesignObject } from "@/types";

const ShowcaseModal = dynamic(
  () => import("../../edition26/core/ShowcaseModal").then(m => m.ShowcaseModal),
  { ssr: false }
);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true); // default true — safer for mobile-first
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/* const FALLBACK_OBJECTS: DesignObjectItem[] = [
  {
    id: "1",
    src: cdn("/temp/objects/1.png"),
    additionalImages: [cdn("/temp/objects/2.jpg"), cdn("/temp/objects/3.jpg")],
    label: "Collectible Seating",
    sublabel: "Collectible Seating",
    description: "A curated collection of seating objects exploring form, tactility, and sculptural expression within contemporary interiors.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 1,
  },
  {
    id: "2",
    src: cdn("/temp/objects/2.png"),
    additionalImages: [cdn("/temp/objects/3.jpg"), cdn("/temp/objects/4.jpg")],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 2,
  },
  {
    id: "3",
    src: cdn("/temp/objects/3.png"),
    additionalImages: [cdn("/temp/objects/4.jpg"), cdn("/temp/objects/5.jpg")],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 3,
  },
  {
    id: "4",
    src: cdn("/temp/objects/4.png"),
    additionalImages: [cdn("/temp/objects/4.jpg"), cdn("/temp/objects/5.jpg")],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 4,
  },
  {
    id: "5",
    src: cdn("/temp/objects/5.png"),
    additionalImages: [cdn("/temp/objects/4.jpg"), cdn("/temp/objects/5.jpg")],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 5,
  },
  {
    id: "6",
    src: cdn("/temp/objects/6.png"),
    additionalImages: [cdn("/temp/objects/4.jpg"), cdn("/temp/objects/5.jpg")],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 6,
  },
  {
    id: "7",
    src: cdn("/temp/objects/7.png"),
    additionalImages: [cdn("/temp/objects/4.jpg"), cdn("/temp/objects/5.jpg")],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
    sort_order: 7,
  },
]; */

const ObjectsCarousel: React.FC = () => {
  const isMobile = useIsMobile();
  const [paused, setPaused] = useState(false);
  const [selectedObject, setSelectedObject] = useState<DesignObjectItem | null>(null);
  const [objects, setObjects] = useState<DesignObjectItem[]>([]);

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

  const TRACK = [...objects, ...objects];
  const count = objects.length;
  const itemWidth = isMobile ? "50vw" : "25vw";
  const itemHeight = isMobile ? "h-40" : "h-52 lg:h-64";
  const duration = isMobile ? "14s" : "18s";
  const animName = isMobile ? "carousel-scroll-mobile" : "carousel-scroll-desktop";

  return (
    <>
      <style>{`
        @keyframes carousel-scroll-desktop {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * ${count} * 25vw)); }
        }
        @keyframes carousel-scroll-mobile {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * ${count} * 50vw)); }
        }
      `}</style>

      <div className="relative w-full mt-14 overflow-hidden">
        {/* Single carousel — JS-selected for mobile or desktop, never both in DOM */}
        <div
          className="flex"
          style={{
            animationName: animName,
            animationDuration: duration,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TRACK.map((obj, i) => (
            <div key={i} style={{ width: itemWidth, flexShrink: 0 }} className="px-1.5">
              <button
                className={`relative w-full ${itemHeight} overflow-hidden group cursor-pointer`}
                onClick={() => setSelectedObject(obj)}
              >
                <Image
                  src={obj.src}
                  alt={obj.label}
                  fill
                  sizes={itemWidth}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-neutral-200" />
      </div>

      <ShowcaseModal
        isOpen={!!selectedObject}
        onClose={() => setSelectedObject(null)}
        data={selectedObject}
      />
    </>
  );
};

export default ObjectsCarousel;
