import { getFormattedDateTimeForCOD } from "@/lib/formateOrderDateForCOD";
import axios from "axios";

export async function handleCOD(
  values: any,
  checkoutData: any,
  productPerDiscountDetails: any
): Promise<{ success: boolean }> {
  const codData = {
    firstName: values.billing_firstName,
    lastName: values.billing_lastName,
    email: values.billing_email,
    phoneNumber: values.billing_phoneNumber,
    billingAddress: values.billing_address,
    city: values.billing_city,
    state: values.billing_state,
    zip: values.billing_zip,
    country: values.billing_country,
    shippingFirstName: values.shipping_firstName || values.billing_firstName,
    shippingLastName: values.shipping_lastName || values.billing_lastName,
    shippingEmail: values.shipping_email || values.billing_email,
    shippingPhoneNumber:
      values.shipping_phoneNumber || values.billing_phoneNumber,
    shippingAddress: values.shipping_address || values.billing_address,
    shippingCity: values.shipping_city || values.billing_city,
    shippingState: values.shipping_state || values.billing_state,
    shippingZip: values.shipping_zip || values.billing_zip,
    shippingCountry: values.shipping_country || values.billing_country,
    cart_product_data: productPerDiscountDetails,
    Source: "Website",
    Website_name: "Dr Shikha Sharma",
    amount: checkoutData.totalAmount,
    currency: checkoutData.currency,
    orderId: checkoutData.orderId,
    id: checkoutData.id,
    paymentMethod: checkoutData.paymentMethod,
    userId: checkoutData.userId,
    date_created: getFormattedDateTimeForCOD(),
  };
  try {
    const response = await axios.post("/api/cod", codData);
    return { success: response.status === 200 };
  } catch (error) {
    console.error("COD request failed:", error);
    return { success: false };
  }
}
