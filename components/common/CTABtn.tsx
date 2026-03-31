"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiMinimize, FiMinus, FiPlus, FiRefreshCcw, FiX } from "react-icons/fi";

interface CTABtnProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  width?: "fit" | "full";
  showButtonBg?: boolean;
  showIconCircle?: boolean;
  showIcon?: boolean;
  showLabel?: boolean;
  iconPosition?: "left" | "right";
  btnBg?: string;
  btnHoverBg?: string;
  circleBg?: string;
  iconColor?: string;
  textColor?: string;
  iconType?: "arrow" | "reset" | "plus" | "x";
  className?: string;
  disabled?: boolean;
  borderColor?: string;
  borderHoverColor?: string;
  lineColor?: string;
  lineHoverColor?: string;
  bottomKey1Width?: string;
  bottomKey2Width?: string;
  bottomKey1Right?: string;
  bottomKey2Right?: string;
}

export default function CTABtn({
  label,
  href,
  onClick,
  size = "md",
  width = "fit",
  showButtonBg = true,
  showIconCircle = true,
  showIcon = true,
  showLabel = true,
  iconPosition = "right",
  iconType = "arrow",
  btnBg = "transparent",
  btnHoverBg = "var(--primary-blue)",
  circleBg = "transparent",
  iconColor = "var(--color-black)",
  textColor = "var(--color-black)",
  className = "",
  disabled = false,
  borderColor,
  borderHoverColor,
  lineColor,
  lineHoverColor,
  bottomKey1Width,
  bottomKey2Width,
  bottomKey1Right,
  bottomKey2Right,
}: CTABtnProps) {
  const [hovered, setHovered] = useState(false);

  const config = {
    sm: {
      h: "h-10",
      circle: "w-8 h-8",
      text: "var(--font-size-sm)",
      px: "pl-4 pr-1",
      gap: "gap-3",
      iconSize: 10,
    },
    md: {
      h: "h-[50px]",
      circle: "w-[40px] h-[40px]",
      text: "var(--font-size-base)",
      px: "pr-6 pl-1.5",
      gap: "gap-3",
      iconSize: 15,
    },
    lg: {
      h: "h-16",
      circle: "w-12 h-12",
      text: "var(--font-size-base)",
      px: "pl-8 pr-2",
      gap: "gap-8",
      iconSize: 20,
    },
  };

  const cur = config[size];

  /* ICON */
  const Icon = () => {
    const props = { size: cur.iconSize, color: "currentColor" };

    if (iconType === "x") return <FiX {...props} />;
    if (iconType === "plus") return <FiPlus {...props} />;
    if (iconType === "reset") return <FiRefreshCcw {...props} />;
    return <FiMinus {...props} strokeWidth={2.5} />;
  };

  /* ICON WRAPPER */
  const IconPart = showIcon && (
    <div
      className="flex items-center justify-center transition-transform duration-300"
      style={{
        transform:
          hovered && (iconType === "arrow" || iconType === "reset")
            ? "rotate(0deg) scale(1.9)"
            : "rotate(0deg)",
      }}
    >
      <Icon />
    </div>
  );

  /* CIRCLE */
  const CircleModule = (
    <div
      className={`${cur.circle}  flex items-center justify-center shrink-0 transition-all duration-300`}
      style={{
        color: showIconCircle
          ? hovered
            ? "var(--color-white)"
            : borderColor || "var(--color-white)"
          : "var(--color-white)",
        order: iconPosition === "left" ? 1 : 0,
      }}
    >
      {IconPart}
    </div>
  );

  /* LABEL */
  const LabelModule = showLabel && label && (
    <span
      className={`${cur.text} font-normal whitespace-nowrap`}
      style={{
        color: hovered ? "var(--color-white)" : textColor,
        order: iconPosition === "left" ? 2 : 1,
      }}
    >
      {label}
    </span>
  );

  /* COMMON */
  const commonProps = {
    className: `
      relative flex items-center  overflow-hidden
      transition-all duration-300
      ${cur.h}
      ${width === "full" ? "w-full" : "w-fit"}
      ${cur.px}
      ${className}
      ${disabled ? "opacity-50 pointer-events-none" : ""}
    `,
style: {
  backgroundColor: showButtonBg
    ? hovered
      ? btnHoverBg
      : btnBg
    : "transparent",

  color: hovered ? "var(--color-white)" : textColor,

  /* ✅ DYNAMIC COLORS */
  ["--btn-border" as any]: borderColor || textColor,
  ["--btn-border-hover" as any]:
    borderHoverColor || "var(--color-white)",

  ["--btn-line" as any]: lineColor || textColor,
  ["--btn-line-hover" as any]:
    lineHoverColor || "var(--color-white)",

  /* ✅ BOTTOM KEY CONTROL */
  ["--bk1-width" as any]: bottomKey1Width || "25px",
  ["--bk2-width" as any]: bottomKey2Width || "10px",

  ["--bk1-right" as any]: bottomKey1Right || "30px",
  ["--bk2-right" as any]: bottomKey2Right || "10px",
},
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  };

  const Component: any = href ? Link : "button";

  return (
    <Component
  {...(href ? { ...commonProps, href } : commonProps)}
  className={`${commonProps.className} fancy-btn`}
>
  {/* TOP KEY */}
  <span className="top-key" />

  {/* BEFORE LINE */}
  {/* <span className="before-line" /> */}

  <div className={`flex items-center w-full ${cur.gap} relative z-10`}>
    {(showIcon || showIconCircle) && CircleModule}
    {LabelModule}
  </div>

  {/* BOTTOM KEYS */}
  <span className="bottom-key-1" />
  <span className="bottom-key-2" />
</Component>
  );
}