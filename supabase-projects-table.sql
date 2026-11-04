-- Run this in Supabase → SQL Editor. Safe to re-run.
--
-- Magazine → Projects: one row per project, shown at /magazine/projects/<slug>
-- (ArchDaily-style page: gallery, fact sheet, architects' text) and in the
-- "Project" tab of the Magazine page.

CREATE TABLE IF NOT EXISTS projects (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,              -- e.g. "Modern Mokotów"
  architects    text,                       -- e.g. "BBGK Architekci" — shown as "Title / Architects"
  category      text,                       -- e.g. "Residential Architecture"
  area          text,                       -- free text, e.g. "17000 m²"
  year          text,                       -- free text, e.g. "2025"
  photographer  text,                       -- credited on every photo: "© <photographer>"
  city          text,
  country       text,
  design_team   text,                       -- comma-separated names
  extra_specs   jsonb DEFAULT '[]',         -- [{ label, value }] e.g. Manufacturers, Lead Architects
  cover_image   text,                       -- hero image (full CDN URL)
  gallery       jsonb DEFAULT '[]',         -- [{ src, caption }] photos + drawings, in order
  content       jsonb DEFAULT '[]',         -- [{ type: text|image|heading|quote, value, title?, caption? }]
  text_credit   text DEFAULT 'Text description provided by the architects.',
  office_name   text,                       -- "About this office"
  office_logo   text,
  office_url    text,
  tags          jsonb DEFAULT '[]',         -- string[]
  status        text DEFAULT 'draft',       -- 'draft' | 'published'
  published_on  date DEFAULT CURRENT_DATE,
  created_at    timestamp with time zone DEFAULT now(),
  updated_at    timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_status_published_idx ON projects (status, published_on DESC);

-- RLS on with no public policies: the site reads through server routes with
-- the service role, and the CMS API is gated by proxy.ts.
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- ── Sample projects for testing (tagged "Sample") ──────────────────────────
-- Images are bare /temp/... paths of photos the site already uses, so
-- deleting a sample project never removes them from S3 (only uploaded,
-- full-URL images are deleted). Delete these rows from CMS → Projects once
-- real projects are in. Skipped if the slug already exists.

INSERT INTO projects (slug, title, architects, category, area, year, photographer, city, country, design_team, extra_specs, cover_image, gallery, content, office_name, office_url, tags, status, published_on)
VALUES
(
  'daylight-experience-centre-studio-lumen',
  'Daylight Experience Centre',
  'Studio Lumen',
  'Commercial Architecture',
  '1200 m²',
  '2025',
  'Design POV',
  'Bengaluru',
  'India',
  'Ananya Rao, Kabir Mehta, Ishita Sen, Rohan Pillai',
  '[{"label":"Lead Architects","value":"Ananya Rao"},{"label":"Manufacturers","value":"Sample Tiles Co., Sample Fittings Ltd."},{"label":"Lighting","value":"Sample Lighting Studio"}]',
  '/temp/edition/elevate/1.JPG',
  '[{"src":"/temp/edition/elevate/1.JPG","caption":"Entrance hall under the daylight ceiling"},{"src":"/temp/edition/elevate/2.JPG"},{"src":"/temp/edition/elevate/3.JPG"},{"src":"/temp/edition/elevate/4.JPG","caption":"Demonstration zone"},{"src":"/temp/edition/elevate/5.JPG"},{"src":"/temp/edition/elevate/6.JPG"},{"src":"/temp/edition/elevate/7.JPG"},{"src":"/temp/edition/elevate/8.JPG"},{"src":"/temp/edition/elevate/9.JPG"},{"src":"/temp/edition/elevate/10.JPG"},{"src":"/temp/edition/elevate/11.JPG"},{"src":"/temp/edition/elevate/12.JPG"}]',
  '[{"type":"text","value":"The Experience Centre is conceived as a single, generous room where natural light is the primary material. A continuous skylight runs the length of the hall, filtered through a field of adjustable louvres that track the sun through the day.\n\nVisitors move from a compressed, low entrance into the double-height gallery, where the light changes as they walk — warm and diffuse in the morning, crisp and directional by afternoon."},{"type":"image","value":"/temp/edition/elevate/4.JPG","caption":"The demonstration zone, with louvres partly closed"},{"type":"heading","value":"Light as a material"},{"type":"text","value":"Rather than treating daylight as a by-product of openings, the design treats it as something to be shaped. Every surface was chosen for how it receives light: lime plaster walls, a terrazzo floor with a low sheen, and timber ceiling panels that soften reflections."},{"type":"quote","value":"We wanted people to feel the time of day without looking at a clock."},{"type":"image","value":"/temp/edition/elevate/7.JPG"},{"type":"text","value":"The rear of the building holds meeting rooms and a small café, arranged around a planted courtyard that brings air and greenery deep into the plan."}]',
  'Studio Lumen',
  '',
  '["Sample","Daylight","Experience Centre"]',
  'published',
  CURRENT_DATE
),
(
  'the-courtyard-house-atelier-noor',
  'The Courtyard House',
  'Atelier Noor',
  'Residential Architecture',
  '850 m²',
  '2024',
  'Design POV',
  'Jaipur',
  'India',
  'Noor Khan, Ritika Jain, Arjun Desai',
  '[{"label":"Lead Architects","value":"Noor Khan"},{"label":"Structural Engineering","value":"Shah & Associates"},{"label":"Landscape","value":"Green Room Studio"}]',
  '/temp/about/about-hero.jpeg',
  '[{"src":"/temp/about/about-hero.jpeg","caption":"Street elevation"},{"src":"/temp/home/theme/sens-sensibility.jpg"},{"src":"/temp/edition/elevate/8.JPG"},{"src":"/temp/about/1600-x-1200.png","caption":"Living room facing the courtyard"},{"src":"/temp/about/build-partner.png"}]',
  '[{"type":"text","value":"Set on a narrow plot in the old city, the house turns inward around a stepped courtyard. Each room opens onto it, borrowing light and breeze while staying private from the busy street.\n\nThick sandstone walls keep the interiors cool through the summer, and a series of jaalis filter the harsh western sun."},{"type":"image","value":"/temp/about/1600-x-1200.png","caption":"Living room facing the courtyard"},{"type":"text","title":"Materials","value":"Local sandstone, lime plaster and reclaimed teak are used throughout, chosen for how they age and for their low embodied energy."}]',
  'Atelier Noor',
  '',
  '["Sample","Courtyard","Sandstone"]',
  'published',
  CURRENT_DATE - 7
),
(
  'pavilion-of-objects-studio-kiln',
  'Pavilion of Objects',
  'Studio Kiln',
  'Installation',
  '300 m²',
  '2026',
  'Design POV',
  'Mumbai',
  'India',
  'Dev Malhotra, Meera Iyer',
  '[{"label":"Client","value":"Design POV"},{"label":"Manufacturers","value":"Sample Surfaces Co."}]',
  '/temp/home/section2/1.jpg',
  '[{"src":"/temp/home/section2/1.jpg"},{"src":"/temp/edition/elevate/5.JPG"},{"src":"/temp/edition/elevate/9.JPG"},{"src":"/temp/edition/elevate/11.JPG"}]',
  '[{"type":"text","value":"A temporary pavilion for Design POV, built to display one-of-one objects in a sequence of small rooms. Each room is tuned to a single piece — its proportions, light and finish chosen to frame the object rather than compete with it.\n\nThe pavilion was designed to be taken apart and rebuilt, with every panel numbered and joined without adhesives."}]',
  'Studio Kiln',
  '',
  '["Sample","Pavilion","Design POV"]',
  'published',
  CURRENT_DATE - 14
)
ON CONFLICT (slug) DO NOTHING;
