import { getProductBySlug } from "@/actions/get-product";
import { Metadata, ResolvingMetadata } from "next";

import ProductPage from "@/components/products/product-page";
import { getRelatedProducts } from "@/actions/get-related-products";
import RelatedProductsSlider from "@/components/products/related-products-slider";
import ProductReviewsSection from "@/components/products/product-reviews-section";
import Container from "@/components/container";
import { redirect } from "next/navigation";
import ProductFaqs from "@/components/products/product-faqs";
import { getProductCoupons } from "@/actions/get-product-coupons";

type Props = {
  params: { productSlug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const productSlug = params.productSlug;

  const product = await getProductBySlug({
    productSlug: productSlug as string,
  });

  if (!product) return {};

  const plainTextDescription = product?.short_description!.replace(
    /<[^>]*>/g,
    "",
  );
  const fallbackDescription = plainTextDescription!.substring(0, 160);
  // Use meta fields if available, else fallback
  const metaTitle = product?.title || "Product";

  return {
    title: `${metaTitle} - Dr. Shikha Sharma's Holistic Diet Plan`,
    description: fallbackDescription,
    openGraph: {
      title: metaTitle,
      description: fallbackDescription,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${productSlug}`,
      type: "website",
      images: [product?.imageUrl as string],
    },
    twitter: {
      title: metaTitle,
      description: fallbackDescription,
      images: [product?.imageUrl as string],
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/product/${productSlug}`,
    },
  };
}

const SingleProductPage = async ({
  params,
}: {
  params: { productSlug: string };
}) => {
  const slug = params.productSlug;

  const product = await getProductBySlug({ productSlug: slug as string });

  if (!product) {
    return redirect("/products");
  }
  const relatedProducts = await getRelatedProducts({ productId: product?.id });
  const coupons = await getProductCoupons(product.id);

  return (
    <div className="w-full pb-8">
      <div className="flex flex-col">
        <div className="w-full flex">
          <ProductPage
            product={product}
            reviews={product.reviews || []}
            relatedProducts={relatedProducts}
            coupons={coupons}
          />
        </div>
        <RelatedProductsSlider relatedProducts={relatedProducts} />
        <div className="w-full flex mt-10">
          <div className="w-full">
            <Container>
              <ProductReviewsSection
                productId={product.id}
                reviews={product.reviews || []}
              />
            </Container>
          </div>
        </div>
        {product && product.productFaqs && product.productFaqs.length > 0 && (
          <div className="w-full flex -mt-10 pt-20">
            <ProductFaqs product={product} className="py-12" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;
