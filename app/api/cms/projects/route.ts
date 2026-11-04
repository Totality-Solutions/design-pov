import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

// CMS only (gated by proxy.ts): the public pages read projects server-side.

export async function GET() {
  const { data, error } = await createServerClient()
    .from("projects")
    .select("*")
    .order("published_on", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await createServerClient()
    .from("projects")
    .insert([{ ...body, updated_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/magazine/projects");
  return NextResponse.json({ data }, { status: 201 });
}
