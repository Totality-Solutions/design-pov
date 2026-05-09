-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT DEFAULT 'Design',
  category_display TEXT,
  author TEXT,
  date TEXT,                          -- stored as text e.g. "17 May 2021"
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft',        -- 'draft' | 'published'
  image TEXT,                         -- cover image URL
  thumbnail TEXT,                     -- thumbnail URL
  featured_paragraphs JSONB DEFAULT '[]',   -- string[]
  detailed_content JSONB DEFAULT '[]',      -- ContentBlock[]
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow public read of published blogs (magazine page)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  USING (status = 'published');

-- Service role (used by CMS API routes) bypasses RLS automatically.
-- If using anon key for CMS, also run:
-- CREATE POLICY "Anon full access" ON blogs FOR ALL USING (true);
