// No "use client" — this is a Server Component.
// The fetch happens at render time on the server, never in the browser.

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GlobalSettingsProvider } from "@/hooks/useGlobalSettings";
import { getGlobalSettings } from "@/lib/getGlobalSettings";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Awaited on the server — resolved before any HTML is sent to the client.
  // Mobile browser receives a fully-populated provider with no pending fetch.
  const settings = await getGlobalSettings();

  return (
    <GlobalSettingsProvider settings={settings}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </GlobalSettingsProvider>
  );
}