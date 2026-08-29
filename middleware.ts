import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/auth/signin",
  "/auth/error",
  "/test-auth", // For testing authentication
  "/api/auth", // NextAuth.js API routes
];

// Protected routes that require authentication
const protectedRoutes = ["/users"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`[Middleware] Processing path: ${pathname}`);

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  console.log(`[Middleware] Is public route: ${isPublicRoute}`);

  // If it's a public route, allow access
  if (isPublicRoute) {
    console.log(`[Middleware] Allowing access to public route: ${pathname}`);
    return NextResponse.next();
  }

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  console.log(`[Middleware] Is protected route: ${isProtectedRoute}`);

  // If it's not a protected route, allow access
  if (!isProtectedRoute) {
    console.log(
      `[Middleware] Allowing access to non-protected route: ${pathname}`,
    );
    return NextResponse.next();
  }

  console.log(
    `[Middleware] Protected route detected: ${pathname}, checking authentication...`,
  );

  // For protected routes, check authentication
  try {
    console.log(`[Middleware] Calling auth()...`);
    const session = await auth();
    console.log(`[Middleware] Session:`, session);
    console.log(`[Middleware] Session exists: ${!!session}`);
    console.log(`[Middleware] Session user exists: ${!!session?.user}`);

    // If no session exists, redirect to signin
    if (!session?.user) {
      console.log(`[Middleware] No session, redirecting to signin`);
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    console.log(
      `[Middleware] User authenticated: ${session.user.email || session.user.name}, allowing access`,
    );
    // User is authenticated, allow access
    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware] Authentication error:", error);

    // If there's an authentication error, redirect to signin
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    signInUrl.searchParams.set("error", "Configuration");
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
