"use client";

import { useEffect, useState } from "react";
import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { getArticles } from "@/actions/get-articles";
import { ArticleWithRelations } from "@/types/article-type";
import ArticleCard from "../blogs/article-card";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<ArticleWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchArticles() {
      try {
        const fetchArticles = await getArticles({ featured: true });
        setArticles(fetchArticles);
      } catch (error) {
        console.error("Error fetching initial articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
    return () => {
      controller.abort();
    };
  }, []);
  if (!loading && articles.length === 0) {
    return null; // Do not render anything if there are no articles
  }
  return (
    <div
      className="w-full  flex items-center justify-center pt-12 pb-10 "
      id="products"
    >
      <Container>
        <div className="mx-auto flex flex-col  items-center justify-between">
          <h3 className="text-4xl text-webblue mb-10">
            Latest<span className="text-webprimary"> Articles</span>
          </h3>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-3 p-4 border rounded-lg min-w-[300px]"
                >
                  <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center">
              {articles.map((article, index) => (
                <div key={index} className="my-4 flex flex-col w-full text-sm">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default FeaturedArticles;
