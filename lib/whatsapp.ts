import axios from "axios";

type WhatsAppPayload = {
  phone: string | null;
  firstName: string | null | undefined;
  productName: string;
};

export const sendOrderConfirmationWhatsApp = async ({
  phone,
  firstName,
  productName,
}: WhatsAppPayload) => {
  try {
    const baseUrl =
      process.env.WHATSAPP_API_URL ||
      "https://backend.api-wa.co/campaign/combirds/api/v2";
    const payload = {
      apiKey: process.env.WHATSAPP_API_KEY,
      campaignName: "product_order_confirmation",
      destination: phone, // e.g. 9182xxxxxxx (country code ke saath)
      userName: "Ranfort Wellness",

      templateParams: [
        firstName, // {{1}}
        productName, // {{2}}
      ],

      source: "website-order",
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      attributes: {},

      paramsFallbackValue: {
        FirstName: firstName || "Customer",
      },
    };

    const response = await axios.post(baseUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error: any) {
    console.error("WhatsApp error:", error.response?.data || error.message);
    throw error;
  }
};
