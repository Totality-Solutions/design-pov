"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface GlobalSettings {
  hideTickets: boolean;
  isHiring: boolean;
}

const defaults: GlobalSettings = { hideTickets: false, isHiring: false };

const GlobalSettingsContext = createContext<GlobalSettings>(defaults);

export function GlobalSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<GlobalSettings>(defaults);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cms/global-settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setSettings({
          hideTickets: !!data.hideTickets,
          isHiring: !!data.isHiring,
        });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <GlobalSettingsContext.Provider value={settings}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  return useContext(GlobalSettingsContext);
}
