import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeStudio } from "@/lib/studios";

export async function GET() {
  const { data, error } = await createServerClient()
    .from("studios")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: (data ?? []).map(normalizeStudio) });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await createServerClient()
    .from("studios")
    .insert([{ ...body, updated_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
