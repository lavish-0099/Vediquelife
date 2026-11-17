import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
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
    const { list } = await req.json();
    for (let item of list) {
      await db.productBenefits.update({
        where: {
          id: item.id,
          productId: params.productId,
        },
        data: {
          position: item.position,
        },
      });
    }
    return NextResponse.json("Product benefits reordered successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[PRDOUCT_BENEFITS_REORDER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
