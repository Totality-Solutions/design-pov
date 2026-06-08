'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

interface MediaRendererProps {
  src: string;
  alt?: string;
  className?: string;
}

export const MediaRenderer = ({ src, alt = "", className = "" }: MediaRendererProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(src);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          requestAnimationFrame(() => video.play().catch(() => {}));
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        src={shouldLoadVideo ? src : undefined}
        preload="metadata" 
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
      loading="lazy"
      className={`object-cover ${className}`}
    />
  );
};
