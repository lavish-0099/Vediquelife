import { NextResponse } from "next/server";
import { withCors, handleOptions } from "@/lib/cors";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const countryCode = searchParams.get("countryCode");
  const stateCode = searchParams.get("stateCode");

  if (!countryCode || !stateCode) {
    return withCors(NextResponse.json([]));
  }

  const cities = await db.cities.findMany({
    where: {
      countryCode,
      stateCode,
    },
    orderBy: { name: "asc" },
    select: {
      name: true,
      countryCode: true,
      stateCode: true,
    },
  });

  return withCors(NextResponse.json(cities));
}

export async function OPTIONS() {
  return handleOptions();
}
