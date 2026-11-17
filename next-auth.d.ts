import NextAuth, { User, type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isActive: boolean;
  image?: string;
  createdAt?: Date;
  updateAt?: Date;
  role: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
