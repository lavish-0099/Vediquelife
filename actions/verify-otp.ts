"use server";

import axios from "axios";

export async function verifyOtp(
  phoneNumber: string,
  code: string
): Promise<{
  success: boolean;
  message: string;
}> {
  const otpEndpoint = process.env.NEXT_PUBLIC_OTP_ENDPOINT;
  const apiKey = process.env.OTP_API_KEY;
  if (!otpEndpoint || !apiKey) {
    throw new Error("API endpoint or API key is missing");
  }
  try {
    const response = await axios.get(
      `${otpEndpoint}?number=${phoneNumber}&otp=${code}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    if (response.status === 200) {
      if (response.data === true) {
        return {
          success: true,
          message: "OTP verified successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to verify OTP, please try again.",
        };
      }
    } else {
      return {
        success: false,
        message: "Failed to verify OTP, please try again.",
      };
    }
  } catch (error) {
    console.error("Error occurred while verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
}
