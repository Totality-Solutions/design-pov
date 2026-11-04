"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

// The Magazine page's "Project" tab — same scroller as BlogsCarousel.
export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [projects]);

  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollTo({ left: el.scrollLeft + dir * (card ? card.offsetWidth + 24 : 300), behavior: "smooth" });
  };

  if (projects.length === 0) {
    return (
      <section className="w-full bg-white py-36 px-6 lg:px-10 flex items-center justify-center">
        <p className="font-['Montserrat'] text-black text-lg">No projects yet.</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-6 px-6 lg:px-10">
      <div className="relative flex items-center w-full">
        <button
          onClick={() => scroll(-1)}
          disabled={!canLeft}
          aria-label="Previous projects"
          className={`absolute left-[-10px] z-10 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white flex items-center justify-center transition-all duration-300 ${
            canLeft ? "opacity-100 hover:bg-red-600" : "opacity-0 cursor-default"
          }`}
        >
          <FiChevronLeft size={20} />
        </button>

        <div ref={scrollRef} onScroll={update} className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]" />
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          disabled={!canRight}
          aria-label="More projects"
          className={`absolute right-[-10px] z-10 w-8 h-8 lg:w-10 lg:h-10 bg-black text-white flex items-center justify-center transition-all duration-300 ${
            canRight ? "opacity-100 hover:bg-red-600" : "opacity-0 cursor-default"
          }`}
        >
          <FiChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-end mt-6">
        <Link href="/magazine/projects" className="text-[11px] uppercase tracking-widest text-black/60 hover:text-primary-red transition-colors">
          View all projects →
        </Link>
      </div>
    </section>
  );
}
