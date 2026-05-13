import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const SEED_OBJECTS = [
  {
    label: "Collectible Seating",
    sublabel: "Collectible Seating",
    description: "A curated collection of seating objects exploring form, tactility, and sculptural expression within contemporary interiors.",
    src: "/temp/objects/1.png",
    additional_images: ["/temp/objects/2.jpg", "/temp/objects/3.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 1,
    active: true,
  },
  {
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    src: "/temp/objects/2.png",
    additional_images: ["/temp/objects/3.jpg", "/temp/objects/4.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 2,
    active: true,
  },
  {
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    src: "/temp/objects/3.png",
    additional_images: ["/temp/objects/4.jpg", "/temp/objects/5.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 3,
    active: true,
  },
  {
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    src: "/temp/objects/4.png",
    additional_images: ["/temp/objects/4.jpg", "/temp/objects/5.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 4,
    active: true,
  },
  {
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    src: "/temp/objects/5.png",
    additional_images: ["/temp/objects/4.jpg", "/temp/objects/5.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 5,
    active: true,
  },
  {
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    src: "/temp/objects/6.png",
    additional_images: ["/temp/objects/4.jpg", "/temp/objects/5.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 6,
    active: true,
  },
  {
    label: "Lighting Objects",
    sublabel: "Collectible Seating",
    description: "Experimental lighting pieces that blur the line between functionality and collectible art.",
    src: "/temp/objects/7.png",
    additional_images: ["/temp/objects/4.jpg", "/temp/objects/5.jpg"],
    website: "#",
    instagram: "#",
    logo: "/logo/Totality.svg",
    sort_order: 7,
    active: true,
  },
];

export async function POST() {
  const now = new Date().toISOString();

  const { data, error } = await createServerClient()
    .from("objects")
    .insert(SEED_OBJECTS.map((obj) => ({ ...obj, created_at: now, updated_at: now })))
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ inserted: data?.length ?? 0 });
}
