"use client";
import { cdn } from "@/lib/cdn";

import React, { useState } from "react";
import Image from "next/image";

import MarqueeFlow from "@/components/common/MarqueeFlow";
import { ShowcaseModal } from "../../edition26/core/ShowcaseModal";

const OBJECTS = [
  {
    id: 1,
    src: cdn("/temp/objects/1.png"),
    additionalImages: [
      "/temp/objects/2.jpg",
      "/temp/objects/3.jpg",
    ],
    label: "Collectible Seating",
    sublabel:"Collectible Seating",
    description:
      "A curated collection of seating objects exploring form, tactility, and sculptural expression within contemporary interiors.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
  {
    id: 2,
    src: cdn("/temp/objects/2.png"),
    additionalImages: [
      "/temp/objects/3.jpg",
      "/temp/objects/4.jpg",
    ],
    label: "Lighting Objects",
    sublabel:"Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
  {
    id: 3,
    src: cdn("/temp/objects/3.png"),
    additionalImages: [
      "/temp/objects/4.jpg",
      "/temp/objects/5.jpg",
    ],
    label: "Lighting Objects",
    sublabel:"Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
  {
    id: 4,
    src: cdn("/temp/objects/4.png"),
    additionalImages: [
      "/temp/objects/4.jpg",
      "/temp/objects/5.jpg",
    ],
    label: "Lighting Objects",
    sublabel:"Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
  {
    id: 5,
    src: cdn("/temp/objects/5.png"),
    additionalImages: [
      "/temp/objects/4.jpg",
      "/temp/objects/5.jpg",
    ],
    label: "Lighting Objects",
    sublabel:"Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
  {
    id: 6,
    src: cdn("/temp/objects/6.png"),
    additionalImages: [
      "/temp/objects/4.jpg",
      "/temp/objects/5.jpg",
    ],
    label: "Lighting Objects",
    sublabel:"Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
  {
    id: 7,
    src: cdn("/temp/objects/7.png"),
    additionalImages: [
      "/temp/objects/4.jpg",
      "/temp/objects/5.jpg",
    ],
    label: "Lighting Objects",
    sublabel:"Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
  },
];

const ObjectsMarquee: React.FC = () => {
  const [selectedObject, setSelectedObject] = useState<any>(null);

  return (
    <>
      <section className="w-full bg-white h-[350px] md:h-[350px] lg:h-[320px] my-10 overflow-hidden">
        <div className="w-full h-full flex items-end">
          <MarqueeFlow
            items={OBJECTS}
            gap={5}
            speed={200}
            desktopCount={4}
            renderItem={(item) => (
              <button
                className="relative block w-full shadow-xl text-left marquee-item-btn"
                onClick={() => setSelectedObject(item)}
                style={{
                  aspectRatio: "6/5",
                  clipPath: "inset(40% 0 0 0)",
                  transition: "clip-path 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.clipPath = "inset(0% 0 0 0)";
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.closest("[data-expanded]") as HTMLElement | null;
                  e.currentTarget.style.clipPath =
                    parent?.dataset.expanded === "true"
                      ? "inset(0% 0 0 0)"
                      : "inset(40% 0 0 0)";
                }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20" />
              </button>
            )}
          />
        </div>
      </section>

      <ShowcaseModal
        isOpen={!!selectedObject}
        onClose={() => setSelectedObject(null)}
        data={selectedObject}
      />
    </>
  );
};

export default ObjectsMarquee;