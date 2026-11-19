import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LegalDocument from '@/components/common/LegalDocument';
import { getPageContent } from '@/lib/pageContentServer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Design POV collects, uses and protects personal information on designpovindia.com, and how to request access, correction or deletion of your data.',
  path: '/legal/privacy-policy',
});

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
