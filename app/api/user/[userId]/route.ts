import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json("User Id not provided", { status: 401 });
    }
    const userDetails = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    console.log("[USER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
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
    if (!userId) {
      return NextResponse.json(
        { message: "User Id not provided" },
        { status: 401 }
      );
    }
    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { roleId, ...body } = await req.json();

    let updateData: any = {
      ...body,
    };
    if (roleId) updateData.roleId = roleId;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("[UPDATE_USER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canDelete = hasPermission("users:delete");
    const allowedRoles = ["ADMIN"];
    if (!user || (!allowedRoles.includes(user.role) && !canDelete)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userId } = params;
    if (!userId) {
      return NextResponse.json(
        { message: "User Id not provided" },
        { status: 401 }
      );
    }
    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const deletedUser = await db.user.delete({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.log("[DELETE_USER]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
