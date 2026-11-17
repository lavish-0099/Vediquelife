import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
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
    const { productId } = params;

    const product = await db.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const unPublishedProduct = await db.products.update({
      where: {
        id: productId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unPublishedProduct, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_ID_UNPUBLISH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
