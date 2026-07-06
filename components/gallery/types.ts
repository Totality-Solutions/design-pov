export interface GalleryItem {
  id: string;
  title: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  gradientFrom: string;
  gradientTo: string;
  category: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
}
