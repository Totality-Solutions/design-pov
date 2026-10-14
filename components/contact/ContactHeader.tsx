import React from 'react';
import { DEFAULT_CONTACT } from "@/lib/contactContent";

const ContactHeader = ({
  title = DEFAULT_CONTACT.header.title,
  description = DEFAULT_CONTACT.header.description,
}: { title?: string; description?: string }) => {
  return (
    /* Using --color-pov-white and --font-display */
    <section className="w-full bg-[var(--color-pov-white)] pt-16 md:pt-24 font-[var(--font-display)]">

        {/* Header Line - Using --color-pov-black */}
        <div className="w-full border-b border-[var(--color-pov-black)] pb-5">
          {/* Responsive Typography using your theme variables:
              Mobile: --text-h1-mobile
              Tablet: --text-h1-tab
              Desktop: --text-h1
          */}
          <h2 className="font-semibold text-[var(--color-pov-black)] leading-tight px-6 md:px-10
            text-[length:var(--text-h1-mobile)]
            md:text-[length:var(--text-h1-tab)]
            lg:text-[length:var(--text-h1)]
            tracking-[var(--tracking-h1)]"
          >
            {title}
          </h2>
        </div>

        {/* Description Container */}
        {description && (
        <div className="max-w-3xl mt-12 md:mt-20 px-6 md:px-10">
          {/* Body text using --text-body variants */}
          <p className="font-normal text-[var(--color-pov-black)] opacity-70 leading-relaxed
            text-[length:var(--text-body-mobile)]
            md:text-[length:var(--text-body-tab)]
            lg:text-[length:var(--text-body)]"
          >
            {description}
          </p>
        </div>
        )}
    </section>
  );
};

export default ContactHeader;
