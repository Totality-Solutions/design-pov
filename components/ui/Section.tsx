import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionVariant = "default" | "slate" | "cream" | "dark" | "transparent";
type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

interface SectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  border?: "top" | "bottom" | "both" | "none";
  className?: string;
  id?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  default:     "bg-pov-black",
  slate:       "bg-pov-slate",
  cream:       "bg-pov-cream",
  dark:        "bg-[#060606]",
  transparent: "bg-transparent",
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: "",
  sm:   "py-10 md:py-14",
  md:   "py-16 md:py-20",
  lg:   "py-20 md:py-28",
  xl:   "py-28 md:py-40",
};

const borderStyles: Record<string, string> = {
  top:    "border-t border-white/5",
  bottom: "border-b border-white/5",
  both:   "border-t border-b border-white/5",
  none:   "",
};

export default function Section({
  children,
  variant = "default",
  spacing = "lg",
  border = "none",
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        variantStyles[variant],
        spacingStyles[spacing],
        borderStyles[border],
        className
      )}
    >
      {children}
    </section>
  );
}
