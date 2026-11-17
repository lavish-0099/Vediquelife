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
    const urls = await req.json();
    if (urls) {
      urls.forEach(async (url: string) => {
        if (url) {
          const gallery = await db.productGallery.create({
            data: {
              url,
              productId: params.productId,
            },
          });
        }
      });
    }

    return NextResponse.json("Gallery created successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_GALLERY]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
