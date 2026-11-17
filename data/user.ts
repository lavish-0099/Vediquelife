import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserByPhone = async (phoneNumber: string) => {
  try {
    const formattedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+${phoneNumber}`;
    const user = await db.user.findUnique({
      where: { phoneNumber: formattedPhoneNumber },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        userRole: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};
