// Shared plumbing for CMS-editable fixed-layout pages (Home, Ecosystem, ...).
//
// Each page is a list of sections. A section's content lives in code as its
// default; once edited in the CMS, the saved JSON (table `page_sections`,
// keyed by page + section) is merged over that default field by field.
// Client-safe — no server imports here.

export type SectionMeta<K extends string = string> = { key: K; label: string; hint: string };

/** Every section has a show/hide switch. */
export type SectionBase = { enabled: boolean };

/** Saved data overrides each section's default; unknown sections are ignored. */
export function mergeSections<C extends Record<string, SectionBase>>(
  defaults: C,
  sections: SectionMeta<Extract<keyof C, string>>[],
  saved: Partial<Record<string, unknown>>
): C {
  const merged = { ...defaults };
  for (const { key } of sections) {
    const value = saved[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      merged[key] = { ...defaults[key], ...(value as object) };
    }
  }
  return merged;
}
