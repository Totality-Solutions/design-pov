import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { resolveS3KeyFromCdnValue, deleteObjectsFromS3 } from "@/lib/s3";
import { collectProjectImageValues, countProjectImages, MAX_PROJECT_IMAGES, projectSaveError } from "@/lib/projects";

type Params = { params: Promise<{ id: string }> };

function revalidate(slug?: string) {
  revalidatePath("/magazine/projects");
  if (slug) revalidatePath(`/magazine/projects/${slug}`);
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const { data, error } = await createServerClient().from("projects").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body = await req.json();

  // Partial updates (e.g. the status toggle) are counted against the saved row.
  if ("cover_image" in body || "gallery" in body || "content" in body) {
    const { data: current } = await createServerClient()
      .from("projects")
      .select("cover_image, gallery, content")
      .eq("id", id)
      .single();
    const images = countProjectImages({ ...current, ...body });
    if (images > MAX_PROJECT_IMAGES) {
      return NextResponse.json({ error: `A project can have at most ${MAX_PROJECT_IMAGES} images (this one has ${images}).` }, { status: 400 });
    }
  }

  const { data, error } = await createServerClient()
    .from("projects")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: projectSaveError(error.message) }, { status: 500 });
  revalidate(data?.slug);
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data: project } = await supabase
    .from("projects")
    .select("slug, cover_image, office_logo, gallery, content")
    .eq("id", id)
    .single();

  // Delete the images first, so a failed delete never leaves orphaned files
  // with no project left to retry from. Only our own uploads (full CDN URLs)
  // are removed.
  if (project) {
    const keys = collectProjectImageValues(project)
      .filter((v) => v.startsWith("http"))
      .map(resolveS3KeyFromCdnValue)
      .filter((k): k is string => !!k);

    if (keys.length > 0) {
      try {
        for (let i = 0; i < keys.length; i += 1000) await deleteObjectsFromS3(keys.slice(i, i + 1000));
      } catch (s3Error: any) {
        console.error("[projects] Failed to delete S3 images for project", id, s3Error);
        return NextResponse.json(
          { error: s3Error.message || "Failed to delete project images. Project was not deleted." },
          { status: 500 }
        );
      }
    }
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidate(project?.slug);
  return NextResponse.json({ success: true });
}
