import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canUpdate = hasPermission("products:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canUpdate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const values = await req.json();

    const { productId } = params;
    if (values) {
      const lastDirection = await db.productDirectionsForUse.findFirst({
        where: {
          productId,
        },
        orderBy: {
          position: "desc",
        },
      });
      const newPosition = lastDirection ? lastDirection.position! + 1 : 1;
      const direction = await db.productDirectionsForUse.create({
        data: {
          productId,
          position: newPosition,
          ...values,
        },
      });
      return NextResponse.json(direction, { status: 200 });
    }
  } catch (error) {
    console.log("[PRODUCT_DIRECTIONS]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
