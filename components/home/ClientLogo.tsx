"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { normalizeBrandPartner } from "@/lib/brandPartners";
import type { BrandPartnerRow } from "@/types";

const ClientLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [Client, setClient]       = useState<{ src: string; alt: string }[]>([]);
  const trackRef      = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    fetch("/api/cms/brand-partners")
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (!json?.data) return;
        const brands = (json.data as BrandPartnerRow[])
          .filter((p) => p.type === "brand")
          .map((p) => {
            const item = normalizeBrandPartner(p);
            return { src: item.logo, alt: item.name };
          });
        if (brands.length) setClient(brands);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!Client.length) return;

    const measure = () => {
      if (!firstGroupRef.current || !trackRef.current) return;
      const w = firstGroupRef.current.offsetWidth;
      if (w > 0) {
        trackRef.current.style.setProperty("--marquee-shift", `${w}px`);
      }
    };

    measure();

    const imgs = firstGroupRef.current?.querySelectorAll("img") ?? [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [Client]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.01 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, [Client.length]);

  if (!Client.length) return null;

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="pt-6 lg:pt-0"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
        <div className="shrink-0 whitespace-nowrap">
          <SectionHeading
            titleMain="Brands"
            titleBold="2026"
            sticky={false}
            isSectionHovered={isHovered}
          />
        </div>
        <div className="overflow-hidden flex-1 min-w-0 w-full">
          <div
            ref={trackRef}
            className="marquee-track py-6"
            style={{
              animationPlayState: isInView ? "running" : "paused",
              willChange: isInView ? "transform" : "auto",
            }}
          >
            <div ref={firstGroupRef} className="flex gap-8 pr-8">
              {Client.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto object-contain shrink-0"
                  draggable={false}
                />
              ))}
            </div>
            <div className="flex gap-8 pr-8" aria-hidden="true">
              {Client.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto object-contain shrink-0"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientLogo;
