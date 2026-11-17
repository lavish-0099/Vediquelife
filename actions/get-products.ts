"use server";

import { getShopifyProducts } from "@/lib/shopify";

export const getProducts = async (_params?: {
  title?: string;
  categoryId?: string;
}): Promise<any[]> => {
  try {
    const shopifyProducts = await getShopifyProducts(50);

    // Map Shopify product format to the application's expected product shape
    return shopifyProducts.map((p) => {
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
        productGallery: images,
        reviews: [],
        variants: p.variants?.edges?.map((e) => e.node) || [],
      };
    });
  } catch (error) {
    console.error("[GET_SHOPIFY_PRODUCTS_ERROR]", error);
    return [];
  }
};
