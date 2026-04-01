// import React from 'react';
// import CTAStrip from '@/components/common/CTAStrip'; // Ensure path is correct
// import CTABtn from '../common/CTABtn';

// const PILLAR_DATA = [
//   {
//     id: 1,
//     title: "ARCHITECTS",
//     description: "Creating the blueprint for modern design and structural integrity through dialogue.",
//     image: "https://placehold.co/940x800",
//     buttonLabel: "Explore"
//   },
//   {
//     id: 2,
//     title: "BRANDS",
//     description: "Bridging the gap between brand identity and physical experience design.",
//     image: "https://placehold.co/940x800",
//     buttonLabel: "Connect"
//   },
//   {
//     id: 3,
//     title: "BUILD PARTNERS",
//     description: "Turning visionary concepts into physical reality with precision and craft.",
//     image: "https://placehold.co/940x800",
//     buttonLabel: "Collaborate"
//   }
// ];

// const TheThreePillars = () => {
//   return (
//     <section className="w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
//       {/* SECTION HEADER */}
//       <div className="sticky top-0 z-50 w-full h-[60px] bg-white border-b border-[#DFDFDF] px-6 md:px-[70px] flex items-center justify-between">
//         <div className="flex items-center gap-2.5">
//           <div className="relative w-8 h-8 flex items-center justify-center">
//             <div className="absolute w-[14px] h-[14px] bg-[#E02914] opacity-20 rounded-full blur-[6px] animate-pulse" />
//             <div className="w-[7px] h-[7px] bg-[#E02914] rounded-full" />
//           </div>
//           <h2 className="text-[20px] md:text-[22px] leading-none text-black">
//             The_Three_<span className="font-bold">Pillars</span>
//           </h2>
//         </div>
//         <div className="hidden md:flex gap-[100px]">
//           <span className="opacity-60 text-lg font-medium">Design POV</span>
//           <span className="opacity-60 text-lg font-medium">Vol. 01</span>
//         </div>
//       </div>

//       {/* PILLARS CONTENT AREA */}
//       <div className="flex flex-col relative">
//         {PILLAR_DATA.map((pillar) => (
//           <div 
//             key={pillar.id} 
//             className="relative flex flex-col md:flex-row items-start border-b border-[#DFDFDF]"
//           >
//             {/* LEFT COLUMN: Sticky Info */}
//             <div className="w-full md:w-[388px] md:sticky md:top-[60px] p-8 md:p-0 md:pl-[70px] md:pt-[120px] md:pb-[60px] flex flex-col gap-[50px] border-r border-[#DFDFDF] self-start">
//               <div className="flex flex-col gap-2.5 max-w-[288px]">
//                 <h3 className="text-[22px] font-bold text-black tracking-wider uppercase">
//                   {pillar.title}
//                 </h3>
//                 <p className="text-base font-normal text-black opacity-70 leading-[1.3]">
//                   {pillar.description}
//                 </p>
//               </div>

//               {/* Action Button */}
//               <CTABtn
//               label={pillar.buttonLabel}
//               />
//             </div>

//             {/* RIGHT COLUMN: Scrolling Image */}
//             <div className="flex-1 w-full bg-[#FAFAFA] p-6 md:p-[40px]">
//               <div className="w-full aspect-[4/5] md:aspect-auto md:min-h-[800px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
//                 <img 
//                   src={pillar.image} 
//                   alt={pillar.title} 
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* FULL WIDTH CTA: Placed after the loop */}
//         {/* This will slip up and cover the whole width once the last pillar's content is finished */}
//         <div className="w-full z-10 bg-white border-t border-[#DFDFDF]">
//           <CTAStrip 
//             src="https://placehold.co/1320x120" 
//             alt="Dialogue Section"
//             width={1920} 
//             height={120} 
//             title="Where Design Meets Dialogue"
//             label="Apply As a Designer"
//             className="w-full" // This ensures it breaks the 388px column layout
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TheThreePillars;




"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CTAStrip from '@/components/common/CTAStrip';
import CTABtn from '../common/CTABtn';

interface Pillar {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
}

const PILLAR_DATA: Pillar[] = [
  {
    id: "arch",
    title: "ARCHITECTS",
    description: "Creating the blueprint for modern design and structural integrity through dialogue.",
    image: "https://placehold.co/940x1000",
    buttonLabel: "Explore"
  },
  {
    id: "brand",
    title: "BRANDS",
    description: "Bridging the gap between brand identity and physical experience design.",
    image: "https://placehold.co/940x1001",
    buttonLabel: "Connect"
  },
  {
    id: "build",
    title: "BUILD PARTNERS",
    description: "Turning visionary concepts into physical reality with precision and craft.",
    image: "https://placehold.co/940x1002",
    buttonLabel: "Collaborate"
  }
];

const TheThreePillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  useEffect(() => {
    // Select all image containers to watch them enter the viewport
    const elements = document.querySelectorAll('.pillar-image-trigger');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActivePillar(index);
          }
        });
      },
      { 
        threshold: 0.6, // Changes text when 60% of the image is visible
        rootMargin: "-10% 0px -10% 0px" // Adds a buffer so transitions feel natural
      }
    );

    elements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white flex flex-col font-['Montserrat',sans-serif]">
      
      {/* 1. STICKY SECTION HEADER */}
      <div className="sticky top-0 z-50 w-full h-[60px] bg-white border-b border-[#DFDFDF] px-6 md:px-[70px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-[14px] h-[14px] bg-[#E02914] opacity-20 rounded-full blur-[6px] animate-pulse" />
            <div className="w-[7px] h-[7px] bg-[#E02914] rounded-full" />
          </div>
          <h2 className="text-[20px] md:text-[22px] leading-none text-black">
            The_Three_<span className="font-bold">Pillars</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-lg font-medium">Design POV</span>
          <span className="opacity-60 text-lg font-medium">Vol. 01</span>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative flex flex-col md:flex-row items-start">
        
        {/* LEFT COLUMN: The Global Sticky Sidebar */}
        <div className="w-full md:w-[388px] md:sticky md:top-[60px] md:h-[calc(100vh-60px)] p-8 md:p-0 md:pl-[70px] md:pt-[120px] md:pb-[60px] flex flex-col border-r border-[#DFDFDF] bg-white overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-[50px]"
            >
              <div className="flex flex-col gap-2.5 max-w-[288px]">
                <h3 className="text-[22px] font-bold text-black tracking-wider uppercase">
                  {PILLAR_DATA[activePillar].title}
                </h3>
                <p className="text-base font-normal text-black opacity-70 leading-[1.3]">
                  {PILLAR_DATA[activePillar].description}
                </p>
              </div>

              {/* Your existing CTABtn component */}
              <CTABtn 
                label={PILLAR_DATA[activePillar].buttonLabel} 
                href="#" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: The Scrolling Images */}
        <div className="flex-1 w-full bg-[#FAFAFA]">
          {PILLAR_DATA.map((pillar, index) => (
            <div 
              key={pillar.id}
              data-index={index}
              className="pillar-image-trigger w-full min-h-screen p-6 md:p-[40px] flex items-center justify-center border-b border-[#DFDFDF] last:border-b-0"
            >
              <div className="w-full h-[70vh] md:h-[85vh] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
                <Image 
                  src={pillar.image} 
                  alt={pillar.title} 
                  fill
                  unoptimized
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FULL WIDTH CTA STRIP */}
      <div className="w-full z-10 bg-white border-t border-[#DFDFDF]">
        <CTAStrip 
          src="https://placehold.co/1320x120" 
          alt="Dialogue Section"
          width={1920} 
          height={120} 
          title="Where Design Meets Dialogue"
          label="Apply As a Designer"
          className="w-full"
        />
      </div>

    </section>
  );
};

export default TheThreePillars;