"use client";

import MagazineBase from "@/components/common/MagazineBase";
import SectionHeading from "../common/SectionHeading";
import { blogs as staticBlogs } from "@/data/magazineData";
import { NormalizedBlog, normalizeStaticBlog } from "@/lib/blog";
import { useState } from "react";

export default function FeaturedBlogSection({ allBlogs }: { allBlogs?: NormalizedBlog[] }) {
  const [isHovered, setIsHovered] = useState(false);

  const sourceBlogs: NormalizedBlog[] = allBlogs && allBlogs.length > 0
    ? allBlogs
    : [...staticBlogs].sort((a, b) => (b.id as number) - (a.id as number)).map(normalizeStaticBlog);

  const featuredBlog = sourceBlogs[0];
  if (!featuredBlog) return null;

  return (
    <section
      className="w-full bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading titleMain="The " titleBold="Draft" subTitle="Featured Stories" isSectionHovered={isHovered} />
      <div className="my-6 px-6 md:px-14">
        <MagazineBase activeBlog={featuredBlog} isInnerPage={false} allBlogs={sourceBlogs} />
      </div>
    </section>
  );
}
