import { createServerClient } from "@/lib/supabase/server";
import { DEFAULT_HOME, mergeHomeContent, type HomeContent } from "@/lib/homeContent";

/** Server-only: home page content with saved CMS sections merged over the defaults. */
export async function getHomeContent(): Promise<HomeContent> {
  try {
    const { data, error } = await createServerClient().from("home_sections").select("section, data");
    if (error) throw error;
    return mergeHomeContent(Object.fromEntries((data ?? []).map((row) => [row.section, row.data])));
  } catch (err) {
    // Missing env vars or table — keep the home page up with the defaults.
    console.error("[home-content] Falling back to defaults:", err);
    return DEFAULT_HOME;
  }
}

/** Server-only: which sections have been saved in the CMS (vs. still on defaults). */
export async function getSavedHomeSections(): Promise<{ saved: Record<string, string>; error: string | null }> {
  try {
    const { data, error } = await createServerClient().from("home_sections").select("section, updated_at");
    if (error) throw error;
    return { saved: Object.fromEntries((data ?? []).map((row) => [row.section, row.updated_at])), error: null };
  } catch (err: any) {
    return { saved: {}, error: err?.message ?? "Couldn't load saved sections." };
  }
}
