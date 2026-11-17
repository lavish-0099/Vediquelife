"use server";

import axios from "axios";

export async function sendOtp(destination: string): Promise<{
  success: boolean;
  error: boolean;
  message: string;
}> {
  const otpEndpoint = process.env.NEXT_PUBLIC_OTP_ENDPOINT;
  const apiKey = process.env.OTP_API_KEY;

  if (!otpEndpoint || !apiKey) {
    throw new Error("API endpoint or API key is missing");
  }

  const isEmail = destination.includes("@");

  const queryKey = isEmail ? "email" : "number";

  try {
    const response = await axios.post(
      `${otpEndpoint}?${queryKey}=${destination}&source=Vedique`,
      {},
      {
        headers: {
          "Content-Type": " ",
          "x-api-key": apiKey,
        },
      }
    );
    if (response.status === 200) {
      if (response.data === null) {
        return {
          success: true,
          error: false,
          message: "OTP sent successfully",
        };
      } else {
        return {
          error: true,
          success: false,
          message: "Failed to send OTP, please try again.",
        };
      }
    } else {
      return {
        error: true,
        success: false,
        message: "Failed to send OTP, please try again.",
      };
    }
  } catch (error) {
    console.error("Error occurred while sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
}
