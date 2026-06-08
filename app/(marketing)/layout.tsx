import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import { GlobalSettingsProvider } from "@/hooks/useGlobalSettings";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {/* // <GlobalSettingsProvider> */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    {/* // </GlobalSettingsProvider> */}
    </>
  );
}
