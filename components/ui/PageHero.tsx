import { cn } from "@/lib/utils";
import Container from "./Container";
import Tag from "./Tag";
import type { ReactNode } from "react";

type PageHeroSize = "sm" | "md" | "lg";

interface PageHeroProps {
  label?: string;
  title: string | ReactNode;
  subtitle?: string;
  size?: PageHeroSize;
  children?: ReactNode;   // for CTAs or additional content
  className?: string;
  eyebrow?: string;       // small text above label, e.g. "2026 Edition ·"
}

const titleSizes: Record<PageHeroSize, string> = {
  sm: "text-[clamp(2.5rem,6vw,5rem)]",
  md: "text-[clamp(3rem,7vw,6.5rem)]",
  lg: "text-[clamp(3.5rem,9vw,8.5rem)]",
};

export default function PageHero({
  label,
  title,
  subtitle,
  size = "md",
  children,
  className,
  eyebrow,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "pt-28 md:pt-36 pb-12 md:pb-16 border-b border-white/5 bg-pov-black",
        className
      )}
    >
      <Container>
        {eyebrow && (
          <p className="text-label text-pov-mist mb-3 md:mb-4">{eyebrow}</p>
        )}
        {label && (
          <p className="text-label text-pov-clay mb-5 md:mb-8">{label}</p>
        )}
        <h1
          className={cn(
            "font-display text-pov-white leading-[0.9] tracking-[-0.02em]",
            titleSizes[size]
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-editorial text-pov-mist mt-6 md:mt-8 max-w-xl">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4">{children}</div>
        )}
      </Container>
    </section>
  );
}
