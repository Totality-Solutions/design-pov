import { groq } from "next-sanity";

// ─── STUDIOS ──────────────────────────────────────────────
export const studiosQuery = groq`
  *[_type == "studio"] | order(orderRank) {
    _id,
    name,
    slug,
    location,
    shortBio,
    mainImage,
    installationConcept,
    edition
  }
`;

export const studioBySlugQuery = groq`
  *[_type == "studio" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    shortBio,
    fullPhilosophy,
    mainImage,
    galleryImages,
    installationConcept,
    installationImages,
    brandPartner-> { name, logo, website },
    buildPartner-> { name, logo },
    edition,
    mediaLinks
  }
`;

// ─── JOURNAL ──────────────────────────────────────────────
export const journalPostsQuery = groq`
  *[_type == "journalPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author-> { name, image }
  }
`;

export const journalPostBySlugQuery = groq`
  *[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    author-> { name, image, bio },
    body,
    relatedPosts[]-> {
      title, slug, category, mainImage, publishedAt
    }
  }
`;

// ─── SPEAKERS ─────────────────────────────────────────────
export const speakersQuery = groq`
  *[_type == "speaker"] | order(orderRank) {
    _id,
    name,
    title,
    organisation,
    image,
    panelTheme,
    edition
  }
`;

// ─── SPONSORS ─────────────────────────────────────────────
export const sponsorsQuery = groq`
  *[_type == "sponsor"] | order(tier, orderRank) {
    _id,
    name,
    logo,
    tier,
    website,
    edition
  }
`;

// ─── ECOSYSTEM ────────────────────────────────────────────
export const originalsQuery = groq`
  *[_type == "ecosystemItem" && category == "originals"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    artist-> { name },
    architect-> { name },
    edition
  }
`;

export const objectsQuery = groq`
  *[_type == "ecosystemItem" && category == "objects"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    curator,
    brands[],
    concept,
    materialStory
  }
`;

// ─── SITE SETTINGS ────────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteDescription,
    socialLinks,
    announcementBanner
  }
`;
