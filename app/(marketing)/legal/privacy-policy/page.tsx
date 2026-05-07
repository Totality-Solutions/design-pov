import PrivacyPolicyContent from '@/components/common/PrivacyPolicyContent';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Privacy Policy | Design POV India',
  description: 'Privacy policy and data protection guidelines for Designpovindia.com',
};

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className=" ">
      <PrivacyPolicyContent />
    </main>
  );
}