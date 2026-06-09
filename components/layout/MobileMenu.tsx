"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cdn } from "@/lib/cdn";
import { NAV_ITEMS } from "@/app/constants/navigation";
import { useNavbar } from "./NavbarProvider";
import CTABtn from "../common/CTABtn";

export function MobileMenu({ hideTickets }: { hideTickets: boolean }) {
  const pathname = usePathname();
  const { mobileOpen, activeMenu, setActiveMenu, closeAll } = useNavbar();

  return (
    <div className={`fixed inset-0 bg-white z-[2000] transition-transform duration-500 ease-in-out lg:hidden ${
      mobileOpen ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="pt-24 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {NAV_ITEMS.map((item) => {
            const isActive   = pathname === item.href;
            const hasSubmenu = item.type === "submenu";
            return (
              <div key={item.label} className="border-b border-gray-100">
                <div className="flex items-center justify-between pr-4">
                  <Link
                    href={item.href}
                    className={`flex-1 px-8 py-6 text-left text-lg font-medium transition-colors
                      border-l-[3px] ${
                        isActive
                          ? "text-primary-blue border-primary-blue"
                          : "text-black border-transparent"
                      }`}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>

                  {hasSubmenu && (
                    <button
                      className="p-4"
                      aria-label="Toggle submenu"
                      onClick={() =>
                        setActiveMenu(activeMenu === item.label ? null : item.label)
                      }
                    >
                      <Image
                        src={cdn("/icons/Menu-close.svg")}
                        alt="toggle"
                        width={20}
                        height={20}
                        className={`transition-transform duration-200 ${
                          activeMenu === item.label ? "scale-75" : "scale-150"
                        }`}
                      />
                    </button>
                  )}
                </div>

                {hasSubmenu && (
                  <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    activeMenu === item.label ? "max-h-96" : "max-h-0"
                  }`}>
                    {item.col1Links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block px-12 py-4 text-sm text-black font-normal border-b border-gray-100"
                        onClick={closeAll}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link href="https://povindex.designpovindia.com/home" target="_blank"
            className="flex items-center justify-center">
            <Image
              src={cdn("/qr/qr-ticket.png")}
              alt="QR ticket"
              width={390}
              height={390}
              className="w-full bg-black"
            />
          </Link>
        </div>

        {!hideTickets && (
          <div className="p-10 border-t bg-white">
            <CTABtn
              label="Buy Tickets"
              iconType="arrow"
              btnBg="var(--primary-blue)"
              textColor="white"
              href="https://tktplz.events/gjdlb5-design-pov"
            />
          </div>
        )}
      </div>
    </div>
  );
}