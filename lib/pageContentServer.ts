import { createServerClient } from "@/lib/supabase/server";
import { mergeSections, type SectionBase, type SectionMeta } from "@/lib/pageContent";
import { PAGES, type PageContentMap, type PageKey } from "@/lib/pageRegistry";

/** Server-only: a page's content with saved CMS sections merged over the defaults. */
export async function getPageContent<P extends PageKey>(page: P): Promise<PageContentMap[P]> {
  const { defaults, sections } = PAGES[page];
  try {
    const { data, error } = await createServerClient()
      .from("page_sections")
      .select("section, data")
      .eq("page", page);
    if (error) throw error;
    return mergeSections(
      defaults as Record<string, SectionBase>,
      sections as SectionMeta[],
      Object.fromEntries((data ?? []).map((row) => [row.section, row.data]))
    ) as unknown as PageContentMap[P];
  } catch (err) {
    // Missing env vars or table — keep the page up with the defaults.
    console.error(`[page-content:${page}] Falling back to defaults:`, err);
    return defaults;
  }
}

/** Server-only: which of a page's sections have been saved in the CMS (section → updated_at). */
export async function getSavedSections(page: PageKey): Promise<{ saved: Record<string, string>; error: string | null }> {
  try {
    const { data, error } = await createServerClient()
      .from("page_sections")
      .select("section, updated_at")
      .eq("page", page);
    if (error) throw error;
    return { saved: Object.fromEntries((data ?? []).map((row) => [row.section, row.updated_at])), error: null };
  } catch (err: any) {
    return { saved: {}, error: err?.message ?? "Couldn't load saved sections." };
  }
}
