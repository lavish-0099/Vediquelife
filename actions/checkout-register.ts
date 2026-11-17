"use server";

import * as z from "zod";
import { generateTwoFactorOtp, verificationOtp } from "@/lib/otp";
import { checkoutRegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByPhone } from "@/data/user";
import { createUser } from "@/lib/create-user";

export const checkoutRegister = async (
  values: z.infer<typeof checkoutRegisterSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = checkoutRegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, phoneNumber, code } = validatedFields.data;

  const formattedPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+${phoneNumber}`;

  // Check if email or phone is already used
  const [existingEmail, existingPhone] = await Promise.all([
    getUserByEmail(email),
    getUserByPhone(formattedPhoneNumber),
  ]);

  if (existingEmail || existingPhone) {
    return { user: existingEmail || existingPhone };
  }
  const isIndianNumber =
    phoneNumber.startsWith("+91") || phoneNumber.startsWith("91");
  // OTP verification
  if (code) {
    const verificationStatus = await verificationOtp(
      isIndianNumber ? phoneNumber : email,
      code
    );
    if (!verificationStatus.success) {
      return { error: "Invalid OTP code!" };
    }
  } else {
    const twoFactor = await generateTwoFactorOtp(
      isIndianNumber ? phoneNumber : email
    );

    if (!twoFactor.success) {
      return { error: "Failed to send OTP!" };
    }
    return { twoFactor: true, phoneNumber: formattedPhoneNumber };
  }

  // Create user locally
  const userResult = await createUser({
    name,
    email,
    phoneNumber: formattedPhoneNumber,
    forcePasswordReset: true,
  });

  if ("error" in userResult) {
    return { error: userResult.error };
  }

  return { user: userResult };
};
