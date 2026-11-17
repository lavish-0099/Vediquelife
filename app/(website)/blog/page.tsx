import { getArticles } from "@/actions/get-articles";
import { ClientBlogs } from "@/components/blogs/client-blogs";
import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";

const meta = {
  title: "Vedique Blog | Tips on Nutrition, Wellness & Holistic Diet Plans",
  description:
    "Explore expert health tips, wellness advice, nutrition guides, and lifestyle insights from Dr. Shikha Sharma for a healthier, happier life.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/blog.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,

    type: "website",
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [meta.image],
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
  },
};
const BlogPage = async ({
  params,
  searchParams,
}: {
  params: { blogSlug: string };
  searchParams: { k?: string; type?: string };
}) => {
  const articles = await getArticles({
    searchSlug: searchParams.k || undefined,
    searchType: searchParams.type || undefined,
    page: 1,
    limit: 8,
  });

  return (
    <div>
      <PageHeader title="Articles" pageTitle="Articles" className="py-6" />
      <div className="py-12 bg-slate-100">
        <Container>
          <ClientBlogs
            initialArticles={articles}
            keyword={searchParams.k || ""}
            category={searchParams.type || ""}
          />
        </Container>
      </div>
    </div>
  );
};

export default BlogPage;
