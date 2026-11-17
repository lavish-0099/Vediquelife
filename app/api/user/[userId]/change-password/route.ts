import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canUpdate = hasPermission("users:update");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canUpdate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userId } = params;
    const { password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return NextResponse.json("Password changed successfully", { status: 200 });
  } catch (error) {
    console.log("[ADMIN_CHANGE_PASSWORD]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
