import { defineField, defineType } from "sanity";

export const sponsorSchema = defineType({
  name: "sponsor",
  title: "Design Partner / Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Brand Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: { list: ["title", "presenting", "associate", "supporting"] },
    }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "edition", title: "Edition Year", type: "string", options: { list: ["2025", "2026"] } }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "tier", media: "logo" } },
});

export const speakerSchema = defineType({
  name: "speaker",
  title: "Circle Speaker",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title / Role", type: "string" }),
    defineField({ name: "organisation", title: "Organisation", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "panelTheme", title: "Panel Theme", type: "string" }),
    defineField({ name: "edition", title: "Edition Year", type: "string", options: { list: ["2025", "2026"] } }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "organisation", media: "image" } },
});

export const authorSchema = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
  ],
  preview: { select: { title: "name", media: "image" } },
});

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "siteDescription", title: "Meta Description", type: "text" }),
    defineField({
      name: "announcementBanner",
      title: "Announcement Banner",
      type: "object",
      fields: [
        defineField({ name: "active", title: "Show Banner", type: "boolean" }),
        defineField({ name: "text", title: "Banner Text", type: "string" }),
        defineField({ name: "link", title: "Link URL", type: "url" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
      ],
    }),
  ],
});
