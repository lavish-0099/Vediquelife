"use server";

import { db } from "@/lib/db";
import { Ingredients } from "@prisma/client";

export const getIngredients = async (): Promise<Ingredients[]> => {
  try {
    const ingredients = await db.ingredients.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return ingredients;
  } catch (error) {
    console.log("[GET_INGREDIENTS]", error);
    return [];
  }
};
