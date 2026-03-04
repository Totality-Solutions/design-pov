import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TagVariant = "default" | "clay" | "rust" | "outline" | "mist";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

const tagStyles: Record<TagVariant, string> = {
  default: "bg-white/5 text-pov-mist",
  clay:    "bg-pov-clay/10 text-pov-clay border border-pov-clay/20",
  rust:    "bg-pov-rust/10 text-pov-rust border border-pov-rust/20",
  outline: "bg-transparent text-pov-white border border-white/20",
  mist:    "bg-transparent text-pov-mist border border-white/10",
};

export default function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block text-[0.6rem] tracking-[0.18em] uppercase font-medium px-3 py-1",
        tagStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
