import { NextResponse } from "next/server";
import { generateTwoFactorOtp, verificationOtp } from "@/lib/otp";
import { createUser } from "@/lib/create-user";
import { getUserByEmail, getUserByPhone } from "@/data/user";

interface RegisterPayload {
  name: string;
  email: string;
  phoneNumber: string;
  code?: string;
  referralCode?: string;
}
export async function POST(req: Request) {
  try {
    const { name, email, phoneNumber, code, referralCode }: RegisterPayload =
      await req.json();
    console.log("[REGISTER_USER]", { name, email, phoneNumber, code });
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;

    const [existingEmail, existingPhone] = await Promise.all([
      getUserByEmail(email),
      getUserByPhone(formattedPhoneNumber),
    ]);

    if (existingEmail || existingPhone) {
      // Return existing user data with a flag
      return NextResponse.json(
        {
          user: existingEmail || existingPhone,
          alreadyExists: true,
        },
        { status: 200 }
      );
    }

    if (code) {
      const verificationStatus = await verificationOtp(phoneNumber, code);
      if (!verificationStatus.success) {
        return NextResponse.json(
          { error: "Invalid OTP code!" },
          { status: 400 }
        );
      }
    } else {
      const otpSent = await generateTwoFactorOtp(phoneNumber);
      if (!otpSent.success) {
        return NextResponse.json(
          { error: "Failed to send OTP!" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { twoFactor: true, phoneNumber: formattedPhoneNumber },
        { status: 200 }
      );
    }

    const user = await createUser({
      name,
      email,
      phoneNumber: formattedPhoneNumber,
      forcePasswordReset: true,
    });

    if ("error" in user) {
      return NextResponse.json({ error: user.error }, { status: 500 });
    }

    return NextResponse.json({ user, created: true }, { status: 200 });
  } catch (error) {
    console.log("[REGISTER_USER]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
