-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS press_mentions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,               -- publication name, used as the logo's alt text
  image       text NOT NULL,               -- full CDN URL (uploads) or /temp/... path (seeded)
  link        text NOT NULL DEFAULT '',    -- article URL
  sort_order  integer DEFAULT 0,
  active      boolean DEFAULT true,
  created_at  timestamp with time zone DEFAULT now(),
  updated_at  timestamp with time zone DEFAULT now()
);

ALTER TABLE press_mentions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active press mentions"
  ON press_mentions FOR SELECT
  USING (active = true);

CREATE POLICY "Service role has full access"
  ON press_mentions FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed with the mentions that were hardcoded on the About page. Only runs
-- while the table is empty, so re-running this file never duplicates them.
INSERT INTO press_mentions (title, image, link, sort_order)
SELECT * FROM (VALUES
  ('Architecture + Design', '/temp/about/architecture-design.png', 'https://www.architectureplusdesign.in/business-centre/asif-sataar-gagan-bhatia-perspective-risks-rewards-reinventing-design-pov/', 1),
  ('The Hindu', '/temp/about/the-hindu.png', 'https://www.thehindu.com/society/mumbais-design-pov-from-bachelor-pad-to-disco-bar/article69767762.ece', 2),
  ('Design Pataki', '/temp/about/design-pataki.png', 'https://www.designpataki.com/dp-cult/how-design-pov-is-reimagining-indias-creative-landscape/', 3),
  ('India Today Home', '/temp/about/india-today-home.png', 'https://www.indiatoday.in/magazine/supplements/home/story/20250728-news-events-inside-access-2757644-2025-07-18', 4),
  ('The Ideal Home and Garden', '/temp/about/the-ideal-home.png', 'https://theidealhomeandgarden.com/interior-design-exhibition-india-design-pov-2025/', 5),
  ('Svasa', '/temp/about/svasa.png', 'https://svasalife.com/designpov/', 6)
) AS seed(title, image, link, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM press_mentions);
