import { Comment } from "@prisma/client";

export interface CommentWithRelations extends Comment {
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    createdAt: Date;
    updateAt: Date;
  } | null;

  Post?: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
