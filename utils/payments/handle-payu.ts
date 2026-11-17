import axios from "axios";
import { getFormattedDateTime } from "@/lib/formateOrderDate";

export const initializePayUPayment = async (
  values: any,
  checkoutData: any,
  productPerDiscountDetails: any
): Promise<void> => {
  const formattedDate = getFormattedDateTime();
  const payUData = {
    amount: checkoutData.totalAmount,
    currency: checkoutData.currency,
    productinfo: checkoutData.orderId + " " + formattedDate,
    firstname: values.billing_firstName,
    lastname: values.billing_lastName,
    address1: values.billing_address,
    address2: values.shipping_address || values.billing_address,
    city: values.billing_city,
    state: values.billing_state,
    country: values.billing_country,
    zipCode: values.billing_zip,
    email: values.billing_email,
    phone: values.billing_phoneNumber,
    udf1: `${checkoutData.id}#${formattedDate}`,
    udf2: productPerDiscountDetails,
    udf3: `${values.billing_address}#@#${values.billing_country}#@#${values.billing_state}#@#${values.billing_city}#@#${values.billing_zip}`,
    udf4: values.shipping_address || values.billing_address,
    udf5: `${values.shipping_country || values.billing_country}#@#${
      values.shipping_state || values.billing_state
    }#@#${values.shipping_city || values.billing_city}#@#${
      values.shipping_zip || values.billing_zip
    }`,
    orderId: checkoutData.orderId,
    userId: checkoutData.userId,
    id: checkoutData.id,
  };

  const response = await axios.post("/api/payu", payUData);
  const data = response.data;

  // Dynamically create and submit form
  const form = document.createElement("form");
  form.action = data.action;
  form.method = "POST";

  Object.keys(data).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
