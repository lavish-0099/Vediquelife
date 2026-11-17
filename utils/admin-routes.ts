import {
  BadgeCent,
  Folders,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Stars,
  MessageSquare,
  Newspaper,
} from "lucide-react";

export const routes = [
  {
    id: 1,
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin/dashboard",
    requiredPermission: "dashboard:view",
  },
  {
    id: 2,
    icon: Newspaper,
    label: "Articles",
    href: "/admin/articles",
    requiredPermission: "articles:view",
    subMenuItems: [
      {
        id: 1,
        label: "View All Articles",
        href: "/admin/articles",
        requiredPermission: "articles:view",
      },
      {
        id: 2,
        label: "Add New Article",
        href: "/admin/articles/create",
        requiredPermission: "articles:create",
      },
      {
        id: 3,
        label: "Manage Article Categories",
        href: "/admin/articles/categories",
        requiredPermission: "articles_categories:view",
      },
    ],
  },
  {
    id: 3,
    icon: ShoppingCart,
    label: "Products",
    href: "/admin/products",
    requiredPermission: "products:view",
    subMenuItems: [
      {
        id: 1,
        label: "View All Products",
        href: "/admin/products",
        requiredPermission: "products:view",
      },
      {
        id: 2,
        label: "Add New Product",
        href: "/admin/products/create",
        requiredPermission: "products:create",
      },
      {
        id: 3,
        label: "Manage Categories",
        href: "/admin/products/categories",
        requiredPermission: "products_categories:view",
      },
      {
        id: 4,
        label: "Manage Ingredients",
        href: "/admin/products/ingredients",
        requiredPermission: "ingredients:view",
      },
    ],
  },

  {
    id: 4,
    icon: BadgeCent,
    label: "Manage Coupons",
    href: "/admin/coupons",
    requiredPermission: "coupons:view",
    subMenuItems: [
      {
        id: 1,
        label: "View All Coupons",
        href: "/admin/coupons",
        requiredPermission: "coupons:view",
      },
      {
        id: 2,
        label: "Add New Coupon",
        href: "/admin/coupons/create",
        requiredPermission: "coupons:create",
      },
    ],
  },
  {
    id: 5,
    icon: Folders,
    label: "Manage Orders",
    href: "/admin/orders",
    requiredPermission: "orders:view",
  },
  {
    id: 6,
    icon: MessageSquare,
    label: "Contact Queries",
    href: "/admin/contact-queries",
    requiredPermission: "contact_queries:view",
  },
  {
    id: 7,
    icon: Stars,
    label: "Manage Reviews",
    href: "/admin/reviews",
    requiredPermission: "reviews:view",
  },
  {
    id: 8,
    icon: Users,
    label: "Team Members",
    href: "/admin/team-members",
    requiredPermission: "nutrition_coaches:view",
  },
  {
    id: 9,
    icon: Users,
    label: "Manage Users",
    href: "/admin/users",
    requiredPermission: "users:view",
  },
  {
    id: 10,
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
    requiredPermission: "settings:view",
    subMenuItems: [
      {
        id: 1,
        label: "Manage Roles",
        href: "/admin/settings/role",
        requiredPermission: "roles:view",
      },
      {
        id: 1,
        label: "Manage Cart Rules",
        href: "/admin/settings/cart-rules",
        requiredPermission: "settings:view",
      },
    ],
  },
];
