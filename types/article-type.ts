import { Post, PostCategory, Category } from "@prisma/client";
import { CommentWithRelations } from "./comment";

interface PostCategoryWithCategory extends PostCategory {
  category: Category;
}

export interface ArticleWithRelations extends Post {
  PostCategory: PostCategoryWithCategory[];
  articleComments: CommentWithRelations[];
}
