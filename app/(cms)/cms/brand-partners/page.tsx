import Link from "next/link";
import CmsSidebar from "@/components/cms/CmsSidebar";
import BrandPartnersTable from "@/components/cms/BrandPartnersTable";
import SeedBrandPartnersButton from "@/components/cms/SeedBrandPartnersButton";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getData() {
  const supabase = createServerClient();

  const [{ data: partners, error: partnersError }, { data: types }] = await Promise.all([
    supabase
      .from("brand_partners")
      .select("id, name, logo, website, type, tier, sort_order, active, created_at")
      .order("sort_order", { ascending: true }),
    supabase
      .from("brand_partner_types")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  return {
    partners: partners ?? [],
    types: types ?? [],
    error: partnersError?.message ?? null,
  };
}

export default async function BrandPartnersCmsPage() {
  const { partners, types, error } = await getData();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS</p>
            <h1 className="text-2xl font-semibold text-black">Brand Partners</h1>
          </div>
          <div className="flex items-center gap-3">
            <SeedBrandPartnersButton />
            <Link
              href="/cms/brand-partners/new"
              className="bg-black text-white px-5 py-2.5 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              + New Partner
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>brand_partners</code> table exists in Supabase. Run the SQL migration first.
            </p>
          </div>
        )}

        {!error && partners.length === 0 && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
            No partners found. Click <strong>&quot;Seed Default Data&quot;</strong> to populate with existing data, or <strong>&quot;+ New Partner&quot;</strong> to add manually.
          </div>
        )}

        <BrandPartnersTable initialData={partners as any} types={types as any} />
      </main>
    </div>
  );
}
