import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public read-only API endpoints — accessible without CMS session
const PUBLIC_API_ROUTES = new Set([
  "/api/cms/brand-partners",
  "/api/cms/brand-partner-types",
  "/api/cms/objects",
  "/api/cms/blogs",
  "/api/cms/studios",
  "/api/cms/global-settings",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — never block these
  if (pathname === "/cms/login" || pathname === "/api/cms/auth") {
    return NextResponse.next();
  }

  // Allow public GET reads for frontend components
  if (request.method === "GET" && PUBLIC_API_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get("cms_session")?.value;
  const secret = process.env.CMS_SECRET;

  if (!session || !secret || session !== secret) {
    return NextResponse.redirect(new URL("/cms/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*", "/api/cms/:path*"],
};
