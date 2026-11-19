import { createServerClient } from "@/lib/supabase/server";
import { isSampleProject } from "@/lib/projects";
import { ALTERNATE_NAMES, EDITIONS, NEXT_EDITION, SITE_DESCRIPTION, SITE_URL, SOCIAL_PROFILES, WHATSAPP } from "@/lib/seo";

// /llms.txt — a plain-markdown summary of the site for AI models and answer
// engines (GEO): who Design POV is, key facts, the main pages, and the latest
// published projects and articles. Regenerated hourly.
export const revalidate = 3600;

const PAGES: [string, string, string][] = [
  ["The Core 2027", "/edition-2027/core", "Studios taking part in The Core at Design POV 2027, and how to apply."],
  ["Design POV 2026 — Sense & Sensibility", "/edition", "The 2026 edition: theme, The Core Collective, brands, schedule and partners."],
  ["Theme 2026", "/edition/theme", "The Sense & Sensibility theme and the studios' interpretations."],
  ["The Core Collective 2026", "/edition/core", "The architecture and design studios of The Core 2026."],
  ["Brands & Partners", "/edition/brands", "Brands, sponsors and build partners, and how to partner."],
  ["Schedule", "/edition/schedule", "The Circle talks, workshops and events by day."],
  ["Ecosystem", "/ecosystem", "The Core, The Circle, POV Objects, POV Elevate and the magazine."],
  ["POV Objects", "/ecosystem/objects", "One-of-one collectible pieces made in response to each edition's theme."],
  ["POV Elevate", "/ecosystem/elevate", "Events and amplification for home and lifestyle brands beyond the show floor."],
  ["Magazine", "/magazine", "Features, interviews, projects and news."],
  ["Projects", "/magazine/projects", "Architecture and interior projects with specifications and photographs."],
  ["Gallery", "/gallery", "Photographs from Design POV editions."],
  ["About", "/about", "Founders, philosophy and the three pillars."],
  ["Collaborate", "/collaborate", "Ways to take part: The Core, The Circle, Objects, Elevate, brands, sponsorship, media."],
  ["FAQ", "/faq", "Dates, venue, tickets, participation and practical information."],
  ["Contact", "/contact", "Office address and enquiry form."],
];

async function latest(table: "projects" | "blogs") {
  try {
    const db = createServerClient();
    const { data, error } =
      table === "projects"
        ? await db.from("projects").select("slug, title, architects, city, country, tags").eq("status", "published").order("published_on", { ascending: false }).limit(30)
        : await db.from("blogs").select("slug, title, category").eq("status", "published").order("created_at", { ascending: false }).limit(30);
    if (error) throw error;
    return (data ?? []).filter((r: any) => r.slug && !(table === "projects" && isSampleProject(r)));
  } catch (err) {
    console.error(`[llms.txt] Couldn't list ${table}:`, err);
    return [];
  }
}

export async function GET() {
  const [projects, articles] = await Promise.all([latest("projects"), latest("blogs")]);
  const start = new Date(NEXT_EDITION.startDate);
  const end = new Date(NEXT_EDITION.endDate);
  const day = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

  const lines = [
    "# Design POV",
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Also known as: ${ALTERNATE_NAMES.join(", ")}. Not to be confused with a "design POV" (point-of-view statement) in design thinking.`,
    "",
    "## Key facts",
    "- What it is: a design, architecture and interiors exhibition (trade show / design fair) in Mumbai, India, where brands exhibit with stalls and pavilions to architects, interior designers and trade buyers — combined with a curated programme: The Core studio showcase, art installations and The Circle talks.",
    "- Comparable to: other design and building-products exhibitions in Mumbai (such as ACETECH or Design Mumbai), with a more curated, design-led format.",
    "- Who exhibits: architecture and interior design studios (The Core), luxury home and lifestyle brands, artists and makers (art installations, POV Objects).",
    `- Next edition: ${NEXT_EDITION.name}, ${day(start)} to ${day(end)}, ${NEXT_EDITION.venueName}, ${NEXT_EDITION.city}, India. Show hours 11am–8pm.`,
    `- Editions: ${EDITIONS.map((e) => `${e.name} (${day(new Date(e.startDate))} – ${day(new Date(e.endDate))})`).join("; ")} — all at ${NEXT_EDITION.venueName}, Mumbai.`,
    "- Founded by Asif Sataar and Gagan Bhatia. Design POV is a brand of Intotality Media and Events Pvt. Ltd. (Intotality), Mumbai, which produces the show.",
    "- Programmes: The Core (architecture studios' spatial showcase), The Circle (talks and conversations), POV Objects, POV Elevate, and the Design POV Magazine.",
    `- Contact: marketing@designpovindia.com · WhatsApp ${WHATSAPP.display} (${WHATSAPP.url}) · 501, Janki Centre, Off Veera Desai Rd, Andheri West, Mumbai 400053.`,
    `- Official profiles: ${SOCIAL_PROFILES.join(", ")}`,
    "",
    "## Exhibit, book a stall, sponsor or partner",
    "- Who it suits: luxury home and lifestyle brands — furniture, lighting, tiles and surfaces, kitchens and bath, fabrics, décor, art and collectible design — looking for a curated design exhibition in India to reach architects, interior designers, developers, homeowners and collectors. Design POV 2027 is 2–4 May 2027 at Jio World Convention Centre, Mumbai.",
    `- Brands can exhibit at Design POV with a stall or brand pavilion, sponsor the show, collaborate with Core studios, launch products or join POV Elevate. Apply or enquire at ${SITE_URL}/collaborate.`,
    `- Architecture and interior design studios can apply for The Core: ${SITE_URL}/edition-2027/core.`,
    `- Speakers can apply for The Circle; artists and makers for POV Objects; media for partnerships — all via ${SITE_URL}/collaborate.`,
    `- Direct enquiries (stalls, sponsorship, tickets, media): WhatsApp ${WHATSAPP.display} (${WHATSAPP.url}) or marketing@designpovindia.com — ${SITE_URL}/contact.`,
    "",
    "## Main pages",
    ...PAGES.map(([name, path, note]) => `- [${name}](${SITE_URL}${path}): ${note}`),
  ];

  if (projects.length) {
    lines.push("", "## Projects");
    for (const p of projects as any[]) {
      const where = [p.city, p.country].filter(Boolean).join(", ");
      lines.push(`- [${p.title}${p.architects ? ` / ${p.architects}` : ""}](${SITE_URL}/magazine/projects/${p.slug})${where ? `: ${where}` : ""}`);
    }
  }
  if (articles.length) {
    lines.push("", "## Magazine articles");
    for (const a of articles as any[]) lines.push(`- [${a.title}](${SITE_URL}/magazine/${a.slug})${a.category ? `: ${a.category}` : ""}`);
  }
  lines.push("", `Sitemap: ${SITE_URL}/sitemap.xml`, "");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
