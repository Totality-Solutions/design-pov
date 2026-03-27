import React from "react";
import { Container } from "../common/Container";

const ClientLogo = () => {
  const IGNORED_IDS = [41, 27, 40, 50, 18, 21, 53, 20];

  const Client = Array.from({ length: 10 }, (_, i) => i + 1)
    .filter((id) => !IGNORED_IDS.includes(id))
    .map((id) => ({
      src: `/temp/client/${id}.png`,
      alt: `Client Logo ${id}`,
    }));

  return (
    <Container>
      <div className="overflow-hidden border-b border-white/5 py-3.5 bg-black">
        <div className="flex animate-marquee">
          {/* Track 1 */}
          <div className="flex gap-12">
            {Client.map((logo, i) => (
              <img
                key={`a-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-20 w-auto object-contain"
                draggable={false}
              />
            ))}
          </div>

          {/* Track 2 (duplicate) */}
          <div className="flex gap-12">
            {Client.map((logo, i) => (
              <img
                key={`b-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-20 w-auto object-contain"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientLogo;