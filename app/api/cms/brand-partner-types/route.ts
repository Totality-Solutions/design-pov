import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await createServerClient()
    .from("brand_partner_types")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.type?.trim()) return NextResponse.json({ error: "type is required" }, { status: 400 });
  if (!body.title?.trim()) return NextResponse.json({ error: "title is required" }, { status: 400 });

  const { data, error } = await createServerClient()
    .from("brand_partner_types")
    .insert([{ type: body.type.trim(), title: body.title.trim(), sort_order: body.sort_order ?? 0, active: body.active ?? true }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
