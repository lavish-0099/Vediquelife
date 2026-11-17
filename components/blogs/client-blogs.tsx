"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ArticleCard from "@/components/blogs/article-card";
import { NoArticleFound } from "@/components/blogs/no-article-found";
import { Spinner } from "@/components/ui/spinner";
import { ArticleWithRelations } from "@/types/article-type";

interface ClientBlogsProps {
  initialArticles: ArticleWithRelations[];
  keyword: string;
  category: string;
}

export const ClientBlogs = ({
  initialArticles,
  keyword,
  category,
}: ClientBlogsProps) => {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreArticles();
    }
  }, [inView]);

  const loadMoreArticles = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/articles?k=${keyword}&type=${category}&page=${page}&limit=8`,
    );
    const newArticles = await res.json();

    if (newArticles.length === 0) setHasMore(false);
    else {
      setArticles((prev) => [...prev, ...newArticles]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  if (articles.length === 0) return <NoArticleFound keyparam={keyword} />;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article, i) => (
          <ArticleCard key={i} article={article} />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center mt-6">
          {loading && <Spinner />}
        </div>
      )}
    </div>
  );
};
