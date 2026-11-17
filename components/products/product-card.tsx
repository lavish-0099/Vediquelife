"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useUserCountry } from "@/context/user-country-context";
import { Products, ProductCategories } from "@prisma/client";
import { CartItem } from "@/types/cart-item";
import { ReviewWithRelations } from "@/types/review";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { StarRatingSkeleton } from "@/components/start-rating-skelton";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";
import { createCartItem } from "@/lib/create-cart-item";
import AddToCart from "../cart/add-to-cart-button";
import { useCartStore } from "@/store/cart-store";

interface ProductCardProps {
  product: Products & { ProductCategories: ProductCategories };
  reviews?: ReviewWithRelations[];
}

const DynamicStarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
  loading: () => <StarRatingSkeleton />,
});

const ProductCard = ({ product, reviews }: ProductCardProps) => {
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { userCurrency, userCountry, exchangeRate } = useUserCountry();
  const { checkoutIntent, clearCheckoutIntent } = useCartStore();

  useEffect(() => {
    if (checkoutIntent?.type === "BUY_NOW") {
      clearCheckoutIntent();
    }
  }, [checkoutIntent]);

  useEffect(() => {
    const prepareCartItem = async () => {
      const cartItems = await createCartItem({
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
      setCartItem(cartItems);
    };

    if (userCountry && userCurrency) {
      prepareCartItem();
    }
  }, [product, userCountry, userCurrency]);

  const { displayPrice, originalPrice, currencyLabel, discountPercent } =
    useMemo(() => {
      let basePrice = 0;
      let offerPrice: number | null = null;
      let currency = "";

      if (userCountry === "IN") {
        basePrice = product.price ?? 0;
        offerPrice = product.salePrice ?? null;
        currency = "Rs.";
      } else {
        basePrice = (product.int_price ?? 0) * (exchangeRate ?? 1);
        offerPrice = product.int_salePrice
          ? product.int_salePrice * (exchangeRate ?? 1)
          : null;
        currency = userCurrency || "USD";
      }

      const roundedBase = +basePrice.toFixed(2);

      if (offerPrice && offerPrice < roundedBase) {
        const roundedOffer = +offerPrice.toFixed(2);
        const discount = ((roundedBase - roundedOffer) / roundedBase) * 100;

        return {
          displayPrice: roundedOffer,
          originalPrice: roundedBase,
          currencyLabel: currency,
          discountPercent: Math.round(discount),
        };
      }

      return {
        displayPrice: roundedBase,
        originalPrice: null,
        currencyLabel: currency,
        discountPercent: null,
      };
    }, [product, userCountry, userCurrency, exchangeRate]);

  const averageRating = () => {
    if (reviews && reviews.length > 0) {
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const avg = sum / reviews.length;
      return parseFloat(avg.toFixed(1));
    }
    return 0;
  };

  return (
    <div className="relative overflow-visible group max-w-sm min-h-full border border-slate-200 bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      {discountPercent && (
        <div className="absolute top-2 right-2 z-40">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-webprimary text-white text-xs font-semibold shadow-lg">
            {discountPercent}% <br /> OFF
          </div>
        </div>
      )}
      <div className="h-full flex flex-col">
        {/* IMAGE WRAPPER */}
        <Link href={`/product/${product.slug}`}>
          <div className="px-4 pt-4">
            <div className="relative w-full rounded-lg bg-slate-50/80 border border-slate-100 overflow-hidden flex items-center justify-center aspect-square">
              <Image
                className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                src={product.imageUrl || "/assets/default-product.png"}
                alt={product.title || "Product Image"}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority={false}
              />
            </div>
          </div>
        </Link>

        {/* CONTENT */}
        <div className="px-4 py-3 flex-1 flex flex-col">
          <div className="text-webpink text-xs font-semibold mb-1 uppercase tracking-wide">
            {product.ProductCategories.name}
          </div>

          <Link href={`/product/${product.slug}`}>
            <div className="text-sm md:text-base mb-2 font-medium leading-snug line-clamp-2">
              {product.title}
            </div>
          </Link>

          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-2 py-1">
              <Badge className="bg-webprimary text-white hover:bg-webvedique hover:text-white text-xs md:text-sm flex items-center">
                {averageRating() >= 4.5 ? (
                  <FaStar className="h-3 w-3 mr-1" />
                ) : (
                  <FaRegStarHalfStroke className="h-3 w-3 mr-1" />
                )}
                {`${averageRating()}/5`}
              </Badge>

              <div className="flex items-center">
                <DynamicStarRatings
                  rating={averageRating()}
                  starRatedColor="#eec400"
                  starEmptyColor="gray"
                  numberOfStars={5}
                  starDimension="16px"
                  starSpacing="1px"
                />
              </div>
            </div>
          )}
        </div>

        {/* PRICE + CTA */}
        <div className="px-4 pb-3 pt-1 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm md:text-base text-emerald-800">
                {currencyLabel} {displayPrice.toLocaleString()}
              </span>

              {originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {currencyLabel} {originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {discountPercent && (
              <span className="text-[11px] text-green-600 font-medium">
                Save {currencyLabel}{" "}
                {(originalPrice! - displayPrice).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cartItem && userCountry === "IN" && product.stock ? (
              product.stock > 0 ? (
                <AddToCart
                  item={cartItem}
                  className="rounded-full shadow-md flex items-center px-4 py-1.5 text-sm"
                  btnText="Add"
                />
              ) : (
                <span className="text-red-500 text-xs md:text-sm font-semibold">
                  Out of stock
                </span>
              )
            ) : (
              <span className="text-red-500 text-xs md:text-sm font-semibold" />
            )}

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetContent side="right">
                <h2 className="text-2xl font-bold mb-5 border-b-2 pb-2">
                  Your Shopping Cart
                </h2>
                <CartDetails />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
