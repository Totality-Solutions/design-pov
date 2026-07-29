"use client";
import React, { useState, useEffect, useRef } from "react";
import { cdn } from "@/lib/cdn";
import Image, { StaticImageData } from "next/image";
import { FiChevronLeft, FiX } from "react-icons/fi";
import CTABtn from "../common/CTABtn";
import { advertisements } from "@/data/magazineData";
import { NormalizedBlog, normalizeStaticBlog } from "@/lib/blog";
import { blogs as staticBlogs } from "@/data/magazineData";
import Link from "next/link";

type Ad = { type: "ad"; id: string; image: string; link: string; aspect: string };
type SidebarItem = NormalizedBlog | Ad;

export default function MagazineBase({
  activeBlog: initialBlog,
  isInnerPage = false,
  allBlogs,
}: {
  activeBlog: NormalizedBlog;
  isInnerPage?: boolean;
  allBlogs?: NormalizedBlog[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | StaticImageData | null>(null);

  const sortedBlogs: NormalizedBlog[] = allBlogs && allBlogs.length > 0
    ? allBlogs
    : [...staticBlogs].sort((a, b) => (b.id as number) - (a.id as number)).map(normalizeStaticBlog);

  const [activeBlog, setActiveBlog] = useState<NormalizedBlog>(() =>
    isInnerPage ? initialBlog : (sortedBlogs[0] ?? initialBlog)
  );

  useEffect(() => {
    if (isInnerPage) setActiveBlog(initialBlog);
  }, [initialBlog, isInnerPage]);

  // Handle Visibility for Mobile Trigger
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // Lock Body Scroll when Mobile Sidebar or Lightbox is open
  useEffect(() => {
    document.body.style.overflow = (isSidebarOpen || lightboxImage) ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isSidebarOpen, lightboxImage]);

  // Close Lightbox on Escape
  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxImage(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxImage]);

  const displayBlogs = isInnerPage
    ? sortedBlogs.filter(b => b.id !== activeBlog.id).slice(0, 4)
    : sortedBlogs.slice(0, 3);

  const sidebarItems: SidebarItem[] = [];
  displayBlogs.forEach((blog, index) => {
    sidebarItems.push(blog);
    if (advertisements[index]) sidebarItems.push(advertisements[index]);
  });

  return (
    <div ref={sectionRef as any} className="grid grid-cols lg:grid-cols-[1fr_320px] gap-10 lg:gap-12 relative bg-white">

      {/* MOBILE TRIGGER */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className={`lg:hidden fixed top-1/2 -translate-y-1/2 z-[110] bg-black text-white w-10 h-12 flex items-center justify-center shadow-2xl transition-all duration-500 ${isSidebarOpen ? "right-[85%] sm:right-[350px]" : "right-0"} ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <FiChevronLeft size={24} className={isSidebarOpen ? "rotate-180" : ""} />
      </button>

      {/* LEFT COLUMN: MAIN CONTENT */}
      <div className="flex flex-col h-full  bg-white">
        
        {/* HERO IMAGE SECTION */}
        <button
          type="button"
          onClick={() => setLightboxImage(activeBlog.image || cdn("/temp/home/blogs/blog-16.jpg"))}
          className={`${isInnerPage ? "relative" : "sticky top-20 lg:top-0 z-0"} w-full h-auto overflow-hidden bg-neutral-100 cursor-zoom-in block text-left`}
        >
          <Image
            src={activeBlog.image || cdn("/temp/home/blogs/blog-16.jpg")}
            alt={activeBlog.title}
            width={1920}
            height={1080}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="w-full h-auto object-contain"
          />
        </button>

        {/* BLOG CONTENT */}
        <div className="relative z-10 bg-white py-6 px-4 md:p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-sm font-medium text-black/40 uppercase">
            <span>{activeBlog.date}</span>
            <div className="w-[1px] h-4 bg-black/20" />
            <span>{activeBlog.author}</span>
          </div>

          <h2 className={`${isInnerPage ? 'text-3xl md:text-3xl lg:text-3xl' : 'text-xl md:text-3xl'} font-medium text-black leading-tight tracking-tight`}>
            {activeBlog.title}
          </h2>

          <div className="flex flex-col gap-8">
            {isInnerPage ? (
              activeBlog.detailedContent.map((block, i) => (
                <React.Fragment key={i}>
                  {block.type === "text" && (
                    <div className="flex flex-col gap-4">
                      {block.title && <h3 className="text-2xl md:text-2xl font-medium text-black mt-6 tracking-tight capitalize">{block.title}</h3>}
                      <p className="text-black/80 text-lg font-normal leading-relaxed">{block.value}</p>
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="flex flex-col gap-2 py-2">
                      <button
                        type="button"
                        onClick={() => setLightboxImage(block.value)}
                        className="relative w-full h-auto cursor-zoom-in"
                        aria-label="View full size image"
                      >
                        <Image
                          src={block.value}
                          alt="Mag Detail"
                          width={1200}
                          height={800}
                          sizes="100vw"
                          className="w-full h-auto object-contain"
                        />
                      </button>
                      {/* {block.caption && <span className="text-sm font-normal text-black/80">{block.caption}</span>} */}
                    </div>
                  )}

                  {block.type === "quote" && (
                    <blockquote className="border-y border-black/10 py-8 italic text-2xl font-medium">
                      "{block.value}"
                    </blockquote>
                  )}
                </React.Fragment>
              ))
            ) : (
              <>
                {activeBlog.featuredParagraphs.map((para, i) => (
                  <p key={i} className="text-black/80 text-lg leading-relaxed">{para}</p>
                ))}
                <div className="mt-4">
                  <CTABtn label="Read More" href={`/magazine/${activeBlog.slug}`} btnBg="transparent" textColor="black" borderColor="black" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: UP NEXT */}
      <aside className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"} fixed lg:relative top-0 right-0 h-full w-[85%] sm:w-[350px] lg:w-full bg-white lg:bg-transparent z-[100] p-6 transition-transform duration-500 overflow-y-auto`}>
        <div className="flex justify-end mb-6 lg:hidden">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-neutral-100 rounded-full"><FiX size={24} /></button>
        </div>
        <div className="flex flex-col gap-10 sticky top-10">
          <h4 className="text-xs font-bold uppercase border-b border-black pb-2 tracking-widest text-black/60">Up Next</h4>
          {sidebarItems.map((item) => (
            item.type === "blog" ? (
              <div 
                key={item.id} 
                onClick={() => { 
                  setActiveBlog(item); 
                  setIsSidebarOpen(false); 
                }} 
                className={`flex flex-col gap-4 group cursor-pointer transition-all duration-300 ${activeBlog.id === item.id ? "opacity-100 pointer-events-none" : "opacity-100"}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="320px" className="object-cover group-hover:scale-110 object-top transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-white/60 text-[10px] uppercase">{item.category}</span>
                    <h4 className="text-white text-sm mt-1 font-semibold leading-tight">{item.title}</h4>
                  </div>
                </div>
              </div>
            ) : (
              <Link href={item?.link} target="_blank" key={item.id} className="flex flex-col h-fit">
              <div key={item.id} className="flex flex-col h-fit">
                <div className="py-1 px-6 bg-neutral-100 mb-0.5">
                  <span className="text-[10px] text-black/40 uppercase font-bold tracking-widest">Advertisement</span>
                </div>
                <div className={`relative group overflow-hidden bg-gray-100 ${item.aspect} w-full`}>
                  <Image src={item.image} alt="Ad" fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/40 z-10 opacity-80" />
                </div>
              </div>
              </Link>
            )
          ))}
        </div>
      </aside>

      {/* IMAGE LIGHTBOX */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[9991] bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close"
          >
            <FiX size={28} />
          </button>
          <div className="relative w-full h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt="Full size view"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}