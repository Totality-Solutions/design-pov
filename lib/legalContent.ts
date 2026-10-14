import type { SectionMeta } from "@/lib/pageContent";

// Content model for the two legal pages, edited in CMS → Legal. The body is
// plain text with a few markers (see components/common/LegalDocument.tsx):
//   ## Heading   ### Sub-heading   - list item   **bold**   [link text](url)
// Client-safe.

export type LegalDoc = { enabled: boolean; title: string; sideLabel: string; body: string };

export type LegalPagesContent = {
  privacy: LegalDoc;
  terms:   LegalDoc;
};

export type LegalSectionKey = keyof LegalPagesContent;

export const LEGAL_SECTIONS: SectionMeta<LegalSectionKey>[] = [
  { key: "privacy", label: "Privacy Policy",     hint: "/legal/privacy-policy" },
  { key: "terms",   label: "Terms & Conditions", hint: "/legal/terms-of-use" },
];

const PRIVACY_BODY = `Designpovindia.com is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.

## Information We Collect:
- Personal data (e.g., name, email, contact number)
- Payment details (processed through secure gateways)
- Event preferences and history
- Device and usage information (via cookies and analytics tools)

## How We Use Your Information:
- To process registrations and payments
- To send event updates and confirmations
- To improve user experience
- To comply with legal obligations

**Data Security:** We use industry-standard encryption and secure servers to protect your information.

**Third-Party Services:** We may share necessary data with trusted third parties like payment gateways or email marketing platforms, strictly for service purposes.

**Your Rights:** You can request access, correction, or deletion of your personal data by contacting us at [marketing@designpovindia.com](mailto:marketing@designpovindia.com).`;

const TERMS_BODY = `Welcome to **www.designpov.com** (“Website”) and the mobile site (collectively referred to as the “Platform”), including all content and pages under our control (collectively, the “Service”), developed and operated by **Intotality Media and Events Pvt. Ltd.** (“Design POV”, “we”, “us”, “our”), a company incorporated under the laws of India and having its registered office at Mumbai, Maharashtra.

By accessing or using the Service, you (“you”, “User”) agree that:
- You have read, understood, and accepted these Terms and Conditions (“Terms”);
- You agree to be legally bound by these Terms and our Privacy Policy;
- You are at least 18 years of age and legally capable of entering into contracts.

If you do not agree to these Terms, please do not use the Service.

## 1. Use of the Service
The Service is intended solely for your personal and non-commercial use. You may:
- Access and view content on your personal devices;
- Download and temporarily store pages for offline viewing;
- Share or repost publicly available content through integrated social sharing tools, provided appropriate credit is given to Design POV.

You may not:
- Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer or sell any information, software, products or services obtained from the Service without prior written consent;
- Use the Service for any unlawful purpose, or to harm, threaten, or harass any person;
- Use or launch any automated system (including without limitation, bots, spiders, or offline readers) that accesses the Service in a manner that sends more request messages than a human can reasonably produce;
- Post or upload content that is defamatory, infringing, obscene, misleading, or otherwise unlawful or inappropriate.

Design POV reserves the right to restrict or terminate your access to the Service at any time without notice if we believe that you are in breach of these Terms.

## 2. Intellectual Property Rights
All content on the Platform, including but not limited to text, images, logos, graphics, design elements, artworks, layouts, software, and data (“Content”) is the property of Design POV or its licensors and is protected under applicable intellectual property laws.

Design POV and associated logos, taglines, and branding elements are trademarks of Intotality Media and Events Pvt. Ltd. or its affiliates. Any unauthorized use of these marks is strictly prohibited.

You agree not to remove, alter, or obscure any copyright, trademark, or other proprietary rights notices appearing on the Service.

## 3. User Content
The Platform may allow users to post, upload, or submit materials including text, images, videos, links, or feedback (“User Content”).

By submitting User Content, you grant Design POV a worldwide, perpetual, royalty-free, non-exclusive license (with the right to sublicense) to use, copy, modify, distribute, publicly display, and create derivative works of such content for any purpose, including promotional and marketing purposes.

You represent and warrant that:
- You own or have the necessary rights to your User Content;
- Your content does not violate any applicable laws, intellectual property rights, or third-party rights;
- Your content is not defamatory, obscene, offensive, or otherwise unlawful;
- You will not impersonate any person or misrepresent your identity.

Design POV has no obligation to monitor User Content but reserves the right to review, edit, remove or reject any User Content at its sole discretion.

## 4. Third-Party Content & Services
The Service may contain links to third-party websites, applications, or services not under our control.

Design POV is not responsible for:
- The content or functionality of these third-party services;
- Their privacy policies or terms of use;
- Any loss or damage incurred by you as a result of your interaction with them.

Accessing third-party services is at your own risk and subject to their respective terms and conditions.

## 5. Privacy & Personal Information
Design POV values your privacy. Any personal data collected through the Service is governed by our Privacy Policy. By using the Service, you consent to the collection, use, and disclosure of your information as described therein.

We may share your information:
- With partners or service providers to improve or operate the Service;
- In good faith belief that such disclosure is required by law or to protect our rights or the safety of our users.

We do not sell your personal information to third parties.

## 6. Indemnity
You agree to indemnify, defend and hold harmless Design POV, its officers, directors, employees, affiliates, agents, and licensors from and against all losses, damages, liabilities, claims, expenses, and costs (including legal fees) arising out of:
- Your use or misuse of the Service;
- Your violation of these Terms;
- Your infringement of any intellectual property or other rights of any third party.

## 7. Disclaimer & Limitation of Liability
The Service and all content therein are provided “as is” without warranty of any kind, either express or implied.

Design POV disclaims all warranties, including:
- Merchantability;
- Fitness for a particular purpose;
- Accuracy or reliability of information.

Design POV does not guarantee that:
- The Service will be available at all times or locations;
- The Service will be error-free, virus-free, or uninterrupted.

To the fullest extent permissible under applicable law, Design POV shall not be liable for any indirect, incidental, special, consequential or punitive damages or losses arising from your use of the Service.

## 8. Termination
Design POV may terminate or suspend your access to the Service, without prior notice or liability, if:
- You breach these Terms;
- We are required to do so by law;
- We discontinue or materially modify the Service.

All provisions of these Terms which by their nature should survive termination (including ownership provisions, disclaimers, indemnity, and limitations of liability) shall survive such termination.

## 9. General Provisions
### Governing Law & Jurisdiction
These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.

### Entire Agreement
These Terms constitute the entire agreement between you and Design POV with respect to the use of the Service.

### Severability
If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain valid and enforceable.

### Modifications
We reserve the right to modify these Terms at any time. Continued use of the Service constitutes acceptance of the modified Terms. Please check this page periodically for updates.`;

export const DEFAULT_LEGAL: LegalPagesContent = {
  privacy: { enabled: true, title: "Privacy Policy", sideLabel: "Effective Date: 01/04/2025", body: PRIVACY_BODY },
  terms:   { enabled: true, title: "Terms & Conditions", sideLabel: "Design POV India", body: TERMS_BODY },
};
