import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await createServerClient()
    .from("collaborate_images")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// Accepts one row or an array of rows (the CMS bulk upload sends an array).
export async function POST(req: Request) {
  const body = await req.json();
  const now = new Date().toISOString();
  const rows = (Array.isArray(body) ? body : [body]).map((row) => ({ ...row, updated_at: now }));

  const { data, error } = await createServerClient()
    .from("collaborate_images")
    .insert(rows)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: Array.isArray(body) ? data : data[0] }, { status: 201 });
}
