import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const passthroughPrefixes = [
  "/_next",
  "/assets",
  "/images",
  "/media",
  "/videos",
  "/og",
  "/api",
  "/favicon",
];

/**
 * Host that search engines are allowed to index. Every other host
 * (staging, Vercel previews, team sandboxes) is served with a noindex
 * header so it cannot leak into search results.
 */
const productionHost = (process.env.NEXT_PUBLIC_PRODUCTION_HOST ?? "mendozer.com")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "")
  .toLowerCase();

function isProductionHost(request: NextRequest): boolean {
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];
  const normalized = host.replace(/^www\./, "");
  return normalized === productionHost.replace(/^www\./, "");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (passthroughPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();
  if (!isProductionHost(request)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
