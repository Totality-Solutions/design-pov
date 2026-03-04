"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "clay" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: undefined;
  type?: undefined;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

// ─── Variant Styles ───────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-pov-white text-pov-black hover:bg-pov-clay border border-pov-white hover:border-pov-clay",
  secondary:
    "bg-pov-slate text-pov-white hover:bg-pov-slate/70 border border-white/10 hover:border-white/20",
  ghost:
    "bg-transparent text-pov-white hover:text-pov-clay border border-transparent",
  outline:
    "bg-transparent text-pov-white border border-white/30 hover:border-pov-clay hover:text-pov-clay hover:bg-pov-clay/5",
  clay:
    "bg-pov-clay text-pov-black hover:bg-pov-rust border border-pov-clay hover:border-pov-rust",
  danger:
    "bg-transparent text-red-400 border border-red-400/30 hover:bg-red-400/10 hover:border-red-400",
};

// ─── Size Styles ──────────────────────────────────────────
const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[0.6rem] tracking-[0.18em] px-4 py-2",
  md: "text-[0.65rem] tracking-[0.2em] px-6 py-3",
  lg: "text-[0.7rem] tracking-[0.2em] px-8 py-4",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-medium uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pov-clay focus-visible:ring-offset-2 focus-visible:ring-offset-pov-black disabled:opacity-40 disabled:pointer-events-none";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  className,
  icon,
  iconPosition = "right",
  ...props
}: ButtonProps) {
  const classes = cn(BASE, variantStyles[variant], sizeStyles[size], className);

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      {loading ? (
        <span className="flex items-center gap-2">
          <LoadingDots />
          {children}
        </span>
      ) : (
        children
      )}
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}

// ─── Loading dots ─────────────────────────────────────────
function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}
