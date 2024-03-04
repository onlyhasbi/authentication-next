import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { PUBLIC, DEFAULT_REDIRECT, API_AUTH, AUTH } from "@/route";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isApiAuth = nextUrl.pathname.startsWith(API_AUTH);
  const isPublicRoute = PUBLIC.includes(nextUrl.pathname);
  const isAuthRoute = AUTH.includes(nextUrl.pathname);

  if (isApiAuth) {
    return void null;
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return void null;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  return void null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
