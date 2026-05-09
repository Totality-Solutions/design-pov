import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/cms/login") return NextResponse.next();

  const session = request.cookies.get("cms_session")?.value;
  const secret = process.env.CMS_SECRET;

  if (!session || !secret || session !== secret) {
    return NextResponse.redirect(new URL("/cms/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
