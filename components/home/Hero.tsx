"use client";

import CTABtn from "../common/CTABtn";


export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* VIDEO */}
      <video
        src="/video/home.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY (optional but recommended) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CTA BUTTON (BOTTOM RIGHT) */}
      <div className="absolute bottom-6 right-6 z-10">
        <CTABtn
          label="Apply as Designer"
          iconType="arrow"
        />
      </div>

    </section>
  );
}