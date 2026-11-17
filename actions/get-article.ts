import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ArticleWithRelations } from "@/types/article-type";

export const getArticleBySlug = async ({
  blogSlug,
}: {
  blogSlug?: string;
  websiteName?: string;
}): Promise<ArticleWithRelations | null> => {
  try {
    if (blogSlug === undefined) {
      throw new Error("Article slug is required");
    }

    const user = await currentUser();
    const userId: string | undefined = user?.id;

    const post = await db.post.findFirst({
      where: {
        isPublished: true,
        OR: [{ slug: blogSlug }, { metaSlug: blogSlug }],
      },
      include: {
        PostCategory: {
          include: {
            category: true,
          },
        },
        articleComments: {
          where: {
            OR: [{ isPublished: true }, { userId }],
          },
          include: {
            user: true,
            Post: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.log("[GET_ARTICLE_BY_SLUG]", error);
    return null;
  }
};
