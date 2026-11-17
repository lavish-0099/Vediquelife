import { NextResponse } from "next/server";
import { withCors, handleOptions } from "@/lib/cors";
import { db } from "@/lib/db";

export async function GET() {
  const countries = await db.countries.findMany({
    orderBy: { name: "asc" },
    select: {
      name: true,
      countryCode: true,
    },
  });

  return withCors(NextResponse.json(countries));
}

export async function OPTIONS() {
  return handleOptions();
}
