import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type HeaderAlign = "left" | "center" | "right";
type HeaderSize  = "sm" | "md" | "lg" | "xl";

interface SectionHeaderProps {
  label?: string;
  title: string | ReactNode;
  subtitle?: string;
  align?: HeaderAlign;
  size?: HeaderSize;
  action?: ReactNode;       // e.g. a "View all →" link
  className?: string;
  titleClassName?: string;
}

const sizeStyles: Record<HeaderSize, string> = {
  sm: "text-[clamp(1.5rem,3vw,2.2rem)]",
  md: "text-[clamp(2rem,5vw,3.5rem)]",
  lg: "text-[clamp(2.5rem,6vw,5rem)]",
  xl: "text-[clamp(3rem,8vw,7rem)]",
};

const alignStyles: Record<HeaderAlign, string> = {
  left:   "text-left",
  center: "text-center mx-auto",
  right:  "text-right ml-auto",
};

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  size = "md",
  action,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14",
        className
      )}
    >
      <div className={cn("flex flex-col", alignStyles[align], "max-w-2xl")}>
        {label && (
          <p className="text-label text-pov-clay mb-4 md:mb-6">{label}</p>
        )}
        <h2
          className={cn(
            "font-display text-pov-white leading-[0.95] tracking-[-0.02em]",
            sizeStyles[size],
            titleClassName
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-pov-mist font-light leading-relaxed mt-4 md:mt-6 max-w-md">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
