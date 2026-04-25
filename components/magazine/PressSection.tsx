"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import BlogsCarousel from "../common/BlogsCarousel";
import MagazineNav from "./MagazineNav";
import SubmissionForm from "./SubmissionForm"; // Import the new form

export default function PressSection() {
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

      {/* CONDITIONAL RENDERING LOGIC */}
      <div className="w-full">
        {activeCategory === "Submit" ? (
          <SubmissionForm />
        ) : (
          <BlogsCarousel filter={activeCategory} />
        )}
      </div>
    </div>
  );
}