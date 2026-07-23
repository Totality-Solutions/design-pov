import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  title: z.string().min(1, "Project title is required"),
  contributor: z.string().min(1, "Contributor name is required"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  story: z
    .string()
    .min(50, "Project story must be at least 50 characters")
    .max(1000, "Project story must not exceed 1000 characters"),
  images: z.array(z.string()).min(2).max(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors },
        { status: 422 }
      );
    }

    const { title, contributor, email, organization, website, story, images } =
      parsed.data;

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          type: "gallery",
          category: "Gallery Submission",
          name: contributor,
          email,
          message: story,
          extra_data: {
            title,
            organization: organization || null,
            website: website || null,
            images,
          },
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[gallery-submission] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save submission." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Your project has been submitted successfully.", data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[gallery-submission] API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
