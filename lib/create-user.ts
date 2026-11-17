import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/mail";
import { render } from "@react-email/render";
import WelcomeSocialLoginMail from "@/emails/welcome-social-login-mail";

interface CreateUserOptions {
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
  forcePasswordReset?: boolean;
}

export async function createUser({
  name,
  email,
  password,
  phoneNumber,
  forcePasswordReset = false,
}: CreateUserOptions) {
  try {
    let userRole = await db.role.findFirst({ where: { name: "USER" } });
    if (!userRole) {
      userRole = await db.role.create({ data: { name: "USER" } });
    }

    const defaultPassword = process.env.DEFAULT_USER_PASSWORD || "Vedique@123";
    const hashedPassword = await bcrypt.hash(password || defaultPassword, 10);

    const createdUser = await db.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        roleId: userRole.id,
        emailVerified: new Date(),
        forcePasswordReset,
      },
      include: { userRole: true },
    });
    const firstName = (name || "").trim().split(" ")[0] || "Patron";
    await sendEmail({
      to: email,
      subject: `Welcome to Vedique, ${firstName} — Let’s Get You Started`,
      html: render(WelcomeSocialLoginMail({ name, forcePasswordReset })),
    });

    return createdUser;
  } catch (error) {
    console.error("Error during user registration:", error);
    return { error: "Something went wrong during user registration!" };
  }
}
