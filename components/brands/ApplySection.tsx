import React from "react";

/**
 * Types
 */
type ApplyCardProps = {
  title: string;
  description: string;
  buttonText: string;
  isInitiallyDark: boolean;
};

/**
 * Helper Component: ApplyCard
 */
const ApplyCard = ({
  title,
  description,
  buttonText,
  isInitiallyDark,
}: ApplyCardProps) => {
  return (
    <div
      className={`
        flex-1 p-10 md:p-14 flex flex-col gap-8 justify-between border-t border-gray-200 
        md:border-t-0 md:border-l first:border-l-0
        transition-all duration-500 ease-in-out font-montserrat
        
        ${isInitiallyDark ? "bg-black text-white" : "bg-white text-black"}
        
        md:bg-white md:text-black md:hover:bg-black md:hover:text-white
        group
      `}
    >
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold">{title}</h3>

        <p
          className={`
            text-lg leading-relaxed transition-opacity duration-500 
            ${isInitiallyDark ? "opacity-80" : "text-gray-700"} 
            md:text-gray-700 md:group-hover:text-white md:group-hover:opacity-80
          `}
        >
          {description}
        </p>
      </div>

      <button
        className={`
          w-fit px-8 py-3 border transition-all uppercase text-sm font-bold
          ${
            isInitiallyDark
              ? "border-white hover:bg-white hover:text-black"
              : "border-black hover:bg-black hover:text-white"
          }
          
          md:border-black md:text-black 
          md:group-hover:border-white md:group-hover:text-white 
          md:hover:!bg-white md:hover:!text-black
        `}
      >
        {buttonText}
      </button>
    </div>
  );
};

/**
 * Main Component: ApplySection
 */
const ApplySection = () => {
  return (
    <section className="w-full flex flex-col border-t border-gray-200 bg-white mt-12">

      {/* Cards */}
      <div className="w-full flex flex-col md:flex-row min-h-[350px]">
        <ApplyCard
          isInitiallyDark={true}
          title="Become a Sponsor"
          description="Put your brand in front of thousands of engaged, culture-driven audiences. From stage naming rights to exclusive activations — we build sponsorships that actually work."
          buttonText="Apply as a Sponsor"
        />

        <ApplyCard
          isInitiallyDark={false}
          title="Join as a Participant"
          description="Artists, performers, creators, vendors, and collectives — if you create culture, you belong on our platform."
          buttonText="Apply as a Participant"
        />
      </div>
    </section>
  );
};

export default ApplySection;