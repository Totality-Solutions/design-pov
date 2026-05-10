"use client";

import React, { useState } from "react";
import Image from "next/image";

import MarqueeFlow from "@/components/common/MarqueeFlow";
import { ShowcaseModal } from "../../edition26/core/ShowcaseModal";

const OBJECTS = [
  {
    id: 1,
    src: "/temp/objects/1.png",
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
    src: "/temp/objects/2.png",
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
    src: "/temp/objects/3.png",
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
    src: "/temp/objects/4.png",
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
    src: "/temp/objects/5.png",
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
    src: "/temp/objects/6.png",
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
    src: "/temp/objects/7.png",
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
      <section className="w-full bg-white h-[350px] md:h-[350px] lg:h-[320px] my-10">
        <div className="w-full overflow-hidden h-[350px] md:h-[350px] lg:h-[320px] flex items-end">
          <MarqueeFlow
            items={OBJECTS}
            gap={5}
            speed={200}
            desktopCount={4}
            renderItem={(item, _index, isExpanded) => {
              return (
                <button
                  // onClick={() => setSelectedObject(item)}
                  className="relative block w-full overflow-hidden shadow-xl text-left"
                  style={{
                    aspectRatio: isExpanded ? "6/5" : "10/5",
                    transition:
                      "aspect-ratio 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
                    transformOrigin: "bottom",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;

                    el.style.aspectRatio = "6/5";

                    const media =
                      el.querySelectorAll<HTMLElement>("img");

                    media.forEach((m) => {
                      m.style.transform =
                        "translate3d(0,0,0) scale(1)";
                    });
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;

                    el.style.aspectRatio = isExpanded
                      ? "6/5"
                      : "10/5";

                    const media =
                      el.querySelectorAll<HTMLElement>("img");

                    media.forEach((m) => {
                      m.style.transform = isExpanded
                        ? "translate3d(0,0,0) scale(1)"
                        : "translate3d(0,0,0) scale(1)";
                    });
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover will-change-transform"
                    style={{
                      transform: isExpanded
                        ? "translate3d(0,0,0) scale(1)"
                        : "translate3d(0,0,0) scale(1)",
                      transition:
                        "transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)",
                      transformOrigin: "bottom center",
                      backfaceVisibility: "hidden",
                    }}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-black/20" />
                </button>
              );
            }}
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