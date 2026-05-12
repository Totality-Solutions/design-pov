CREATE TABLE schedule_events (
  id            uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  title         text    NOT NULL,
  subtitle      text,
  speakers      jsonb   DEFAULT '[]'::jsonb,
  venue         text    NOT NULL,
  start_time    text    NOT NULL,
  end_time      text    NOT NULL,
  day           integer NOT NULL CHECK (day IN (1, 2, 3)),
  is_invite_only  boolean DEFAULT false,
  invite_only_link text,
  description   text,
  image         text,
  partners      jsonb   DEFAULT '[]'::jsonb,
  category_tag  text,
  sort_order    integer DEFAULT 0,
  created_at    timestamp with time zone DEFAULT now(),
  updated_at    timestamp with time zone DEFAULT now()
);

CREATE INDEX idx_schedule_events_day ON schedule_events(day);
CREATE INDEX idx_schedule_events_sort ON schedule_events(day, sort_order);
