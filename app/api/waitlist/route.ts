import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Forward to HubSpot as visitor/waitlist
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/hubspot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "waitlist", email, firstname: name }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
