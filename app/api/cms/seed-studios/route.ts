// One-time seed endpoint — imports default static data and upserts into Supabase `studios` table.
// After seeding, all studio data is managed via the CMS (/cms/studios) and fetched from the database.
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { coreData } from "@/data/coreData";
import { themeData } from "@/data/themeData";

/*
  Run this SQL in Supabase before seeding:

  create table if not exists studios (
    id                    text primary key default gen_random_uuid()::text,
    label                 text not null,
    architects            text[] not null default '{}',
    logo                  text not null default '',
    website               text not null default '',
    instagram             text not null default '',
    core_image            text not null default '',
    bio                   text not null default '',
    core_additional_images text[] not null default '{}',
    booth_image           text not null default '',
    concept               text not null default '',
    booth_additional_images text[] not null default '{}',
    sort_order            integer not null default 0,
    active                boolean not null default true,
    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
  );
*/

export async function POST() {
  // Build a map from themeData keyed by id for quick lookup
  const themeMap = new Map(themeData.map((t) => [t.id, t]));

  const rows = coreData.map((core, i) => {
    const theme = themeMap.get(core.id);
    return {
      id: core.id,
      label: core.label,
      architects: core.architects ?? [],
      logo: core.logo,
      website: core.website,
      instagram: core.instagram,
      core_image: core.src,
      bio: core.description,
      core_additional_images: core.additionalImages ?? [],
      booth_image: theme?.src ?? core.src,
      concept: theme?.description ?? "",
      booth_additional_images: theme?.additionalImages ?? [],
      sort_order: i + 1,
      active: true,
      updated_at: new Date().toISOString(),
    };
  });

  const { error } = await createServerClient()
    .from("studios")
    .upsert(rows, { onConflict: "id" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: `Seeded ${rows.length} studios.` });
}
