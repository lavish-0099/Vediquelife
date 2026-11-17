"use client";

import { useState, useEffect } from "react";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { ProductCategories, Products } from "@prisma/client";
import Container from "@/components/container";
import { formatCurrency } from "@/lib/formatCurrency";
import { useUserCountry } from "@/context/user-country-context";
import { Preview } from "@/components/preview";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import { CartItem } from "@/types/cart-item";
import dynamic from "next/dynamic";
import { StarRatingSkeleton } from "@/components/start-rating-skelton";
import { ReviewWithRelations } from "@/types/review";
import { Badge } from "../ui/badge";
import { FaStar } from "react-icons/fa";
import { ProductImage } from "./product-image";
import { createCartItem } from "@/lib/create-cart-item";
import BuyNowButton from "../cart/buy-now-button";
import ProductAccordition from "./product-accordition";
import FrequentlyBoughtTogether from "./frequently-bought-together";
import { ProductWithCategory } from "@/types/product";
import ProductBenefits from "./product-benefits";
import ProductOffer from "./product-offer";
import ProductSubOffer from "./product-sub-offer";
import { useCartStore } from "@/store/cart-store";
import { Coupon } from "@/types/coupon";

interface ProductPageProps {
  product: ProductWithCategory;
  relatedProducts: (Products & {
    ProductCategories: ProductCategories;
    reviews?: ReviewWithRelations[];
  })[];
  reviews?: ReviewWithRelations[];
  className?: string;
  coupons: Coupon[];
}

const DynamicStarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
  loading: () => <StarRatingSkeleton />,
});

const ProductPage = ({
  product,
  relatedProducts,
  reviews,
  coupons,
  className,
}: ProductPageProps) => {
  const [originalPrice, setOriginalPrice] = useState<number>(
    product.price ?? 0,
  );
  const [salePrice, setSalePrice] = useState<number | null>(
    product.salePrice ?? product.price,
  );
  const [displayPrice, setDisplayPrice] = useState<number>(
    product.salePrice ?? product.price ?? 0,
  );
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const { userCurrency, userCountry, exchangeRate } = useUserCountry();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const setActiveCartItem = useCartStore((state) => state.setActiveCartItem);
  useEffect(() => {
    if (cartItem) {
      setActiveCartItem(cartItem);
    }

    return () => {
      setActiveCartItem(null); // page leave par clear
    };
  }, [cartItem, setActiveCartItem]);
  useEffect(() => {
    const prepareCartItem = async () => {
      const item = await createCartItem({
        item: {
          id: product.id,
          title: product.title,
          price: product.price ?? 0,
          int_price: product.int_price ?? 0,
          salePrice: product.salePrice ?? 0,
          int_salePrice: product.int_salePrice ?? 0,
          taxRate: product.taxRate ?? 0,
          taxAmount: product.taxAmount ?? 0,
          imageUrl: product.imageUrl || "/assets/default-product.png",
          crmId: product.crmId,
          slug: product.slug,
          stock: product.stock,
        },
        userCountry,
        userCurrency,
      });
      setCartItem(item);
    };

    if (userCountry && userCurrency) {
      prepareCartItem();
    }
  }, [product, userCountry, userCurrency]);

  useEffect(() => {
    if (!userCountry) return;

    if (userCountry === "IN") {
      const price = product.price ?? 0;
      const offer = product.salePrice ?? null;

      setOriginalPrice(price);

      if (offer && offer < price) {
        setSalePrice(offer);
        setDisplayPrice(offer);

        const discount = ((price - offer) / price) * 100;
        setDiscountPercent(Math.round(discount));
      } else {
        setSalePrice(null);
        setDisplayPrice(price);
        setDiscountPercent(null);
      }
    } else {
      const price = (product.int_price ?? 0) * (exchangeRate ?? 1);
      const offer = product.int_salePrice
        ? product.int_salePrice * (exchangeRate ?? 1)
        : null;

      const roundedPrice = +price.toFixed(2);

      setOriginalPrice(roundedPrice);

      if (offer && offer < roundedPrice) {
        const roundedOffer = +offer.toFixed(2);

        setSalePrice(roundedOffer);
        setDisplayPrice(roundedOffer);

        const discount = ((roundedPrice - roundedOffer) / roundedPrice) * 100;
        setDiscountPercent(Math.round(discount));
      } else {
        setSalePrice(null);
        setDisplayPrice(roundedPrice);
        setDiscountPercent(null);
      }
    }
  }, [userCountry, exchangeRate, product]);

  const averageRating = () => {
    if (reviews && reviews.length > 0) {
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avg = sum / reviews.length;
      return parseFloat(avg.toFixed(1));
    }
    return 0;
  };

  return (
    <div className={cn("w-full", className)}>
      <Container>
        <div className="bg-white  lg:p-8">
          {/* MAIN LAYOUT: MOBILE = COLUMN, DESKTOP = 2 COLUMNS */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            {/* LEFT COLUMN: IMAGE */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
              <ProductImage product={product} />
            </div>

            {/* RIGHT COLUMN: CONTENT */}
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 p-0 flex flex-col">
              <div className="mb-4">
                <div className="inline-block rounded-full text-sm font-medium uppercase mb-2 bg-webyellow text-webtertiary px-3 py-1">
                  {product.ProductCategories.name}
                </div>

                <h1 className="text-2xl md:text-3xl font-medium text-webprimary mb-2">
                  {product.title}
                </h1>
                <div className="mb-4">
                  <Preview value={product.short_description!} />
                </div>
                {reviews && reviews.length > 0 && (
                  <div className="flex items-center py-2">
                    <Badge
                      color="primary"
                      className="mr-2 bg-webprimary text-white hover:bg-webvedique hover:text-white text-xs"
                    >
                      {averageRating() >= 4.5 ? (
                        <FaStar className="h-4 w-4 mr-1" />
                      ) : (
                        <FaRegStarHalfStroke className="h-4 w-4 mr-1" />
                      )}
                      {`${averageRating()}/5`}
                    </Badge>
                    <DynamicStarRatings
                      rating={averageRating()}
                      starRatedColor="#eec400"
                      starEmptyColor="gray"
                      numberOfStars={5}
                      starDimension="22px"
                      starSpacing="1px"
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-webprimary">
                    {formatCurrency(displayPrice, userCurrency)}
                  </span>

                  {salePrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(originalPrice, userCurrency)}
                    </span>
                  )}

                  {discountPercent && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 px-2 py-1 text-xs font-semibold">
                      {discountPercent}% OFF
                    </Badge>
                  )}
                </div>

                <ProductOffer coupons={coupons} />
                <ProductBenefits product={product} />

                {/* CTA BUTTONS */}
                <div className="mt-6">
                  {cartItem && userCountry === "IN" && product.stock ? (
                    product.stock > 0 ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <AddToCartButton
                          item={cartItem}
                          btnText="Add to Cart"
                        />
                        <BuyNowButton
                          item={cartItem}
                          btnText="Buy Now"
                          className="sm:ml-2"
                        />
                      </div>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Out of stock
                      </span>
                    )
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Out of stock
                    </span>
                  )}
                </div>

                {/* Product Details Section */}
                <div className="mt-6">
                  <ProductAccordition product={product} />
                </div>

                {/* Offers / FBT – bottom area */}
                {/* <div className="mt-6">
                  <ProductSubOffer
                    products={[product, ...relatedProducts.slice(0, 2)]}
                  />
                </div> */}

                <div className="mt-6">
                  <FrequentlyBoughtTogether
                    products={[product, ...relatedProducts.slice(0, 2)]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
