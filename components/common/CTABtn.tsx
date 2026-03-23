"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiPlus, FiRefreshCcw, FiX } from "react-icons/fi";

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
  btnBg = "var(--primary-blue)",
  btnHoverBg = "var(--primary-blue)",
  circleBg = "var(--primary-blue)",
  iconColor = "var(--color-white)",
  textColor = "var(--color-white)",
  className = "",
  disabled = false,
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
      px: "pl-6 pr-1.5",
      gap: "gap-6",
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
    const props = { size: cur.iconSize, color: iconColor };

    if (iconType === "x") return <FiX {...props} />;
    if (iconType === "plus") return <FiPlus {...props} />;
    if (iconType === "reset") return <FiRefreshCcw {...props} />;
    return <FiArrowUpRight {...props} strokeWidth={2.5} />;
  };

  /* ICON WRAPPER */
  const IconPart = showIcon && (
    <div
      className="flex items-center justify-center transition-transform duration-300"
      style={{
        transform:
          hovered && (iconType === "arrow" || iconType === "reset")
            ? "rotate(45deg) scale(1.5)"
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
        backgroundColor: showIconCircle
          ? hovered
            ? btnBg
            : circleBg
          : "var(--primary-blue)",
        order: iconPosition === "right" ? 2 : 0,
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
        order: 1,
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
        : "var(--primary-blue)",
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  };

  const Component: any = href ? Link : "button";

  return (
    <Component {...(href ? { ...commonProps, href } : commonProps)}>
      <div className={`flex items-center w-full ${cur.gap}`}>
        {LabelModule}
        {(showIcon || showIconCircle) && CircleModule}
      </div>
    </Component>
  );
}