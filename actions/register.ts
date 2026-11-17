"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { generateTwoFactorOtp, verificationOtp } from "@/lib/otp";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByPhone } from "@/data/user";
import { createUser } from "@/lib/create-user";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, phoneNumber, code } = validatedFields.data;

  const formattedPhoneNumber = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+${phoneNumber}`;

  // Check if email or phone is already used
  const [existingEmail, existingPhone] = await Promise.all([
    getUserByEmail(email),
    getUserByPhone(formattedPhoneNumber),
  ]);

  if (existingEmail) return { error: "Email already in use!" };
  if (existingPhone) return { error: "Phone number already in use!" };
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
    return { twoFactor: true };
  }

  // Create user locally
  const userResult = await createUser({
    name,
    email,
    phoneNumber: formattedPhoneNumber,
    password,
  });

  if ("error" in userResult) {
    return { error: userResult.error };
  }

  // Auto sign in
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Login successful, Redirecting...", user: userResult };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
