import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.error("[CLIENT_ERROR]", JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}

export async function GET(req: NextRequest) {
  const msg = req.nextUrl.searchParams.get("m") || "unknown";
  const stack = req.nextUrl.searchParams.get("s") || "";
  console.error("[CLIENT_ERROR_IMG]", msg, stack);
  return new Response(null, { status: 204 });
}
