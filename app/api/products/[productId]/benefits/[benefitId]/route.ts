import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; benefitId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canDelete = hasPermission("products:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canDelete)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { productId, benefitId } = params;
    const benefit = await db.productBenefits.findUnique({
      where: {
        id: benefitId,
        productId,
      },
    });
    if (!benefit) {
      return NextResponse.json(
        { message: "Product benefit not found" },
        { status: 404 }
      );
    }

    // delete benefit
    const deletedBenefit = await db.productBenefits.delete({
      where: {
        id: benefitId,
        productId,
      },
    });
    return NextResponse.json(deletedBenefit, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_BENEFIT_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; benefitId: string } }
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
    const { productId, benefitId } = params;
    const benefit = await db.productBenefits.findUnique({
      where: {
        id: benefitId,
        productId,
      },
    });
    if (!benefit) {
      return NextResponse.json(
        { message: "Product benefit not found" },
        { status: 404 }
      );
    }
    if (values) {
      const updatedBenefit = await db.productBenefits.update({
        where: {
          id: benefitId,
          productId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(updatedBenefit, { status: 200 });
    }
  } catch (error) {
    console.log("[PRODUCT_BENEFIT_ID_PATCH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
