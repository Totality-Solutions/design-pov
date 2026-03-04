import { defineField, defineType } from "sanity";

export const journalPostSchema = defineType({
  name: "journalPost",
  title: "Journal Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Installations", "Conversations", "Materials", "Opinion", "Field Notes"] },
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "mainImage", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [
      defineField({ name: "alt", type: "string", title: "Alt text" }),
      defineField({ name: "caption", type: "string", title: "Caption" }),
    ]}),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readTime", title: "Read Time (e.g. '6 min read')", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true }, fields: [
          defineField({ name: "alt", type: "string", title: "Alt text" }),
          defineField({ name: "caption", type: "string", title: "Caption" }),
        ]},
        {
          type: "object",
          name: "pullQuote",
          title: "Pull Quote",
          fields: [
            defineField({ name: "quote", type: "text", title: "Quote" }),
            defineField({ name: "attribution", type: "string", title: "Attribution (optional)" }),
          ],
        },
      ],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "journalPost" }] }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "mainImage" } },
});
