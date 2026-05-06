"use client";

import React, { useState } from "react";
import SectionHeading from "./SectionHeading";

const TermsOfUseContent: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="py-12 bg-white text-gray-800 leading-relaxed"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Terms & Conditions"
        isSectionHovered={isHovered}
      >
        <div className="hidden md:flex">
          <span className="opacity-100 text-lg font-medium text-black">
            Design POV India
          </span>
        </div>
      </SectionHeading>

      <div className="px-6 md:px-10 space-y-10">

        {/* Intro */}
        <section className="mt-5">
          <p className="mb-4">
            Welcome to{" "}
            <span className="font-semibold text-black">
              www.designpov.com
            </span>{" "}
            (“Website”) and the mobile site (collectively referred to as the
            “Platform”), including all content and pages under our control
            (collectively, the “Service”), developed and operated by{" "}
            <span className="font-semibold text-black">
              Intotality Media and Events Pvt. Ltd.
            </span>{" "}
            (“Design POV”, “we”, “us”, “our”), a company incorporated under the
            laws of India and having its registered office at Mumbai,
            Maharashtra.
          </p>

          <p className="mb-4">
            By accessing or using the Service, you (“you”, “User”) agree that:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              You have read, understood, and accepted these Terms and Conditions
              (“Terms”);
            </li>
            <li>
              You agree to be legally bound by these Terms and our Privacy
              Policy;
            </li>
            <li>
              You are at least 18 years of age and legally capable of entering
              into contracts.
            </li>
          </ul>

          <p>
            If you do not agree to these Terms, please do not use the Service.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            1. Use of the Service
          </h2>

          <p className="mb-4">
            The Service is intended solely for your personal and non-commercial
            use. You may:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Access and view content on your personal devices;</li>
            <li>Download and temporarily store pages for offline viewing;</li>
            <li>
              Share or repost publicly available content through integrated
              social sharing tools, provided appropriate credit is given to
              Design POV.
            </li>
          </ul>

          <p className="mb-4">
            You may not:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Modify, copy, distribute, transmit, display, perform, reproduce,
              publish, license, create derivative works from, transfer or sell
              any information, software, products or services obtained from the
              Service without prior written consent;
            </li>

            <li>
              Use the Service for any unlawful purpose, or to harm, threaten, or
              harass any person;
            </li>

            <li>
              Use or launch any automated system (including without limitation,
              bots, spiders, or offline readers) that accesses the Service in a
              manner that sends more request messages than a human can
              reasonably produce;
            </li>

            <li>
              Post or upload content that is defamatory, infringing, obscene,
              misleading, or otherwise unlawful or inappropriate.
            </li>
          </ul>

          <p className="mt-6">
            Design POV reserves the right to restrict or terminate your access
            to the Service at any time without notice if we believe that you
            are in breach of these Terms.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            2. Intellectual Property Rights
          </h2>

          <p className="mb-4">
            All content on the Platform, including but not limited to text,
            images, logos, graphics, design elements, artworks, layouts,
            software, and data (“Content”) is the property of Design POV or its
            licensors and is protected under applicable intellectual property
            laws.
          </p>

          <p className="mb-4">
            Design POV and associated logos, taglines, and branding elements are
            trademarks of Intotality Media and Events Pvt. Ltd. or its
            affiliates. Any unauthorized use of these marks is strictly
            prohibited.
          </p>

          <p>
            You agree not to remove, alter, or obscure any copyright,
            trademark, or other proprietary rights notices appearing on the
            Service.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            3. User Content
          </h2>

          <p className="mb-4">
            The Platform may allow users to post, upload, or submit materials
            including text, images, videos, links, or feedback (“User
            Content”).
          </p>

          <p className="mb-4">
            By submitting User Content, you grant Design POV a worldwide,
            perpetual, royalty-free, non-exclusive license (with the right to
            sublicense) to use, copy, modify, distribute, publicly display, and
            create derivative works of such content for any purpose, including
            promotional and marketing purposes.
          </p>

          <p className="mb-4">
            You represent and warrant that:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              You own or have the necessary rights to your User Content;
            </li>

            <li>
              Your content does not violate any applicable laws, intellectual
              property rights, or third-party rights;
            </li>

            <li>
              Your content is not defamatory, obscene, offensive, or otherwise
              unlawful;
            </li>

            <li>
              You will not impersonate any person or misrepresent your identity.
            </li>
          </ul>

          <p>
            Design POV has no obligation to monitor User Content but reserves
            the right to review, edit, remove or reject any User Content at its
            sole discretion.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            4. Third-Party Content & Services
          </h2>

          <p className="mb-4">
            The Service may contain links to third-party websites,
            applications, or services not under our control.
          </p>

          <p className="mb-4">
            Design POV is not responsible for:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              The content or functionality of these third-party services;
            </li>

            <li>
              Their privacy policies or terms of use;
            </li>

            <li>
              Any loss or damage incurred by you as a result of your interaction
              with them.
            </li>
          </ul>

          <p>
            Accessing third-party services is at your own risk and subject to
            their respective terms and conditions.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            5. Privacy & Personal Information
          </h2>

          <p className="mb-4">
            Design POV values your privacy. Any personal data collected through
            the Service is governed by our Privacy Policy. By using the Service,
            you consent to the collection, use, and disclosure of your
            information as described therein.
          </p>

          <p className="mb-4">
            We may share your information:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              With partners or service providers to improve or operate the
              Service;
            </li>

            <li>
              In good faith belief that such disclosure is required by law or to
              protect our rights or the safety of our users.
            </li>
          </ul>

          <p>
            We do not sell your personal information to third parties.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            6. Indemnity
          </h2>

          <p>
            You agree to indemnify, defend and hold harmless Design POV, its
            officers, directors, employees, affiliates, agents, and licensors
            from and against all losses, damages, liabilities, claims, expenses,
            and costs (including legal fees) arising out of:
          </p>

          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Your use or misuse of the Service;</li>
            <li>Your violation of these Terms;</li>
            <li>
              Your infringement of any intellectual property or other rights of
              any third party.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            7. Disclaimer & Limitation of Liability
          </h2>

          <p className="mb-4">
            The Service and all content therein are provided “as is” without
            warranty of any kind, either express or implied.
          </p>

          <p className="mb-4">
            Design POV disclaims all warranties, including:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Merchantability;</li>
            <li>Fitness for a particular purpose;</li>
            <li>Accuracy or reliability of information.</li>
          </ul>

          <p className="mb-4">
            Design POV does not guarantee that:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              The Service will be available at all times or locations;
            </li>

            <li>
              The Service will be error-free, virus-free, or uninterrupted.
            </li>
          </ul>

          <p>
            To the fullest extent permissible under applicable law, Design POV
            shall not be liable for any indirect, incidental, special,
            consequential or punitive damages or losses arising from your use of
            the Service.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            8. Termination
          </h2>

          <p className="mb-4">
            Design POV may terminate or suspend your access to the Service,
            without prior notice or liability, if:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>You breach these Terms;</li>
            <li>We are required to do so by law;</li>
            <li>We discontinue or materially modify the Service.</li>
          </ul>

          <p>
            All provisions of these Terms which by their nature should survive
            termination (including ownership provisions, disclaimers, indemnity,
            and limitations of liability) shall survive such termination.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-5">
            9. General Provisions
          </h2>

          <div className="space-y-5">

            <div>
              <h3 className="font-semibold text-black mb-2">
                Governing Law & Jurisdiction
              </h3>

              <p>
                These Terms are governed by the laws of India. Any dispute shall
                be subject to the exclusive jurisdiction of the courts in
                Mumbai, Maharashtra.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Entire Agreement
              </h3>

              <p>
                These Terms constitute the entire agreement between you and
                Design POV with respect to the use of the Service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Severability
              </h3>

              <p>
                If any provision of these Terms is found to be unenforceable,
                the remaining provisions shall remain valid and enforceable.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">
                Modifications
              </h3>

              <p>
                We reserve the right to modify these Terms at any time.
                Continued use of the Service constitutes acceptance of the
                modified Terms. Please check this page periodically for updates.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default TermsOfUseContent;