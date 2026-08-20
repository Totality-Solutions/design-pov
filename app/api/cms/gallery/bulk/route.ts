import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Bulk-inserts many gallery items in a single round trip — used by the
// "dump upload" flow where an admin drops in dozens/hundreds of photos for
// a year/category at once.
export async function POST(req: Request) {
  const body = await req.json();
  const items = Array.isArray(body.items) ? body.items : null;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items provided." }, { status: 400 });
  }

  const rows = items.map((item: Record<string, unknown>) => ({
    ...item,
    updated_at: new Date().toISOString(),
  }));

  const { data, error } = await createServerClient()
    .from("gallery_items")
    .insert(rows)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}
