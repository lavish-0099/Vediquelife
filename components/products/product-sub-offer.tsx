"use client";

import { cn } from "@/lib/utils";
import { ReviewWithRelations } from "@/types/review";
import { ProductCategories, Products } from "@prisma/client";
import Link from "next/link";

interface ProductSubOfferProps {
  products: (Products & {
    ProductCategories: ProductCategories;
    reviews?: ReviewWithRelations[];
  })[];
  className?: string;
}

const ProductSubOffer = ({ className, products }: ProductSubOfferProps) => {
  if (!products || products.length === 0) return null;

  const getBasePrice = (product: Products) => {
    // India ke liye price use, warna int_price fallback
    const base = product.price ?? product.int_price ?? 0;
    return base;
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className={cn("w-full mt-8", className)}>
      <div className="relative w-full rounded-xl shadow-lg">
        {/* INNER CARD (gradient) */}
        <div
          className="
            w-full
            bg-gradient-to-r from-green-600 to-emerald-400
            rounded-xl
            px-4 md:px-6
            py-3 md:py-4
            text-center
          "
        >
          {/* Top heading */}
          <div className="leading-tight text-white">
            <p className="text-sm md:text-base font-semibold">
              Special Offer – Extra 10% OFF on these products
            </p>
          </div>

          {/* Dynamic products with discounted prices */}
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:gap-3">
            {products.map((product) => {
              const basePrice = getBasePrice(product);
              const discounted = Math.round(basePrice * 0.9);

              if (!basePrice) return null;

              return (
                <div
                  key={product.id}
                  className="
                    bg-white/95 
                    rounded-full 
                    px-3 md:px-4 
                    py-1.5 
                    flex 
                    flex-col md:flex-row 
                    items-center 
                    gap-1 md:gap-2 
                    shadow-sm
                  "
                >
                  <span className="text-[10px] md:text-xs font-medium text-slate-600 max-w-[140px] truncate">
                    <Link href={`/product/${product.slug}`}>
                      {product.title}
                    </Link>
                  </span>

                  <span className="text-[11px] md:text-xs text-emerald-700 font-semibold">
                    ₹{formatPrice(discounted)}{" "}
                    <span className="line-through text-[10px] md:text-[11px] text-slate-400 ml-1">
                      ₹{formatPrice(basePrice)}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom line text */}
          <p className="mt-3 text-[11px] md:text-xs text-emerald-50/90">
            Discount will be applied automatically at checkout on eligible
            products.
          </p>
        </div>

        {/* LEFT bite – page background color (so shadow natural lage) */}
        <div
          className="
            absolute
            left-0
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-8
            h-8
            rounded-full
            bg-background
          "
        />

        {/* RIGHT bite */}
        <div
          className="
            absolute
            right-0
            top-1/2
            translate-x-1/2
            -translate-y-1/2
            w-8
            h-8
            rounded-full
            bg-background
          "
        />
      </div>
    </div>
  );
};

export default ProductSubOffer;
