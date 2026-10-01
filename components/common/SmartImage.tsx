"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import NextImage, { getImageProps, type ImageProps } from "next/image";

// Drop-in replacement for next/image that loads progressively: a tiny
// low-quality version paints first (as the <img>'s CSS background, so no
// wrapper element and no layout change), then the full image covers it once
// it finishes downloading. On slow connections the full image is requested
// at a lower quality as well.

const PLACEHOLDER_QUALITY = 30;
const PLACEHOLDER_WIDTH = 64;

// Must be values listed in next.config.js → images.qualities.
const SLOW_QUALITY = 30; // 2g / data-saver
const MEDIUM_QUALITY = 50; // 3g

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

function networkQuality(): number | undefined {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!connection) return undefined;
  if (connection.saveData || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
    return SLOW_QUALITY;
  }
  if (connection.effectiveType === "3g") return MEDIUM_QUALITY;
  return undefined;
}

// Vector, animated and inline sources gain nothing from a raster placeholder.
function canUsePlaceholder({ src, unoptimized, placeholder, loader }: ImageProps): boolean {
  if (unoptimized || loader || (placeholder && placeholder !== "empty")) return false;
  const url = typeof src === "string" ? src : "default" in src ? src.default.src : src.src;
  return !/^data:|^blob:|\.(svg|gif)(\?|#|$)/i.test(url);
}

// The placeholder is a background, so mirror the image's object-fit /
// object-position utilities to keep it aligned with the real image.
function backgroundFit(className = "") {
  const size = /\bobject-contain\b/.test(className)
    ? "contain"
    : /\bobject-cover\b/.test(className)
      ? "cover"
      : "100% 100%";
  const position = /\bobject-(top|bottom|left|right)\b/.exec(className)?.[1] ?? "center";
  return { backgroundSize: size, backgroundPosition: position, backgroundRepeat: "no-repeat" };
}

const SmartImage = forwardRef<HTMLImageElement, ImageProps>(function SmartImage(props, forwardedRef) {
  const { style, onLoad, onError, quality, className, ...rest } = props;
  const enhance = canUsePlaceholder(props);

  const [loaded, setLoaded] = useState(false);
  const [slowQuality, setSlowQuality] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const setRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  // A new src means a new download — show the placeholder again.
  const srcKey = typeof props.src === "string" ? props.src : "default" in props.src ? props.src.default.src : props.src.src;
  useEffect(() => {
    const img = imgRef.current;
    // Images served from cache (or loaded before hydration) never fire onLoad.
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    // Only downgrade images that haven't finished: switching quality restarts
    // the request, which is only worth it while the download is still pending.
    if (!props.priority && quality === undefined) setSlowQuality(networkQuality());
  }, [srcKey, props.priority, quality]);

  if (!enhance) {
    return <NextImage ref={forwardedRef} {...props} />;
  }

  const placeholderSrc = getImageProps({
    src: props.src,
    alt: "",
    width: PLACEHOLDER_WIDTH,
    height: PLACEHOLDER_WIDTH,
    quality: PLACEHOLDER_QUALITY,
  }).props.src;

  return (
    <NextImage
      {...rest}
      ref={setRef}
      className={className}
      quality={quality ?? slowQuality}
      style={
        loaded
          ? style
          : { ...backgroundFit(className), backgroundImage: `url("${placeholderSrc}")`, ...style }
      }
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        // Drop the placeholder so a broken image doesn't look half-loaded.
        setLoaded(true);
        onError?.(e);
      }}
    />
  );
});

export default SmartImage;
