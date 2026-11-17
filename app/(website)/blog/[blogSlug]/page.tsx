import { Metadata } from "next";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";

import Container from "@/components/container";

import { PageHeader } from "@/components/page-header";
import { getArticleBySlug } from "@/actions/get-article";
import ArticleBannerCard from "@/components/blogs/article-banner-card";
import ArticleDetails from "@/components/blogs/article-details";
import ArticleSidebar from "@/components/blogs/article-sidebar";
import ArticleComments from "@/components/blogs/article-comments";
import ArticleShareSection from "@/components/blogs/article-share-section";

export async function generateMetadata(params: {
  blogSlug: string;
}): Promise<Metadata> {
  const blogSlug = params.blogSlug;

  const article = await getArticleBySlug({
    blogSlug: blogSlug as string,
  });

  if (!article) return {};

  const plainTextDescription = article?.content!.replace(/<[^>]*>/g, "");
  const fallbackDescription = plainTextDescription!.substring(0, 160);
  // Use meta fields if available, else fallback
  const metaTitle = article?.metaTitle?.trim() || article?.title || "Article";

  const metaDescription =
    article?.metaDescription?.trim() || fallbackDescription;

  const metaSlug = article?.metaSlug?.trim() || blogSlug;

  return {
    title: `${metaTitle} - Dr. Shikha Sharma's Holistic Diet Plan`,
    description: metaDescription,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${metaSlug}`,
      type: "article",
      images: [article?.imageUrl as string],
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      images: [article?.imageUrl as string],
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${metaSlug}`,
    },
  };
}

const SingleArticlePage = async ({
  params,
}: {
  params: { blogSlug: string };
}) => {
  const slug = params.blogSlug;

  const article = await getArticleBySlug({ blogSlug: slug as string });

  if (!article) {
    return notFound();
  }

  const categories = await db.category.findMany({
    orderBy: {
      title: "asc",
    },
  });
  const plainTextDescription = article?.content!.replace(/<[^>]*>/g, "");
  const fallbackDescription = plainTextDescription!.substring(0, 160);
  const metaDescription =
    article?.metaDescription?.trim() || fallbackDescription;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: metaDescription,
    author: {
      "@type": "Person",
      name: "Team Dr Shikha Sharma",
    },
    datePublished: new Date(article.createdAt).toISOString(),
    dateModified: new Date(
      article.updatedAt || article.createdAt,
    ).toISOString(),
    image: {
      "@type": "ImageObject",
      url:
        article.imageUrl ||
        `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/blog.webp`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_APP_URL}/blog/${
        article.metaSlug || article.slug
      }`,
    },
    publisher: {
      "@type": "Organization",
      name: "Dr Shikha Sharma",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="w-full bg-slate-100 pb-8">
        <PageHeader title="Articles" pageTitle="Articles" className="py-6" />
        <Container>
          <div className="flex flex-col md:flex-row ">
            <div className="w-full lg:w-4/6 mr-0 lg:mr-8">
              <ArticleBannerCard
                article={article}
                className="py-10 lg:py-8 mb-7 md:mb-2 xl:mb-2"
              />
              <ArticleDetails article={article} />
              <ArticleShareSection article={article} />
              <ArticleComments
                comments={article?.articleComments}
                articleId={article.id}
              />
            </div>
            <div className="w-full lg:w-2/6">
              <ArticleSidebar categories={categories} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SingleArticlePage;
