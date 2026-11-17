import { sendOtp } from "@/actions/send-otp";
import { verifyOtp } from "@/actions/verify-otp";

export const generateTwoFactorOtp = async (phoneNumber: string) => {
  const response = await sendOtp(phoneNumber);
  return response;
};

export const verificationOtp = async (phoneNumber: string, code: string) => {
  const response = await verifyOtp(phoneNumber, code);
  return response;
};
