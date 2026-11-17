import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string; orderId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canCreate = hasPermission("orders:update");
    const allowedRoles = ["ADMIN"];

    if (!user || (!allowedRoles.includes(user.role) && !canCreate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await db.orderNote.delete({
      where: {
        id: params.noteId,
      },
    });

    return NextResponse.json(
      { message: "Order note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ORDER_NOTE_DELETE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
