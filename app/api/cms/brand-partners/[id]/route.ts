import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await createServerClient()
    .from("brand_partners")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await createServerClient()
    .from("brand_partners")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: partner } = await supabase
    .from("brand_partners")
    .select("logo")
    .eq("id", id)
    .single();

  if (partner) {
    const keys = [resolveS3KeyFromCdnValue(partner.logo)].filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        await deleteObjectsFromS3(keys);
      } catch (s3Error: any) {
        console.error("[brand-partners] Failed to delete S3 logo for partner", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete logo. Partner was not deleted." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase
    .from("brand_partners")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
