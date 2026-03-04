import { defineField, defineType } from "sanity";

export const studioSchema = defineType({
  name: "studio",
  title: "Core Studio",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Studio Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "location", title: "City", type: "string" }),
    defineField({ name: "edition", title: "Edition Year", type: "string", options: { list: ["2025", "2026"] } }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "fullPhilosophy", title: "Full Philosophy", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "galleryImages", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "installationConcept", title: "Installation Concept Title", type: "string" }),
    defineField({ name: "installationDescription", title: "Installation Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "installationImages", title: "Installation Images", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "brandPartner", title: "Brand Partner", type: "reference", to: [{ type: "sponsor" }] }),
    defineField({ name: "buildPartner", title: "Build Partner Name", type: "string" }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "location", media: "mainImage" } },
});
