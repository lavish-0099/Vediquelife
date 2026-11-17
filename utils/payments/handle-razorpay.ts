import axios from "axios";
import { useCouponStore } from "@/store/coupon-store";
type RazorpayPaymentResult =
  | {
      status: "success";
      razorpay_order_id: string;
      razorpay_payment_id: string;
    }
  | {
      status: "cancelled";
      message: string;
    }
  | {
      status: "error";
      message: string;
      error?: any;
    };

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const sendFailedEmail = async (
  orderId: string,
  paymentStatus: string,
  orderStatus: string,
  exchangeRate: number | null
) => {
  try {
    await axios.post("/api/razorpay/sendFailedEmail", {
      orderId,
      paymentStatus,
      orderStatus,
      exchangeRate,
    });
  } catch (error) {
    console.error("Error sending failed email:", error);
  }
};

export const handleRazorpayPayment = () => {
  const { clearCoupon } = useCouponStore();

  const initializeRazorpayPayment = async (
    values: any,
    checkoutData: any,
    productPerDiscountDetails: any,
    exchangeRate: number | null
  ): Promise<RazorpayPaymentResult> => {
    return new Promise(async (resolve, reject) => {
      const res = await initializeRazorpay();
      if (!res) {
        return reject({
          status: "error",
          message: "Razorpay SDK Failed to load",
        });
      }

      const shippingDetails = {
        firstName: values.shipping_firstName || values.billing_firstName,
        lastName: values.shipping_lastName || values.billing_lastName,
        country: values.shipping_country || values.billing_country,
        state: values.shipping_state || values.billing_state,
        city: values.shipping_city || values.billing_city,
        zip: values.shipping_zip || values.billing_zip,
      };

      const razorpayData = {
        id: checkoutData.id,
        orderId: checkoutData.orderId,
        amount: checkoutData.totalAmount,
        userId: checkoutData.userId,
        currency: checkoutData.currency,
        name: `${values.billing_firstName} ${values.billing_lastName}`,
        email: values.billing_email,
        contact: values.billing_phoneNumber,
        address: values.billing_address,
        city: values.billing_city,
        state: values.billing_state,
        country: values.billing_country,
        pincode: values.billing_zip,
        cart_product_data: productPerDiscountDetails,
        Source: "Website",
        shipping_name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
        shipping_address: values.shipping_address || values.billing_address,
        shipping_other_details: `${shippingDetails.country}#${shippingDetails.state}#${shippingDetails.city}#${shippingDetails.zip}`,
        Type: "Premium",
      };

      try {
        const response = await axios.post("/api/razorpay", razorpayData);
        const data = response.data;
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
          name: "Vedique",
          currency: data.currency,
          amount: Math.round(data.amount * 100),
          order_id: data.id,
          description: "Thank you for your interest in Vedique",
          image: "./vedique-logo-with-tagline-2.png",
          notes: {
            name: `${values.billing_firstName} ${values.billing_lastName}`,
            email: values.billing_email,
            contact: values.billing_phoneNumber,
            cart_product_data: productPerDiscountDetails,
            Source: "Website",
            Type: "Premium",
            shipping_name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
            shipping_address: values.shipping_address || values.billing_address,
            shipping_other_details: `${shippingDetails.country}#${shippingDetails.state}#${shippingDetails.city}#${shippingDetails.zip}`,
          },
          handler: function (response: any) {
            if (response.razorpay_payment_id) {
              clearCoupon();
              resolve({
                status: "success",
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              });
            } else {
              sendFailedEmail(
                checkoutData.id,
                "Cancelled",
                "CANCELLED",
                exchangeRate
              );
              resolve({
                status: "cancelled",
                message: "Payment cancelled by user",
              });
            }
          },
          modal: {
            ondismiss: function () {
              sendFailedEmail(
                checkoutData.id,
                "Cancelled",
                "CANCELLED",
                exchangeRate
              );
              resolve({
                status: "cancelled",
                message: "Payment Cancelled",
              });
            },
          },
          prefill: {
            name: `${values.billing_firstName} ${values.billing_lastName}`,
            email: values.billing_email,
            contact: values.billing_phoneNumber,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        reject({
          status: "error",
          message: "Something went wrong during payment initiation",
          error,
        });
      }
    });
  };

  return { initializeRazorpayPayment };
};
