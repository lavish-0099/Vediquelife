import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { userId } = params;

    const userDetails = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userDetails) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const activatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: true,
      },
    });
    return NextResponse.json(activatedUser, { status: 200 });
  } catch (error) {
    console.log("[USER_ACTIVATE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
