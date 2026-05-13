const BASE = process.env.NEXT_PUBLIC_CDN_URL ?? "https://d1qlyda1dsr5ui.cloudfront.net/designpovindia.com";
/**
 * Prefixes a public-folder path with the CloudFront CDN base URL.
 * Returns the path unchanged in local dev (when NEXT_PUBLIC_CDN_URL is not set).
 */
export const cdn = (path: string): string => {
  if (!BASE || !path || path.startsWith("http")) return path;
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
};
