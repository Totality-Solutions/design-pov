"use client";

import { cdn } from "@/lib/cdn";
import { useMemo } from "react";
import { Container } from "../common/Container";
import Image from "next/image";

export default function Hero() {
  const videoSrc = useMemo(() => cdn("/video/POV ad 1.mp4"), []);

  return (
    <Container className="w-full overflow-hidden lg:max-w-none px-0 pt-20">
      <div className="relative w-full aspect-5/3 sm:aspect-21/8 md:aspect-16/7 overflow-hidden">

        {/* Fallback image */}
        {/* <Image
          src={cdn("/images/hero-poster.jpg")}
          alt="Hero"
          fill
          priority
          className="object-cover"
          unoptimized
        /> */}

        {/* Video */}
        <video
          key="home-hero-video" // 🔥 prevents reload bugs
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

      </div>
    </Container>
  );
}