// "use client";

// import { Container } from "../common/Container";
// import CTABtn from "../common/CTABtn";

// export default function Hero() {
//   return (
//     <Container className="w-full overflow-hidden lg:max-w-none">

//       {/* ── VIDEO CONTAINER ── */}
//       <div className="relative w-full h-[35vh] sm:h-[50vh] md:h-[90vh] lg:h-[50vh] ">
//         <video
//           src="/video/home.mp4"
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute inset-0 w-full h-full md:object-cover object-contain"
//         />

//         {/* DARK OVERLAY */}
//         <div className="absolute inset-0 bg-black/30" />

//         {/* DESKTOP CTA BUTTON — hidden on mobile */}
//         <div className="hidden sm:block absolute z-10 mb-8 mr-8 bottom-0 right-0">
//           <CTABtn
//             label="Apply as Designer"
//             iconType="arrow"
//             btnBg="var(--primary-blue)"
//             btnHoverBg="var(--primary-blue)"
//             textColor="var(--color-white)"
//             borderColor="var(--color-white)"
//             borderHoverColor="var(--color-white)"
//             lineColor="var(--primary-blue)"
//             lineHoverColor="var(--primary-blue)"
//             bottomKey1Width="40px"
//             bottomKey2Width="12px"
//             bottomKey1Right="50px"
//             bottomKey2Right="15px"
//             href="#tickets"
//           />
//         </div>
//       </div>

//       {/* MOBILE CTA BUTTON — visible only on small screens */}
//       <div className="block sm:hidden w-full px-4 py-6 flex justify-center">
//         <CTABtn
//           label="Apply Now"
//           iconType="arrow"
//           btnBg="var(--primary-white)"
//           btnHoverBg="var(--primary-blue)"
//           textColor="var(--primary-blue)"
//           borderColor="var(--primary-blue)"
//           borderHoverColor="var(--primary-blue)"
//           lineColor="var(--primary-blue)"
//           lineHoverColor="var(--primary-blue)"
//           bottomKey1Width="30px"
//           bottomKey2Width="10px"
//           bottomKey1Right="10px"
//           bottomKey2Right="5px"
//           href="#tickets"
//         />
//       </div>
//     </Container>
//   );
// }

"use client";

import { Container } from "../common/Container";
import CTABtn from "../common/CTABtn";

export default function Hero() {
  return (
    /* FIX: Added 'px-0' and 'max-w-none' to ensure the container 
       doesn't add horizontal or vertical spacing that disconnects 
       the Hero from the Navbar bottom.
    */
    <Container className="w-full overflow-hidden lg:max-w-none px-0 pt-20">

      {/* ── VIDEO CONTAINER ── */}
      {/* Since your Navbar is relative, this div starts exactly at 
          the bottom of the white nav. The Advertisement (which is absolute)
          will automatically slide over the top of this video.
      */}
      <div className="relative w-full h-[35vh] sm:h-[50vh] md:h-[90vh] lg:h-[100vh]">
        <video
          src="/video/home.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        {/* <div className="absolute inset-0 bg-black/30" /> */}

        {/* DESKTOP CTA BUTTON — hidden on mobile */}
        <div className="hidden sm:block absolute z-10 mb-8 mr-5 bottom-0 right-0">
          <CTABtn
            label="Apply Now"
            iconType="arrow"
            btnBg="var(--primary-blue)"
            btnHoverBg="var(--primary-blue)"
            textColor="var(--color-white)"
            borderColor="var(--primary-blue)"
            borderHoverColor="var(--primary-blue)"
            lineColor="transparent"
            lineHoverColor="transparent"
            bottomKey1Width="40px"
            bottomKey2Width="12px"
            bottomKey1Right="50px"
            bottomKey2Right="15px"
            href="#tickets"
          />
        </div>
      </div>

      {/* MOBILE CTA BUTTON — visible only on small screens */}
      <div className="block sm:hidden w-full px-4 py-6 flex justify-center">
        <CTABtn
          label="Apply Now"
          iconType="arrow"
          btnBg="var(--primary-white)"
          btnHoverBg="var(--primary-blue)"
          textColor="var(--primary-blue)"
          borderColor="var(--primary-blue)"
          borderHoverColor="var(--primary-blue)"
          lineColor="var(--primary-blue)"
          lineHoverColor="var(--primary-blue)"
          bottomKey1Width="30px"
          bottomKey2Width="10px"
          bottomKey1Right="10px"
          bottomKey2Right="5px"
          href="#tickets"
        />
      </div>
    </Container>
  );
}