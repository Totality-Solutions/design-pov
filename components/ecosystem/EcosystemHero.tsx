'use client'
import React from 'react'
import { MediaRenderer } from '@/components/common/MediaRenderer'
import { UnderlineText } from '../common/Underlinetext'

export default function EcosystemHero() {
  return (
    <section className="w-full h-fit bg-pov-white border-b border-pov-black/40 pt-20">
      {/* TEXT SECTION: Clean horizontal layout with border */}

      <UnderlineText lineHeight={72} className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
          Design POV extends beyond a
      </UnderlineText>
      <UnderlineText lineHeight={72} className="text-h2-mobile md:text-h2-tab lg:text-h2 tracking-tight font-semibold">
          singular format.
      </UnderlineText>

      {/* MEDIA SECTION: Responsive container for Image or Video */}
      <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center py-4">
        
        {/* Main Video/Image Asset (No background visuals) */}
        <div className="relative z-10 w-full h-full bg-black overflow-hidden">
          <MediaRenderer 
            src="/temp/ecosystem/POV.mp4" 
            alt="Ecosystem Highlight"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  )
}