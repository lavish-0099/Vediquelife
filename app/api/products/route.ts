import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentPermissions, currentUser } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canCreate = hasPermission("products:create");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canCreate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { title } = await req.json();
    const slug = slugify(title);
    const product = await db.products.create({
      data: {
        title,
        slug,
      },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[PRODUCT]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
