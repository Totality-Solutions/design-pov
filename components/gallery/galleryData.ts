import { GalleryItem, GalleryCategory } from "./types";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: "all", label: "All" },
  { id: "core", label: "Core" },
  { id: "brand", label: "Brand" },
  { id: "partners", label: "Partners" },
  { id: "circle", label: "Circle" },
  { id: "objects", label: "Objects" },
  { id: "artist", label: "Artist" },
];

// Real pixel dimensions per source image, used to size masonry cards to
// match each image's actual aspect ratio instead of a uniform guess.
const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/temp/1.png": { width: 736, height: 1247 },
  "/temp/2.png": { width: 736, height: 980 },
  "/temp/3.png": { width: 736, height: 736 },
  "/temp/4.png": { width: 736, height: 736 },
  "/temp/5.png": { width: 736, height: 464 },
  "/temp/6.png": { width: 736, height: 414 },
  "/temp/7.png": { width: 675, height: 1200 },
  "/temp/8.png": { width: 735, height: 469 },
  "/temp/9.png": { width: 735, height: 977 },
  "/temp/10.png": { width: 735, height: 952 },
};

const RAW_ITEMS: Omit<GalleryItem, "imageWidth" | "imageHeight">[] = [
  { id: "item-01", title: "Image Name", imageSrc: "/temp/1.png", category: "core" },
  { id: "item-02", title: "Image Name", imageSrc: "/temp/2.png", category: "brand" },
  { id: "item-03", title: "Image Name", imageSrc: "/temp/3.png", category: "partners" },
  { id: "item-04", title: "Image Name", imageSrc: "/temp/4.png", category: "circle" },
  { id: "item-05", title: "Image Name", imageSrc: "/temp/5.png", category: "objects" },
  { id: "item-06", title: "Image Name", imageSrc: "/temp/6.png", category: "artist" },
  { id: "item-07", title: "Image Name", imageSrc: "/temp/7.png", category: "core" },
  { id: "item-08", title: "Image Name", imageSrc: "/temp/8.png", category: "brand" },
  { id: "item-09", title: "Image Name", imageSrc: "/temp/9.png", category: "partners" },
  { id: "item-10", title: "Image Name", imageSrc: "/temp/10.png", category: "circle" },
  { id: "item-11", title: "Image Name", imageSrc: "/temp/1.png", category: "objects" },
  { id: "item-12", title: "Image Name", imageSrc: "/temp/2.png", category: "artist" },
  { id: "item-13", title: "Image Name", imageSrc: "/temp/3.png", category: "core" },
  { id: "item-14", title: "Image Name", imageSrc: "/temp/4.png", category: "brand" },
  { id: "item-15", title: "Image Name", imageSrc: "/temp/5.png", category: "partners" },
  { id: "item-16", title: "Image Name", imageSrc: "/temp/6.png", category: "circle" },
  { id: "item-17", title: "Image Name", imageSrc: "/temp/7.png", category: "objects" },
  { id: "item-18", title: "Image Name", imageSrc: "/temp/8.png", category: "artist" },
  { id: "item-19", title: "Image Name", imageSrc: "/temp/9.png", category: "core" },
  { id: "item-20", title: "Image Name", imageSrc: "/temp/10.png", category: "brand" },
  { id: "item-21", title: "Image Name", imageSrc: "/temp/1.png", category: "partners" },
  { id: "item-22", title: "Image Name", imageSrc: "/temp/2.png", category: "partners" },
];

export const galleryItems: GalleryItem[] = RAW_ITEMS.map((item) => {
  const dims = IMAGE_DIMENSIONS[item.imageSrc];
  return { ...item, imageWidth: dims?.width, imageHeight: dims?.height };
});
