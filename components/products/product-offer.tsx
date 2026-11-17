"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Coupon } from "@/types/coupon";
import { BadgePercent, ShoppingCart, Copy, Check, Tag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface ProductOfferProps {
  coupons: Coupon[];
  className?: string;
}

/* =====================
   Coupon Code Copy
===================== */
const CouponCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-green-50 border-green-200 px-3 py-1 text-xs font-mono shadow-sm border hover:bg-gray-50 transition"
    >
      <span className="font-semibold">CODE</span>
      <span className="tracking-wider">{code}</span>

      {copied ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
};

const ProductOffer = ({ coupons, className }: ProductOfferProps) => {
  const { cartRules } = useCartStore();

  if (!coupons?.length && !cartRules?.length) return null;

  return (
    <div className={cn("mt-2", className)}>
      {/* Heading */}
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-webprimary">
        <Tag className="h-5 w-5 text-webprimary" />
        Available Offers
      </h3>

      <div className="grid gap-5 md:grid-cols-2">
        {/* CART RULE OFFERS */}
        {cartRules?.map((rule) => (
          <div
            key={rule.id}
            className="
              relative overflow-hidden
              rounded-xl
              p-[1px]
              bg-gradient-to-r from-green-600 to-webprimary
              shadow-md
            "
          >
            <div className="rounded-xl bg-white p-3 flex gap-4 items-start">
              <div className="bg-webprimary text-white rounded-lg p-3">
                <ShoppingCart className="h-5 w-5" />
              </div>

              <div>
                <p className="text-base font-semibold text-gray-900">
                  Extra {rule.discountPercent}% OFF
                </p>

                <p className="text-sm text-gray-600">
                  On orders above ₹{rule.minOrderValue}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Automatically applied at checkout
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* COUPON OFFERS */}
        {coupons?.map((coupon) => (
          <div
            key={coupon.id}
            className="
              relative overflow-hidden
              rounded-xl
              p-[1px]
              bg-gradient-to-r from-green-600 to-webprimary
              shadow-md
            "
          >
            <div className="rounded-xl bg-white p-3 flex gap-4 items-start">
              <div className="bg-webprimary text-white rounded-lg p-3">
                <BadgePercent className="h-5 w-5" />
              </div>

              <div>
                <p className="text-base font-semibold text-gray-900">
                  {coupon.discountType === "FIXED_PRODUCT" &&
                    `Flat ₹${coupon.discountValue} OFF`}

                  {coupon.discountType === "PERCENTAGE" &&
                    `Flat ${coupon.discountValue}% OFF`}
                </p>

                <CouponCode code={coupon.code} />

                <p className="text-xs text-gray-400 mt-1">
                  Apply this coupon at checkout
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOffer;
