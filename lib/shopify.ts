/**
 * Shopify Storefront GraphQL Client
 * Connects directly to your Shopify Store for Products, Blogs/Articles, Metafields (Case Studies & Testimonials), and Carts.
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "vedique-life.myshopify.com";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const SHOPIFY_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2026-10";

export async function shopifyFetch<T = any>({
  query,
  variables = {},
  cache = "force-cache",
  tags,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_VERSION}/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      ...(tags ? { next: { tags, revalidate: 60 } } : { cache }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
    }

    return json.data;
  } catch (error) {
    console.error("Shopify fetch failed:", error);
    throw error;
  }
}

/* ==========================================================================
   PRODUCTS
   ========================================================================== */

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale?: boolean;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  images?: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

export async function getShopifyProducts(limit: number = 20): Promise<ShopifyProduct[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch({
      query,
      variables: { first: limit },
      tags: ["products"],
    });
    return data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch {
    return [];
  }
}

export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        availableForSale
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch({
      query,
      variables: { handle },
      tags: [`product-${handle}`],
    });
    return data?.product || null;
  } catch {
    return null;
  }
}

/* ==========================================================================
   BLOGS & ARTICLES (Add from Shopify Admin -> Online Store -> Blog posts)
   ========================================================================== */

export interface ShopifyArticle {
  id: string;
  title: string;
  handle: string;
  excerpt?: string;
  contentHtml?: string;
  publishedAt: string;
  image?: {
    url: string;
    altText?: string;
  };
  authorV2?: {
    name: string;
  };
  blog?: {
    title: string;
    handle: string;
  };
}

export async function getShopifyArticles(limit: number = 20): Promise<ShopifyArticle[]> {
  const query = `
    query getArticles($first: Int!) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerpt
            contentHtml
            publishedAt
            image {
              url
              altText
            }
            authorV2 {
              name
            }
            blog {
              title
              handle
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch({
      query,
      variables: { first: limit },
      tags: ["articles"],
    });
    return data?.articles?.edges?.map((edge: any) => edge.node) || [];
  } catch {
    return [];
  }
}

export async function getShopifyArticleByHandle(blogHandle: string, articleHandle: string): Promise<ShopifyArticle | null> {
  const query = `
    query getArticleByHandle($blogHandle: String!, $articleHandle: String!) {
      blog(handle: $blogHandle) {
        articleByHandle(handle: $articleHandle) {
          id
          title
          handle
          excerpt
          contentHtml
          publishedAt
          image {
            url
            altText
          }
          authorV2 {
            name
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch({
      query,
      variables: { blogHandle, articleHandle },
      tags: [`article-${articleHandle}`],
    });
    return data?.blog?.articleByHandle || null;
  } catch {
    return null;
  }
}

/* ==========================================================================
   CASE STUDIES & TESTIMONIALS
   Add as Blog Posts (e.g. blog called "case-studies" or "testimonials")
   OR query via Metaobjects / Articles
   ========================================================================== */

export async function getShopifyArticlesByBlog(blogHandle: string, limit: number = 20): Promise<ShopifyArticle[]> {
  const query = `
    query getArticlesByBlog($blogHandle: String!, $first: Int!) {
      blog(handle: $blogHandle) {
        title
        articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              excerpt
              contentHtml
              publishedAt
              image {
                url
                altText
              }
              authorV2 {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch({
      query,
      variables: { blogHandle, first: limit },
      tags: [`blog-${blogHandle}`],
    });
    return data?.blog?.articles?.edges?.map((edge: any) => edge.node) || [];
  } catch {
    return [];
  }
}

/* ==========================================================================
   SHOPIFY CART & CHECKOUT
   ========================================================================== */

export async function createShopifyCart(lines: Array<{ merchandiseId: string; quantity: number }>) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch({
    query,
    variables: { input: { lines } },
    cache: "no-store",
  });

  return data?.cartCreate?.cart;
}

