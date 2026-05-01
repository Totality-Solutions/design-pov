import React from 'react';

const ContactHeader = () => {
  return (
    /* Using --color-pov-white and --font-display */
    <section className="w-full bg-[var(--color-pov-white)] pt-16 md:pt-24 font-[var(--font-display)]">
      <div className="max-w-[1440px] mx-auto">
        
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
            Contact Now
          </h2>
        </div>

        {/* Description Container */}
        <div className="max-w-3xl mt-12 md:mt-20 px-6 md:px-10">
          {/* Subheading using --text-h3 variants */}
          <h3 className="font-semibold mb-3 text-[var(--color-pov-black)]
            text-[length:var(--text-h3-mobile)]
            md:text-[length:var(--text-h3-tab)]
            lg:text-[length:var(--text-h3)]"
          >
            Lorem Ipsum is simply dummy text.
          </h3>
          
          {/* Body text using --text-body variants */}
          <p className="font-normal text-[var(--color-pov-black)] opacity-70 leading-relaxed
            text-[length:var(--text-body-mobile)]
            md:text-[length:var(--text-body-tab)]
            lg:text-[length:var(--text-body)]"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;