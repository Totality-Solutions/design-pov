import { StaticImageData } from "next/image";
import type { ContentBlock, Blog } from "@/data/magazineData";

export interface NormalizedBlog {
  type: "blog";
  id: string | number;
  slug: string;
  category: string;
  categoryDisplay?: string;
  author: string;
  date: string;
  isFeatured: boolean;
  image: StaticImageData | string;
  thumbnail: StaticImageData | string;
  title: string;
  subtitle: string;
  description: string;
  featuredParagraphs: string[];
  detailedContent: ContentBlock[];
}

export function normalizeStaticBlog(blog: Blog): NormalizedBlog {
  return {
    type:               blog.type,
    id:                 blog.id,
    slug:               blog.slug,
    category:           blog.category,
    categoryDisplay:    blog.categoryDisplay,
    author:             blog.author,
    date:               blog.date,
    isFeatured:         blog.isFeatured,
    image:              blog.image,
    thumbnail:          blog.thumbnail,
    title:              blog.title,
    subtitle:           blog.subtitle,
    description:        blog.description,
    featuredParagraphs: blog.featuredParagraphs,
    detailedContent:    blog.detailedContent,
  };
}

export function normalizeDbBlog(row: Record<string, any>): NormalizedBlog {
  return {
    type: "blog",
    id: String(row.id),
    slug: row.slug ?? "",
    category: row.category ?? "Design",
    categoryDisplay: row.category_display ?? undefined,
    author: row.author ?? "",
    date: row.date ?? "",
    isFeatured: row.is_featured ?? false,
    image: row.image || "/temp/home/blogs/blog-16.jpg",
    thumbnail: row.thumbnail || row.image || "/temp/home/blogs/blog-16.jpg",
    title: row.title ?? "",
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    featuredParagraphs: row.featured_paragraphs ?? [],
    detailedContent: (row.detailed_content ?? []).map((block: any) => ({
      type: block.type,
      value: block.value ?? "",
      ...(block.title   ? { title:   block.title   } : {}),
      ...(block.caption ? { caption: block.caption } : {}),
    })),
  };
}
