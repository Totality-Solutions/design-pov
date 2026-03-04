import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type ContainerAlign = "left" | "center";

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  align?: ContainerAlign;
  className?: string;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-6xl",
  xl:   "max-w-[1440px]",
  full: "max-w-none",
};

export default function Container({
  children,
  size = "xl",
  align = "center",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-[clamp(1.5rem,5vw,5rem)]",
        sizeStyles[size],
        align === "center" ? "mx-auto" : "ml-0",
        className
      )}
    >
      {children}
    </div>
  );
}
