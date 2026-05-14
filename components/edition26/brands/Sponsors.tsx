import BrandLogo from './BrandLogo';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeBrandPartner } from '@/lib/brandPartners';
import type { BrandPartnerRow } from '@/types';

export default async function Sponsors() {
  let logos: { src: string; name: string }[] = [];
  let sectionTitle = "PARTNERS";

  try {
    const supabase = createServerClient();

    const [{ data: typeData }, { data }] = await Promise.all([
      supabase.from('brand_partner_types').select('title').eq('type', 'sponsor').single(),
      supabase.from('brand_partners').select('*').eq('type', 'sponsor').eq('active', true).order('sort_order', { ascending: true }),
    ]);

    if (typeData?.title) sectionTitle = typeData.title;

    if (data?.length) {
      logos = (data as BrandPartnerRow[]).map((row) => {
        const item = normalizeBrandPartner(row);
        return { src: item.logo, name: item.name };
      });
    }
  } catch {}

  if (!logos.length) return null;

  return <BrandLogo title={sectionTitle} logos={logos} />;
}
