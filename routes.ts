/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/about",
  "/auth/new-verification",
  "/cart",
  "/checkout",
  "/courses",
  "/success",
  "/failed",
  "/blog",
  "/vedique-diet",
  "/vedique-diet/weight-management",
  "/vedique-diet/lifestyle-disease-management",
  "/lifestyle-disease-management",
  "/dr-shikha-sharma",
  "/dr-shikha",
  "/vedique-wellness",
  "/contact",
  "/products",
  "/our-approach",
  "/shipping-policy",
  "/terms-and-conditions",
  "/return-and-refund-policy",
  "/grievance-redressal-policy",
  "/privacy-policy",
  "/how-vedique-diet-works",
  "/thank-you",
  "/meet-our-team",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/";

/**
 * The prefix for Product routes
 * Routes that start with this prefix are used for Product management purposes
 * @type {string}
 */
export const productPrefix = "/product/";

/**
 * The prefix for profile routes
 * Routes that start with this prefix are used for our team purposes
 * @type {string}
 */
export const profilePrefix = "/profile/";

/**
 * The prefix for Onboarding routes
 * Routes that start with this prefix are used for Onboarding purposes
 * @type {string}
 */
export const onboardingPrefix = "/onboarding/";

/**
 * The prefix for Articles routes
 * Routes that start with this prefix are used for Articles management purposes
 * @type {string}
 */

export const blogPrefix = "/blog/";

/**
 * The prefix for Admin Dashboard routes
 * Routes that start with this prefix are used for Admin Dashboard purposes
 * @type {string}
 */
export const adminRoutePrefix = "/admin";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/user/dashboard";
