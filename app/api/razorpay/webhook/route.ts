import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { render } from "@react-email/render";
import { sendEmail } from "@/lib/mail";
import CustomerOrderAdminMail from "@/emails/customer-order-admin-mail";
import { formatDate } from "@/lib/formatDate";
import CustomerOrderConfirmationMail from "@/emails/customer-order-confirmation-mail";
import { ItemWithRelations } from "@/types/order";
import { sendOrderConfirmationWhatsApp } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.event) {
      return NextResponse.json("Invalid request body format", { status: 400 });
    }

    const razorpaySignature = req.headers.get("x-razorpay-signature");

    const isValidSignature = validateWebhookSignature(
      JSON.stringify(body),
      razorpaySignature as string,
      process.env.RAZORPAY_WEBHOOK_SECRET as string,
    );

    if (!isValidSignature) {
      return NextResponse.json("Invalid webhook signature", { status: 400 });
    }

    // Send 200 response immediately to Razorpay
    const response = NextResponse.json("Webhook received", { status: 200 });
    // Process the event asynchronously
    processWebhookEvent(body.event, body.payload).catch((error) => {
      console.error("Error processing event:", error);
    });

    return response;
  } catch (error) {
    console.error("[RAZORPAY_WEBHOOK]", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
async function processWebhookEvent(event: string, payload: any) {
  try {
    switch (event) {
      case "payment.captured":
        await handlePaymentCaptured(payload);
        break;
      case "payment.failed":
        await handlePaymentFailed(payload);
        break;
      default:
        console.log("Unknown event type:", event);
    }
  } catch (error) {
    console.error("Error processing event:", error);
  }
}
async function handlePaymentCaptured(payload: any): Promise<void> {
  try {
    const paymentEntity = payload.payment.entity;
    const orderId = paymentEntity.order_id;
    console.log("Handling captured payment for order:", orderId);
    const order = await db.order.findFirst({
      where: {
        transactionId: orderId,
      },
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

    if (!order || order.paymentStatus === "Paid") {
      console.log("Order not found or already paid");
      return;
    }
    const billingAddress = order.user.billingAddress[0];
    const customerEmail = billingAddress.email;
    const customerName = billingAddress.name;
    const customerPhoneNumber = billingAddress.phoneNumber;

    const products = order.items.filter(
      (item: ItemWithRelations) => item.product,
    );

    await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentStatus: "Paid",
        status: "PLACED",
      },
    });

    //Add the order note in the database
    const noteText = `✅ Payment successful. Order confirmed and placed.`;

    await db.orderNote.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        note: noteText,
        isSystem: true,
      },
    });

    // send whatsapp message(s) to customer

    try {
      const messagePromises = products.map((item: ItemWithRelations) => {
        const productName = item.product?.title || "Product";

        return sendOrderConfirmationWhatsApp({
          phone: customerPhoneNumber,
          firstName: customerName?.split(" ")[0], // first name only
          productName,
        });
      });

      await Promise.all(messagePromises);
    } catch (error) {
      console.error("Failed to send one or more WhatsApp messages:", error);
    }

    await sendEmail({
      to: customerEmail as string,
      subject: "We Got Your Payment – Let’s Begin Your Wellness Journey!",
      html: render(
        CustomerOrderConfirmationMail({
          subjectLine: "Your Order Has Been Placed Successfully!",
          name: customerName as string,
          currency: order.currency as string,
          exchangeRate: order.exchangeRate as number,
          paymentMethod: "Razorpay",
          paymentStatus: "Paid",
          orderStatus: "PLACED",
          orderDetails: {
            orderId: order.orderId,
            orderDate: formatDate(order.createdAt),
            subTotal: order.subTotal as number,
            totalTax: order.taxTotal as number,
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

    let recipients: string | string[] = process.env.ADMIN_EMAIL!;

    recipients = [process.env.ADMIN_EMAIL!, process.env.ECOMMERCE_EMAIL!];

    await sendEmail({
      to: recipients,
      cc: process.env.ACCOUNT_EMAIL as string,
      bcc: process.env.BCC_EMAIL as string,
      subject: "New order placed on Dr Shikha Sharma Website using Razorpay",
      html: render(
        CustomerOrderAdminMail({
          subjectLine:
            "Someone has placed an order on your Dr Shikha Sharma Website. Here are the details:",
          name: customerName as string,
          currency: order.currency as string,
          exchangeRate: order.exchangeRate as number,
          email: customerEmail as string,
          phoneNumber: customerPhoneNumber as string,
          address: billingAddress?.address || "",
          country: billingAddress?.country || "",
          state: billingAddress?.state || "",
          city: billingAddress?.city || "",
          zip: billingAddress?.zip || "",
          paymentMethod: "Razorpay",
          paymentStatus: "Paid",
          orderStatus: "PLACED",
          orderDetails: {
            orderId: order.orderId,
            orderDate: formatDate(order.createdAt),
            subTotal: order.subTotal as number,
            totalTax: order.taxTotal as number,
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
  } catch (error) {
    console.error("Error handling captured payment:", error);
  }
}

async function handlePaymentFailed(payload: any): Promise<void> {
  try {
    const paymentEntity = payload.payment.entity;
    const orderId = paymentEntity.order_id;

    const order = await db.order.findFirst({
      where: {
        transactionId: orderId,
      },
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
      return;
    }
    await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentStatus: "Failed",
        status: "FAILED",
      },
    });

    //Add the order note in the database
    const noteText = `🚫 Payment attempt failed. Order marked as FAILED.`;

    await db.orderNote.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        note: noteText,
        isSystem: true,
      },
    });
    const billingAddress = order.user.billingAddress[0];
    const customerEmail = billingAddress.email;
    const customerName = billingAddress.name;
    const customerPhoneNumber = billingAddress.phoneNumber;

    const products = order.items.filter(
      (item: ItemWithRelations) => item.product,
    );

    await sendEmail({
      to: customerEmail as string,
      subject: "Payment Issue – Let’s Resolve This Together",
      html: render(
        CustomerOrderConfirmationMail({
          subjectLine: "We Couldn’t Process Your Payment",
          name: customerName as string,
          currency: order.currency as string,
          exchangeRate: order.exchangeRate as number,
          paymentMethod: "Razorpay",
          paymentStatus: "Failed",
          orderStatus: "FAILED",
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
    let recipients: string | string[] = process.env.ADMIN_EMAIL!;

    recipients = [process.env.ADMIN_EMAIL!, process.env.ECOMMERCE_EMAIL!];
    await sendEmail({
      to: recipients,
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
          exchangeRate: order.exchangeRate as number,
          email: customerEmail as string,
          phoneNumber: customerPhoneNumber as string,
          address: billingAddress.address || "",
          country: billingAddress.country || "",
          state: billingAddress.state || "",
          city: billingAddress.city || "",
          zip: billingAddress.zip || "",
          paymentMethod: "Razorpay",
          paymentStatus: "Failed",
          orderStatus: "FAILED",
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
  } catch (error) {
    console.error("Error handling captured payment:", error);
  }
}
