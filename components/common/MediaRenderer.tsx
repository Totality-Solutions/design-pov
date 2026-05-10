'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

interface MediaRendererProps {
  src: string;
  alt?: string;
  className?: string;
}

export const MediaRenderer = ({ src, alt = "", className = "" }: MediaRendererProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(src);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={src}
        preload="none"
        loop
        muted
        playsInline
        className={`object-cover w-full md:h-full  ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className={`object-cover ${className}`}
    />
  );
};
