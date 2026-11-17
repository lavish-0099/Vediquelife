"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const getAllRoles = async (): Promise<Role[]> => {
  try {
    const roles = await db.role.findMany();
    return roles;
  } catch (error) {
    console.error("[GET_ALL_ROLES]", error);
    return [];
  }
};
