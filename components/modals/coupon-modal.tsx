"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { TicketPercent } from "lucide-react";
import { Coupon } from "@/types/coupon";
import { validateCoupon } from "@/utils/coupon-utils";
import { useCartStore } from "@/store/cart-store";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  coupons: Coupon[];
  applyCoupon: (coupon: Coupon) => void;
};

export const CouponModal = ({ open, setOpen, coupons, applyCoupon }: Props) => {
  const { cartItems } = useCartStore();

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price! * item.quantity,
    0,
  );

  const sortedCoupons = [...coupons].sort((a, b) => {
    const aCheck = validateCoupon(a, cartItems, cartTotal);
    const bCheck = validateCoupon(b, cartItems, cartTotal);

    if (aCheck.valid === bCheck.valid) return 0;

    return aCheck.valid ? -1 : 1;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Available Coupons
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-2 max-h-[420px] overflow-y-auto">
          {sortedCoupons?.map((coupon) => {
            const check = validateCoupon(coupon, cartItems, cartTotal);

            return (
              <div
                key={coupon.code}
                className={`border rounded-lg p-4 flex items-start justify-between transition
                ${check.valid ? "hover:bg-gray-50" : "opacity-60"}
                `}
              >
                {/* Left */}
                <div className="flex gap-3">
                  <TicketPercent className="w-5 h-5 text-green-600 mt-[2px]" />

                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{coupon.code}</span>

                    <span className="text-sm text-gray-700">
                      Save{" "}
                      {coupon.discountType === "PERCENTAGE"
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`}
                    </span>

                    {coupon.description && (
                      <span className="text-xs text-gray-500 mt-1">
                        {coupon.description}
                      </span>
                    )}

                    {!check.valid && (
                      <span className="text-xs text-red-500 mt-1">
                        {check.reason}
                      </span>
                    )}
                  </div>
                </div>

                {/* Apply button */}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!check.valid}
                  onClick={() => {
                    applyCoupon(coupon);
                    setOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            );
          })}

          {coupons?.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">
              No coupons available
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
