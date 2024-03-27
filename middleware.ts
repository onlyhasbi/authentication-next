import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { API_AUTH, AUTH, DEFAULT_REDIRECT, PUBLIC } from "@/route";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isApiAuth = nextUrl.pathname.startsWith(API_AUTH);
  const isPublicRoute = PUBLIC.includes(nextUrl.pathname);
  const isAuthRoute = AUTH.includes(nextUrl.pathname);

  if (isApiAuth) {
    return;
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(AUTH[0], nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
