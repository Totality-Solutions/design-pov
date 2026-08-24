import type { ReactNode } from "react";
import "../globals.css";
import ToastProvider from "@/components/cms/ToastProvider";

export default function CmsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "var(--font-family, 'Montserrat', sans-serif)" }}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
