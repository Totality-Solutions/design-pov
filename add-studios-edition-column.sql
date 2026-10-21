-- Studios belong to an edition (2026, 2027, ...). Existing rows become 2026.
alter table studios add column if not exists edition integer not null default 2026;
create index if not exists studios_edition_sort_idx on studios (edition, sort_order);
