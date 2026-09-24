import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  getVisitorId,
  isRateLimited,
  isUuid,
  newVisitorId,
  setVisitorCookie,
} from "@/lib/galleryLikes";

type Params = { params: Promise<{ id: string }> };

async function likeCount(supabase: ReturnType<typeof createServerClient>, id: string) {
  const { data } = await supabase
    .from("gallery_items")
    .select("like_count")
    .eq("id", id)
    .single();
  return data?.like_count ?? 0;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  if (isRateLimited(req)) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const existingVisitor = getVisitorId(req);
  const visitorId = existingVisitor ?? newVisitorId();
  const supabase = createServerClient();

  // ignoreDuplicates makes a repeat like a no-op instead of an error, so
  // double-clicks and retries never count twice.
  const { error } = await supabase
    .from("gallery_likes")
    .upsert({ item_id: id, visitor_id: visitorId }, { onConflict: "item_id,visitor_id", ignoreDuplicates: true });

  if (error) {
    // 23503 = foreign key violation: the image doesn't exist.
    const status = error.code === "23503" ? 404 : 500;
    return NextResponse.json({ error: status === 404 ? "Image not found." : error.message }, { status });
  }

  const res = NextResponse.json({ liked: true, likeCount: await likeCount(supabase, id) });
  if (!existingVisitor) setVisitorCookie(res, visitorId);
  return res;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  if (isRateLimited(req)) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const supabase = createServerClient();
  const visitorId = getVisitorId(req);

  // No cookie means this visitor never liked anything — nothing to remove.
  if (visitorId) {
    const { error } = await supabase
      .from("gallery_likes")
      .delete()
      .eq("item_id", id)
      .eq("visitor_id", visitorId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ liked: false, likeCount: await likeCount(supabase, id) });
}
