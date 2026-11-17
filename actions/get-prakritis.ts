"use server";
import { db } from "@/lib/db";
import { Prakriti } from "@prisma/client";

export const getAllPrakritis = async (): Promise<Prakriti[]> => {
  try {
    const allPrakritis = await db.prakriti.findMany();

    return allPrakritis;
  } catch (error) {
    console.error("[GET_ALL_PRAKRITIS]", error);
    return [];
  }
};
