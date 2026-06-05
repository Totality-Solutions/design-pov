import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

// Helper utility to safely ensure the settings table exists with both config columns
async function ensureSettingsTableExists(supabase: any) {
  try {
    const { error: tableCheckError } = await supabase
      .from("settings")
      .select("is_hiring, hide_tickets")
      .limit(1);

    if (tableCheckError && (tableCheckError.code === "P0001" || tableCheckError?.message?.includes("does not exist"))) {
      console.log("[Settings Init] Table missing. Executing structural schema setup...");

      await supabase.rpc("execute_sql", {
        sql_query: `
          CREATE TABLE IF NOT EXISTS settings (
            id TEXT PRIMARY KEY DEFAULT 'global',
            is_hiring BOOLEAN DEFAULT false,
            hide_tickets BOOLEAN DEFAULT false,
            updated_at TIMESTAMPTZ DEFAULT NOW()
          );
          INSERT INTO settings (id, is_hiring, hide_tickets) 
          VALUES ('global', false, false) 
          ON CONFLICT (id) DO NOTHING;
        `
      });
      return true;
    }

    // Ensure our global fallback config row exists
    const { data: rowCheck } = await supabase.from("settings").select("id").eq("id", "global");
    if (!rowCheck || rowCheck.length === 0) {
      await supabase.from("settings").insert([{ id: "global", is_hiring: false, hide_tickets: false }]);
    }

    return true;
  } catch (err) {
    console.warn("[Settings Init Warning] Automated schema validation skipped.", err);
    return false;
  }
}

// ─── GET QUERY ──────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const supabase = createServerClient();
    await ensureSettingsTableExists(supabase);

    const { data, error } = await supabase
      .from("settings")
      .select("is_hiring, hide_tickets")
      .eq("id", "global")
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ 
      isHiring: data?.is_hiring ?? false, 
      hideTickets: data?.hide_tickets ?? false 
    }, { status: 200 });
  } catch (error: any) {
    console.error("[Settings GET API Error]:", error);
    return NextResponse.json({ isHiring: false, hideTickets: false, error: error.message }, { status: 200 });
  }
}

// ─── PUT QUERY ──────────────────────────────────────────────────────────────
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { isHiring, hideTickets } = body;
    
    const supabase = createServerClient();
    await ensureSettingsTableExists(supabase);

    // Build payload dynamically so individual toggle components don't overwrite each other's parameters
    const updateFields: Record<string, any> = {
      updated_at: new Date().toISOString()
    };

    if (isHiring !== undefined) updateFields.is_hiring = isHiring;
    if (hideTickets !== undefined) updateFields.hide_tickets = hideTickets;

    const { data, error } = await supabase
      .from("settings")
      .update(updateFields)
      .eq("id", "global")
      .select();

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