"use client";

import { Progress } from "@/components/ui/progress";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";

const CartDiscountProgress = () => {
  const { cartRules, cartItems } = useCartStore();
  const { subTotal, cartRuleDiscount } = useCheckoutStore();

  if (!cartItems.length) return null;

  const effectiveSubtotal = subTotal + cartRuleDiscount;

  const sortedRules = [...cartRules].sort(
    (a, b) => a.minOrderValue - b.minOrderValue,
  );

  const nextRule = sortedRules.find(
    (rule) => effectiveSubtotal < rule.minOrderValue,
  );

  const targetAmount = nextRule?.minOrderValue ?? effectiveSubtotal;

  const progress = Math.min((effectiveSubtotal / targetAmount) * 100, 100);

  const remaining = nextRule ? nextRule.minOrderValue - effectiveSubtotal : 0;

  return (
    <div className="w-full bg-gray-50 rounded-xl p-4 mb-3 border">
      <div className="text-sm mb-2 font-medium text-gray-700">
        {nextRule ? (
          <>
            Add{" "}
            <span className="font-semibold text-webprimary">
              ₹{remaining.toFixed(0)}
            </span>{" "}
            more to unlock{" "}
            <span className="text-webprimary font-semibold">
              {nextRule.discountPercent}% OFF
            </span>
          </>
        ) : (
          <span className="text-webprimary font-semibold">
            🎉 Maximum discount unlocked!
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress value={progress} className="h-2 bg-gray-200" />

        <div
          className="absolute top-0 left-0 h-2 bg-webprimary rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>₹0</span>
        <span className="font-medium text-gray-700">₹{targetAmount}</span>
      </div>
    </div>
  );
};

export default CartDiscountProgress;
