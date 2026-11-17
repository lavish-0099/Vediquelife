"use server";

import { db } from "@/lib/db";
import { User } from "@/types/user";

export const getAllUsers = async (dateRange?: string): Promise<User[]> => {
  try {
    let whereClause = {}; // Default empty, fetch all users

    if (dateRange && dateRange.trim()) {
      const [startDateStr, endDateStr] = dateRange.trim().split(" - ");
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        whereClause = {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        };
      }
    }

    const data = await db.user.findMany({
      where: whereClause,
      include: {
        userRole: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error: any) {
    console.error("[GET_ALL_USERS]", error.message);
    return [];
  }
};
