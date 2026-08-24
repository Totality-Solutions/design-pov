import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const { error } = await db().from("blocks").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = db();

  const { data: block } = await supabase
    .from("blocks")
    .select("data")
    .eq("id", id)
    .single();

  if (block?.data) {
    const values = [block.data.logo, ...(block.data.themeImages ?? []), ...(block.data.coreImages ?? [])];
    const keys = values.map(resolveS3KeyFromCdnValue).filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        await deleteObjectsFromS3(keys);
      } catch (s3Error: any) {
        console.error("[theme/blocks] Failed to delete S3 images for block", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete images. Collaborator was not deleted." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase.from("blocks").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
