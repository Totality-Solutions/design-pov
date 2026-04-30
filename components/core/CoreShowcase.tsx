"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ShowcaseModal } from './ShowcaseModal'; 

// ... coreData remains the same
const coreData = [
  { 
    id: "01", 
    src: "/temp/home/core/ADND.jpg", 
    label: "ADND",
    description: "A premier architectural firm based in Mumbai, known for its minimalist, refined, and high-end residential design language that emphasizes spatial clarity and material precision.",
    additionalImages: [
      "/temp/home/core/ADND_1.jpg",
      "/temp/home/core/ADND_2.jpg",
      "/temp/home/core/ADND_3.jpg"
    ],
    website: "https://adnd.in",
    instagram: "https://instagram.com/adnd_mumbai"
  },

  { 
    id: "02", 
    src: "/temp/home/core/ALARA STUDIO.jpg", 
    label: "ALARA STUDIO",
    description: "A contemporary design studio focused on modern spatial experiences, blending material richness with clean geometry and understated luxury.",
    additionalImages: [
      "/temp/home/core/ALARA_1.jpg",
      "/temp/home/core/ALARA_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "03", 
    src: "/temp/home/core/Abin.jpg", 
    label: "ABIN",
    description: "A design-led practice exploring contemporary architecture through strong forms, contextual sensitivity, and functional clarity.",
    additionalImages: [
      "/temp/home/core/ABIN_1.jpg",
      "/temp/home/core/ABIN_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "04", 
    src: "/temp/home/core/BALDIWALA EDGE.jpg", 
    label: "BALDIWALA EDGE",
    description: "A luxury-focused design studio crafting bold interiors and architectural narratives with a strong emphasis on detail and material expression.",
    additionalImages: [
      "/temp/home/core/BALDIWALA_1.jpg",
      "/temp/home/core/BALDIWALA_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "05", 
    src: "/temp/home/core/CITYSPACE.png", 
    label: "CITYSPACE",
    description: "A multidisciplinary firm specializing in urban environments, workspace design, and contemporary planning strategies.",
    additionalImages: [
      "/temp/home/core/CITYSPACE_1.jpg",
      "/temp/home/core/CITYSPACE_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "06", 
    src: "/temp/home/core/DESIGN HEX.jpg", 
    label: "DESIGN HEX",
    description: "A creative studio delivering innovative interior solutions with a focus on geometry, textures, and spatial storytelling.",
    additionalImages: [
      "/temp/home/core/DESIGNHEX_1.jpg",
      "/temp/home/core/DESIGNHEX_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "07", 
    src: "/temp/home/core/DSP DESIGN.jpg", 
    label: "DSP DESIGN",
    description: "An internationally recognized architecture and planning firm known for large-scale projects and forward-thinking design approaches.",
    additionalImages: [
      "/temp/home/core/DSP_1.jpg",
      "/temp/home/core/DSP_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "08", 
    src: "/temp/home/core/JANNAT VASI.jpg", 
    label: "JANNAT VASI",
    description: "A boutique interior design studio known for its eclectic, expressive, and layered approach to residential spaces.",
    additionalImages: [
      "/temp/home/core/JANNAT_1.jpg",
      "/temp/home/core/JANNAT_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "09", 
    src: "/temp/home/core/NA ARCHITECT.jpg", 
    label: "NA ARCHITECT",
    description: "A practice focused on sustainable architecture, integrating climate responsiveness with modern design sensibilities.",
    additionalImages: [
      "/temp/home/core/NA_1.jpg",
      "/temp/home/core/NA_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "10", 
    src: "/temp/home/core/POONAM AKASH.jpg", 
    label: "POONAM AKASH",
    description: "A design studio specializing in bespoke residential interiors, blending comfort, elegance, and personalization.",
    additionalImages: [
      "/temp/home/core/POONAM_1.jpg",
      "/temp/home/core/POONAM_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "11", 
    src: "/temp/home/core/SANJAY PURI.jpg", 
    label: "SANJAY PURI",
    description: "A globally acclaimed architect known for sculptural forms, bold geometry, and climate-responsive design solutions.",
    additionalImages: [
      "/temp/home/core/SANJAYPURI_1.jpg",
      "/temp/home/core/SANJAYPURI_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "12", 
    src: "/temp/home/core/SAV.jpg", 
    label: "SAV",
    description: "An interdisciplinary studio exploring architecture, interiors, and urban design through experimental yet functional solutions.",
    additionalImages: [
      "/temp/home/core/SAV_1.jpg",
      "/temp/home/core/SAV_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "13", 
    src: "/temp/home/core/SHROFFLEON.jpg", 
    label: "SHROFFLEON",
    description: "A design practice pushing the boundaries of architecture through innovative materials and experimental concepts.",
    additionalImages: [
      "/temp/home/core/SHROFFLEON_1.jpg",
      "/temp/home/core/SHROFFLEON_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "14", 
    src: "/temp/home/core/SPARC DESIGN.jpg", 
    label: "SPARC DESIGN",
    description: "A collaborative architecture firm focused on delivering contextual, sustainable, and user-centric design solutions.",
    additionalImages: [
      "/temp/home/core/SPARC_1.jpg",
      "/temp/home/core/SPARC_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "15", 
    src: "/temp/home/core/STUDIO ARCHOHM.jpg", 
    label: "STUDIO ARCHOHM",
    description: "A well-known design studio creating playful, functional, and concept-driven architectural and interior projects.",
    additionalImages: [
      "/temp/home/core/ARCHOHM_1.jpg",
      "/temp/home/core/ARCHOHM_2.jpg"
    ],
    website: "#",
    instagram: "#"
  },

  { 
    id: "16", 
    src: "/temp/home/core/TALATI & PARTNER.jpg", 
    label: "TALATI & PARTNER",
    description: "A legacy architectural firm with decades of experience, known for its timeless design approach and large-scale developments.",
    additionalImages: [
      "/temp/home/core/TALATI_1.jpg",
      "/temp/home/core/TALATI_2.jpg"
    ],
    website: "#",
    instagram: "#"
  }
];

const StatusDot = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-[25px] h-[25px] flex items-center justify-center shrink-0">
    <div
      className={`absolute w-[16px] h-[16px] rounded-full blur-[8px] transition-all duration-500 ease-out ${isActive ? "opacity-80 scale-125" : "opacity-0 scale-0"}`}
      style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%)' }}
    />
    <div className={`relative w-[7px] h-[7px] rounded-full z-10 bg-primary-red transition-all duration-500 ease-out ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
  </div>
);

export const CoreShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDesigner, setSelectedDesigner] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- DESKTOP SCROLL LOGIC (TOUCH NAY KARNA) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollPoints = coreData.map((_, i) => i / (coreData.length - 1));
  const transformPoints = coreData.map((_, i) => `${25 - (i * 50)}%`);
  const yTranslate = useTransform(scrollYProgress, scrollPoints, transformPoints);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      const index = Math.round(latest * (coreData.length - 1));
      if (index !== activeIndex) setActiveIndex(index);
    }
  });

  return (
    <>
      <section 
        ref={containerRef} 
        className={`relative bg-white ${isMobile ? 'h-auto py-10' : 'h-[800vh]'}`}
      >
        <div className={`
          w-full flex items-center justify-between px-6 md:px-20
          ${isMobile ? 'relative flex-col' : 'sticky top-0 h-screen overflow-hidden'}
        `}>
          
          {/* Left Column (Desktop Only) */}
          <div className="w-[25%] hidden lg:flex flex-col gap-8">
            {coreData.slice(0, 8).map((item, i) => (
              <motion.div
                key={item.id}
                animate={{ opacity: activeIndex === i ? 1 : 0.15, x: activeIndex === i ? 10 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 cursor-default"
              >
                <StatusDot isActive={activeIndex === i} />
                <h3 className="text-body-tab font-semibold ">{item.label}</h3>
              </motion.div>
            ))}
          </div>

          {/* Middle Stack: Mobile (Natural) vs Desktop (Sticky) */}
          <div className={`relative w-full lg:w-[450px] ${isMobile ? 'h-auto pt-0' : 'h-full overflow-hidden'}`}>
            <motion.div 
              style={{ y: isMobile ? 0 : yTranslate }} 
              className={`flex flex-col w-full ${isMobile ? 'h-auto gap-3' : 'h-full'}`}
            >
              {coreData.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <motion.div 
                    key={item.id} 
                    // Mobile-only active detection via Viewport
                    onViewportEnter={() => isMobile && setActiveIndex(i)}
                    viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
                    
                    className={`
                      relative w-full flex-shrink-0 cursor-pointer group transition-all duration-500
                      ${isMobile ? 'h-[45vh] mb-4' : 'h-1/2'}
                    `}
                    onClick={() => setSelectedDesigner({
                      name: item.label,
                      description: item.description,
                      images: [item.src, ...item.additionalImages],
                      websiteUrl: item.website,
                      instagramUrl: item.instagram
                    })}
                  >
                    <div className="relative w-full h-full p-2 md:p-8">
                      <Image
                        src={item.src}
                        alt={item.label}
                        fill
                        className={`object-contain transition-all duration-700 ${
                          isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-30'
                        }`}
                        priority
                      />
                    </div>
                    
                    {/* Active Overlay for Mobile Viewport */}
                    <motion.div 
                      animate={{ opacity: isActive ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className="border border-white/20 px-4 py-2 bg-black/60 backdrop-blur-md lg:hidden">
                        <p className="text-[10px] text-white font-bold tracking-widest uppercase">
                          View Designer
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column (Desktop Only) */}
          <div className="w-[25%] hidden lg:flex flex-col gap-8 text-right">
            {coreData.slice(8, 16).map((item, i) => (
              <motion.div
                key={item.id}
                animate={{ opacity: activeIndex === i + 8 ? 1 : 0.15, x: activeIndex === i + 8 ? -10 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-end gap-4 cursor-default"
              >
                <h3 className="text-body-tab font-semibold ">{item.label}</h3>
                <StatusDot isActive={activeIndex === i + 8} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ShowcaseModal 
        isOpen={!!selectedDesigner} 
        onClose={() => setSelectedDesigner(null)} 
        data={selectedDesigner} 
      />
    </>
  );
};