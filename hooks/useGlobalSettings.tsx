"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface GlobalSettings {
  hideTickets: boolean;
  isHiring: boolean;
}

const defaults: GlobalSettings = { hideTickets: false, isHiring: false };

const GlobalSettingsContext = createContext<GlobalSettings>(defaults);

// Receives data as props — no fetch, no useEffect, no state.
// Data is already resolved by the time this mounts.
export function GlobalSettingsProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: GlobalSettings;
}) {
  return (
    <GlobalSettingsContext.Provider value={settings}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  return useContext(GlobalSettingsContext);
}