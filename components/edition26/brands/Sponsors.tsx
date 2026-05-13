import BrandLogo from './BrandLogo';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeBrandPartner } from '@/lib/brandPartners';
import type { BrandPartnerRow } from '@/types';

/* STATIC_FALLBACK removed — data is served from Supabase via force-dynamic page */

export default async function Sponsors() {
  let logos: { src: string; name: string }[] = [];

  try {
    const { data } = await createServerClient()
      .from('brand_partners')
      .select('*')
      .eq('type', 'sponsor')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (data && data.length > 0) {
      logos = (data as BrandPartnerRow[]).map((row) => {
        const item = normalizeBrandPartner(row);
        return { src: item.logo, name: item.name };
      });
    }
  } catch {}

  if (!logos.length) return null;

  return <BrandLogo title="PARTNERS" logos={logos} />;
}
