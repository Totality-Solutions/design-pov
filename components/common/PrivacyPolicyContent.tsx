"use client";

import React, { useState } from 'react';
import SectionHeading from './SectionHeading';

const PrivacyPolicyContent: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
  return (

    <div className="py-12 bg-white text-gray-800 leading-relaxed "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionHeading
        titleMain="Privacy Policy"
        isSectionHovered={isHovered}
      >
          <div className="hidden md:flex">
            <span className="opacity-100 text-lg font-medium text-black">
              Effective Date: 01/04/2025
            </span>
          </div>
      </SectionHeading>
    
    <div className='px-6 md:px-10'>
      <section className="mb-8">
        <p>
          Designpovindia.com is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-black mb-4">Information We Collect:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal data (e.g., name, email, contact number)</li>
          <li>Payment details (processed through secure gateways)</li>
          <li>Event preferences and history</li>
          <li>Device and usage information (via cookies and analytics tools)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-black mb-4">How We Use Your Information:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To process registrations and payments</li>
          <li>To send event updates and confirmations</li>
          <li>To improve user experience</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <footer className="space-y-4 pt-4 border-t">
        <p>
          <span className="font-bold">Data Security:</span> We use industry-standard encryption and secure servers to protect your information.
        </p>
        <p>
          <span className="font-bold">Third-Party Services:</span> We may share necessary data with trusted third parties like payment gateways or email marketing platforms, strictly for service purposes.
        </p>
        <p>
          <span className="font-bold">Your Rights:</span> You can request access, correction, or deletion of your personal data by contacting us at{" "}
          <a 
            href="mailto:marketing@designpovindia.com" 
            className="text-blue-600 hover:underline transition-colors"
          >
            marketing@designpovindia.com
          </a>.
        </p>
      </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;