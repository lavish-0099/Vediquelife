import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, user, ...body } = await req.json();

    const existingBillingAddress = await db.billingAddress.findFirst({
      where: { userId: user.id },
    });

    const billing_name = body.billing_firstName + " " + body.billing_lastName;
    const shipping_name =
      body.shipping_firstName + " " + body.shipping_lastName;

    if (existingBillingAddress) {
      await db.billingAddress.update({
        where: { id: existingBillingAddress.id },
        data: {
          name: billing_name,
          email: body.billing_email,
          phoneNumber: body.billing_phoneNumber,
          address: body.billing_address || null,
          city: body.billing_city,
          country: body.billing_country,
          state: body.billing_state,
          zip: body.billing_zip,
        },
      });
    } else {
      await db.billingAddress.create({
        data: {
          name: billing_name,
          email: body.billing_email,
          phoneNumber: body.billing_phoneNumber,
          address: body.billing_address || null,
          city: body.billing_city,
          country: body.billing_country,
          state: body.billing_state,
          zip: body.billing_zip,
          userId: user.id as string,
        },
      });
    }

    if (!body.sameAsBilling) {
      const existingShippingAddress = await db.shippingAddress.findFirst({
        where: { userId: user.id },
      });

      if (existingShippingAddress) {
        await db.shippingAddress.update({
          where: { id: existingShippingAddress.id },
          data: {
            name: shipping_name,
            email: body.shipping_email,
            phoneNumber: body.shipping_phoneNumber,
            address: body.shipping_address,
            city: body.shipping_city,
            country: body.shipping_country,
            state: body.shipping_state,
            zip: body.shipping_zip,
          },
        });
      } else {
        await db.shippingAddress.create({
          data: {
            name: shipping_name,
            email: body.shipping_email,
            phoneNumber: body.shipping_phoneNumber,
            address: body.shipping_address,
            city: body.shipping_city,
            country: body.shipping_country,
            state: body.shipping_state,
            zip: body.shipping_zip,
            userId: user.id as string,
          },
        });
      }
    }

    //Fetch order status from the database
    const orderStatus = await db.orderStatus.findFirst({
      where: { code: "CREATED" },
    });

    // Create the order in the database
    const order = await db.order.create({
      data: {
        userId: user.id as string,
        totalAmount: body.grandTotal,
        currency: body.currency,
        exchangeRate: body.exchangeRate,
        subTotal: body.subTotal,
        igst: body.igst,
        sgst: body.sgst,
        cgst: body.cgst,
        taxTotal: body.totalTax || 0,
        coupon: body.couponCode,
        discount: body.discount,
        paymentMethod: body.paymentMethod,
        sameAsBilling: body.sameAsBilling,
        status: orderStatus?.code || "CREATED",
      },
    });

    // Add order note in the database
    const noteText = `✅ Order created by ${user.name} (${user.email})`;
    await db.orderNote.create({
      data: {
        orderId: order.id,
        userId: user.id,
        note: noteText,
        isSystem: true,
      },
    });

    if (body.products && Array.isArray(body.products)) {
      const itemsToCreate = body.products.map((item: any) => ({
        orderId: order.id,
        itemName: item.title,
        productId: item.productId,
        price: item.price,
        int_price: item.int_price,
        quantity: item.quantity || 1,
      }));

      await db.item.createMany({
        data: itemsToCreate,
      });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
