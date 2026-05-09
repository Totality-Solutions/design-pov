import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function ensurePage() {
  const supabase = db();
  const { data: existing } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "theme")
    .single();

  if (existing) return existing;

  const { data } = await supabase
    .from("pages")
    .insert([{ title: "Theme", slug: "theme", type: "theme", is_published: true }])
    .select()
    .single();

  return data;
}

export async function GET() {
  const supabase = db();
  const page = await ensurePage();

  const { data: blocks } = await supabase
    .from("blocks")
    .select("*")
    .eq("page_id", page.id)
    .order("order_index", { ascending: true });

  return NextResponse.json({ page, blocks: blocks ?? [] });
}

export async function PUT(req: Request) {
  const { title } = await req.json();
  const page = await ensurePage();

  const { error } = await db().from("pages").update({ title }).eq("id", page.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
