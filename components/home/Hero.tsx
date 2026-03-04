"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const words = headingRef.current?.querySelectorAll(".word");
    words?.forEach((word, i) => {
      (word as HTMLElement).style.animationDelay = `${i * 120}ms`;
      word.classList.add("animate-on-enter");
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 overflow-hidden bg-pov-black">
      {/* Background video placeholder — replace src with actual video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pov-black/30 via-transparent to-pov-black z-10" />
        <div
          className="w-full h-full bg-pov-slate"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(196,168,130,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(184,92,56,0.05) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Vertical label — left side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <p className="text-vertical text-label text-pov-mist tracking-[0.25em]">
          EST. 2024 · MUMBAI
        </p>
      </div>

      {/* Edition marker — right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <p className="text-vertical text-label text-pov-mist tracking-[0.25em]">
          2026 EDITION
        </p>
      </div>

      {/* Main content */}
      <div className="container-pov relative z-20">
        {/* Theme label */}
        <p
          className="text-label text-pov-clay mb-8 animate-on-enter"
          style={{ animationDelay: "0ms" }}
        >
          2026 Theme — Sense & Sensibility
        </p>

        {/* Display heading */}
        <h1
          ref={headingRef}
          className="font-display text-pov-white overflow-hidden"
          style={{
            fontSize: "clamp(4rem, 10vw, 9.5rem)",
            lineHeight: "0.9",
            letterSpacing: "-0.02em",
          }}
        >
          {"Design".split("").map((_, i) => null) &&
            ["Design", "Beyond", "Sight."].map((word) => (
              <span key={word} className="word block opacity-0">
                {word}
              </span>
            ))}
        </h1>

        {/* Sub-copy */}
        <p
          className="text-editorial text-pov-mist mt-8 max-w-lg animate-on-enter"
          style={{ animationDelay: "500ms", opacity: 0 }}
        >
          A platform where architects, brands, and builders co-create culture.
          Design POV is a publication, a movement, a living archive.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 mt-12 animate-on-enter"
          style={{ animationDelay: "700ms", opacity: 0 }}
        >
          <Link
            href="/apply"
            className="text-label bg-pov-white text-pov-black px-6 py-3 hover:bg-pov-clay transition-colors duration-300"
          >
            Apply / Partner
          </Link>
          <Link
            href="/2026"
            className="text-label border border-white/30 text-pov-white px-6 py-3 hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            Explore 2026
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-label text-pov-mist" style={{ fontSize: "0.55rem" }}>
          SCROLL
        </span>
        <div className="w-px h-12 bg-pov-mist/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-pov-clay animate-bounce" />
        </div>
      </div>
    </section>
  );
}
