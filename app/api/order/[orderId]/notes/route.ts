import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const user = await currentUser();
    const { hasPermission } = await currentPermissions();
    const canCreate = hasPermission("orders:update");
    const allowedRoles = ["ADMIN"];

    if (!user || (!allowedRoles.includes(user.role) && !canCreate)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const order = await db.order.findUnique({
      where: { id: params.orderId },
    });
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const { note } = await req.json();

    if (!note || note.trim() === "") {
      return NextResponse.json(
        { message: "Note is required" },
        { status: 400 }
      );
    }
    // Create order note

    await db.orderNote.create({
      data: {
        note,
        orderId: order.id,
        userId: user.id,
        isSystem: false,
      },
    });

    return NextResponse.json(
      { message: "Order note created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ORDER_NOTE_CREATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
