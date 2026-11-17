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
      const lastFaq = await db.productFaqs.findFirst({
        where: {
          productId,
        },
        orderBy: {
          position: "desc",
        },
      });
      const newPosition = lastFaq ? lastFaq.position! + 1 : 1;
      const faq = await db.productFaqs.create({
        data: {
          productId,
          position: newPosition,
          ...values,
        },
      });
      return NextResponse.json(faq, { status: 200 });
    }
  } catch (error) {
    console.log("[PRODUCT_FAQ]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
