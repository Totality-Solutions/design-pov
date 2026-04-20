"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const ThisIsUs: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const calculateSpacer = () => {
      if (!textRef.current || !containerRef.current) return;

      const viewportWidth = window.innerWidth;
      
      // Mobile: no spacer, video below text
      if (viewportWidth < 768) {
        setSpacerHeight(0);
        return;
      }

      // Get text metrics
      const computedStyle = window.getComputedStyle(textRef.current);
      const fontSize = parseFloat(computedStyle.fontSize);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      
      // Calculate actual line height
      const actualLineHeight = lineHeight || fontSize * 1.6;
      
      // Desktop: wrap at 6th-7th line = 6.5 lines
      const targetLines = 6.5;
      const calculatedHeight = Math.ceil(actualLineHeight * targetLines);
      
      setSpacerHeight(calculatedHeight);
    };

    // Initial calculation with delay to ensure DOM is ready
    const timer = setTimeout(calculateSpacer, 100);

    // Recalculate on resize
    const handleResize = () => calculateSpacer();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) document.exitFullscreen();
      else videoRef.current.requestFullscreen();
    }
  };

  const textContent = `Design today exists in limbo. Business reduces it to a price tag while museums place it just beyond reach. Design POV fills the gap in between. Here, design thrives and shifts under perspective. The idea is to encourage visitors to play an active role in each encounter, through immersive displays that acquaint the creator and their story with the consumer. Business reduces it to a price tag while museums place.`;

  return (
    <section 
      className="w-full bg-white min-h-screen flex flex-col font-display border-t border-[#DFDFDF] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading 
        titleMain="This_Is_Us_" 
        titleBold="POV" 
        sticky={false}
        isSectionHovered={isHovered} 
      >
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">POV_Insights</span>
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Volume_01</span>
        </div>
      </SectionHeading>

      {/* CONTENT AREA */}
      <div className="flex-1 px-6 md:px-[70px] py-8 md:py-12 overflow-y-auto scrollbar-hide">
        <div ref={containerRef} className="relative  w-full">
          
          {/* DYNAMIC SPACER: Calculated to wrap at 6th-7th line */}
          <div 
            className="float-right h-0 w-0 transition-all duration-300"
            style={{ height: `${spacerHeight}px` }}
          ></div>

          {/* VIDEO: Floats right, responsive width */}
          <div className="float-right clear-right ml-4 md:ml-8 mb-4 w-full md:w-[35%] aspect-video relative group block shadow-xl bg-black">
            <video
              src='/video/home.mp4'
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="/video/home.mp4" type="video/mp4" />
            </video>

            {/* CONTROLS */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end gap-3 p-4 z-10">
              <button 
                onClick={togglePlay} 
                className="text-white hover:scale-110 transition-transform p-2"
                aria-label="Play/Pause"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button 
                onClick={toggleMute} 
                className="text-white hover:scale-110 transition-transform p-2"
                aria-label="Mute/Unmute"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button 
                onClick={toggleFullScreen} 
                className="text-white hover:scale-110 transition-transform p-2"
                aria-label="Fullscreen"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* TEXT: Wraps around video from 6th-7th line */}
          <p 
            ref={textRef}
            className="text-black text-[18px] md:text-[24px] font-medium leading-[1.6] text-justify tracking-tight"
          >
            {textContent}
            <br />
            {textContent}
            <br />
            {textContent}
          </p>

          {/* CLEARFIX */}
          <div className="clear-both"></div>
        </div>
      </div>
    </section>
  );
};

export default ThisIsUs;