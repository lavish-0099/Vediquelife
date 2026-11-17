import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: (process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder") as string,
    key_secret: (process.env.RAZORPAY_KEY_SECRET || "placeholder_secret") as string,
  });
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      amount,
      currency,
      orderId,
      userId,
      name,
      email,
      contact,
      cart_product_data,
      shipping_name,
      shipping_address,
      shipping_other_details,
      Type,
      Source,
    } = body;

    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture: 1,
      notes: {
        username: name,
        user_email: email,
        userphone: contact,
        cart_product_data,
        Source,
        Type,
        shipping_name,
        shipping_address,
        shipping_other_details,
      },
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);
    if (!order) {
      return NextResponse.json("Failed to create Razorpay order", {
        status: 500,
      });
    }
    await db.order.update({
      where: {
        id: id,
      },
      data: {
        transactionId: order.id,
      },
    });

    //Add the order note in the database
    const noteText = `✅ Payment initiated via Razorpay with transaction ID: ${order.id}. Amount:${currency} ${amount} .`;
    await db.orderNote.create({
      data: {
        orderId: id,
        userId: userId,
        note: noteText,
        isSystem: true,
      },
    });

    return NextResponse.json(
      {
        id: order.id,
        orderId,
        currency: order.currency,
        amount: order.amount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RAZORPAY_HANDLE ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
