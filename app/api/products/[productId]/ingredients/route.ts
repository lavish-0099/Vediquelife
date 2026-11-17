import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";
const bodySchema = z.object({
  ingredients: z.array(z.string()),
});
export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;
    if (!productId) {
      return NextResponse.json(
        { message: "Missing productId" },
        { status: 400 }
      );
    }

    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canUpdate = hasPermission("products:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canUpdate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid payload", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newIngredientIds = parsed.data.ingredients;

    const existing = await db.productIngredients.findMany({
      where: { productId },
      select: { ingredientId: true },
    });
    const existingIds = existing.map((e) => e.ingredientId);

    // compute which to add and which to remove
    const toAdd = newIngredientIds.filter((id) => !existingIds.includes(id));
    const toRemove = existingIds.filter((id) => !newIngredientIds.includes(id));

    // use transaction for safety
    const txOps: any[] = [];

    if (toRemove.length > 0) {
      txOps.push(
        db.productIngredients.deleteMany({
          where: {
            productId,
            ingredientId: { in: toRemove },
          },
        })
      );
    }

    if (toAdd.length > 0) {
      // map to create objects
      const createData = toAdd.map((ingredientId) => ({
        productId,
        ingredientId,
      }));
      txOps.push(
        db.productIngredients.createMany({
          data: createData,
          skipDuplicates: true, // safe
        })
      );
    }

    if (txOps.length > 0) {
      await db.$transaction(txOps);
    }

    return NextResponse.json("Product ingredients synced", {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_INGREDIENTS]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
