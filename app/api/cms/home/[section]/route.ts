import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { HOME_SECTIONS } from "@/lib/homeContent";

// Auth: /api/cms/* is gated by proxy.ts, and this route is not in its public
// list, so every method here requires a CMS session.

type Params = { params: Promise<{ section: string }> };

function isKnownSection(section: string) {
  return HOME_SECTIONS.some((s) => s.key === section);
}

// Save a section (create or replace).
export async function PUT(req: Request, { params }: Params) {
  const { section } = await params;
  if (!isKnownSection(section)) {
    return NextResponse.json({ error: "Unknown home section." }, { status: 404 });
  }

  const data = await req.json();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ error: "Section data must be an object." }, { status: 400 });
  }

  const { error } = await createServerClient()
    .from("home_sections")
    .upsert({ section, data, updated_at: new Date().toISOString() });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // The home page is statically cached — refresh it now rather than waiting.
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

// Reset a section to its built-in default content.
export async function DELETE(_req: Request, { params }: Params) {
  const { section } = await params;
  if (!isKnownSection(section)) {
    return NextResponse.json({ error: "Unknown home section." }, { status: 404 });
  }

  const { error } = await createServerClient().from("home_sections").delete().eq("section", section);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  return NextResponse.json({ success: true });
}
