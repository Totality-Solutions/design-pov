import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LegalDocument from '@/components/common/LegalDocument';
import { getPageContent } from '@/lib/pageContentServer';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'The terms and conditions for using the Design POV website and services, operated by Intotality Media and Events Pvt. Ltd., Mumbai.',
  path: '/legal/terms-of-use',
});

// Saving in CMS → Legal revalidates this page immediately; this is only the
// fallback refresh interval.
export const revalidate = 3600;

export default async function TermsOfUsePage() {
  const { terms } = await getPageContent("legal");
  if (!terms.enabled) notFound();

  return (
    <main className="min-h-screen bg-white">
      <LegalDocument title={terms.title} sideLabel={terms.sideLabel} body={terms.body} />
    </main>
  );
}
