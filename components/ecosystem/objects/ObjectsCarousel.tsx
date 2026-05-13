"use client";
import { cdn } from "@/lib/cdn";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ShowcaseModal = dynamic(
  () => import("../../edition26/core/ShowcaseModal").then(m => m.ShowcaseModal),
  { ssr: false }
);

const OBJECTS = [
  {
    id: 1,
    src: cdn("/temp/objects/1.png"),
    additionalImages: [
      cdn("/temp/objects/2.jpg"),
      cdn("/temp/objects/3.jpg"),
    ],
    label: "Collectible Seating",
    sublabel: "Collectible Seating",
    description:
      "A curated collection of seating objects exploring form, tactility, and sculptural expression within contemporary interiors.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
  {
    id: 2,
    src: cdn("/temp/objects/2.png"),
    additionalImages: [
      cdn("/temp/objects/3.jpg"),
      cdn("/temp/objects/4.jpg"),
    ],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
  {
    id: 3,
    src: cdn("/temp/objects/3.png"),
    additionalImages: [
      cdn("/temp/objects/4.jpg"),
      cdn("/temp/objects/5.jpg"),
    ],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
  {
    id: 4,
    src: cdn("/temp/objects/4.png"),
    additionalImages: [
      cdn("/temp/objects/4.jpg"),
      cdn("/temp/objects/5.jpg"),
    ],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
  {
    id: 5,
    src: cdn("/temp/objects/5.png"),
    additionalImages: [
      cdn("/temp/objects/4.jpg"),
      cdn("/temp/objects/5.jpg"),
    ],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
  {
    id: 6,
    src: cdn("/temp/objects/6.png"),
    additionalImages: [
      cdn("/temp/objects/4.jpg"),
      cdn("/temp/objects/5.jpg"),
    ],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
  {
    id: 7,
    src: cdn("/temp/objects/7.png"),
    additionalImages: [
      cdn("/temp/objects/4.jpg"),
      cdn("/temp/objects/5.jpg"),
    ],
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description:
      "Experimental lighting pieces that blur the line between functionality and collectible art.",
    website: "#",
    instagram: "#",
    logo: cdn("/logo/Totality.svg"),
  },
];

const ObjectsCarousel: React.FC = () => {
  const [selectedObject, setSelectedObject] = useState<any>(null);

  return (
    <>
      <div className="relative w-full mt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OBJECTS.map((obj, i) => (
            <button
              key={i}
              className="relative overflow-hidden cursor-pointer group h-40 md:h-52"
              onClick={() => setSelectedObject(obj)}
            >
              <Image
                src={obj.src}
                alt={obj.label}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>

        <div className="mt-4 border-t border-neutral-200" />
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
