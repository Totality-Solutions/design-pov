-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS gallery_items (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title        text NOT NULL,
  image_src    text NOT NULL,        -- full CDN URL (new uploads) or local /gallery/... path (legacy)
  image_width  integer,
  image_height integer,
  category     text NOT NULL,        -- free-text slug, e.g. "artists", "brand" — new values just work
  year         integer NOT NULL,     -- free-text year, e.g. 2025, 2026, 2027 — new values just work
  sort_order   integer DEFAULT 0,
  active       boolean DEFAULT true,
  created_at   timestamp with time zone DEFAULT now(),
  updated_at   timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS gallery_items_year_category_idx ON gallery_items (year, category);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active gallery items"
  ON gallery_items FOR SELECT
  USING (active = true);

CREATE POLICY "Service role has full access"
  ON gallery_items FOR ALL
  USING (true)
  WITH CHECK (true);
