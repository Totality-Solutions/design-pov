import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: Request) {
  const { page_id, section_key, type, order_index, data } = await req.json();

  const { data: block, error } = await db()
    .from("blocks")
    .insert([{ page_id, section_key, type, order_index: order_index ?? 0, data }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: block }, { status: 201 });
}
