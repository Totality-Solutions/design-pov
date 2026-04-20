"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMinus, FiPlus, FiRefreshCcw, FiX } from "react-icons/fi";

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
  forceHover?: boolean;
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
  forceHover = false,
}: CTABtnProps) {
  const [internalHover, setInternalHover] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    // Determine if the device supports actual hover (mouse/trackpad)
    const hoverMedia = window.matchMedia("(hover: hover)");
    setCanHover(hoverMedia.matches);
    
    // Optional: Listener for screen changes
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    hoverMedia.addEventListener("change", handler);
    return () => hoverMedia.removeEventListener("change", handler);
  }, []);

  // Combine internal mouse hover and parent forced hover
  const hovered = internalHover || forceHover;

const config = {
  sm: { 
    h: "h-10", 
    circle: "w-8 h-8", 
    text: "var(--text-small-mobile)", // 10px
    px: "pl-4 pr-1", 
    gap: "gap-3", 
    iconSize: 20 
  },
  md: { 
    h: "h-auto", 
    circle: "w-auto h-auto", 
    // Using --text-small-tab which is defined as 12px in your :root
    text: "var(--text-small-tab)", 
    px: "px-5 md:px-10 py-1 md:py-2", 
    gap: "gap-3", 
    iconSize: 30 
  },
  lg: { 
    h: "h-12", 
    circle: "w-10 h-10", 
    text: "var(--text-body-tab)", // 18px (Desktop)
    px: "px-5 py-1", 
    gap: "gap-2", 
    iconSize: 25 
  },
};

  const cur = config[size];

  // const Icon = () => {
  //   const props = { size: cur.iconSize, color: "currentColor" };
  //   if (iconType === "x") return <FiX {...props} />;
  //   if (iconType === "plus") return <FiPlus {...props} />;
  //   if (iconType === "reset") return <FiRefreshCcw {...props} />;
  //   return <FiMinus {...props} strokeWidth={1.2} />;
  // };

  const commonProps = {
    className: `
      relative flex items-center overflow-visible
      transition-all duration-300
      ${cur.h}
      ${width === "full" ? "w-full" : "w-fit"}
      ${cur.px}
      ${className}
      ${disabled ? "opacity-50 pointer-events-none" : ""}
      fancy-btn ${hovered ? "is-hovered" : ""}
    `,
    style: {
      backgroundColor: showButtonBg ? (hovered ? btnHoverBg : btnBg) : "transparent",
      color: hovered ? "var(--color-white)" : textColor,
      transform: hovered ? "scale(0.95)" : "scale(1)",
      transformOrigin: "center",
      ["--btn-border" as any]: borderColor || textColor,
      ["--btn-border-hover" as any]: borderHoverColor || "var(--color-white)",
      ["--btn-line" as any]: lineColor || textColor,
      ["--btn-line-hover" as any]: lineHoverColor || "var(--color-white)",
      ["--bk1-width" as any]: bottomKey1Width || "25px",
      ["--bk2-width" as any]: bottomKey2Width || "10px",
      ["--bk1-right" as any]: bottomKey1Right || "30px",
      ["--bk2-right" as any]: bottomKey2Right || "10px",
    },
    // Hover event only fires if the device supports actual hover
    onMouseEnter: () => canHover && setInternalHover(true),
    onMouseLeave: () => setInternalHover(false),
    onClick,
  };

  const Component: any = href ? Link : "button";

  return (
    <Component {...(href ? { ...commonProps, href } : commonProps)}>
      {/* TOP KEY */}
      <span className="top-key" />

      <div className={`flex items-center w-full ${cur.gap} relative z-10`}>
        {/* {(showIcon || showIconCircle) && (
          <div
            className={`${cur.circle} flex items-center justify-center shrink-1 transition-all duration-300`}
            style={{
              color: showIconCircle
                ? hovered
                  ? "var(--color-white)"
                  : textColor || "var(--color-white)"
                : "var(--color-white)",
              order: iconPosition === "left" ? 1 : 0,
            }}
          >
            <div
              className="flex items-center justify-center transition-transform duration-300"
              style={{
                transform:
                  hovered && (iconType === "arrow" || iconType === "reset")
                    ? "rotate(0deg) scale(0.6)"
                    : "rotate(0deg)",
              }}
            >
              <Icon />
            </div>
          </div>
        )} */}
        {showLabel && label && (
          <span
            className={`${cur.text} font-normal whitespace-nowrap`}
            style={{
              color: hovered ? "var(--color-white)" : textColor,
              order: iconPosition === "left" ? 2 : 1,
            }}
          >
            {label}
          </span>
        )}
      </div>

      {/* BOTTOM KEYS */}
      <span className="bottom-key-1" />
      <span className="bottom-key-2" />
    </Component>
  );
}