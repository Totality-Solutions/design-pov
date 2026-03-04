import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardVariant = "default" | "elevated" | "bordered";

interface CardProps {
  href?: string;
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
  aspectRatio?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default:  "bg-pov-black hover:bg-pov-slate",
  elevated: "bg-pov-slate hover:bg-pov-slate/80",
  bordered: "bg-pov-black border border-white/10 hover:border-pov-clay/40",
};

export default function Card({
  href,
  variant = "default",
  className,
  children,
}: CardProps) {
  const classes = cn(
    "group transition-colors duration-500",
    variantStyles[variant],
    href && "cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

// ─── Sub-components ───────────────────────────────────────

interface CardImageProps {
  src?: string;
  alt?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "video";
  className?: string;
}

const aspectStyles = {
  square:    "aspect-square",
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  video:     "aspect-video",
};

Card.Image = function CardImage({
  src,
  alt = "",
  aspectRatio = "landscape",
  className,
}: CardImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-pov-slate", aspectStyles[aspectRatio], className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-pov-slate to-pov-black" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-pov-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = { sm: "p-4", md: "p-6", lg: "p-8 md:p-10" };

Card.Body = function CardBody({ children, className, padding = "md" }: CardBodyProps) {
  return (
    <div className={cn(paddingStyles[padding], className)}>
      {children}
    </div>
  );
};

interface CardLabelProps {
  children: ReactNode;
  className?: string;
}

Card.Label = function CardLabel({ children, className }: CardLabelProps) {
  return (
    <p className={cn("text-label text-pov-clay mb-3 md:mb-4", className)}>
      {children}
    </p>
  );
};

interface CardTitleProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const titleSizeStyles = {
  sm: "text-[clamp(1rem,2vw,1.3rem)]",
  md: "text-[clamp(1.2rem,2.5vw,1.7rem)]",
  lg: "text-[clamp(1.5rem,3vw,2.2rem)]",
};

Card.Title = function CardTitle({ children, size = "md", className }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "font-display text-pov-white leading-[1.05] tracking-[-0.01em] group-hover:text-pov-clay transition-colors duration-300",
        titleSizeStyles[size],
        className
      )}
    >
      {children}
    </h3>
  );
};

Card.Footer = function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between mt-5 pt-5 border-t border-white/5", className)}>
      {children}
    </div>
  );
};
