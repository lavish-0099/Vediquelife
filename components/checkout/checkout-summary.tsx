"use client";

import CartSummaryItem from "@/components/cart/cart-summary-item";

import { useUserCountry } from "@/context/user-country-context";
import ProductItemInCart from "./product-item-in-cart";
import { useCouponStore } from "@/store/coupon-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import CartSummaryGrandTotal from "../cart/cart-summary-grand-total";
import { useEffect, useMemo, useRef } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

const CheckoutSummary = () => {
  const { cartItems } = useCartStore();
  const checkoutIntent = useCartStore((s) => s.checkoutIntent);
  const { userCountry, userCurrency } = useUserCountry();
  const { appliedCoupon } = useCouponStore();
  const {
    baseTotal,
    subTotal,
    totalTax,
    productDiscount,
    couponDiscount,
    cartRuleDiscount,
    totalDiscount,
    grandTotal,
  } = useCheckoutStore();
  const focusRef = useRef<HTMLDivElement | null>(null);
  const hasFiredCheckoutEvent = useRef(false);

  const itemsToShow = useMemo(() => {
    if (checkoutIntent?.type === "BUY_NOW") {
      const only = cartItems.filter((i) => i.id === checkoutIntent.itemId);
      return only.length > 0 ? only : cartItems;
    }
    return cartItems;
  }, [cartItems, checkoutIntent]);

  useEffect(() => {
    if (checkoutIntent?.type === "BUY_NOW" && focusRef.current) {
      focusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [checkoutIntent]);

  // ✅ INITIATE CHECKOUT – FINAL & CORRECT PLACE
  useEffect(() => {
    if (!grandTotal) return;
    if (hasFiredCheckoutEvent.current) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "initiate_checkout",

      value: Number(grandTotal),
      currency: "INR",

      content_ids: itemsToShow.map((item) => String(item.id)),
      content_type: "product",
      num_items: itemsToShow.reduce((sum, i) => sum + i.quantity, 0),

      coupon: appliedCoupon?.code || undefined,
      checkout_type: checkoutIntent?.type || "CART",
    });

    hasFiredCheckoutEvent.current = true;
  }, [grandTotal, itemsToShow, appliedCoupon, checkoutIntent]);

  const totalSaved = useMemo(() => {
    let offerDiscount = 0;

    itemsToShow.forEach((item) => {
      const mrp =
        userCountry === "IN" ? (item.price ?? 0) : (item.int_price ?? 0);

      const offer =
        userCountry === "IN"
          ? (item.salePrice ?? mrp)
          : (item.int_salePrice ?? mrp);

      if (offer < mrp) {
        offerDiscount += (mrp - offer) * item.quantity;
      }
    });

    return offerDiscount + (totalDiscount || 0);
  }, [itemsToShow, userCountry, totalDiscount]);

  return (
    <div className="w-full flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
      {/* Products List */}
      <div className="flex flex-col w-full">
        {itemsToShow.map((item) => (
          <ProductItemInCart
            key={item.id}
            title={item.title}
            price={
              userCountry === "IN"
                ? (item.salePrice ?? item.price)
                : (item.int_salePrice ?? item.int_price)
            }
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="flex flex-col w-full">
        {/* Products Total */}
        <CartSummaryItem title="Products Total" value={baseTotal || 0} />

        {/* Coupon */}
        {appliedCoupon && (
          <CartSummaryItem
            title={`Coupon (${appliedCoupon.code})`}
            value="Applied"
            titleClassName="font-semibold"
            isRemoveButtonVisible
          />
        )}

        {/* Discount */}
        {totalDiscount > 0 && (
          <div className="flex items-center justify-between relative group border-b-2 pb-2 border-gray-100">
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              Discount
              <span className="cursor-pointer text-gray-400 hover:text-black">
                ⓘ
              </span>
            </div>

            <div className="text-green-600 font-semibold">
              - {formatCurrency(totalDiscount, userCurrency)}
            </div>

            {/* Hover Breakdown */}
            <div className="absolute top-6 left-0 hidden group-hover:block z-50">
              <div className="bg-white border shadow-lg rounded-md p-3 text-sm w-[230px]">
                {productDiscount > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Product Offer</span>
                      <span>
                        - {formatCurrency(productDiscount, userCurrency)}
                      </span>
                    </div>

                    {(couponDiscount > 0 || cartRuleDiscount > 0) && (
                      <div className="border-b my-2" />
                    )}
                  </>
                )}

                {couponDiscount > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Coupon</span>
                      <span>
                        - {formatCurrency(couponDiscount, userCurrency)}
                      </span>
                    </div>

                    {cartRuleDiscount > 0 && <div className="border-b my-2" />}
                  </>
                )}

                {cartRuleDiscount > 0 && (
                  <div className="flex justify-between">
                    <span>Cart Discount</span>
                    <span>
                      - {formatCurrency(cartRuleDiscount, userCurrency)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Subtotal */}
        <CartSummaryItem title="Subtotal" value={subTotal || 0} />

        {/* Tax */}
        <CartSummaryItem title="Tax" value={totalTax || 0} />

        {/* Grand Total */}
        <CartSummaryGrandTotal title="Grand Total" value={grandTotal || 0} />
        {/* Savings */}
        {totalDiscount > 0 && (
          <div className="text-emerald-600 font-semibold text-sm mt-2">
            🎉 You saved {formatCurrency(totalDiscount, userCurrency)} on this
            order
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
