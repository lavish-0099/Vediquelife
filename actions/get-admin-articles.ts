"use server";

import { db } from "@/lib/db";

import { ArticleWithRelations } from "@/types/article-type";

export const getAdminArticles = async (): Promise<ArticleWithRelations[]> => {
  try {
    const articles = await db.post.findMany({
      include: {
        PostCategory: {
          include: {
            category: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return articles;
  } catch (error) {
    console.error("[GET_ADMIN_ARTICLES]", error);
    return [];
  }
};
