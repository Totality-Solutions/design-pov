-- Run this in Supabase → SQL Editor. Safe to re-run.

-- One row per (page, section) for the CMS-editable pages (Home, Ecosystem, ...).
-- `data` holds that section's content as JSON. Sections with no row show the
-- defaults built into the code (lib/homeContent.ts, lib/ecosystemContent.ts),
-- so the table can start empty.
CREATE TABLE IF NOT EXISTS page_sections (
  page        text NOT NULL,
  section     text NOT NULL,
  data        jsonb NOT NULL,
  updated_at  timestamp with time zone DEFAULT now(),
  PRIMARY KEY (page, section)
);

-- RLS on with no public policies: only the service role (server + CMS API)
-- can read or write. Pages read it server-side.
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Carry over Home sections saved before this table existed (the earlier
-- home_sections table). Does nothing if that table was never created.
DO $$
BEGIN
  IF to_regclass('public.home_sections') IS NOT NULL THEN
    INSERT INTO page_sections (page, section, data, updated_at)
    SELECT 'home', section, data, updated_at FROM home_sections
    ON CONFLICT (page, section) DO NOTHING;
  END IF;
END $$;

-- Once you've checked the Home page still looks right, the old table can go:
-- DROP TABLE IF EXISTS home_sections;
