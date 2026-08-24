// Generic "/basePath/{n}/" numbered-folder convention shared by every CMS panel
// that uploads images to S3 — objects, studios, brand partners, theme, blog, gallery.

/** Pulls the numeric folder out of a path/URL like "/temp/objects/43/1.jpg" -> 43. */
export function extractFolderNumber(basePath: string, path?: string | null): number | null {
  if (!path) return null;
  const escaped = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = path.match(new RegExp(`${escaped}/(\\d+)/`));
  return match ? parseInt(match[1], 10) : null;
}

/** Scans a flat list of stored path/URL values and returns the next free folder number. */
export function getNextFolderNumber(basePath: string, values: Array<string | null | undefined>): number {
  let max = 0;
  for (const v of values) {
    const n = extractFolderNumber(basePath, v);
    if (n !== null) max = Math.max(max, n);
  }
  return max + 1;
}
