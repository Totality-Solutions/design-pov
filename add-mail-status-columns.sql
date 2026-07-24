-- Run in Supabase SQL Editor (Dashboard → SQL Editor)
-- Tracks which address a pov_mails notification was sent to, and whether the
-- SES send actually succeeded, so the CMS can show delivery status per entry.

ALTER TABLE pov_mails ADD COLUMN IF NOT EXISTS to_email TEXT;
ALTER TABLE pov_mails ADD COLUMN IF NOT EXISTS mail_sent BOOLEAN DEFAULT false;
