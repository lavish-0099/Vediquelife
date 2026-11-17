import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  productPrefix,
  profilePrefix,
  blogPrefix,
  onboardingPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isProductRoute = nextUrl.pathname.startsWith(productPrefix);
  const isProfileRoute = nextUrl.pathname.startsWith(profilePrefix);
  const isOnboardingRoute = nextUrl.pathname.startsWith(onboardingPrefix);
  const isArticleRoute = nextUrl.pathname.startsWith(blogPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;
  if (isProductRoute) return null;
  if (isProfileRoute) return null;
  if (isOnboardingRoute) return null;
  if (isArticleRoute) return null;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    if (callbackUrl === "/personalization") {
      return Response.redirect(
        new URL(`/auth/register?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    } else {
      return Response.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
