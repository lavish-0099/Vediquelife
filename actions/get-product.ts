"use server";

import { getShopifyProductByHandle } from "@/lib/shopify";

export const getProductBySlug = async ({
  productSlug,
}: {
  productSlug?: string;
}): Promise<any | null> => {
  try {
    if (!productSlug) {
      return null;
    }

    const p = await getShopifyProductByHandle(productSlug);
    if (!p) return null;

    const firstVariant = p.variants?.edges?.[0]?.node;
    const price = firstVariant?.price?.amount ? parseFloat(firstVariant.price.amount) : 0;
    const images = p.images?.edges?.map((e) => ({
      id: e.node.url,
      url: e.node.url,
    })) || [];

    return {
      id: p.id,
      title: p.title,
      slug: p.handle,
      description: p.description,
      descriptionHtml: p.descriptionHtml,
      price,
      discountedPrice: price,
      imageUrl: p.featuredImage?.url || images[0]?.url || "",
      isPublished: p.availableForSale ?? true,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: "general",
      ProductCategories: {
        id: "general",
        name: "Shopify Collection",
        slug: "all",
      },
      ProductGallery: images,
      productBenefits: [],
      productDirectionsForUse: [],
      productFaqs: [],
      ProductIngredients: [],
      reviews: [],
      variants: p.variants?.edges?.map((e) => e.node) || [],
    };
  } catch (error) {
    console.error("[GET_PRODUCT_BY_SLUG_ERROR]", error);
    return null;
  }
};
