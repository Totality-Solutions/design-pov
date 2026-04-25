'use client'
import React, { useRef } from 'react'
import Image from 'next/image'

const ecosystemPillars = [
  {
    id: 1,
    title: "The Core",
    description: "Sixteen design studios create immersive environments where ideas take spatial form.",
    videoSrc: "/video/POV AD.mp4", // Video path here
    imageSrc: "/temp/ecosystem/1.png", // Fallback/Poster image
    iconSrc: "/icons/scanner.svg"
  },
  {
    id: 2,
    title: "Circle",
    description: "A live forum for dialogue—bringing together voices shaping how we think, build, and live.",
    videoSrc: "/video/POV AD.mp4",
    imageSrc: "/temp/ecosystem/2.png",
    iconSrc: "/icons/scanner.svg"
  },
  {
    id: 3,
    title: "Objects",
    description: "A collection of original, one-of-one pieces—each a distilled expression of perspective.",
    videoSrc: "/video/POV AD.mp4",
    imageSrc: "/temp/ecosystem/3.png",
    iconSrc: "/icons/scanner.svg"
  },
  {
    id: 4,
    title: "Elevate",
    description: "Curated extensions that create meaningful brand moments beyond the show floor.",
    videoSrc: "/video/POV AD.mp4",
    imageSrc: "/temp/ecosystem/4.png",
    iconSrc: "/icons/scanner.svg"
  }
];

export default function EcosystemPillars() {
  return (
    <section className="w-full bg-pov-white border-b border-pov-black/10">
      <div className="w-full px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          
          {ecosystemPillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}

        </div>
      </div>
    </section>
  )
}

// Separate component for each card to handle local video state
function PillarCard({ pillar }: { pillar: typeof ecosystemPillars[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play interrupted", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Optional: Reset to start
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-start text-left lg:border-r border-pov-black/10 last:border-r-0 lg:px-6 pb-12 group cursor-pointer"
    >
      {/* 1. MEDIA CONTAINER: Aspect 6/3 */}
      <div className="relative w-full aspect-[6/3] bg-[#F2F2F2] overflow-hidden my-8">
        {/* Poster Image (Visible until video plays or if video fails) */}
        <Image 
          src={pillar.imageSrc}
          alt={pillar.title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-0 z-10"
        />
        
        {/* Hover Video */}
        <video
          ref={videoRef}
          src={pillar.videoSrc}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* 3. DESCRIPTION */}
      <div className="flex flex-col gap-2">
        <p className="text-body-mobile md:text-body-tab lg:text-body max-w-[260px] opacity-80 leading-snug">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}