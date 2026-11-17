import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentPermissions, currentUser } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { deleteFolderFromS3, deleteImageFromS3 } from "@/lib/s3utils";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canDelete = hasPermission("products:delete");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canDelete)) {
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

    let key: string | null = null;
    if (product.imageUrl) {
      key = product.imageUrl.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
    }

    if (key) {
      await deleteImageFromS3(key);
    }
    await deleteFolderFromS3(productId);

    const deletedProduct = await db.products.delete({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_ID_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

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
    const { title, ...values } = await req.json();
    let slug: string | undefined;
    if (title) {
      slug = slugify(title);
    }

    const product = await db.products.update({
      where: {
        id: productId,
      },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...values,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
