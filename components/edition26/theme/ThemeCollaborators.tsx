"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { themeData, CoreItem } from "@/data/themeData";
import { ShowcaseModal } from "../core/ShowcaseModal";

function HoverCard({
  project,
  onClick,
}: {
  project: CoreItem;
  onClick: () => void;
}) {
  const architectsText = Array.isArray(project.architects)
    ? project.architects.join(" | ")
    : project.architects;

  return (
    <motion.div
      onClick={onClick}
      className="group relative flex flex-col items-center bg-white overflow-hidden cursor-pointer"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        <Image
          src={project.src}
          alt={project.label}
          fill
          className="object-cover transition-transform duration-500 ease-out lg:group-hover:scale-105"
        />
      </div>

      <div className="w-full flex items-center justify-between py-[15px]">
        <div className="font-['Montserrat'] text-[11px] lg:text-[14px] text-black uppercase font-medium">
          {project.label}<br/>
          <p className="font-['Montserrat'] text-[12px] lg:text-[14px] text-black/90 capitalize font-normal">{architectsText}</p>        
        </div>
        <div className="hidden lg:flex w-[11px] h-[11px] border-[1.5px] border-black lg:group-hover:bg-primary-red lg:group-hover:border-primary-red transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

export default function ThemeCollaborators() {
  const [selectedCollaborator, setSelectedCollaborator] = useState<CoreItem | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="w-full bg-white flex flex-col items-center select-none">
      <main className="w-full px-6 lg:px-10 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[50px]">
          {themeData.map((project) => (
            <HoverCard
              key={project.id}
              project={project}
              onClick={() => setSelectedCollaborator(project)}
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