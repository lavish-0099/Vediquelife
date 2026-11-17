"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ArticleWithRelations } from "@/types/article-type";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ArticleCardProps {
  article: ArticleWithRelations;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);
  const articleSlug = article.metaSlug?.trim() || article.slug;
  return (
    <div
      ref={ref}
      className={`max-w-sm min-h-full rounded-md overflow-hidden shadow-lg transform transition-transform hover:shadow-xl hover:-translate-y-1 ${
        isInView ? "animate-slide-up" : ""
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="relative">
          <Link href={`/blog/${articleSlug}`}>
            <Image
              className="w-full"
              src={article.imageUrl || "https://via.placeholder.com/300x200"}
              alt={article.title || "Recipe Image"}
              width={300}
              height={200}
            />
          </Link>
        </div>
        <div className="flex items-center my-2">
          {article.PostCategory && article.PostCategory.length > 0 && (
            <>
              {article.PostCategory.map((category, index) => (
                <Badge
                  className="bg-webprimary text-white mx-2"
                  key={category.category.id}
                >
                  {category.category.title}
                </Badge>
              ))}
            </>
          )}
        </div>
        <div className="px-3 py-2">
          <div className="font-semibold text-xl mb-2">
            <Link href={`/blog/${articleSlug}`}>{article.title}</Link>
          </div>

          <Link href={`/blog/${articleSlug}`}>
            <Button variant="link" size="sm" className="px-0 text-webprimary">
              Read Article
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
