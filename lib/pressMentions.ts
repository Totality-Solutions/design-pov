import { cdn } from "@/lib/cdn";
import { createServerClient } from "@/lib/supabase/server";

export interface PressMention {
  id: string;
  title: string;
  img: string;
  href: string;
}

// Shown if the press_mentions table is missing or empty (e.g. before the SQL
// migration has been run), so the About page never renders a blank strip.
const FALLBACK: PressMention[] = [
  { id: "1", img: cdn("/temp/about/architecture-design.png"), title: "Architecture + Design", href: "https://www.architectureplusdesign.in/business-centre/asif-sataar-gagan-bhatia-perspective-risks-rewards-reinventing-design-pov/" },
  { id: "2", img: cdn("/temp/about/the-hindu.png"), title: "The Hindu", href: "https://www.thehindu.com/society/mumbais-design-pov-from-bachelor-pad-to-disco-bar/article69767762.ece" },
  { id: "3", img: cdn("/temp/about/design-pataki.png"), title: "Design Pataki", href: "https://www.designpataki.com/dp-cult/how-design-pov-is-reimagining-indias-creative-landscape/" },
  { id: "4", img: cdn("/temp/about/india-today-home.png"), title: "India Today Home", href: "https://www.indiatoday.in/magazine/supplements/home/story/20250728-news-events-inside-access-2757644-2025-07-18" },
  { id: "5", img: cdn("/temp/about/the-ideal-home.png"), title: "The Ideal Home and Garden", href: "https://theidealhomeandgarden.com/interior-design-exhibition-india-design-pov-2025/" },
  { id: "6", img: cdn("/temp/about/svasa.png"), title: "Svasa", href: "https://svasalife.com/designpov/" },
];

/** Server-only: active press mentions in display order. */
export async function getPressMentions(): Promise<PressMention[]> {
  let rows;
  try {
    const { data, error } = await createServerClient()
      .from("press_mentions")
      .select("id, title, image, link")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    rows = data;
  } catch (err) {
    // Missing env vars or table — keep the About page up with the defaults.
    console.error("[press-mentions] Falling back to defaults:", err);
    return FALLBACK;
  }

  if (!rows || rows.length === 0) return FALLBACK;
  const data = rows;

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    img: cdn(row.image),
    href: row.link,
  }));
}
