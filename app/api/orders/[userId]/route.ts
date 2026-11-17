import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;

    const order = await db.order.findMany({
      where: {
        userId: userId as string,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[ORDER_ID]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;
    const {
      orderId,
      type,
      name,
      email,
      phoneNumber,
      address,
      country,
      state,
      city,
      zip,
    } = await req.json();

    const updateData = {
      name,
      email,
      phoneNumber,
      address,
      country,
      state,
      city,
      zip,
      userId,
    };

    if (type === "billing") {
      const existing = await db.billingAddress.findFirst({ where: { userId } });
      if (!existing) {
        return NextResponse.json(
          { error: "Billing address not found" },
          { status: 404 },
        );
      }
      const updated = await db.billingAddress.update({
        where: { id: existing.id },
        data: updateData,
      });
      return NextResponse.json(updated, { status: 200 });
    }

    if (type === "shipping") {
      const existing = await db.shippingAddress.findFirst({
        where: { userId },
      });
      const updatedOrCreated = existing
        ? await db.shippingAddress.update({
            where: { id: existing.id },
            data: updateData,
          })
        : await db.shippingAddress.create({ data: updateData });

      if (updatedOrCreated) {
        await db.order.update({
          where: { id: orderId },
          data: { sameAsBilling: false },
        });
      }

      return NextResponse.json(updatedOrCreated, { status: 200 });
    }

    return NextResponse.json(
      { error: "Invalid address type" },
      { status: 400 },
    );
  } catch (error) {
    console.error("[ORDER_ID_UPDATE_ADDRESS]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
