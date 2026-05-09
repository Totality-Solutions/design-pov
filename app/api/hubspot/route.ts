import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDepartment } from "@/lib/mailDepartment";

// HubSpot list IDs — configure in HubSpot and add to .env
const LIST_MAP: Record<string, string> = {
  exhibit: "exhibitor",
  sponsor: "partner",
  speak: "speaker",
  curate: "curator",
  elevate: "elevate",
  media: "media",
  waitlist: "visitor",
  newsletter: "newsletter",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, email, ...rest } = body;

    if (!email || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const segment = LIST_MAP[type] || "general";

    // Build HubSpot contact properties
    const properties: Record<string, string> = {
      email,
      enquiry_type: segment,
      lead_source: "Design POV Website",
      ...rest,
    };

    // HubSpot API call
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ properties }),
      }
    );

    if (!response.ok) {
      // Try update if contact already exists
      const errorData = await response.json();
      if (errorData.message?.includes("Contact already exists")) {
        // Patch existing contact
        const searchRes = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
            }),
          }
        );
        const searchData = await searchRes.json();
        const contactId = searchData.results?.[0]?.id;

        if (contactId) {
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ properties }),
          });
        }
      }
    }

    // Dual-write to pov_mails (non-blocking)
    const department = getDepartment(type, segment);
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
      .from("pov_mails")
      .insert([{
        department,
        form_type: "apply",
        category: segment,
        subject: `New Apply: ${segment}`,
        from_name: rest.firstname || rest.company || null,
        from_email: email,
        extra_data: rest,
      }])
      .then(({ error: e }) => { if (e) console.error("pov_mails write error:", e); });

    return NextResponse.json({ success: true, segment });
  } catch (error) {
    console.error("HubSpot API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
