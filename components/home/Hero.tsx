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
           btnBg="var(--primary-blue)"
  btnHoverBg="var(--primary-blue)"
  textColor="var(--color-white)"

  borderColor="var(--color-white)"
  borderHoverColor="var(--color-white)"

  lineColor="var(--primary-blue)"
  lineHoverColor="var(--primary-blue)"

  bottomKey1Width="40px"
  bottomKey2Width="12px"
  bottomKey1Right="50px"
  bottomKey2Right="15px"

  href="#tickets"
        />
      </div>

    </section>
  );
}