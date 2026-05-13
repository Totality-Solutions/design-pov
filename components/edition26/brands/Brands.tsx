import BrandLogo from './BrandLogo';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeBrandPartner } from '@/lib/brandPartners';
import type { BrandPartnerRow } from '@/types';

export default async function Brands() {
  let logos: { src: string; name: string }[] = [];

  try {
    const { data } = await createServerClient()
      .from('brand_partners')
      .select('*')
      .eq('type', 'brand')
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

  return <BrandLogo title="Brands" logos={logos} />;
}
