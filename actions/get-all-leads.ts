"use server";

import { db } from "@/lib/db";
import { getDateRangeFilter } from "@/utils/date-range";
import { ContactUsQueries, Prisma } from "@prisma/client";

export const getAllLeads = async (
  dateRange?: string,
  source: string = "overall",
  type: string | null = "landingPage",
): Promise<ContactUsQueries[]> => {
  try {
    const { dateWhereClause } = getDateRangeFilter(dateRange);

    const whereClause: Prisma.ContactUsQueriesWhereInput = {
      ...dateWhereClause,
    };

    const data = await db.contactUsQueries.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return data as ContactUsQueries[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("[GET_ALL_LEADS_DATA]", error.message);
    } else {
      console.error("[GET_ALL_LEADS_DATA]", error);
    }
    return [];
  }
};
