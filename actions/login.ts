"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { BaseSchema } from "@/schemas";
import { signIn } from "@/auth";

import { getUserByEmail, getUserByPhone } from "@/data/user";

import { generateTwoFactorOtp } from "@/lib/otp";

import { currentUser } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (
  values: z.infer<typeof BaseSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = BaseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, phoneNumber, code } = validatedFields.data;

  let existingUser;

  // Check if login is by OTP (phoneNumber) or email/password
  if (phoneNumber) {
    existingUser = await getUserByPhone(phoneNumber);

    if (!existingUser || !existingUser.phoneNumber) {
      return { error: "Phone number does not exist!" };
    }
  } else if (email) {
    existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" };
    }
  }

  if (existingUser && !existingUser.isActive) {
    return { error: "Your account is inactive!" };
  }

  if (phoneNumber && existingUser?.phoneNumber) {
    if (code) {
      try {
        await signIn("credentials", {
          phoneNumber,
          code,
          redirect: false,
        });

        const user = await currentUser();

        return { success: "Login success. Redirecting...", user };
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid OTP code!" };
            default:
              return { error: "Something went wrong!" };
          }
        }
        throw error;
      }
    } else {
      const twoFactorOtp = await generateTwoFactorOtp(phoneNumber);
      if (!twoFactorOtp.success) {
        return { error: "Something went wrong!!" };
      }
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      //redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    const user = await currentUser();

    return { success: "Login success. Redirecting...", user };
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
