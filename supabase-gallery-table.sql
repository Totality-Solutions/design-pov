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

-- Pinning: non-null = pinned to the top of the gallery's "All" year tab,
-- ordered by when it was pinned (earliest first). Safe to re-run.
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS pinned_at timestamp with time zone;

-- Likes (no login): one row per anonymous visitor (cookie id) per image.
-- like_count on gallery_items is kept in sync by the trigger below so the
-- public gallery fetch gets counts for free. Safe to re-run.
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS like_count integer NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS gallery_likes (
  item_id    uuid NOT NULL REFERENCES gallery_items(id) ON DELETE CASCADE,
  visitor_id text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (item_id, visitor_id)
);

-- RLS on with no public policies: only the service role (API routes) can
-- read or write likes.
ALTER TABLE gallery_likes ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION sync_gallery_like_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE gallery_items SET like_count = like_count + 1 WHERE id = NEW.item_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE gallery_items SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.item_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS gallery_likes_count ON gallery_likes;
CREATE TRIGGER gallery_likes_count
  AFTER INSERT OR DELETE ON gallery_likes
  FOR EACH ROW EXECUTE FUNCTION sync_gallery_like_count();
