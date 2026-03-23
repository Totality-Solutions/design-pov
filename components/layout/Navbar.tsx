"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import Logo from "@/public/logo/Logo.svg";
import CTABtn from "../common/CTABtn";
import { Container } from "../common/Container";

type NavLink = { label: string; href: string };

const TOP_NAV: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Edition", href: "#edition" },
  { label: "Contact", href: "#contact" },
];

const BOTTOM_NAV: NavLink[] = [
  { label: "Blogs", href: "#blogs" },
  { label: "Hub", href: "#hub" },
  { label: "POV Ecosystem", href: "#ecosystem" },
];

function HamburgerIcon({ open, white }: { open: boolean; white: boolean }) {
  return (
    <button
      onClick={(e) => e.currentTarget.closest("button")?.dispatchEvent(new Event("toggle"))}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: 4,
        flexShrink: 0,
      }}
    >
      {[0, 1].map((i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: 28,
            height: 2,
            background: white ? "#fff" : "#000",
            borderRadius: 2,
            transition: "transform 0.25s, opacity 0.25s",
            transform: open
              ? i === 0
                ? "translateY(4px) rotate(45deg)"
                : "translateY(-4px) rotate(-45deg)"
              : "none",
            opacity: open && i === 1 ? 0 : 1,
          }}
        />
      ))}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroH = heroRef.current?.offsetHeight ?? window.innerHeight * 0.6;
      setScrolled(window.scrollY > heroH - 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>

      <div ref={heroRef} className="hero">

        <div className="row1">
          <Image src={Logo} alt="Design POV" width={250} height={40} style={{ objectFit: "contain" }} />
          <div className="row1Links">
            {TOP_NAV.map((n) => (
              <a key={n.label} href={n.href} className="topLink">{n.label}</a>
            ))}
          </div>
        </div>

        <div className="adds">
          <div className="adContainer">
            <div className="adLabel">Advertisement</div>

            <div className="adBox">
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXX"
                data-ad-slot="XXXX"
                data-ad-format="auto"
              />
            </div>

          </div>
        </div>

        <div className="row2">
          <div className="row2Left">
            {BOTTOM_NAV.map((n) => (
              <a key={n.label} href={n.href} className="bottomLink">{n.label}</a>
            ))}
          </div>
          <div className="row2Right">
            <a href="#tickets" className="ticketsLink">Tickets ₹1500</a>
            <CTABtn label="APPLY AS DESIGNER" href="#apply" />
          </div>
        </div>
      </div>

      <Container>
        <header className={`stickyHeader${scrolled ? " visible" : ""}`}>
          <div className="stickyLeft">
            <Image src={Logo} alt="Design POV" width={250} height={40} style={{ objectFit: "contain", filter: "invert(1)" }} />
          </div>
          <div className="stickyLinks">
            {TOP_NAV.map((n) => (
              <a key={n.label} href={n.href} className="stickyLink">{n.label}</a>
            ))}
            <HamburgerIcon open={menuOpen} white={true} />
          </div>
        </header>
      </Container>
    </>
  );
}