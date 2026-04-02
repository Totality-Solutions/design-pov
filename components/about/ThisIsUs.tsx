"use client";
import React, { useState, useRef } from 'react';
import { Maximize2, Minimize2, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const ThisIsUs: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const textContent = `Design today exists in limbo. Business reduces it to a price tag while museums place it just beyond reach. Design POV fills the gap in between. Here, design thrives and shifts under perspective. The idea is to encourage visitors to play an active role in each encounter, through immersive displays that acquaint the creator and their story with the consumer.`;

  return (
    <section className="w-full bg-white h-[100vh] flex flex-col font-['Montserrat',sans-serif] border-t  border-[#DFDFDF] overflow-hidden ">      
    <div className="w-full h-[60px] bg-white px-6 md:px-[70px] pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          
          {/* Red Glowing Dot Icon */}
          <div className="relative w-[33.33px] h-[33.33px] flex items-center justify-center">
            <div className="absolute w-[13.33px] h-[13.33px] bg-[#E02914] opacity-20 rounded-full blur-[6.67px]" />
            <div className="w-[6.67px] h-[6.67px] bg-[#E02914] rounded-full" />
          </div>

          <h2 className="text-[22px] leading-none text-black">
            <span className="font-medium">This_</span>
            <span className="font-bold">Ecosystem</span>
          </h2>
        </div>
        
        <div className="hidden md:flex gap-[100px]">
          <span className="opacity-60 text-lg font-medium tracking-tight uppercase">
            POV_Insights
          </span>
          <span className="opacity-60 text-lg font-medium tracking-tight uppercase">
            Volume_01
          </span>
        </div>
      </div>

      <div className="flex-1 px-6 md:px-[70px] py-12 overflow-y-auto scrollbar-hide">        
        {/* WRAPPER CONTAINER */}
        <div className="relative block">
          
          {/* THE VIDEO PiP (Floating Bottom Right) */}
          {/* Using float:right and shape-outside allows the text to wrap around the box */}
          <div className="float-right ml-8 mb-6 mt-4 w-full md:w-[40%] aspect-video bg-black relative group shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="/videos/your-video.mp4" type="video/mp4" />
            </video>

            {/* VIDEO OVERLAY CONTROLS */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-6 z-10">
              <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              
              <button onClick={toggleMute} className="text-white hover:scale-110 transition-transform">
                {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
              </button>

              <button onClick={toggleFullScreen} className="text-white hover:scale-110 transition-transform">
                <Maximize2 size={24} />
              </button>
            </div>
          </div>

          {/* WRAPPING TEXT */}
          <p className="text-black text-[18px] md:text-[24px] font-medium leading-[1.6] text-justify tracking-tight">
            {textContent}
            <br /><br />
            {textContent}
          </p>
        </div>

      </div>

      {/* FOOTER BORDER (To show section ending) */}
      {/* <div className="w-full h-1 bg-[#DFDFDF] opacity-30" /> */}
    </section>
  );
};

export default ThisIsUs;