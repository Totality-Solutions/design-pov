import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LegalDocument from '@/components/common/LegalDocument';
import { getPageContent } from '@/lib/pageContentServer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Design POV India',
  description: 'Privacy policy and data protection guidelines for Designpovindia.com',
};

// Saving in CMS → Legal revalidates this page immediately; this is only the
// fallback refresh interval.
export const revalidate = 3600;

export default async function PrivacyPolicyPage() {
  const { privacy } = await getPageContent("legal");
  if (!privacy.enabled) notFound();

  return (
    <main>
      <LegalDocument title={privacy.title} sideLabel={privacy.sideLabel} body={privacy.body} />
    </main>
  );
}
