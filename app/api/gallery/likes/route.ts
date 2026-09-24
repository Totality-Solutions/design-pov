import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getVisitorId } from "@/lib/galleryLikes";

// Returns the ids of images the current (anonymous) visitor has liked, so
// the gallery can show their hearts as filled on return visits.
export async function GET(req: NextRequest) {
  const visitorId = getVisitorId(req);
  if (!visitorId) return NextResponse.json({ likedIds: [] });

  const { data, error } = await createServerClient()
    .from("gallery_likes")
    .select("item_id")
    .eq("visitor_id", visitorId);

  if (error) return NextResponse.json({ likedIds: [] });
  return NextResponse.json(
    { likedIds: data.map((row) => row.item_id) },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
