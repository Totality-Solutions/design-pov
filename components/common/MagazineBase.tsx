"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiX } from "react-icons/fi";
import CTABtn from "../common/CTABtn";
import { Blog, SidebarItem, blogs, advertisements } from "@/data/magazineData";

export default function MagazineBase({ activeBlog: initialBlog, isInnerPage = false }: { activeBlog: Blog, isInnerPage?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeBlog, setActiveBlog] = useState(initialBlog);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

const otherBlogs = blogs
  .filter((b) => b.id !== activeBlog.id)
  .sort((a, b) => b.id - a.id); // latest first

const visibleBlogs = isInnerPage ? otherBlogs : otherBlogs.slice(0, 2);

const sidebarItems: SidebarItem[] = [];
visibleBlogs.forEach((blog, index) => {
  sidebarItems.push(blog);
  if (advertisements[index]) sidebarItems.push(advertisements[index]);
});

  return (
    <div ref={sectionRef as any} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12 relative bg-white">
      
      {/* MOBILE TRIGGER */}
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`lg:hidden fixed top-1/2 -translate-y-1/2 z-[110] bg-black text-white w-10 h-12 flex items-center justify-center rounded-l-md shadow-2xl transition-all duration-500 ${isSidebarOpen ? "right-[85%] sm:right-[350px]" : "right-0"} ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <FiChevronLeft size={24} className={isSidebarOpen ? "rotate-180" : ""} />
      </button>

      {/* LEFT COLUMN */}
      <div className="flex flex-col h-full border border-neutral-100 bg-white">
        
        {/* SCROLLING PART START */}
          {isInnerPage ? (
          // ✅ INNER PAGE (NO STICKY)
          <div className="relative w-full h-[60vh] md:h-[80vh]">
            <Image
              src={activeBlog.image}
              alt={activeBlog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : (
          // ✅ OUTER PAGE (STICKY IMAGE)
          <div className="sticky top-0 h-full w-full overflow-hidden z-0">
            <Image 
              src={activeBlog.image} 
              alt={activeBlog.title} 
              fill 
              priority 
              className="object-cover" 
            />
          </div>
        )}
   
        {/* SCROLLING PART END */}

        <div className="relative z-10 bg-white p-4 md:p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 text-sm font-medium text-black/40 uppercase">
            <span>{activeBlog.date}</span>
            <div className="w-[1px] h-4 bg-black/20" />
            <span>{activeBlog.author}</span>
          </div>
          
          <h2 className={`${isInnerPage ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-xl md:text-3xl'} font-semibold text-black leading-tight tracking-tight`}>
            {activeBlog.title}
          </h2>
          
          <div className="flex flex-col gap-8">
            {isInnerPage ? (
              activeBlog.detailedContent.map((block, i) => (
                <React.Fragment key={i}>
                  {block.type === "text" && <p className="text-black/60 text-lg leading-relaxed">{block.value}</p>}
                  {block.type === "image" && (
                    <div className="flex flex-col gap-2 py-2">
                      <div className="relative w-full h-auto">
                        <Image
                          src={block.value}
                          alt="Mag Detail"
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain bg-neutral-100"
                        />
                      </div>
                      {block.caption && <span className="text-xs italic text-black/40">{block.caption}</span>}
                    </div>
                  )}
                  {block.type === "quote" && <blockquote className="border-y border-black/10 py-8 italic text-2xl font-medium">"{block.value}"</blockquote>}
                </React.Fragment>
              ))
            ) : (
              <>
                {activeBlog.featuredParagraphs.map((para, i) => (
                  <p key={i} className="text-black/60 text-lg leading-relaxed">{para}</p>
                ))}
                <div className="mt-4">
                  <CTABtn label="Read More" href={`/magazine/${activeBlog.slug}`} btnBg="transparent" textColor="black" borderColor="black" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"} fixed lg:relative top-0 right-0 h-full w-[85%] sm:w-[350px] lg:w-full bg-white lg:bg-transparent z-[100] p-6 transition-transform duration-500 overflow-y-auto`}>
        <div className="flex justify-end mb-6 lg:hidden"><button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-neutral-100 rounded-full"><FiX size={24} /></button></div>
        <div className="flex flex-col gap-10 sticky top-10">
          <h4 className="text-xs font-bold uppercase border-b border-black pb-2 tracking-widest text-black/60">Up Next</h4>
          {sidebarItems.map((item) => (
            item.type === "blog" ? (
              <div key={item.id} onClick={() => { setActiveBlog(item); setIsSidebarOpen(false); }} className={`flex flex-col gap-4 group cursor-pointer transition-all duration-300 ${activeBlog.id === item.id ? "opacity-40" : ""}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-white/60 text-[10px] uppercase">{item.category}</span>
                    <h4 className="text-white text-sm mt-1 font-semibold leading-tight">{item.title}</h4>
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.id} className="flex flex-col h-fit">
                <div className="py-1 px-3 bg-neutral-100 mb-0.5"><span className="text-[10px] text-black/40 uppercase font-bold tracking-widest">Advertisement</span></div>
                <div className={`relative group overflow-hidden bg-gray-100 ${item.aspect} w-full flex flex-col justify-end`}>
                  <Image src={item.image} alt="Ad" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 z-10 opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <button className="bg-white text-black px-5 py-2 text-[11px] font-bold uppercase shadow-xl">Visit Ads</button>
                  </div>
                  <div className="relative z-20 p-5 text-center">
                    <p className="text-[9px] text-white/60 leading-relaxed uppercase tracking-widest">Creative Direction by <br /><span className="text-white font-semibold">Design POV</span></p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </aside>
    </div>
  );
}