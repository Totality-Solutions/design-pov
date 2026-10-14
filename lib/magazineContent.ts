import { cdn } from "@/lib/cdn";
import type { SectionMeta } from "@/lib/pageContent";

// Content model for the /magazine landing page, edited in CMS → Magazine Page.
// Press and Featured Stories show published posts from CMS → Blogs; here they
// only have a show/hide switch. Client-safe.

export type IssueCard = { category: string; title: string; image: string; href: string };
export type InterviewItem = { category: string; title: string; author: string; date: string; videoUrl: string };
export type AdSlot = { image: string; href: string };

export type MagazinePageContent = {
  hero:       { enabled: boolean; headline: string; subtext: string };
  press:      { enabled: boolean };
  issue:      { enabled: boolean; headingMain: string; headingBold: string; cards: IssueCard[]; ad: AdSlot };
  featured:   { enabled: boolean };
  interviews: { enabled: boolean; heading: string; rightLabel: string; items: InterviewItem[] };
  submission: { enabled: boolean };
  bottomAd:   { enabled: boolean; image: string; href: string };
};

export type MagazineSectionKey = keyof MagazinePageContent;

export const MAGAZINE_SECTIONS: SectionMeta<MagazineSectionKey>[] = [
  { key: "hero",       label: "Hero",             hint: "Headline and intro line" },
  { key: "press",      label: "Press",            hint: "Posts come from CMS → Blogs" },
  { key: "issue",      label: "Current Issue",    hint: "Issue cards and the side advertisement" },
  { key: "featured",   label: "Featured Stories", hint: "Posts come from CMS → Blogs" },
  { key: "interviews", label: "Interviews",       hint: "YouTube interview cards" },
  { key: "submission", label: "Submission Form",  hint: "“Submit your story” form" },
  { key: "bottomAd",   label: "Bottom Advertisement", hint: "Wide banner ad at the end (desktop only)" },
];

/** YouTube link → thumbnail; falls back to a placeholder for other links. */
export function youTubeThumbnail(url: string): string {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;
    if (parsed.hostname === "youtu.be") videoId = parsed.pathname.slice(1);
    else if (parsed.hostname.includes("youtube.com")) videoId = parsed.searchParams.get("v");
    if (videoId) return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  } catch {
    // not a valid URL
  }
  return "/temp/about/1.png";
}

export const DEFAULT_MAGAZINE: MagazinePageContent = {
  hero: {
    enabled: true,
    headline: "A curation of stories from those who consume and create design - from the Indian sub-continent and beyond.",
    subtext: "An editorial platform capturing the voices and narratives shaping design today.",
  },
  press: { enabled: true },
  issue: {
    enabled: true,
    headingMain: "The ",
    headingBold: "May Issue",
    cards: [
      {
        category: "POV Blogs",
        title: "Pacific Homes powers Design POV ’26 with engineered stone and surface innovation",
        image: cdn("/temp/ads/april-issue1.png"),
        href: "",
      },
      {
        category: "POV Blogs",
        title: "Acespace brings a decade of veneer expertise to Design POV ’26",
        image: cdn("/temp/ads/april-issue2.png"),
        href: "",
      },
    ],
    ad: { image: cdn("/temp/ads/2.png"), href: "https://www.pacific-surfaces.com/" },
  },
  featured: { enabled: true },
  interviews: {
    enabled: true,
    heading: "Interviews",
    rightLabel: "Dialogue Series",
    items: [
      { category: "Designers",   title: "Episode 1 of #TheCore’25: Ameet Mirpuri’s Nostalgia",                              author: "Design POV", date: "12 Mar, 2026", videoUrl: "https://youtu.be/g4k7-ZfcDlk?si=58JIvM0aUCQ9qmSs" },
      { category: "Architects",  title: "Episode 2 of #TheCore2025: Sanjyt Syngh’s Glamour of Yesterday",                   author: "Design POV", date: "05 Mar, 2026", videoUrl: "https://youtu.be/zKLPY89y8DI?si=Zd1FqiWjIXceQiJ8" },
      { category: "Visionaries", title: "Episode 3 of #TheCore2025: reD Architect's Beyond Boundaries",                     author: "Design POV", date: "28 Feb, 2026", videoUrl: "https://youtu.be/hiaSTtlBWlk?si=P-S6oo3jKn9A2d5U" },
      { category: "Builders",    title: "Episode 4 of #TheCore2025: Studio Nishita Kamdar's A Walk in the Garden",          author: "Design POV", date: "20 Feb, 2026", videoUrl: "https://youtu.be/3MHS7if24FU?si=DTJm9EkqKSBf26W7" },
    ],
  },
  submission: { enabled: true },
  bottomAd: { enabled: true, image: cdn("/temp/ads/1.png"), href: "https://www.kajariaceramics.com/" },
};
