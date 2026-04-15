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

  const textContent = `Design today exists in limbo. Business reduces it to a price tag while museums place it just beyond reach. Design POV fills the gap in between. Here, design thrives and shifts under perspective. The idea is to encourage visitors to play an active role in each encounter, through immersive displays that acquaint the creator and their story with the consumer. Business reduces it to a price tag while museums place.`;

  return (
    <section className="w-full bg-white min-h-screen flex flex-col font-['Montserrat',sans-serif] border-t border-[#DFDFDF] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
    >
      {/* HEADER */}
      {/* <div className="w-full h-[60px] bg-white px-6 md:px-[70px] pt-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-[33.33px] h-[33.33px] flex items-center justify-center">
            <div className="absolute w-[13.33px] h-[13.33px] bg-[#E02914] opacity-20 rounded-full blur-[6.67px]" />
            <div className="w-[6.67px] h-[6.67px] bg-[#E02914] rounded-full" />
          </div>
          <h2 className="text-[18px] md:text-[22px] leading-none text-black">
            <span className="font-medium">ThisIsUs_</span>
            <span className="font-bold">POV</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-sm md:text-lg font-medium tracking-tight uppercase">POV_Insights</span>
          <span className="opacity-60 text-lg font-medium tracking-tight uppercase">Volume_01</span>
        </div>
      </div> */}

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
        <div className="relative flow-root">
          
          {/* THE SPACER: This pushes the floated video to the bottom */}
          {/* On mobile, we reduce its height or hide it if you want the video to stay near the top text */}
          <div className="float-right h-[870px] md:h-[350px] w-0"></div>

          {/* THE VIDEO: Clears the spacer to stay at the bottom right */}
          <div className="float-right clear-right ml-4 md:ml-8 mt-4 w-[35%] aspect-video relative group block shadow-xl bg-black">
            <video
              src='/video/home.mp4'
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="/videos/your-video.mp4" type="video/mp4" />
            </video>

            {/* CONTROLS */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-4 md:gap-6 z-10">
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

          {/* TEXT CONTENT */}
          <p className="text-black text-[18px] md:text-[24px] font-medium leading-[1.6] text-justify tracking-tight">
            {textContent}
            <br />
            {textContent}
            <br />
            {textContent}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ThisIsUs;