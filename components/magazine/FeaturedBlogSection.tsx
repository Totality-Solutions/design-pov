"use client";

import React, { useState } from "react";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";

/* ================= TYPES ================= */

type Blog = {
  type: "blog";
  id: number;
  title: string;
  image: string;
  author: string;
  date: string;
  category: string;
  content: string[];
};

type Ad = {
  type: "ad";
  id: string;
  image: string;
  aspect: string;
  overlayText?: string;
};

type SidebarItem = Blog | Ad;

/* ================= COMPONENT ================= */

export default function FeaturedBlogSection() {
  const [isHovered, setIsHovered] = useState(false);

  const blogs: Blog[] = [
    {
      type: "blog",
      id: 1,
      title: "The Future of Architectural Storytelling",
      image: "/temp/blog-main.jpg",
      date: "18 Mar 2026",
      author: "Manisha AR",
      category: "Editorial",
      content: [
        "Architecture today is no longer confined to physical structures—it has evolved into a medium of storytelling. Every line drawn, every material chosen, and every void created contributes to a narrative that unfolds through experience rather than explanation.",
        "In contemporary design, the focus has shifted from mere functionality to emotional resonance. Spaces are now designed to be felt. The warmth of natural light spilling across textured surfaces, the quiet strength of raw materials, and the deliberate pacing of spatial transitions all come together to create immersive environments.",
        "This shift reflects a deeper understanding of how people interact with spaces. It’s not just about how a place looks, but how it makes you feel when you step into it. Whether it’s a serene home, a dynamic workspace, or a public installation, architecture today aims to evoke emotion, memory, and connection.",
        "Minimalism continues to play a significant role, but it is no longer about emptiness—it is about intention. Every element that exists within a space serves a purpose, contributing to a larger, cohesive story. The absence of clutter allows the essence of design to come forward, making each detail more meaningful.",        
        "As cities evolve and lifestyles change, architecture must respond with adaptability and foresight. Sustainable materials, flexible layouts, and human-centric design principles are shaping the future of spaces that are not only visually compelling but also responsible and enduring.",
        "Ultimately, architectural storytelling is about creating spaces that stay with you—long after you’ve left them. It is about crafting experiences that are subtle yet powerful, quiet yet unforgettable."
      ]
    },
    {
      type: "blog",
      id: 2,
      title: "Reimagining Spaces Through Materiality",
      image: "/temp/press-1.jpg",
      date: "26 Feb 2026",
      author: "Design POV",
      category: "Architecture",
      content: [
        "Materiality has become one of the most powerful tools in defining modern architecture. Beyond aesthetics, materials influence how a space feels, ages, and interacts with its environment.",        
        "Designers are increasingly drawn to honest materials—those that express their true nature without excessive treatment. Raw concrete, natural stone, untreated wood—each brings authenticity and depth to a space.",        
        "The interplay of textures is where design truly comes alive. Smooth surfaces contrasted with rough finishes create a tactile richness that engages both sight and touch. These contrasts add layers to the spatial experience, making environments more dynamic and engaging.",        
        "Light plays a crucial role in enhancing materiality. As it moves throughout the day, it reveals different facets of textures and surfaces, transforming the perception of a space over time.",        
        "Sustainability is also reshaping material choices. Locally sourced materials, recycled elements, and environmentally conscious finishes are no longer optional—they are essential in responsible design.",        
        "In essence, materiality is not just about what a space is made of, but how those materials come together to create meaning, atmosphere, and identity."
      ]
    },
    {
      type: "blog",
      id: 3,
      title: "Modern Living: A Deep Dive into Urban Spaces",
      image: "/temp/press-2.jpg",
      date: "20 Feb 2026",
      author: "Design POV",
      category: "Interiors",
      content: [
        "Urban living has transformed the way we perceive space. With increasing density and limited square footage, design must be both efficient and inspiring.",        
        "Modern interiors are moving towards simplicity—not as a trend, but as a necessity. Clean lines, neutral palettes, and open layouts help create a sense of openness even in compact environments.",        
        "Functionality is at the core of urban design. Furniture is no longer static—it adapts, transforms, and serves multiple purposes. This flexibility allows spaces to evolve with the needs of their users.",        
        "Natural elements are being reintroduced into urban homes to counterbalance the fast-paced city lifestyle. Indoor plants, natural textures, and soft lighting bring a sense of calm and grounding.",        
        "Technology is seamlessly integrating into interiors, enhancing convenience without disrupting aesthetics. Smart lighting, hidden storage, and minimal interfaces contribute to a clutter-free living experience.",        
        "Ultimately, modern urban living is about balance—between function and beauty, efficiency and comfort, technology and nature. It is about creating spaces that support not just living, but well-being."
      ]
    }
  ];

  const [activeBlog, setActiveBlog] = useState<Blog>(blogs[0]);

  /* ================= DYNAMIC SIDEBAR ================= */

  const sidebarBlogs = blogs.filter(
    (blog) => blog.id !== activeBlog.id
  );

  const sidebarItems: SidebarItem[] = [];

  sidebarBlogs.forEach((blog, index) => {
    sidebarItems.push(blog);

    if (index === 0) {
      sidebarItems.push({
        type: "ad",
        id: "ad-1",
        image: "/temp/2.jpg",
        aspect: "aspect-[3/4]"
      });
    }

    if (index === 1) {
      sidebarItems.push({
        type: "ad",
        id: "ad-2",
        image: "/temp/3.jpg",
        aspect: "aspect-square",
        overlayText: "New Collection\nComing Soon"
      });
    }
  });

  return (
    <section
      className="w-full bg-white font-['Montserrat'] pb-16 md:pb-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* HEADER */}
      <SectionHeading
        titleMain="The "
        titleBold="Draft"
        subTitle="Editorial & Longform"
        isSectionHovered={isHovered}
        sticky={true}
        stickyTop="top-0"
      >
        <div className="hidden md:flex">
          <span className="text-base md:text-lg font-medium text-black">
            {activeBlog.author}
          </span>
        </div>
      </SectionHeading>

      <div className="px-4 sm:px-6 md:px-[60px] lg:px-[80px] mt-10 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">

          {/* MAIN BLOG */}
          <div className="flex flex-col gap-6 md:gap-8 lg:border-r lg:border-neutral-100 lg:pr-10">

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <Image
                src={activeBlog.image}
                alt={activeBlog.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-5 md:gap-6">

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
                <span className="text-black font-medium">
                  {activeBlog.date}
                </span>
                <div className="hidden md:block w-[1px] h-5 bg-black/20" />
                <span className="text-black font-medium">
                  {activeBlog.author}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black leading-tight">
                {activeBlog.title}
              </h2>

              {activeBlog.content.map((para, i) => (
                <p
                  key={i}
                  className="text-black/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-[900px]"
                >
                  {para}
                </p>
              ))}

              <div className="mt-2 md:mt-4">
                <CTABtn
                  label="Read More"
                  href="/blog/article-slug"
                  textColor="black"
                  borderColor="black"
                  btnBg="transparent"
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-8 md:gap-10 lg:sticky lg:top-24 h-fit">

            {sidebarItems.map((item) => {

              if (item.type === "blog") {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveBlog(item);
                    }}
                    className={`flex flex-col gap-4 group cursor-pointer transition-all duration-300 ${
                      activeBlog.id === item.id ? "ring-1 ring-black" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">

                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />

                      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 z-10">
                        <span className="text-white/60 text-[9px] md:text-[10px] uppercase tracking-widest">
                          {item.category}
                        </span>

                        <h4 className="text-white text-xs md:text-sm mt-1 leading-tight">
                          {item.title}
                        </h4>

                        <div className="hidden md:flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white/40 text-[9px]">
                            by {item.author}
                          </span>
                          <span className="text-white/40 text-[9px]">
                            | {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // AD
              return (
                <div key={item.id} className="flex flex-col gap-2">
                  <span className="text-[9px] text-black/20 uppercase tracking-widest font-bold">
                    Advertisement
                  </span>

                  <div
                    className={`relative ${item.aspect} w-full bg-gray-50 border border-neutral-100 overflow-hidden flex items-center justify-center`}
                  >
                    <Image
                      src={item.image}
                      alt="Ad"
                      fill
                      className="object-cover"
                    />

                    {item.overlayText && (
                      <span className="relative z-10 text-black text-[10px] font-bold uppercase tracking-widest text-center px-4 whitespace-pre-line">
                        {item.overlayText}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}