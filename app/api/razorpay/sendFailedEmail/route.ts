import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { render } from "@react-email/render";
import { sendEmail } from "@/lib/mail";

import { formatDate } from "@/lib/formatDate";
import CustomerOrderConfirmationMail from "@/emails/customer-order-confirmation-mail";
import CustomerOrderAdminMail from "@/emails/customer-order-admin-mail";
import { ItemWithRelations } from "@/types/order";

export async function POST(req: Request) {
  try {
    const { orderId, paymentStatus, orderStatus, exchangeRate } =
      await req.json();

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          include: {
            billingAddress: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      console.log("Order not found");
      return NextResponse.json("Order not found", { status: 404 });
    }

    await db.order.update({
      where: { id: order.id },
      data: { paymentStatus, status: orderStatus },
    });

    //Add the order note in the database
    const noteText = `🚫 Payment was cancelled by the user. Order marked as ${orderStatus}.`;

    await db.orderNote.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        note: noteText,
        isSystem: true,
      },
    });

    const { billingAddress } = order.user;

    const {
      email: customerEmail,
      name: customerName,
      phoneNumber: customerPhoneNumber,
    } = billingAddress[0] || {};

    const products = order.items.filter(
      (item: ItemWithRelations) => item.product,
    );

    // Sending Customer Email
    await sendEmail({
      to: customerEmail as string,
      subject: "Payment Issue – Let’s Resolve This Together",
      html: render(
        CustomerOrderConfirmationMail({
          subjectLine: "We Couldn’t Process Your Payment",
          name: customerName as string,
          currency: order.currency as string,
          paymentMethod: order.paymentMethod || "Razorpay",
          paymentStatus: paymentStatus,
          orderStatus: orderStatus,
          exchangeRate: exchangeRate,
          orderDetails: {
            orderId: order.orderId,
            orderDate: formatDate(order.createdAt),
            subTotal: order.subTotal as number,
            totalTax: order.taxTotal as number,
            igst: order.igst as number,
            sgst: order.sgst as number,
            cgst: order.cgst as number,
            totalAmount: order.totalAmount as number,
            coupon: order.coupon || "",
            discount: order.discount || 0,
            products: products.map((item: any) => ({
              name: item.product.title,
              quantity: item.quantity,
              price: item.product.price,
              image: item.product.imageUrl,
              slug: item.product.slug,
              int_price: item.product.int_price,
              taxAmount: item.product.taxAmount,
              taxRate: item.product.taxRate,
            })),
          },
        }),
      ),
    });

    // Sending Admin Email
    await sendEmail({
      to: process.env.ADMIN_EMAIL as string,
      cc: process.env.ACCOUNT_EMAIL as string,
      bcc: process.env.BCC_EMAIL as string,
      subject:
        "An order attempt failed on Dr Shikha Sharma Website using Razorpay",
      html: render(
        CustomerOrderAdminMail({
          subjectLine:
            "Someone tried to place an order on your Dr Shikha Sharma Website. Here are the details:",
          name: customerName as string,
          currency: order.currency as string,
          email: customerEmail as string,
          phoneNumber: customerPhoneNumber as string,
          address: billingAddress[0].address || "",
          paymentMethod: "Razorpay",
          paymentStatus: paymentStatus,
          orderStatus: orderStatus,
          country: billingAddress[0].country || "",
          state: billingAddress[0].state || "",
          city: billingAddress[0].city || "",
          zip: billingAddress[0]?.zip || "",
          exchangeRate: exchangeRate,
          orderDetails: {
            orderId: order.orderId,
            orderDate: formatDate(order.createdAt),
            subTotal: order.subTotal as number,
            totalTax: order.taxTotal as number,
            igst: order.igst as number,
            sgst: order.sgst as number,
            cgst: order.cgst as number,
            totalAmount: order.totalAmount as number,
            coupon: order.coupon || "",
            discount: order.discount || 0,
            products: products.map((item: any) => ({
              name: item.product.title,
              quantity: item.quantity,
              price: item.product.price,
              image: item.product.imageUrl,
              slug: item.product.slug,
              int_price: item.product.int_price,
              taxAmount: item.product.taxAmount,
              taxRate: item.product.taxRate,
            })),
          },
        }),
      ),
    });

    return NextResponse.json("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("[FAILED_EMAIL_SENT]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
