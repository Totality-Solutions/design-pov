import { cdn } from "@/lib/cdn";
import { createServerClient } from "@/lib/supabase/server";

// Shown if the collaborate_images table is missing or empty (e.g. before the
// SQL migration has been run), so the Collaborate page never renders blank.
const FALLBACK = [
  "/temp/collaborate/brand1.jpeg",
  "/temp/collaborate/brand2.jpg",
  "/temp/collaborate/circle1.jpeg",
  "/temp/collaborate/circle2.jpg",
  "/temp/collaborate/core1.jpg",
  "/temp/collaborate/core2.jpg",
  "/temp/collaborate/elevate1.jpeg",
  "/temp/collaborate/object1.jpeg",
  "/temp/collaborate/partner1.jpeg",
  "/temp/collaborate/partner2.jpeg",
  "/temp/collaborate/partner3.jpeg",
  "/temp/collaborate/partner4.jpg",
].map(cdn);

/** Server-only: image URLs for the Collaborate page, in display order. */
export async function getCollaborateImages(): Promise<string[]> {
  try {
    const { data, error } = await createServerClient()
      .from("collaborate_images")
      .select("image")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) return FALLBACK;
    return data.map((row) => cdn(row.image));
  } catch (err) {
    // Missing env vars or table — keep the page up with the defaults.
    console.error("[collaborate-images] Falling back to defaults:", err);
    return FALLBACK;
  }
}
