import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; directionId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canDelete = hasPermission("products:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canDelete)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { productId, directionId } = params;
    const direction = await db.productDirectionsForUse.findUnique({
      where: {
        id: directionId,
        productId,
      },
    });
    if (!direction) {
      return NextResponse.json(
        { message: "Product direction not found" },
        { status: 404 }
      );
    }

    // delete direction
    const deletedDirection = await db.productDirectionsForUse.delete({
      where: {
        id: directionId,
        productId,
      },
    });
    return NextResponse.json(deletedDirection, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_DIRECTION_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; directionId: string } }
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
    const { productId, directionId } = params;
    const direction = await db.productDirectionsForUse.findUnique({
      where: {
        id: directionId,
        productId,
      },
    });
    if (!direction) {
      return NextResponse.json(
        { message: "Product direction not found" },
        { status: 404 }
      );
    }
    if (values) {
      const updatedDirection = await db.productDirectionsForUse.update({
        where: {
          id: directionId,
          productId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(updatedDirection, { status: 200 });
    }
  } catch (error) {
    console.log("[PRODUCT_DIRECTION_ID_PATCH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
