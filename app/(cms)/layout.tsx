import type { ReactNode } from "react";
import "../globals.css";
import ToastProvider from "@/components/cms/ToastProvider";
import type { Metadata } from "next";

// The CMS is private: never indexed (robots.txt also disallows /cms).
export const metadata: Metadata = {
  title: "Design POV CMS",
  robots: { index: false, follow: false },
};

export default function CmsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "var(--font-family, 'Montserrat', sans-serif)" }}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
