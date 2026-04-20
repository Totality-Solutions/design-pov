'use client'
import React from 'react'
import Image from 'next/image'

interface MediaRendererProps {
  src: string;
  alt?: string;
  className?: string;
}

export const MediaRenderer = ({ src, alt = "", className = "" }: MediaRendererProps) => {
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`object-cover w-full h-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
    />
  );
};