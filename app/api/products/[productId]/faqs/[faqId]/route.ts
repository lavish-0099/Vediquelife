import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; faqId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canDelete = hasPermission("products:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canDelete)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { productId, faqId } = params;
    const faq = await db.productFaqs.findUnique({
      where: {
        id: faqId,
        productId,
      },
    });
    if (!faq) {
      return NextResponse.json(
        { message: "Product faq not found" },
        { status: 404 }
      );
    }

    // delete faq
    const deletedFaq = await db.productFaqs.delete({
      where: {
        id: faqId,
        productId,
      },
    });
    return NextResponse.json(deletedFaq, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_FAQ_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; faqId: string } }
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
    const { productId, faqId } = params;
    const faq = await db.productFaqs.findUnique({
      where: {
        id: faqId,
        productId,
      },
    });
    if (!faq) {
      return NextResponse.json(
        { message: "Product faq not found" },
        { status: 404 }
      );
    }
    if (values) {
      const updatedFaq = await db.productFaqs.update({
        where: {
          id: faqId,
          productId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(updatedFaq, { status: 200 });
    }
  } catch (error) {
    console.log("[PRODUCT_FAQ_ID_PATCH]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
