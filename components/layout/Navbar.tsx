import Image from "next/image";
import Link from "next/link";
import { cdn } from "@/lib/cdn";
import { NavbarProvider } from "./NavbarProvider";
import { NavbarHeader } from "./NavbarHeader";
import { DesktopSubmenu } from "./DesktopSubmenu";
import { MobileMenu } from "./MobileMenu";

// Ad banner is pure static HTML — server rendered, ships zero JS
function AdBanner() {
  return (
    <div id="ad-section" className="hidden lg:flex flex-col bg-neutral-50">
      <div className="flex justify-center px-10 py-8">
        <Link href="https://www.kajariaceramics.com/" target="_blank">
          <div className="w-fit bg-white p-5">
            <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
              Advertisement
            </div>
            <div className="w-full h-[280px] flex items-center justify-center">
              <Image
                src={cdn("/temp/ads/1.png")}
                alt="Ad"
                width={1900}
                height={100}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function Navbar({ hideTickets = false }: { hideTickets?: boolean }) {
  return (
    // NavbarProvider renders the <nav> wrapper with onMouseLeave.
    // AdBanner is passed as a server-rendered child — no JS attached to it.
    <NavbarProvider adBanner={<AdBanner />}>
      <NavbarHeader hideTickets={hideTickets} />
      <DesktopSubmenu />
      <MobileMenu hideTickets={hideTickets} />
    </NavbarProvider>
  );
}