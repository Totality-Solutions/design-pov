"use client";
import React, { useState, useRef } from 'react';
import { Maximize2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const ThisIsUs: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // 1. TOP END-TO-END PARAGRAPHS
  const introParagraphs = [
    "There is a moment at every industry event that no one programmes, yet everyone attends.",
    "It happens in the margins—between panels, outside exhibition halls, over hurried coffees. Conversations loosen. Opinions sharpen. Real exchanges unfold. Ideas, unfiltered by format, find their voice.",
    "For Asif Sataar and Gagan Bhatia, that moment wasn’t incidental. It was the point."
  ];

  return (
    <section className="w-full bg-white flex flex-col font-display border-t border-[#DFDFDF] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading 
        titleMain="This Is Us " 
        titleBold="POV" 
        sticky={false}
        isSectionHovered={isHovered} 
      >
        <div className="hidden md:flex gap-[100px]">
          {/* <span className="opacity-60 text-[16px] lg:text-lg font-medium">POV Insights</span> */}
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Volume 01</span>
        </div>
      </SectionHeading>

      <div className="flex-1 px-6 md:px-[70px] pt-6 flex flex-col ">
        
        {/* TOP SECTION: END-TO-END CONTENT */}
        <div className="w-full ">
          <div className="space-y-4 max-w-[1440px]">
            {introParagraphs.map((para, idx) => (
              <p key={idx} className="text-black text-[18px] md:text-[22px] font-medium leading-[1.4] tracking-tight">
                {para}
              </p>
            ))}
          </div>
          <h2 className="text-[24px] md:text-h3 font-bold text-black uppercase tracking-tighter pt-16">
            What was the real trigger behind Design POV?
          </h2>
        </div>

        {/* BOTTOM SECTION: 3 GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-start">

          {/* LEFT CONTENT: Gagan Bhatia */}
          <div className="flex flex-col gap-4">
            <span className="text-primary-red font-semibold text-body tracking-wide">Gagan Bhatia</span>
            <p className="text-black text-[18px] md:text-body font-medium text-justify leading-[1.2] tracking-tightest  ">
              <span className='text-h3-mobile md:text-h3-tab text-black font-bold'>“ </span>It was actually quite simple. We were listening. Not inside exhibition halls, but outside them. The most meaningful conversations about design, about business, about ideas - were happening on the periphery. That’s where people were most honest, most open.<span className='text-h3-mobile md:text-h3-tab text-black font-bold'> ”</span>
            </p>
          </div>

          {/* CENTER VIDEO AREA */}
          <div className="flex flex-col gap-3">
            <div className="relative group w-full h-auto overflow-hidden">
              <video
                src="/video/home.mp4"
                ref={videoRef}
                className="w-full h-auto object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />

              {/* VIDEO CONTROLS */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-4 z-10">
                <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button onClick={toggleMute} className="text-white hover:scale-110 transition-transform">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={toggleFullScreen} className="text-white hover:scale-110 transition-transform">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: Asif Sataar */}
          <div className="flex flex-col gap-4">
            <span className="text-primary-red font-semibold text-body tracking-wide">Asif Sataar</span>
            <p className="text-black text-[18px] md:text-body font-medium text-justify leading-[1.2] tracking-tight  ">
              <span className='text-h3-mobile md:text-h3-tab text-black font-bold'>“ </span>And it made us question the format itself. If the real value is happening outside, then what is the platform doing wrong? We’d been part of this world long enough to see networking become mechanical, almost performative. Commerce was front and centre, and design was getting lost somewhere along the way.<span className='text-h3-mobile md:text-h3-tab text-black font-bold'> ”</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThisIsUs;