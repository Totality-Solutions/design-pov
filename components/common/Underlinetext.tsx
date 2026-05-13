"use client"
import React, { useEffect, useRef, useState } from 'react';

interface UnderlineTextProps {
  children: string;
  lineHeight?: number;
  lineColor?: string;
  lineThickness?: number;
  className?: string;
  mobileLineHeight?: number;
}


export function UnderlineText({
   children,
  lineHeight = 52,
  mobileLineHeight = 42,
  lineColor = '#000',
  lineThickness = 3,
  marginWidth = 30,
  mobileMarginWidth = 50,
  className = '',
}: UnderlineTextProps & {
  marginWidth?: number;
  mobileMarginWidth?: number;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const currentLineHeight = isMobile ? mobileLineHeight : lineHeight;
  const currentThickness = isMobile ? Math.max(lineThickness - 2, 1) : lineThickness;
  const currentMarginWidth = isMobile ? mobileMarginWidth : marginWidth;
 
  return (
    <div
      className={`block w-full relative ${className}`}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent ${currentLineHeight - currentThickness}px,
            ${lineColor} ${currentLineHeight - currentThickness}px,
            ${lineColor} ${currentLineHeight}px
          )
        `,
        backgroundSize: `100% ${currentLineHeight}px`,
        backgroundPosition: '0 0',
        lineHeight: `${currentLineHeight}px`,
        paddingLeft: isMobile ? '24px' : `${currentMarginWidth + 10}px`,
        paddingRight: isMobile ? '24px' : '1.5rem',
      }}
    >
      {/* Red margin line */}
      {/* <div
        style={{
          position: 'absolute',
        //   left: `${currentMarginWidth}px`,
          top: 0,
          bottom: 0,
          width: '2px',
        //   backgroundColor: marginLineColor,
        }}
      /> */}
      {children}
    </div>
  );
}
