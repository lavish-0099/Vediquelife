import { Role } from "@prisma/client";

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  phoneNumber?: string | null;
  image?: string | null;
  createdAt?: Date;
  updateAt?: Date;
  userRole?: Role;
  isTwoFactorEnabled: boolean;
  isOAuth?: boolean;
};
