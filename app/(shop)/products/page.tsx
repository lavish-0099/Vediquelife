import { getIngredients } from "@/actions/get-ingredients";
import { getProducts } from "@/actions/get-products";
import Container from "@/components/container";
import ProductCard from "@/components/products/product-card";
import DiscoverMoreSection from "@/components/shop/discover-more-section";
import KeyIngredientsSlider from "@/components/shop/key-ingredients-slider";
import ShopHeroBannerCard from "@/components/shop/shop-hero-banner-card";
import { Metadata } from "next";

const meta = {
  title:
    "Shop Herbal Products | Vedique Ayurveda – Authentic Ayurvedic Wellness",
  description:
    "Explore Vedique Ayurveda’s range of authentic herbal products, wellness teas, and Ayurvedic supplements. Crafted with ancient Ayurvedic wisdom for natural healing, balance, and holistic well-being.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/products.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/products`,

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
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/products`,
  },
};
const ProductsPage = async () => {
  const [products, ingredients] = await Promise.all([
    getProducts({}),
    getIngredients(),
  ]);

  const featuredIngredients = ingredients.filter(
    (ingredient) => ingredient.isFeatured
  );

  return (
    <div>
      <ShopHeroBannerCard
        heading="Nature’s Blends, Mindfully Crafted"
        subheading="Experience Vedique Products "
        description="Discover herbal infusions and wellness blends crafted to support your health, naturally."
        secondaryText="Each Vedique blend reflects a belief that real wellness begins with nature and mindful living."
        ingredients={featuredIngredients}
      />
      {/* <PageHeader title="Products" className="py-6" /> */}
      <div className="py-12 flex bg-[#fdfaf1]">
        <Container>
          <div className="flex justify-center gap-6 flex-wrap">
            {products.map((product, index) => (
              <div key={index} className="w-[280px]">
                <ProductCard product={product} reviews={product.reviews} />
              </div>
            ))}
          </div>
          <KeyIngredientsSlider ingredients={featuredIngredients} />
          <DiscoverMoreSection className="mt-6" />
        </Container>
      </div>
    </div>
  );
};

export default ProductsPage;
