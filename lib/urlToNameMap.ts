import { db } from "@/lib/db";

// Static URL mapping
export const staticUrlToNameMap: { [key: string]: string } = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/blog": "Blog",
  "/holistic-diet": "Holistic Diet",
  "/subscription-plans": "Subscription Plans",
  "/meal-plan": "Meal Plan",
  "/checkout": "Checkout",
  "/success": "Success",
  "/auth/login": "Login",
  "/auth/register": "Register",
  "/user/settings": "Settings",
  "/user/dashboard": "Dashboard",
  "/user/profile": "Profile",
  "/user/subscriptions": "User Subscriptions",
  "/personalization": "Personalization",
};

export const resolvePageName = async (url: string): Promise<string> => {
  if (staticUrlToNameMap[url]) return staticUrlToNameMap[url];

  if (url.startsWith("/blog/")) {
    const slug = url.split("/blog/")[1];
    if (slug) {
      const blog = await db.post.findUnique({ where: { slug } });
      if (blog) return blog.title;
    }
    return "Blog Post";
  }

  if (url.startsWith("/user/")) {
    return "User Page";
  }

  return "Unknown Page";
};
