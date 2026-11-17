import { currentPermissions, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
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

    const { code } = await req.json();

    // If status is already same, skip update
    if (order.status === code) {
      return NextResponse.json(
        { message: "No change in status" },
        { status: 200 }
      );
    }

    const oldStatus = order.status;
    const newStatus = code;

    // Save to order table
    await db.order.update({
      where: { id: params.orderId },
      data: { status: newStatus },
    });

    // Always create history (duplicate allowed for audit)
    await db.orderStatusHistory.create({
      data: {
        orderId: params.orderId,
        statusCode: newStatus,
        userId: user.id,
      },
    });

    const forwardStatuses = [
      "CREATED",
      "PLACED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
      "RETURNED",
      "REFUNDED",
      "FAILED",
    ];

    const statusLabels: Record<string, string> = {
      CREATED: "Created",
      PLACED: "Placed",
      PROCESSING: "Processing",
      SHIPPED: "Shipped",
      DELIVERED: "Delivered",
      CANCELLED: "Cancelled",
      RETURNED: "Returned",
      REFUNDED: "Refunded",
      FAILED: "Failed",
    };

    const isReverted =
      forwardStatuses.indexOf(newStatus) < forwardStatuses.indexOf(oldStatus!);

    const noteText = isReverted
      ? `⚠️ Order status reverted from ${statusLabels[oldStatus!]} to ${
          statusLabels[newStatus]
        }`
      : `✅ Order status changed from ${statusLabels[oldStatus!]} to ${
          statusLabels[newStatus]
        }`;

    await db.orderNote.create({
      data: {
        orderId: order.id,
        userId: user.id,
        note: noteText,
        isSystem: true,
      },
    });

    return NextResponse.json(
      { message: "Order status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ORDER_STATUS_UPDATE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
