export interface GalleryItem {
  id: string;
  title: string;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  category: string;
  year?: number;
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryYear {
  id: string;
  label: string;
}
