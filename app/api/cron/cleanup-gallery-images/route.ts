import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const IMAGE_BUCKET = "gallery-submissions";
const MAX_AGE_DAYS = 30;

// Vercel Cron (see vercel.json) hits this daily. Deletes any gallery
// submission images older than MAX_AGE_DAYS — the submission's text data
// (title, contributor, story, etc.) stays in Supabase either way, this
// only clears the actual image files out of Storage.
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = createServerClient();
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

  const { data: folders, error: listErr } = await supabase.storage
    .from(IMAGE_BUCKET)
    .list("", { limit: 1000 });

  if (listErr) {
    console.error("[cleanup-gallery-images] failed to list bucket:", listErr);
    return NextResponse.json({ error: "Failed to list bucket." }, { status: 500 });
  }

  let deletedCount = 0;
  let checkedCount = 0;
  const errors: string[] = [];

  for (const folder of folders ?? []) {
    const { data: files, error: folderErr } = await supabase.storage
      .from(IMAGE_BUCKET)
      .list(folder.name, { limit: 1000 });

    if (folderErr) {
      errors.push(`${folder.name}: ${folderErr.message}`);
      continue;
    }

    const staleFiles = (files ?? []).filter((file) => {
      checkedCount++;
      return file.created_at && new Date(file.created_at).getTime() < cutoff;
    });

    if (staleFiles.length === 0) continue;

    const paths = staleFiles.map((file) => `${folder.name}/${file.name}`);
    const { error: removeErr } = await supabase.storage.from(IMAGE_BUCKET).remove(paths);

    if (removeErr) {
      errors.push(`${folder.name}: ${removeErr.message}`);
      continue;
    }
    deletedCount += paths.length;
  }

  console.log(
    `[cleanup-gallery-images] checked ${checkedCount} files, deleted ${deletedCount} older than ${MAX_AGE_DAYS} days`
  );

  return NextResponse.json({
    success: true,
    checked: checkedCount,
    deleted: deletedCount,
    errors: errors.length ? errors : undefined,
  });
}
