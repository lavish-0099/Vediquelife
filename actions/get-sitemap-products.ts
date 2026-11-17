"use server";

import { Products } from "@prisma/client";
import { db } from "@/lib/db";

export const getSitemapProducts = async (): Promise<Products[]> => {
  try {
    const products = await db.products.findMany({
      where: {
        isPublished: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.log("[GET_SITEMAP_PRODUCTS]", error);
    return [];
  }
};
