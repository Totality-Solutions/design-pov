import BrandLogo from './BrandLogo';
import { createServerClient } from '@/lib/supabase/server';
import { normalizeBrandPartner } from '@/lib/brandPartners';
import type { BrandPartnerRow } from '@/types';

const TYPE_TITLES: Record<string, string> = {
  brand_collaborator:        "BRAND COLLABORATORS",
  build_partner:             "BUILD PARTNERS",
  key_execution_partner:     "KEY EXECUTION PARTNER",
  media_partner:             "MEDIA PARTNERS",
  digital_media_partner:     "DIGITAL MEDIA PARTNERS",
  gifting_partner:           "GIFTING PARTNERS",
  ticketing_partner:         "TICKETING PARTNERS",
  sensory_collaborator:      "SENSORY COLLABORATOR",
  operation_partner:         "OPERATION PARTNER",
  curatorial_partner:        "CURATORIAL PARTNER",
  community_partner:         "COMMUNITY PARTNER",
  experience_partner:        "EXPERIENCE PARTNER",
  red_room_partner:          "RED ROOM PARTNER",
  learning_partner:          "LEARNING PARTNER",
  knowledge_partner:         "KNOWLEDGE PARTNER",
  visual_experience_partner: "VISUAL EXPERIENCE PARTNER",
  workshop_partner:          "WORKSHOP PARTNER",
};

const TYPE_ORDER = [
  "brand_collaborator",
  "build_partner",
  "key_execution_partner",
  "media_partner",
  "digital_media_partner",
  "gifting_partner",
  "ticketing_partner",
  "sensory_collaborator",
  "operation_partner",
  "curatorial_partner",
  "community_partner",
  "experience_partner",
  "red_room_partner",
  "learning_partner",
  "knowledge_partner",
  "visual_experience_partner",
  "workshop_partner",
];

export default async function BuildPartner() {
  let grouped: Record<string, { src: string; name: string }[]> = {};

  try {
    const { data } = await createServerClient()
      .from('brand_partners')
      .select('*')
      .neq('type', 'sponsor')
      .neq('type', 'brand')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (data && data.length > 0) {
      (data as BrandPartnerRow[]).forEach((row) => {
        const item = normalizeBrandPartner(row);
        if (!grouped[item.type]) grouped[item.type] = [];
        grouped[item.type].push({ src: item.logo, name: item.name });
      });
    }
  } catch {}

  const orderedTypes = [
    ...TYPE_ORDER.filter((t) => grouped[t]?.length),
    ...Object.keys(grouped).filter((t) => !TYPE_ORDER.includes(t) && grouped[t]?.length),
  ];

  if (!orderedTypes.length) return null;

  return (
    <div className="py-12 space-y-12">
      {orderedTypes.map((type) => (
        <BrandLogo
          key={type}
          title={TYPE_TITLES[type] ?? type.replace(/_/g, " ").toUpperCase()}
          logos={grouped[type]}
        />
      ))}
    </div>
  );
}
