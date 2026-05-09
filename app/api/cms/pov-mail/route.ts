import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");

  let query = getClient()
    .from("pov_mails")
    .select("*")
    .order("created_at", { ascending: false });

  if (department && department !== "all") {
    query = query.eq("department", department);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { department, category, subject, from_name, from_email, from_phone, message, extra_data } = body;

  if (!department || !from_email) {
    return NextResponse.json({ error: "department and from_email are required" }, { status: 400 });
  }

  const { data, error } = await getClient()
    .from("pov_mails")
    .insert([{ department, form_type: "manual", category, subject, from_name, from_email, from_phone, message, extra_data: extra_data || {} }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, is_read } = await req.json();
  const { error } = await getClient().from("pov_mails").update({ is_read }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { error } = await getClient().from("pov_mails").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
