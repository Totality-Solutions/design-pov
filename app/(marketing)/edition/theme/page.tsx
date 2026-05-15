import ThemeCollaborators from "@/components/edition26/theme/ThemeCollaborators";
import ThemeIntro from "@/components/edition26/theme/ThemeIntro";
import { createServerClient } from "@/lib/supabase/server";
import { normalizeStudio } from "@/lib/studios";

async function getStudios() {
  const { data } = await createServerClient()
    .from("studios")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []).map(normalizeStudio);
}

export default async function ThemePage() {
  const studios = await getStudios();

  return (
    <main className="min-h-screen bg-white">
      <ThemeIntro />
      <ThemeCollaborators studios={studios} />
    </main>
  );
}