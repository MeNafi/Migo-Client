import { NextResponse, type NextRequest } from "next/server";
 
const COOKIE = "migo_access_token";
const protectedPrefixes = ["/dashboard", "/find-ride", "/rides", "/history", "/messages", "/payments", "/profile", "/commuter", "/admin", "/routes", "/safety"];
  
function decode(token: string): { role?: string; exp?: number } | null {
  try {
    const b = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(b));
  } catch { return null; }
}
const homeFor = (role?: string) => (role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : role === "COMMUTER" ? "/commuter" : "/find-ride");

/** JWT gate: needs a token, rejects expired ones, and keeps each role inside its own area. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const token = req.cookies.get(COOKIE)?.value;
  const claims = token ? decode(token) : null;
  const expired = !!claims?.exp && claims.exp * 1000 < Date.now();

  if (needsAuth && (!token || expired)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname + req.nextUrl.search);
    const res = NextResponse.redirect(url);
    if (expired) res.cookies.delete(COOKIE);
    return res;
  }
  const role = claims?.role;
  if (needsAuth && role) {
    const admin = role === "ADMIN" || role === "SUPER_ADMIN";
    if ((pathname.startsWith("/admin") && !admin) || (pathname.startsWith("/commuter") && role !== "COMMUTER" && !admin))
      return NextResponse.redirect(new URL(homeFor(role), req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon|icon|logo|mark|robots|sitemap|api).*)"] };
