import TermsOfUseContent from '@/components/common/TermsOfUseContent';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Terms of Use | Design POV India',
  description: 'Operating guidelines and user agreement for the Design POV Platform.',
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-white">
      <TermsOfUseContent />
    </main>
  );
}