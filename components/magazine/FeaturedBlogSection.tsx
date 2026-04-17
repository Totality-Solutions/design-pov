"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SectionHeading from "../common/SectionHeading";
import CTABtn from "../common/CTABtn";
import { FiChevronLeft, FiX } from "react-icons/fi";

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
  const sectionRef = useRef<HTMLElement>(null); // Ref to track this section
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for viewport visibility

  useEffect(() => {
    const checkScreen = () => {
      const small = window.innerWidth < 1024;
      setIsTouch(small);
      if (!small) setIsSidebarOpen(false);
    };

    // Intersection Observer to detect if section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Button shows when 10% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    checkScreen();
    window.addEventListener("resize", checkScreen);
    
    return () => {
      window.removeEventListener("resize", checkScreen);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const blogs: Blog[] = [
    {
      type: "blog",
      id: 1,
      title: "The Future of Architectural Storytelling",
      image: "/temp/magazine/blogs/blog-1.png",
      date: "18 Mar 2026",
      author: "Manisha AR",
      category: "Editorial",
      content: [
        "Architecture today is no longer confined to physical structures—it has evolved into a medium of storytelling. Every line drawn, every material chosen, and every void created contributes to a narrative that unfolds through experience rather than explanation.",
        "In contemporary design, the focus has shifted from mere functionality to emotional resonance. Spaces are now designed to be felt. The warmth of natural light spilling across textured surfaces, the quiet strength of raw materials, and the deliberate pacing of spatial transitions all come together to create immersive environments.",
        "Minimalism continues to play a significant role, but it is no longer about emptiness—it is about intention. Every element that exists within a space serves a purpose, contributing to a larger, cohesive story. The absence of clutter allows the essence of design to come forward, making each detail more meaningful.",         
        "As cities evolve and lifestyles change, architecture must respond with adaptability and foresight. Sustainable materials, flexible layouts, and human-centric design principles are shaping the future of spaces that are not only visually compelling but also responsible and enduring.",
        "Ultimately, architectural storytelling is about creating spaces that stay with you—long after you’ve left them. It is about crafting experiences that are subtle yet powerful, quiet yet unforgettable."
      ]
    },
    {
      type: "blog",
      id: 2,
      title: "Reimagining Spaces Through Materiality",
      image: "/temp/magazine/blogs/blog-1.png",
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
      image: "/temp/magazine/blogs/blog-1.png",
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
  const sidebarBlogs = blogs.filter((blog) => blog.id !== activeBlog.id);
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
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white font-['Montserrat'] pb-16 md:pb-20 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. SLIDING ARROW BUTTON (Mobile/Tab Only + Only when visible) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`lg:hidden fixed top-1/2 -translate-y-1/2 z-[110] bg-black text-white w-10 h-12 flex items-center justify-center rounded-l-md shadow-2xl transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "right-[85%] sm:right-[350px]" : "right-0"
        } ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className={`transition-transform duration-500 ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}>
          <FiChevronLeft size={24} />
        </div>
      </button>

      {/* HEADER */}
      <SectionHeading
        titleMain="The "
        titleBold="Draft"
        subTitle="Editorial & Longform"
        isSectionHovered={isHovered}
      >
        <div className="hidden md:flex">
          <span className="text-base md:text-lg font-medium text-black">
            {activeBlog.author}
          </span>
        </div>
      </SectionHeading>

      <div className="px-4 sm:px-6 md:px-[60px] lg:px-[80px] mt-10 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">

          {/* MAIN BLOG COLUMN */}
          <div className="flex flex-col gap-6 md:gap-8 border border-neutral-100 ">
            <div className="sticky top-0 left-0 w-full h-full">
              <div className="relative w-full h-[500px] lg:h-screen ">
                <Image
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 md:gap-6 relative z-10 bg-white p-4">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base font-medium text-black">
                <span>{activeBlog.date}</span>
                <div className="hidden md:block w-[1px] h-5 bg-black/20" />
                <span>{activeBlog.author}</span>
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
                  btnBg="transparent"
                  btnHoverBg="var(--primary-blue)"
                  textColor="black"
                  borderColor="black"
                  borderHoverColor="white"
                  lineColor="white"
                  lineHoverColor="white"
                  href="#tickets"
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR LOGIC (Desktop: Grid Item | Mobile: Sliding Drawer) */}
          <>
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-[90] lg:hidden transition-opacity duration-300"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            <aside className={`
              ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
              fixed top-0 right-0 h-full w-[85%] sm:w-[350px] bg-white z-[9999] lg:z-[100] shadow-2xl p-6 transition-transform duration-500 ease-in-out overflow-y-auto
              lg:relative lg:translate-x-0 lg:w-full lg:h-fit lg:bg-transparent lg:shadow-none lg:p-0
            `}>
              
              <div className="flex justify-end mb-6 lg:hidden">
                 <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-neutral-100 rounded-full active:bg-neutral-200 transition-colors">
                    <FiX size={24} />
                 </button>
              </div>

              <div className="flex flex-col gap-8 md:gap-10 h-fit">
                {sidebarItems.map((item) => {
                  if (item.type === "blog") {
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveBlog(item);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex flex-col gap-4 group cursor-pointer transition-all duration-300 ${
                          activeBlog.id === item.id ? "opacity-40" : ""
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <span className="text-white/60 text-[10px] uppercase tracking-widest">{item.category}</span>
                            <h4 className="text-white text-sm mt-1 leading-tight font-semibold">{item.title}</h4>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.id} className="flex flex-col h-fit">
                      <div className="py-1 px-3 bg-neutral-100 mb-0.5"><span className="text-[10px] text-black/40 uppercase tracking-widest font-bold">Advertisement</span></div>
                      <div className={`relative group overflow-hidden bg-gray-100 ${item.aspect} w-full flex flex-col justify-end`}>
                        <Image
                          src={item.image}
                          alt="Advertisement"
                          fill
                          className={`object-cover transition-transform duration-700 ${isTouch ? "scale-105" : "group-hover:scale-105"}`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-10 transition-opacity duration-500 ${isTouch ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`} />
                        <div className={`absolute inset-0 flex items-center justify-center z-30 transition-all duration-300 ${isTouch ? "opacity-100 translate-y-0" : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"}`}>
                          <button className="bg-white text-black px-5 py-2 text-[11px] font-bold uppercase tracking-tighter shadow-xl">Visit Ads</button>
                        </div>
                        <div className={`relative z-20 p-5 text-center transition-transform duration-500 ${isTouch ? "-translate-y-1" : "group-hover:-translate-y-1"}`}>
                          <p className="text-[9px] text-white/60 leading-relaxed uppercase tracking-widest">Creative Direction by <br /><span className="text-white font-semibold">Design POV</span></p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </>
        </div>
      </div>
    </section>
  );
}