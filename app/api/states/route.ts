import { NextResponse } from "next/server";
import { withCors, handleOptions } from "@/lib/cors";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const countryCode = searchParams.get("countryCode");

  if (!countryCode) {
    return withCors(NextResponse.json([]));
  }

  const states = await db.states.findMany({
    where: { countryCode },
    orderBy: { name: "asc" },
    select: {
      stateCode: true,
      name: true,
      countryCode: true,
    },
  });

  return withCors(NextResponse.json(states));
}

export async function OPTIONS() {
  return handleOptions();
}
