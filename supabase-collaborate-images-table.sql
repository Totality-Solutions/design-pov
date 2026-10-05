-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS collaborate_images (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image       text NOT NULL,               -- full CDN URL (uploads) or /temp/... path (seeded)
  alt         text NOT NULL DEFAULT '',    -- short description for screen readers
  sort_order  integer DEFAULT 0,
  active      boolean DEFAULT true,
  created_at  timestamp with time zone DEFAULT now(),
  updated_at  timestamp with time zone DEFAULT now()
);

ALTER TABLE collaborate_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active collaborate images"
  ON collaborate_images FOR SELECT
  USING (active = true);

CREATE POLICY "Service role has full access"
  ON collaborate_images FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed with the images that were hardcoded on the Collaborate page. Only runs
-- while the table is empty, so re-running this file never duplicates them.
INSERT INTO collaborate_images (image, alt, sort_order)
SELECT * FROM (VALUES
  ('/temp/collaborate/brand1.jpeg',    'Brand showcase',     1),
  ('/temp/collaborate/brand2.jpg',     'Brand showcase',     2),
  ('/temp/collaborate/circle1.jpeg',   'Circle',             3),
  ('/temp/collaborate/circle2.jpg',    'Circle',             4),
  ('/temp/collaborate/core1.jpg',      'Core',               5),
  ('/temp/collaborate/core2.jpg',      'Core',               6),
  ('/temp/collaborate/elevate1.jpeg',  'Elevate',            7),
  ('/temp/collaborate/object1.jpeg',   'Objects',            8),
  ('/temp/collaborate/partner1.jpeg',  'Partner showcase',   9),
  ('/temp/collaborate/partner2.jpeg',  'Partner showcase',  10),
  ('/temp/collaborate/partner3.jpeg',  'Partner showcase',  11),
  ('/temp/collaborate/partner4.jpg',   'Partner showcase',  12)
) AS seed(image, alt, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM collaborate_images);
