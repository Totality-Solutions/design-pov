import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Helper utility to safely ensure the settings table exists with both config columns.
// Returns "migrated" if a schema change (CREATE/ALTER) just ran — callers should give
// PostgREST's schema cache a moment to pick up the new columns before querying them.
async function ensureSettingsTableExists(supabase: any): Promise<"migrated" | "ok" | "failed"> {
  try {
    const { error: tableCheckError } = await supabase
      .from("settings")
      .select("is_hiring, hide_tickets, nav_button_label, nav_button_href")
      .limit(1);

    if (tableCheckError && (tableCheckError.code === "P0001" || tableCheckError?.message?.includes("does not exist") || tableCheckError?.message?.includes("column"))) {
      console.log("[Settings Init] Table missing or outdated. Executing structural schema setup...");

      await supabase.rpc("execute_sql", {
        sql_query: `
          CREATE TABLE IF NOT EXISTS settings (
            id TEXT PRIMARY KEY DEFAULT 'global',
            is_hiring BOOLEAN DEFAULT false,
            hide_tickets BOOLEAN DEFAULT false,
            nav_button_label TEXT DEFAULT '2027',
            nav_button_href TEXT DEFAULT '/collaborate',
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
          ALTER TABLE settings ADD COLUMN IF NOT EXISTS nav_button_label TEXT DEFAULT '2027';
          ALTER TABLE settings ADD COLUMN IF NOT EXISTS nav_button_href TEXT DEFAULT '/collaborate';
          INSERT INTO settings (id, is_hiring, hide_tickets, nav_button_label, nav_button_href)
          VALUES ('global', false, false, '2027', '/collaborate')
          ON CONFLICT (id) DO NOTHING;
          NOTIFY pgrst, 'reload schema';
        `
      });
      return "migrated";
    }

    // Ensure our global fallback config row exists
    const { data: rowCheck } = await supabase.from("settings").select("id").eq("id", "global");
    if (!rowCheck || rowCheck.length === 0) {
      await supabase.from("settings").insert([{
        id: "global",
        is_hiring: false,
        hide_tickets: false,
        nav_button_label: "2027",
        nav_button_href: "/collaborate",
      }]);
    }

    return "ok";
  } catch (err) {
    console.warn("[Settings Init Warning] Automated schema validation skipped.", err);
    return "failed";
  }
}

// PostgREST reloads its schema cache asynchronously after NOTIFY — give it a beat
// before issuing a query that depends on columns created moments ago.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── GET QUERY ──────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const supabase = createServerClient();

    let { data, error } = await supabase
      .from("settings")
      .select("is_hiring, hide_tickets, nav_button_label, nav_button_href")
      .eq("id", "global")
      .maybeSingle();

    // Columns missing (older deploy, first run after adding nav_button_* fields) — migrate and retry once.
    if (error?.code === "42703") {
      const status = await ensureSettingsTableExists(supabase);
      if (status === "migrated") await delay(500);
      ({ data, error } = await supabase
        .from("settings")
        .select("is_hiring, hide_tickets, nav_button_label, nav_button_href")
        .eq("id", "global")
        .maybeSingle());
    }

    if (error) throw error;

    return NextResponse.json({
      isHiring: data?.is_hiring ?? false,
      hideTickets: data?.hide_tickets ?? false,
      navButtonLabel: data?.nav_button_label ?? "2027",
      navButtonHref: data?.nav_button_href ?? "/collaborate",
    }, { status: 200 });
  } catch (error: any) {
    console.error("[Settings GET API Error]:", error);
    return NextResponse.json({
      isHiring: false,
      hideTickets: false,
      navButtonLabel: "2027",
      navButtonHref: "/collaborate",
      error: error.message,
    }, { status: 200 });
  }
}

// ─── PUT QUERY ──────────────────────────────────────────────────────────────
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { isHiring, hideTickets, navButtonLabel, navButtonHref } = body;

    const supabase = createServerClient();
    const status = await ensureSettingsTableExists(supabase);
    if (status === "migrated") await delay(500);

    // Build payload dynamically so individual toggle components don't overwrite each other's parameters
    const updateFields: Record<string, any> = {
      updated_at: new Date().toISOString()
    };

    if (isHiring !== undefined) updateFields.is_hiring = isHiring;
    if (hideTickets !== undefined) updateFields.hide_tickets = hideTickets;
    if (navButtonLabel !== undefined) updateFields.nav_button_label = navButtonLabel;
    if (navButtonHref !== undefined) updateFields.nav_button_href = navButtonHref;

    let { data, error } = await supabase
      .from("settings")
      .update(updateFields)
      .eq("id", "global")
      .select();

    // Schema cache was still stale despite the NOTIFY — retry once after a longer wait.
    if (error?.code === "PGRST204") {
      await delay(1000);
      ({ data, error } = await supabase
        .from("settings")
        .update(updateFields)
        .eq("id", "global")
        .select());
    }

    if (error) {
      console.error("[Settings PUT API Error]:", error);
      throw error;
    }

    return NextResponse.json({ success: true, ...body }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update configuration parameter." },
      { status: 500 }
    );
  }
}