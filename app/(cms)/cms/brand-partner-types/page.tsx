import CmsSidebar from "@/components/cms/CmsSidebar";
import BrandPartnerTypesTable from "@/components/cms/BrandPartnerTypesTable";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getTypes() {
  const { data, error } = await createServerClient()
    .from("brand_partner_types")
    .select("*")
    .order("sort_order", { ascending: true });

  return { types: data ?? [], error: error?.message ?? null };
}

export default async function BrandPartnerTypesCmsPage() {
  const { types, error } = await getTypes();

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <CmsSidebar />

      <main className="ml-56 p-10">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">CMS / Brand Partners</p>
          <h1 className="text-2xl font-semibold text-black">Partner Types</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage sections shown on the Partners page. Each type groups brand partners and controls section order.
          </p>
        </div>

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <strong>Database error:</strong> {error}
            <p className="mt-1 text-xs text-red-500">
              Make sure the <code>brand_partner_types</code> table exists. Run the SQL migration below first.
            </p>
            <pre className="mt-3 bg-red-100 text-red-800 text-xs p-3 overflow-x-auto whitespace-pre-wrap">{SQL_MIGRATION}</pre>
          </div>
        )}

        <BrandPartnerTypesTable initialData={types as any} />
      </main>
    </div>
  );
}

const SQL_MIGRATION = `
create table brand_partner_types (
  id          uuid default gen_random_uuid() primary key,
  type        text unique not null,
  title       text not null,
  sort_order  int  not null default 0,
  active      bool not null default true,
  created_at  timestamptz default now()
);

-- Seed existing types
insert into brand_partner_types (type, title, sort_order) values
  ('brand_collaborator',        'BRAND COLLABORATORS',       1),
  ('key_execution_partner',     'KEY EXECUTION PARTNER',     2),
  ('build_partner',             'BUILD PARTNERS',            3),
  ('digital_media_partner',     'DIGITAL MEDIA PARTNER',     4),
  ('media_partner',             'MEDIA PARTNERS',            5),
  ('operation_partner',         'OPERATIONS PARTNER',        6),
  ('curatorial_partner',        'CURATORIAL PARTNER',        7),
  ('ticketing_partner',         'TICKETING PARTNER',         8),
  ('sensory_collaborator',      'SENSORY COLLABORATOR',      9),
  ('gifting_partner',           'GIFTING PARTNERS',          10),
  ('red_room_partner',          'RED ROOM PARTNER',          11),
  ('community_partner',         'COMMUNITY PARTNER',         12),
  ('experience_partner',        'EXPERIENCE PARTNER',        13),
  ('learning_partner',          'LEARNING PARTNER',          14),
  ('knowledge_partner',         'KNOWLEDGE PARTNER',         15),
  ('visual_experience_partner', 'VISUAL EXPERIENCE PARTNER', 16),
  ('workshop_partner',          'WORKSHOP PARTNER',          17);
`.trim();
