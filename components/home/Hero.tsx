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

import { useRef, useState } from "react";
import { Container } from "../common/Container";
import CTABtn from "../common/CTABtn";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
 <div className="w-full overflow-hidden pt-20 ">
    
    {/* FULL WIDTH HERO */}
    <div className="relative group w-full h-[35vh] sm:h-[50vh] md:h-[90vh] lg:h-[90vh]">
        <video
        ref={videoRef}
        src="/video/pov-adresizer.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />


        {/* ── VIDEO CONTROLS ── */}
        {/* Added 'opacity-0 group-hover:opacity-100' for the hover effect */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 bg-white backdrop-blur-md px-5 py-2 rounded-full border border-zinc-300">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <Image 
                src={isPlaying ? "/icons/play.svg" : "/icons/pause.svg" } 
                alt="Toggle Play" 
                width={24} height={24} 
              />
            </button>

            <div className="w-[1px] h-4 bg-gray-300" />

            {/* Mute/Unmute Button */}
            <button 
              onClick={toggleMute}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <Image 
                src={isMuted ? "/icons/volume-mute.svg" : "/icons/volume-high.svg"} 
                alt="Toggle Mute" 
                width={24} height={24} 
              />
            </button>
          </div>
        </div>

        {/* DESKTOP CTA BUTTON */}
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

      {/* MOBILE CTA BUTTON */}
      <div className="block sm:hidden w-full px-4 py-6 flex justify-center">
        <CTABtn
          label="Apply Now"
          href="#tickets"
        />
      </div>
    </div>
  );
}