"use client";

import Link from "next/link";
import { useNavbar } from "./NavbarProvider";
import { SUBMENU_NAV_ITEMS } from "@/app/constants/navigation";
import { Container } from "../common/Container";

export function DesktopSubmenu() {
  const { activeMenu, isSticky, cancelLeave, handleNavLeave } = useNavbar();

  return (
    <div
      onMouseEnter={cancelLeave}
      onMouseLeave={handleNavLeave}
      className={`hidden lg:block bg-white z-[1100]
        transition-[opacity,transform] duration-150 ease-out
        ${activeMenu
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none"
        }
        ${isSticky ? "fixed left-0 right-0" : "absolute left-0 right-0"}`}
      style={{ top: isSticky ? "80px" : "100%" }}
    >
      <Container>
        {SUBMENU_NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex h-fit px-10 py-10 gap-16 text-black transition-opacity duration-100 ${
              activeMenu === item.label
                ? "opacity-100"
                : "opacity-0 absolute pointer-events-none"
            }`}
          >
            {/* Panel image */}
            <div className="w-[60%] h-[320px] relative overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.label}
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Link columns */}
            <div className="w-[40%] flex gap-12 justify-start">
              <div className="flex flex-col justify-start">
                {item.col1Title && (
                  <h3 className="text-lg font-bold mb-6">{item.col1Title}</h3>
                )}
                <div className="flex flex-col gap-4">
                  {item.col1Links.map((link) => (
                    <Link key={link.label} href={link.href}
                      className="hover:text-primary-blue font-normal transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {item.col2Links && item.col2Links.length > 0 && (
                <div className="flex flex-col justify-start">
                  {item.col2Title && (
                    <h3 className="text-lg font-bold mb-6">{item.col2Title}</h3>
                  )}
                  <div className="flex flex-col gap-4">
                    {item.col2Links.map((link) => (
                      <Link key={link.label} href={link.href}
                        className="hover:text-blue-500 transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}