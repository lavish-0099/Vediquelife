"use server";

import { ProductCategories, Products, Reviews } from "@prisma/client";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

type GetProducts = {
  title?: string;
  categoryId?: string;
};

type ProductWithCategory = Products & {
  ProductCategories: ProductCategories;
  reviews: Reviews[];
};

export const getFeaturedProducts = async ({
  title,
  categoryId,
}: GetProducts): Promise<ProductWithCategory[]> => {
  try {
    const user = await currentUser().catch(() => null);
    const userId: string | undefined = user?.id;
    const isAdmin: boolean = user?.role === "ADMIN";

    const products = await db.products.findMany({
      where: {
        isPublished: true,
        isFeatured: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        ProductCategories: true,
        reviews: {
          where: isAdmin
            ? {} // Admins see all reviews
            : {
                OR: [
                  { isPublished: true }, // Show all published reviews
                  { userId }, // Show unpublished reviews for the current user
                ],
              },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return products as ProductWithCategory[];
  } catch (error) {
    console.log("[GET_PRODUCTS]", error);
    return [];
  }
};
