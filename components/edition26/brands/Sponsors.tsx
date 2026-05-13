import BrandLogo from './BrandLogo';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeBrandPartner } from '@/lib/brandPartners';
import type { BrandPartnerRow } from '@/types';

const TIER_LABEL: Record<string, string> = {
  presenting: "PRESENTING PARTNER",
  powered_by: "POWERED BY",
  network:    "NETWORK PARTNER",
  lounge:     "LOUNGE PARTNER",
  colour:     "COLOUR PARTNER",
};

const STATIC_FALLBACK = [
  { src: '/temp/edition/sponsors/1.png', name: 'PRESENTING PARTNER' },
  { src: '/temp/edition/sponsors/2.png', name: 'POWERED BY' },
  { src: '/temp/edition/sponsors/3.png', name: 'NETWORK PARTNER' },
  { src: '/temp/edition/sponsors/4.png', name: 'LOUNGE PARTNER' },
  { src: '/temp/edition/sponsors/5.png', name: 'COLOUR PARTNER' },
];

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
        return {
          src:  item.logo,
          name: TIER_LABEL[item.tier ?? ''] ?? item.name,
        };
      });
    }
  } catch {}

  if (!logos.length) logos = STATIC_FALLBACK;

  return <BrandLogo title="PARTNERS" logos={logos} />;
}
