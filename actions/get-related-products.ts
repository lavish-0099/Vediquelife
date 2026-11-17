"use server";

import { ProductCategories, Products } from "@prisma/client";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

type GetRelatedProductsInput = {
  productId: string;
  categoryId?: string;
};

type ProductWithCategory = Products & {
  ProductCategories: ProductCategories;
};

export const getRelatedProducts = async ({
  productId,
  categoryId,
}: GetRelatedProductsInput): Promise<ProductWithCategory[]> => {
  try {
    const user = await currentUser();
    const userId: string | undefined = user?.id;
    const isAdmin: boolean = user?.role === "ADMIN";
    // Fetch the current product's category
    const currentProduct = await db.products.findUnique({
      where: { id: productId },
      include: { ProductCategories: true },
    });

    if (!currentProduct) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    // Extract current product's category ID
    const currentCategoryId = currentProduct.ProductCategories?.id;

    // Query related products based on category, excluding the current product
    const relatedProducts = await db.products.findMany({
      where: {
        isPublished: true,
        id: { not: productId },
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

    return relatedProducts as ProductWithCategory[];
  } catch (error) {
    console.error("[GET_RELATED_PRODUCTS]", error);
    return [];
  }
};
