"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { StudioItem, ModalData } from "@/types";
import { ShowcaseModal } from "../core/ShowcaseModal";

function toModalData(studio: StudioItem): ModalData {
  return {
    id: studio.id,
    label: studio.label,
    architects: studio.architects,
    src: studio.booth_image,
    description: studio.concept,
    additionalImages: studio.booth_additional_images,
    logo: studio.logo,
    website: studio.website,
    instagram: studio.instagram,
  };
}

function HoverCard({
  studio,
  onClick,
}: {
  studio: StudioItem;
  onClick: () => void;
}) {
  const architectsText = studio.architects?.join(" | ") ?? "";

  return (
    <motion.div
      onClick={onClick}
      className="group relative flex flex-col items-center bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <Image
          src={studio.booth_image}
          alt={studio.label}
          fill
          className="object-cover transition-transform duration-500 ease-out lg:group-hover:scale-105"
        />
      </div>

      <div className="w-full flex items-center justify-between py-[15px]">
        <div className="font-['Montserrat'] text-[11px] lg:text-[14px] text-black uppercase font-medium">
          {studio.label}<br/>
          <p className="font-['Montserrat'] text-[12px] lg:text-[14px] text-black/90 capitalize font-normal">{architectsText}</p>
        </div>
        <div className="hidden lg:flex w-[11px] h-[11px] border-[1.5px] border-black lg:group-hover:bg-primary-red lg:group-hover:border-primary-red transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

export default function ThemeCollaborators({ studios }: { studios: StudioItem[] }) {
  const [selectedCollaborator, setSelectedCollaborator] = useState<ModalData | null>(null);
  const searchParams = useSearchParams();

  // Open modal via URL parameter (e.g., ?designer=studio-id)
useEffect(() => {
  const designerId = searchParams.get('designer');  // Get URL param
  if (designerId && studios.length > 0) {           // Check if exists
    const item = studios.find(d => d.id === designerId);  // Find match
    if (item) setSelectedCollaborator(toModalData(item));  // Open modal
  }
}, [searchParams, studios]);
  console.log("selectedCollaborator", studios)

  return (
    <section className="w-full bg-white flex flex-col items-center select-none">
      <main className="w-full px-6 lg:px-10 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[50px]">
          {studios.map((studio) => (
            <HoverCard
              key={studio.id}
              studio={studio}
              onClick={() => setSelectedCollaborator(toModalData(studio))}
            />
          ))}
        </div>
      </main>

      <ShowcaseModal
        isOpen={!!selectedCollaborator}
        onClose={() => setSelectedCollaborator(null)}
        data={selectedCollaborator}
      />
    </section>
  );
}