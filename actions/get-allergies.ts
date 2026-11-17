"use server";

import { db } from "@/lib/db";
import { Allergy } from "@/types/allergies";

type getAllergiesInput = {
  userId: string;
};

export const getAllergies = async ({
  userId,
}: getAllergiesInput): Promise<Allergy[]> => {
  try {
    const allAllergies = await db.allergies.findMany();

    const userAllergies = await db.userAllrgies.findMany({
      where: {
        userId,
      },
      select: {
        allergyId: true,
      },
    });

    const userAllergyIds = userAllergies.map(
      (userAllergy) => userAllergy.allergyId
    );

    const filteredAllergies = allAllergies.filter(
      (allergy) => !userAllergyIds.includes(allergy.id)
    );

    return filteredAllergies;
  } catch (error) {
    console.error("[GET_ALLERGIES]", error);
    return [];
  }
};

export const getAllAllergies = async (): Promise<Allergy[]> => {
  try {
    const allAllergies = await db.allergies.findMany();

    return allAllergies;
  } catch (error) {
    console.error("[GET_ALL_ALLERGIES]", error);
    return [];
  }
};
