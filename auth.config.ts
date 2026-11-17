import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { BaseSchema } from "@/schemas";
import { getUserByEmail, getUserByPhone } from "@/data/user";
import { verificationOtp } from "./lib/otp";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = BaseSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null; // Invalid fields
        }

        const { email, password, phoneNumber, code } = validatedFields.data;

        let user;
        if (phoneNumber) {
          user = await getUserByPhone(phoneNumber);
          if (!user || !user.phoneNumber) return null;
          if (code && phoneNumber) {
            const isValidOtp = await verificationOtp(phoneNumber, code);
            if (isValidOtp.success) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } else if (email && password) {
          const user = await getUserByEmail(email!);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password!, user.password);
          if (passwordsMatch) return user;

          return null;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
