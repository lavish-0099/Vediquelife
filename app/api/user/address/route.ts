export const dynamic = "force-dynamic";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser().catch(() => null);
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userAddress = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        billingAddress: true,
        shippingAddress: true,
      },
    });
    return NextResponse.json(userAddress, { status: 200 });
  } catch (error) {
    console.log("[USER_ADDRES]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
