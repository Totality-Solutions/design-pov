"use client";
import { cdn } from "@/lib/cdn";

import { useRef, useState, useEffect } from "react";
import { Container } from "../common/Container";
import CTABtn from "../common/CTABtn";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileHeroPoster = cdn("/temp/home/section2/1.jpg");

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [mobileVideoEnabled, setMobileVideoEnabled] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Manual Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setManuallyPaused(true);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
      setManuallyPaused(false);
    }
  };

  // Manual Mute/Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Auto play/pause based on viewport visibility
  useEffect(() => {
    if (isMobile) return;
    if (!sectionRef.current || !videoRef.current) return;

    const video = videoRef.current;

    // Initial state → autoplay + muted
    video.muted = true;

    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(true);
      })
      .catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        const currentVideo = videoRef.current;

        if (entry.isIntersecting) {
          // Resume only if user hasn't manually paused
          if (!manuallyPaused) {
            currentVideo.muted = true;
            currentVideo.play().catch(() => {});
            setIsPlaying(true);
            setIsMuted(true);
          }
        } else {
          // Pause when out of viewport
          currentVideo.pause();
          currentVideo.muted = true;
          setIsMuted(true);
        }
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [manuallyPaused, isMobile]);

  return (
    <Container className="w-full overflow-hidden lg:max-w-none px-0 pt-20 ">
      <div
        ref={sectionRef}
        className="
          relative 
          group 
          w-full
          aspect-5/3
          sm:aspect-21/8
          md:aspect-16/7
          2xl:aspect-2560/1150
          overflow-hidden
        "
      >
        {isMobile && !mobileVideoEnabled ? (
          <button
            type="button"
            onClick={() => setMobileVideoEnabled(true)}
            className="absolute inset-0 group/mobile-hero bg-black"
            aria-label="Play Design POV hero video"
          >
            <Image
              src={mobileHeroPoster}
              alt="Design POV"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute left-6 bottom-6 flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-black/30 text-sm backdrop-blur-sm transition-transform group-hover/mobile-hero:scale-105">
                ▶
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em]">
                Play Film
              </span>
            </div>
          </button>
        ) : (
          <video
            ref={videoRef}
            src={cdn("/video/POV ad 1.mp4")}
            poster={isMobile ? mobileHeroPoster : undefined}
            preload={isMobile ? "none" : "metadata"}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Video Controls */}
        {!isMobile && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 bg-white backdrop-blur-md px-5 py-2 rounded-full border border-zinc-300">
            
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="hover:scale-110 transition-transform hover:cursor-pointer"
            >
              <Image
                src={
                  isPlaying
                    ? cdn("/icons/play.svg")
                    : cdn("/icons/pause.svg")
                }
                alt="Toggle Play"
                width={40}
                height={40}
              />
            </button>

            <div className="w-[1px] h-4 bg-gray-300" />

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="hover:scale-110 transition-transform hover:cursor-pointer"
            >
              <Image
                src={
                  isMuted
                    ? cdn("/icons/volume-mute.svg")
                    : cdn("/icons/volume-high.svg")
                }
                alt="Toggle Mute"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>}

        {/* Desktop CTA */}
        {/* <div className="hidden sm:block absolute z-10 mb-8 mr-5 bottom-0 right-0">
          <CTABtn
            label="Apply Now"
            iconType="arrow"
            btnBg="var(--primary-blue)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-white)"
            borderColor="var(--primary-blue)"
            borderHoverColor="var(--primary-blue)"
            lineColor="transparent"
            lineHoverColor="transparent"
            bottomKey1Width="40px"
            bottomKey2Width="12px"
            bottomKey1Right="50px"
            bottomKey2Right="15px"
            href="#tickets"
          />
        </div> */}
      </div>

      {/* Mobile CTA */}
      {/* <div className="block sm:hidden w-full px-4 py-6 flex justify-center">
        <CTABtn
          label="Apply Now"
          href="#tickets"
        />
      </div> */}
    </Container>
  );
}
