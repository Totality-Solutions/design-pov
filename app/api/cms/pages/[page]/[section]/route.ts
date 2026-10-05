import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { PAGES, isPageKey } from "@/lib/pageRegistry";

// Save / reset one section of a CMS-editable page (see lib/pageRegistry.ts).
// Auth: /api/cms/* is gated by proxy.ts and this route isn't in its public
// list, so every method here requires a CMS session.

type Params = { params: Promise<{ page: string; section: string }> };

async function resolve(params: Params["params"]) {
  const { page, section } = await params;
  if (!isPageKey(page)) return { error: "Unknown page." } as const;
  if (!PAGES[page].sections.some((s) => s.key === section)) return { error: "Unknown section." } as const;
  return { page, section, path: PAGES[page].path } as const;
}

// Save a section (create or replace).
export async function PUT(req: Request, { params }: Params) {
  const target = await resolve(params);
  if ("error" in target) return NextResponse.json({ error: target.error }, { status: 404 });

  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ error: "Section data must be an object." }, { status: 400 });
  }

  const { error } = await createServerClient()
    .from("page_sections")
    .upsert({ page: target.page, section: target.section, data, updated_at: new Date().toISOString() });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Pages are statically cached — refresh now rather than waiting.
  revalidatePath(target.path);
  return NextResponse.json({ success: true });
}

// Reset a section to its built-in default content.
export async function DELETE(_req: Request, { params }: Params) {
  const target = await resolve(params);
  if ("error" in target) return NextResponse.json({ error: target.error }, { status: 404 });

  const { error } = await createServerClient()
    .from("page_sections")
    .delete()
    .eq("page", target.page)
    .eq("section", target.section);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath(target.path);
  return NextResponse.json({ success: true });
}
