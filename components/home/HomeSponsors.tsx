"use client";
import { cdn } from "@/lib/cdn";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import Link from "next/link";

const HomeSponsors: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    {
      id: 1,
      name: "PRESENTING PARTNER",
      logo: cdn("/temp/edition/sponsors/1.png"),
      href: "https://www.kajariaceramics.com/",
    },
    {
      id: 2,
      name: "POWERED BY",
      logo: cdn("/temp/edition/sponsors/2.png"),
      href: "https://www.pacific-surfaces.com/",
    },
    {
      id: 3,
      name: "NETWORK PARTNER",
      logo: cdn("/temp/edition/sponsors/3.png"),
      href: "https://www.allhome.in/",
    },
    {
      id: 4,
      name: "LOUNGE PARTNER",
      logo: cdn("/temp/edition/sponsors/4.png"),
      href: "https://www.essentiahome.com/?srsltid=AfmBOoqCYRZnQWfAJ8Tx74fKI-F59l2uzZUYhcKm6bUDxvV6r0RBMmld",
    },
    {
      id: 5,
      name: "COLOUR PARTNER",
      logo: cdn("/temp/edition/sponsors/5.png"),
      href: "https://www.pantone.com/hk/en/",
    },
  ];

  return (
    <section
      className="w-full bg-white flex flex-col font-display"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HEADING */}
      <SectionHeading
        titleMain="POV PARTNERS"
        sticky={false}
        bgColor="black"
        isSectionHovered={isHovered}
      />

      {/* GRID */}
      <div className="w-full bg-white">
        <div className="grid grid-cols-2 md:grid-cols-5">

          {partners.map((partner) => (
            <div
              key={partner.id}
              className="relative aspect-[9/4] lg:aspect-[6/3] flex items-center justify-center p-4 lg:p-2 transition-colors duration-300 hover:bg-gray-50/50 overflow-hidden"
            >

              {/* TEXT */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center w-full px-4">

                <h4 className="text-black text-[9px] md:text-[11px] font-medium leading-tight tracking-wide uppercase">
                  {partner.name}
                </h4>

              </div>

              {/* LOGO */}
              <Link
                href={partner.href}
                target="_blank"
                className="w-full h-full flex items-center justify-center border-b mx-6 border-pov-black/30 cursor-pointer"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain scale-95 transition-all px-[8px] pt-[8px] duration-500"
                />
              </Link>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HomeSponsors;