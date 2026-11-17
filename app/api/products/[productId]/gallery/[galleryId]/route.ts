import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { deleteImageFromS3 } from "@/lib/s3utils";
import { currentPermissions, currentUser } from "@/lib/auth";

export const DELETE = async (
  req: Request,
  { params }: { params: { productId: string; galleryId: string } }
) => {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canUpdate = hasPermission("products:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canUpdate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { productId, galleryId } = params;
    const uploadedFile = await db.productGallery.findUnique({
      where: {
        id: galleryId,
      },
      select: {
        url: true,
      },
    });
    if (uploadedFile?.url) {
      // delete previous image
      const key = uploadedFile.url.split(
        `${process.env.AWS_BUCKET_NAME as string}.s3.${
          process.env.AWS_REGION as string
        }.amazonaws.com/`
      )[1];
      await deleteImageFromS3(key);
    }
    const gallery = await db.productGallery.delete({
      where: {
        productId: productId,
        id: galleryId,
      },
    });
    return NextResponse.json(gallery, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT_GALLERY_DELETE]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
