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
      <div className="overflow-hidden border-b py-3.5">
  <div className="marquee-track">
    {[...Client, ...Client].map((logo, i) => (
      <img
        key={i}
        src={logo.src}
        alt={logo.alt}
        className="h-20 w-auto object-contain shrink-0"
        draggable={false}
      />
    ))}
  </div>
</div>
    </Container>
  );
};

export default ClientLogo;