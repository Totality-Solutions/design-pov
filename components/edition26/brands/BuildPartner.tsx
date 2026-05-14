import BrandLogo from './BrandLogo';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeBrandPartner } from '@/lib/brandPartners';
import type { BrandPartnerRow, BrandPartnerTypeRow } from '@/types';

export default async function BuildPartner() {
  let grouped: Record<string, { src: string; name: string }[]> = {};
  let cmsTypeOrder: string[] = [];
  let cmsTitles: Record<string, string> = {};
  const dataTypeOrder: string[] = [];
  const suppressedTypes = new Set<string>();

  try {
    const supabase = createServerClient();

    const [{ data: typesData }, { data: brandsData }] = await Promise.all([
      supabase
        .from('brand_partner_types')
        .select('type, title, sort_order, active')
        .order('sort_order', { ascending: true }),
      supabase
        .from('brand_partners')
        .select('*')
        .neq('type', 'sponsor')
        .neq('type', 'brand')
        .eq('active', true)
        .order('sort_order', { ascending: true }),
    ]);

    if (typesData?.length) {
      (typesData as BrandPartnerTypeRow[]).forEach((t) => {
        if (t.active !== false) {
          cmsTypeOrder.push(t.type);
          cmsTitles[t.type] = t.title;
        } else {
          suppressedTypes.add(t.type);
        }
      });
    }

    if (brandsData?.length) {
      (brandsData as BrandPartnerRow[]).forEach((row) => {
        const item = normalizeBrandPartner(row);
        if (!grouped[item.type]) {
          dataTypeOrder.push(item.type);
          grouped[item.type] = [];
        }
        grouped[item.type].push({ src: item.logo, name: item.name });
      });
    }
  } catch {}

  // Use CMS order when available, fall back to order derived from data
  const baseOrder = cmsTypeOrder.length ? cmsTypeOrder : dataTypeOrder;
  const orderedTypes = [
    ...baseOrder.filter((t) => grouped[t]?.length),
    ...dataTypeOrder.filter((t) => !baseOrder.includes(t) && !suppressedTypes.has(t) && grouped[t]?.length),
  ];

  if (!orderedTypes.length) return null;

  return (
    <div className="py-12 space-y-12">
      {orderedTypes.map((type) => (
        <BrandLogo
          key={type}
          title={cmsTitles[type] ?? type.replace(/_/g, " ").toUpperCase()}
          logos={grouped[type]}
        />
      ))}
    </div>
  );
}
