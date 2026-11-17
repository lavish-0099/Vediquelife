"use client";

import { useState, useMemo } from "react";
import { TicketPercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCouponStore } from "@/store/coupon-store";
import { useCartStore } from "@/store/cart-store";
import { CouponModal } from "../modals/coupon-modal";
import { Coupon } from "@/types/coupon";
import { calculateCouponDiscount, validateCoupon } from "@/utils/coupon-utils";
import { useDiscountModalStore } from "@/store/discount-modal-store";
import { calculateCouponDiscountTotal } from "@/lib/checkout";
import { useUserCountry } from "@/context/user-country-context";
import { toast } from "sonner";
import { CartItem } from "@/types/cart-item";
import { getCouponEligibleTotal } from "@/helper/coupon-calculations";

export function CouponSection() {
  const { appliedCoupon, setAppliedCoupon } = useCouponStore();
  const { availableCoupons, cartItems } = useCartStore();
  const [open, setOpen] = useState(false);
  const { showCouponDiscount } = useDiscountModalStore();

  const { userCountry } = useUserCountry();

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const unitPrice = item.salePrice ?? item.price!;
      return total + unitPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const bestCoupon = useMemo(() => {
    if (!availableCoupons?.length) return null;

    const validCoupons = availableCoupons.filter(
      (coupon) => validateCoupon(coupon, cartItems, cartTotal).valid,
    );

    if (!validCoupons.length) return null;

    return [...validCoupons].sort(
      (a, b) =>
        getCouponEligibleTotal(b, cartItems) -
        getCouponEligibleTotal(a, cartItems),
    )[0];
  }, [availableCoupons, cartItems, cartTotal]);

  const applyCoupon = (coupon: Coupon) => {
    const check = validateCoupon(coupon, cartItems, cartTotal);

    if (!check.valid) {
      toast.error(check.reason);
      return;
    }

    // same coupon already applied
    if (appliedCoupon?.code === coupon.code) return;

    const couponPayload = {
      code: coupon.code,
      discountValue: coupon.discountValue!,
      discountType: coupon.discountType,
      applicableProducts: coupon.applicableProducts,
      calculatedDiscount: 0,
    };

    const totalDiscount = calculateCouponDiscountTotal(
      cartItems,
      couponPayload,
      userCountry,
    );
    if (totalDiscount > cartTotal) {
      toast.error("Coupon discount exceeds cart total");
      return;
    }

    setAppliedCoupon({
      ...couponPayload,
      calculatedDiscount: totalDiscount,
    });

    // celebration popup
    showCouponDiscount(totalDiscount);
  };

  if (!bestCoupon && !appliedCoupon) return null;

  return (
    <>
      <div className="bg-white border rounded-lg p-4">
        {/* Coupon Row */}
        {!appliedCoupon && bestCoupon && (
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <TicketPercent className="w-5 h-5 text-green-600 mt-[2px]" />

              <div className="flex flex-col text-sm">
                <span className="font-medium">
                  Save ₹
                  {calculateCouponDiscount(bestCoupon, cartTotal).toFixed(1)}{" "}
                  with "{bestCoupon.code}"
                </span>

                {availableCoupons.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="text-green-600 text-xs font-medium text-left hover:underline"
                  >
                    View all coupons
                  </button>
                )}
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyCoupon(bestCoupon)}
              className="px-4"
            >
              Apply
            </Button>
          </div>
        )}

        {/* Applied Coupon */}
        {appliedCoupon && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            Coupon "{appliedCoupon.code}" applied
          </div>
        )}
      </div>

      <CouponModal
        open={open}
        setOpen={setOpen}
        coupons={availableCoupons}
        applyCoupon={applyCoupon}
      />
    </>
  );
}
