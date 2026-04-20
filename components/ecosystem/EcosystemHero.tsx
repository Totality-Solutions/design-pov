'use client'
import React from 'react'
import { MediaRenderer } from '@/components/common/MediaRenderer'

export default function EcosystemHero() {
  return (
    <section className="w-full h-fit bg-pov-white border-b border-pov-black/40">
      {/* TEXT SECTION: Clean horizontal layout with border */}
      <div className="w-full border-b-2 border-pov-black px-6 md:px-14 lg:pt-80">
        <h1 className="text-h1-mobile md:text-h1-tab lg:text-h1 tracking-tight font-semibold">
          Lorem Ipsum is simply dummy text of the lore
        </h1>
      </div>
    
      <div className="w-full border-b-2 border-pov-black px-6 md:px-14 lg:pt-2">
        <p className="text-h1-mobile md:text-h1-tab lg:text-h1 tracking-tight font-semibold">
          and typesetting industry.
        </p>
      </div>

      {/* MEDIA SECTION: Responsive container for Image or Video */}
      <div className="relative w-full aspect-video overflow-hidden flex items-center justify-center py-4">
        
        {/* Main Video/Image Asset (No background visuals) */}
        <div className="relative z-10 w-full h-full bg-black overflow-hidden">
          <MediaRenderer 
            src="/video/home.mp4" 
            alt="Ecosystem Highlight"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}