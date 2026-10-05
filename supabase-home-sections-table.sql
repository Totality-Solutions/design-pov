-- Run this in Supabase → SQL Editor

-- One row per home page section (hero, intro, theme, ...). `data` holds that
-- section's content as JSON. Sections with no row show the defaults built
-- into lib/homeContent.ts, so the table starts empty — no seeding needed.
CREATE TABLE IF NOT EXISTS home_sections (
  section     text PRIMARY KEY,
  data        jsonb NOT NULL,
  updated_at  timestamp with time zone DEFAULT now()
);

-- RLS on with no public policies: only the service role (server + CMS API)
-- can read or write. The home page reads it server-side.
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
