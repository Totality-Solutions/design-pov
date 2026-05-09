-- Run in Supabase SQL Editor (Dashboard → SQL Editor)
-- Pages derived from what the Navbar + Footer actually render:
--   Navbar:
--     • Top-level link for every nav item (About, Ecosystem, 2026 Edition, Collaborate, Magazine)
--     • col1Links sub-pages for "Ecosystem" and "2026 Edition" only
--       (those are the ONLY two items that open a submenu — see Navbar.tsx line 363 / 537)
--     • All About col2, Collaborate sub-links, and Magazine sub-links are intentionally excluded
--   Footer (Quick Links + Legal row):
--     • Home (/), Contact, Privacy Policy, Terms of Use

BEGIN;

-- 1. Remove old pages that are no longer needed
--    (skips any page that already has blocks attached)
DELETE FROM pages
WHERE slug IN (
  'impact/sustainability',
  'impact/community',
  'impact/report',
  'collaborate/brands',
  'collaborate/agencies',
  'collaborate/creators',
  'collaborate/sponsorship',
  'collaborate/exhibit',
  'collaborate/press',
  'magazine/latest',
  'magazine/interviews',
  'magazine/archive',
  'magazine/submissions',
  'magazine/guidelines',
  'magazine/jobs'
)
AND id NOT IN (SELECT DISTINCT page_id FROM blocks WHERE page_id IS NOT NULL);

-- 2. Upsert only the pages the Navbar + Footer actually link to
INSERT INTO pages (title, slug, type, is_published) VALUES

  -- ── Top-level nav items ─────────────────────────────────
  ('About',        'about',       'about',       true),
  ('Ecosystem',    'ecosystem',   'ecosystem',   true),
  ('2026 Edition', 'edition',     'edition',     true),
  ('Collaborate',  'collaborate', 'collaborate', true),
  ('Magazine',     'magazine',    'magazine',    true),

  -- ── Ecosystem sub-pages (col1Links) ────────────────────
  ('Schedule',     'edition/schedule',   'edition',   true),
  ('Elevate',      'ecosystem/elevate',  'ecosystem', true),
  ('Objects',      'ecosystem/objects',  'ecosystem', true),

  -- ── 2026 Edition sub-pages (col1Links) ─────────────────
  ('Theme',        'edition/theme',      'theme',     true),
  ('Brands',       'edition/brands',     'edition',   true),
  ('Core',         'edition/core',       'edition',   true),
  -- Note: edition/schedule already inserted above (shared by both Ecosystem "Circle"
  --       and 2026 Edition "Schedule" — same route, same page)

  -- ── Footer Quick Links (not in navbar) ─────────────────
  ('Home',         '',            'home',        true),
  ('Contact',      'contact',     'contact',     true),

  -- ── Footer Legal Row ───────────────────────────────────
  ('Privacy Policy', 'legal/privacy-policy', 'legal', true),
  ('Terms of Use',   'legal/terms-of-use',   'legal', true)

ON CONFLICT (slug) DO UPDATE
  SET title        = EXCLUDED.title,
      type         = EXCLUDED.type,
      is_published = EXCLUDED.is_published;

COMMIT;

-- Verify result (should return exactly 15 rows):
SELECT title, slug, type FROM pages ORDER BY slug;
