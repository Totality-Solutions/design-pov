import type { ReactNode } from "react";
import "../globals.css";

export default function CmsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "var(--font-family, 'Montserrat', sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
