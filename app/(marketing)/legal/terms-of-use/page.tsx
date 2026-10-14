import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LegalDocument from '@/components/common/LegalDocument';
import { getPageContent } from '@/lib/pageContentServer';

export const metadata: Metadata = {
  title: 'Terms of Use | Design POV India',
  description: 'Operating guidelines and user agreement for the Design POV Platform.',
};

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
