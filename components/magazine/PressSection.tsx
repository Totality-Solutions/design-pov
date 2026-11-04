"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import BlogsCarousel from "../common/BlogsCarousel";
import MagazineNav from "./MagazineNav";
import SubmissionForm from "./SubmissionForm";
import { NormalizedBlog } from "@/lib/blog";
import ProjectsCarousel from "./projects/ProjectsCarousel";
import type { Project } from "@/lib/projects";

export default function PressSection({ allBlogs, projects = [] }: { allBlogs?: NormalizedBlog[]; projects?: Project[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Magazine");

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white"
    >
      <SectionHeading
        titleMain={activeCategory === "Submit" ? "Collaborate" : "Latest"}
        isSectionHovered={isHovered}
      />

      <MagazineNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="w-full">
        {activeCategory === "Submit" ? (
          <SubmissionForm />
        ) : activeCategory === "Project" ? (
          <ProjectsCarousel projects={projects} />
        ) : (
          <BlogsCarousel filter={activeCategory} allBlogs={allBlogs} />
        )}
      </div>
    </div>
  );
}
