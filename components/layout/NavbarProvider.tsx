"use client";

import {
  createContext, useContext, useEffect,
  useState, useRef, useCallback, type ReactNode,
} from "react";
import { SUBMENU_NAV_ITEMS, type NavItem } from "@/app/constants/navigation";

type NavbarCtx = {
  activeMenu:     string | null;
  mobileOpen:     boolean;
  isSticky:       boolean;
  setMobileOpen:  (v: boolean | ((p: boolean) => boolean)) => void;
  setActiveMenu:  (v: string | null) => void;
  handleNavEnter: (item: NavItem) => void;
  handleNavLeave: () => void;
  cancelLeave:    () => void;
  closeAll:       () => void;
};

const Ctx = createContext<NavbarCtx | null>(null);

export function useNavbar() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNavbar must be inside NavbarProvider");
  return ctx;
}

export function NavbarProvider({
  children,
  adBanner,
}: {
  children: ReactNode;
  // adBanner is server-rendered HTML passed as a slot —
  // it never re-renders when client state changes.
  adBanner: ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky,   setIsSticky]   = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY    = useRef(0);

  // Preload submenu images — desktop only
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    SUBMENU_NAV_ITEMS.forEach(({ image }) => {
      const img = new window.Image();
      img.src = image;
    });
  }, []);

  // Scroll + resize
  useEffect(() => {
    const onScroll = () => {
      const ad = document.getElementById("ad-section");
      setIsSticky(ad ? ad.getBoundingClientRect().bottom <= 0 : window.scrollY > 0);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll,  { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // iOS body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      scrollY.current = window.scrollY;
      Object.assign(document.body.style, {
        position: "fixed", top: `-${scrollY.current}px`,
        left: "0", right: "0", overflow: "hidden",
      });
    } else {
      Object.assign(document.body.style, {
        position: "", top: "", left: "", right: "", overflow: "",
      });
      window.scrollTo(0, scrollY.current);
    }
    return () => {
      Object.assign(document.body.style, {
        position: "", top: "", left: "", right: "", overflow: "",
      });
    };
  }, [mobileOpen]);

  // Cleanup timer
  useEffect(() => () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const handleNavEnter = useCallback((item: NavItem) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(item.type === "submenu" ? item.label : null);
  }, []);

  const handleNavLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, []);

  return (
    <Ctx.Provider value={{
      activeMenu, mobileOpen, isSticky,
      setMobileOpen, setActiveMenu,
      handleNavEnter, handleNavLeave, cancelLeave, closeAll,
    }}>
      <nav onMouseLeave={handleNavLeave} className="relative w-full z-[1000]">
        {/* Server-rendered slot — zero re-renders when state changes */}
        {adBanner}
        {children}
      </nav>
    </Ctx.Provider>
  );
}