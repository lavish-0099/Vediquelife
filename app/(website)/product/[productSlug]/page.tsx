import { getProductBySlug } from "@/actions/get-product";
import { getProducts } from "@/actions/get-products";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import VediquePDP, { PdpProduct, PdpRelated } from "@/components/products/vedique-pdp";

type Props = {
  params: { productSlug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const productSlug = params.productSlug;
  const product = await getProductBySlug({ productSlug });

  if (!product) return {};

  const description =
    product.description ||
    product.short_description ||
    "Authentic Ayurvedic wellness product by Vedique.";
  const metaTitle = product.title || "Product";

  return {
    title: `${metaTitle} | Vedique Ayurveda`,
    description: description.substring(0, 160),
    openGraph: {
      title: metaTitle,
      description: description.substring(0, 160),
      url: `${process.env.NEXT_PUBLIC_APP_URL}/product/${productSlug}`,
      type: "website",
      images: product.imageUrl ? [product.imageUrl] : [],
    },
    twitter: {
      title: metaTitle,
      description: description.substring(0, 160),
      images: product.imageUrl ? [product.imageUrl] : [],
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/product/${productSlug}`,
    },
  };
}

export default async function SingleProductPage({
  params,
}: {
  params: { productSlug: string };
}) {
  const slug = params.productSlug;
  const product = await getProductBySlug({ productSlug: slug });

  if (!product) {
    return redirect("/products");
  }

  // Fetch all products to populate "You might also like"
  const allProducts = await getProducts({});
  const relatedList: PdpRelated[] = allProducts
    .filter((p: any) => p.slug !== slug)
    .slice(0, 4)
    .map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.ProductCategories?.name || "Herbal Products",
      price: typeof p.price === "number" ? p.price : parseFloat(p.price) || 0,
      image: p.imageUrl || "",
      rating: 4.8,
    }));

  // Build images array
  const galleryImages: string[] =
    product.ProductGallery?.map((g: any) => g.url).filter(Boolean) || [];
  const images = galleryImages.length > 0 ? galleryImages : product.imageUrl ? [product.imageUrl] : [];

  // Parse details / tabs if available or provide structured defaults
  const details: PdpProduct["details"] = {
    amountAndMethod: [
      "Take 1-2 gummies or servings daily as directed by your physician or wellness expert.",
      "Best consumed with warm water or after a light meal for optimal digestion and absorption.",
    ],
    howToUse: [
      "Incorporate into your daily morning or evening routine for consistent wellness support.",
      "Store in a cool, dry place away from direct sunlight.",
    ],
    benefits: [
      "Formulated with authentic Ayurvedic herbs to balance your Prakriti and support vitality.",
      "100% natural, scientifically backed, with no artificial fillers or harsh chemicals.",
    ],
    ingredients: [
      "Pure standardized herbal extracts formulated under strict GMP certified guidelines.",
      "Rooted in ancient Charak Samhita principles combined with modern clinical precision.",
    ],
    returnPolicy: [
      "We offer a 7-day hassle-free return or replacement policy for damaged or unopened items.",
      "Contact our wellness support team via the Vedique app or support@vediquelife.com.",
    ],
  };

  // Build variants if any from Shopify
  const variants =
    product.variants?.map((v: any) => ({
      id: v.id,
      label: v.title === "Default Title" ? "Standard" : v.title,
      price: v.price?.amount ? parseFloat(v.price.amount) : product.price,
    })) || [];

  const pdpData: PdpProduct = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    category: product.ProductCategories?.name || "Authentic Ayurvedic Formulation",
    categoryHref: "/products",
    price: product.price ?? 0,
    compareAtPrice:
      product.originalPrice && product.originalPrice > product.price
        ? product.originalPrice
        : undefined,
    images,
    stock: product.isPublished ? 50 : 0,
    rating: 4.9,
    reviewCount: 42,
    purchasedCount: 128,
    badge: "Best Seller",
    variants: variants.length > 1 ? variants : undefined,
    variantLabel: "Option",
    details,
  };

  return <VediquePDP product={pdpData} related={relatedList} moreProductsHref="/products" />;
}
