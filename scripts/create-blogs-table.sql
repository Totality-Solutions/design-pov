-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS blogs (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title               text NOT NULL,
  slug                text NOT NULL UNIQUE,
  subtitle            text,
  description         text,
  category            text,
  category_display    text,
  author              text,
  date                text,
  is_featured         boolean DEFAULT false,
  status              text DEFAULT 'draft',          -- 'draft' | 'published'
  image               text,                          -- cover image URL / path
  thumbnail           text,
  featured_paragraphs jsonb DEFAULT '[]'::jsonb,
  detailed_content    jsonb DEFAULT '[]'::jsonb,
  created_at          timestamp with time zone DEFAULT now(),
  updated_at          timestamp with time zone DEFAULT now()
);

-- Allow public read of published blogs (for the frontend)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  USING (status = 'published');

CREATE POLICY "Service role has full access"
  ON blogs FOR ALL
  USING (true)
  WITH CHECK (true);
