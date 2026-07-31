import { readdirSync, writeFileSync } from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "gallery");
const YEAR = 2026;
const TITLE_MODE = "category"; // "category" | "filename"

const CATEGORY_MAP = {
  Artists: "artists",
  Brand: "brand",
  Circle: "circle",
  Core: "core",
  Interactions: "interactions",
  Misc: "misc",
  Objects: "objects",
  Partners: "partners",
  Workshop: "workshop",
};

const CATEGORY_LABELS = {
  artists: "Artists",
  brand: "Brand",
  circle: "Circle",
  core: "Core",
  interactions: "Interactions",
  misc: "Misc",
  objects: "Objects",
  partners: "Partners",
  workshop: "Workshop",
};

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/\(|\)/g, "")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const folders = readdirSync(ROOT, { withFileTypes: true }).filter((d) =>
    d.isDirectory()
  );

  const items = [];

  for (const folder of folders) {
    const category = CATEGORY_MAP[folder.name];
    if (!category) {
      console.warn(`Skipping unknown folder: ${folder.name}`);
      continue;
    }

    const label = CATEGORY_LABELS[category];
    const files = readdirSync(path.join(ROOT, folder.name)).filter((f) =>
      /\.(jpe?g|png|webp)$/i.test(f)
    );

    files.sort((a, b) => a.localeCompare(b));

    for (const file of files) {
      const filePath = path.join(ROOT, folder.name, file);
      const meta = await sharp(filePath).metadata();
      const title =
        TITLE_MODE === "category"
          ? label
          : file.replace(/\.(jpe?g|png|webp)$/i, "");

      items.push({
        id: `${category}-${slugify(file)}`,
        title,
        imageSrc: `/gallery/${folder.name}/${file}`,
        imageWidth: meta.width || 800,
        imageHeight: meta.height || 600,
        category,
        year: YEAR,
      });
    }
  }

  const categoryIds = Object.keys(CATEGORY_MAP).map(
    (k) => CATEGORY_MAP[k]
  );

  const categoriesDecl = `export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: "all", label: "All" },
${categoryIds
  .map((c) => `  { id: "${c}", label: "${CATEGORY_LABELS[c]}" },`)
  .join("\n")}
];`;

  const yearsDecl = `export const GALLERY_YEARS: GalleryYear[] = [
  { id: "all", label: "All" },
  { id: "${YEAR}", label: "${YEAR}" },
];`;

  const itemsDecl = `export const galleryItems: GalleryItem[] = [
${items
  .map(
    (item) => `  {
    id: "${item.id}",
    title: "${item.title}",
    imageSrc: "${item.imageSrc}",
    imageWidth: ${item.imageWidth},
    imageHeight: ${item.imageHeight},
    category: "${item.category}",
    year: ${item.year},
  },`
  )
  .join("\n")}
];`;

  const content = `import { GalleryItem, GalleryCategory, GalleryYear } from "./types";

${categoriesDecl}

${yearsDecl}

${itemsDecl}
`;

  writeFileSync(
    path.join(process.cwd(), "components", "gallery", "galleryData.ts"),
    content
  );

  console.log(`Generated ${items.length} gallery items across ${folders.length} folders for year ${YEAR}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
