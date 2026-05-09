-- Run in Supabase SQL Editor (Dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS pov_mails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  department TEXT NOT NULL,   -- 'marketing' | 'sales' | 'core' | 'rsvp'
  form_type TEXT,             -- 'participation' | 'apply' | 'magazine' | 'popup' | 'newsletter' | 'waitlist' | 'manual'
  category TEXT,              -- specific sub-category e.g. 'Exhibit', 'Magazine Submission'
  subject TEXT,
  from_name TEXT,
  from_email TEXT,
  from_phone TEXT,
  message TEXT,
  extra_data JSONB DEFAULT '{}',   -- any additional fields
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pov_mails ENABLE ROW LEVEL SECURITY;
-- CMS uses service role key — bypasses RLS automatically.
-- If using anon key for CMS:
-- CREATE POLICY "Anon full access" ON pov_mails FOR ALL USING (true);
