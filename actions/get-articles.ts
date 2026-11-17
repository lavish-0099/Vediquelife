"use server";

import { getShopifyArticles } from "@/lib/shopify";

export const getArticles = async (_params?: any): Promise<any[]> => {
  try {
    const articles = await getShopifyArticles(50);

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.handle,
      excerpt: article.excerpt || "",
      content: article.contentHtml || "",
      imageUrl: article.image?.url || "",
      publishedAt: article.publishedAt,
      isPublished: true,
      author: article.authorV2?.name || "Vedique Life",
      PostCategory: [],
      articleComments: [],
      category: article.blog?.title || "Blog",
    }));
  } catch (error) {
    console.error("[GET_SHOPIFY_ARTICLES_ERROR]", error);
    return [];
  }
};
