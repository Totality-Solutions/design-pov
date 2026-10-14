"use client";
import React, { useState, useRef, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import Image from "@/components/common/SmartImage";
import { DEFAULT_ABOUT, type AboutFounder, type AboutPageContent } from "@/lib/aboutContent";

const DEFAULTS = DEFAULT_ABOUT.thisIsUs;

/** Founder name + quote, with the large quote marks. */
function FounderQuote({ founder, tracking }: { founder?: AboutFounder; tracking: string }) {
  if (!founder) return <div />;
  return (
    <div className="flex flex-col gap-2 lg:gap-4">
      <span className="text-primary-red font-semibold text-body tracking-wide">{founder.name}</span>
      <p className={`text-black text-[18px] md:text-body font-medium text-justify leading-[1.2] ${tracking}`}>
        <span className='text-h3-mobile md:text-h3-tab text-black font-bold'>“ </span>{founder.quote}<span className='text-h3-mobile md:text-h3-tab text-black font-bold'> ”</span>
      </p>
    </div>
  );
}

const ThisIsUs = ({
  heading = DEFAULTS.heading,
  intro: introParagraphs = DEFAULTS.intro,
  question = DEFAULTS.question,
  image = DEFAULTS.image,
  founders = DEFAULTS.founders,
}: Partial<Omit<AboutPageContent["thisIsUs"], "enabled">>) => {
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

  return (
    <section className="w-full bg-white flex flex-col font-display border-t border-[#DFDFDF] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading 
        titleMain={heading}
        sticky={false}
        isSectionHovered={isHovered} 
      >
        {/* <div className="hidden lg::flex lg:gap-[100px]">
           <span className="opacity-60 text-[16px] lg:text-lg font-medium">POV Insights</span>
          <span className="opacity-60 text-[16px] lg:text-lg font-medium">Volume 01</span>
        </div>  */}
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
          {question && (
          <h2 className="text-[18px] md:text-h2-mobile font-bold text-black tracking-tighter pt-6 lg:pt-16">
            {question}
          </h2>
          )}
        </div>

        {/* BOTTOM SECTION: 3 GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3 lg:pt-6 items-start">

          {/* LEFT CONTENT */}
          <FounderQuote founder={founders[0]} tracking="tracking-tightest" />

          {/* CENTER VIDEO AREA */}
          <div className="flex flex-col gap-3">
            <div className=" w-full h-full ">
              {/* <video
                src={cdn("/video/home.mp4")}
                ref={videoRef}
                className="w-full h-auto object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              /> */}
              {image && <Image
              src={image}
              width={1000}
              style={{ objectFit: "contain", objectPosition: "center" }}
              height={200}
              alt={founders.map((f) => f.name).join(" & ") || "Founders"}
              />}

              {/* VIDEO CONTROLS */}
              {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-4 z-10">
                <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button onClick={toggleMute} className="text-white hover:scale-110 transition-transform">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <button onClick={toggleFullScreen} className="text-white hover:scale-110 transition-transform">
                  <Maximize2 size={18} />
                </button>
              </div> */}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <FounderQuote founder={founders[1]} tracking="tracking-tight" />

        </div>
      </div>
    </section>
  );
};

export default ThisIsUs;