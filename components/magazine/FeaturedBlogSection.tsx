"use client";

import MagazineBase from "@/components/common/MagazineBase";
import SectionHeading from "../common/SectionHeading";
import { blogs } from "@/data/magazineData";
import BlogsCarousel from "../common/BlogsCarousel";
import { useState } from "react";

export default function FeaturedBlogSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full bg-white" 
    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      {/* Tu yahan heading handle kar sakta hai */}
      <SectionHeading titleMain="The " titleBold="Draft" subTitle="Featured Stories"  isSectionHovered={isHovered} />
      <div className=" my-6 px-6 md:px-14">
        
        <MagazineBase activeBlog={blogs[0]} isInnerPage={false} />
      </div>
    </section>
  );
}