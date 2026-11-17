"use server";

import { db } from "@/lib/db";
import { Order } from "@/types/order";

export async function getOrderDetails(
  orderId: string
): Promise<{ order: Order }> {
  try {
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return { order };
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    throw new Error("Failed to fetch order details");
  }
}
