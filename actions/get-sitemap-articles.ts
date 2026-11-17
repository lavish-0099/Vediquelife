"use server";

import { db } from "@/lib/db";
import { Post } from "@prisma/client";

export const getSitemapArticles = async (): Promise<Post[]> => {
  try {
    let articles;

    articles = await db.post.findMany({
      where: {
        isPublished: true,
      },

      orderBy: { createdAt: "desc" },
    });

    return articles;
  } catch (error) {
    console.error("[GET_SITEMAP_ARTICLES]", error);
    return [];
  }
};
