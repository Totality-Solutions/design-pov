import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { studioSchema } from "./schemas/studio";
import { journalPostSchema } from "./schemas/journalPost";
import { sponsorSchema, speakerSchema, authorSchema, siteSettingsSchema } from "./schemas/schemas";

export default defineConfig({
  name: "design-pov",
  title: "Design POV CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      studioSchema,
      journalPostSchema,
      sponsorSchema,
      speakerSchema,
      authorSchema,
      siteSettingsSchema,
    ],
  },
});
