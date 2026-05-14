import { NextResponse } from "next/server";
import { cdn } from "@/lib/cdn";

const SHOW_DECK_PDF = cdn("/pdf/POV '25 Show Deck.pdf");

export async function GET() {
  const response = await fetch(SHOW_DECK_PDF);

  if (!response.ok) {
    return new NextResponse("Failed to fetch file", { status: 502 });
  }

  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Design-POV-Show-Deck.pdf"',
      "Content-Length": buffer.byteLength.toString(),
    },
  });
}
