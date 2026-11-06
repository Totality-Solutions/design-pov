import type { ProjectBlock, ProjectGalleryImage, ProjectSpec } from "@/lib/projects";

// The CMS project form's data shape and empty defaults. Field names match the
// `projects` table columns. Lives outside components/cms/ProjectForm.tsx
// ("use client") because the server edit page needs the real values: in a
// server component, non-component exports of a client file are references,
// not values.

export type ProjectFormData = {
  title: string;
  slug: string;
  architects: string;
  category: string;
  status: "draft" | "published";
  published_on: string;
  area: string;
  year: string;
  photographer: string;
  city: string;
  country: string;
  design_team: string;
  extra_specs: ProjectSpec[];
  cover_image: string;
  gallery: ProjectGalleryImage[];
  text_credit: string;
  content: ProjectBlock[];
  office_name: string;
  office_logo: string;
  office_url: string;
  office_instagram: string;
  tags: string[];
};

export const EMPTY_PROJECT: ProjectFormData = {
  title: "",
  slug: "",
  architects: "",
  category: "",
  status: "draft",
  published_on: new Date().toISOString().slice(0, 10),
  area: "",
  year: String(new Date().getFullYear()),
  photographer: "",
  city: "",
  country: "",
  design_team: "",
  extra_specs: [],
  cover_image: "",
  gallery: [],
  text_credit: "Text description provided by the architects.",
  content: [{ type: "text", value: "" }],
  office_name: "",
  office_logo: "",
  office_url: "",
  office_instagram: "",
  tags: [],
};

/** A `projects` row → form data: missing / null columns get the empty defaults. */
export function projectRowToForm(row: Record<string, unknown>): ProjectFormData {
  const form = Object.fromEntries(
    (Object.keys(EMPTY_PROJECT) as (keyof ProjectFormData)[]).map((key) => [key, row[key] ?? EMPTY_PROJECT[key]])
  ) as ProjectFormData;
  if (!Array.isArray(form.content) || form.content.length === 0) form.content = EMPTY_PROJECT.content;
  for (const key of ["extra_specs", "gallery", "tags"] as const) if (!Array.isArray(form[key])) (form as any)[key] = [];
  return form;
}
