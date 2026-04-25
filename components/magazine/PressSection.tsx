"use client";

import React, { useState } from "react";
import SectionHeading from "../common/SectionHeading";
import BlogsCarousel from "../common/BlogsCarousel";
import MagazineNav from "./MagazineNav";

export default function PressSection() {
  // Default to "Magazine" which shows all
  const [activeCategory, setActiveCategory] = useState("Magazine");

  return (
    <div >
      {/* Pass state to Nav */}
      <MagazineNav 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      {/* Pass filter to Carousel */}
      <BlogsCarousel filter={activeCategory} />
    </div>
  );
}