import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getToEmail } from "@/lib/mailDepartment";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let query = getClient()
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (type && type !== "all") query = query.eq("type", type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const withToEmail = (data ?? []).map((row) => ({ ...row, to_email: getToEmail(row.type, row.category) }));
  return NextResponse.json({ data: withToEmail });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const { error } = await getClient().from("submissions").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
