"use client";

import CartSummaryItem from "@/components/cart/cart-summary-item";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCouponStore } from "@/store/coupon-store";
import { formatCurrency } from "@/lib/formatCurrency";
import { useUserCountry } from "@/context/user-country-context";

const CartSummary = () => {
  const { appliedCoupon } = useCouponStore();
  const { userCurrency } = useUserCountry();
  const {
    baseTotal,
    subTotal,
    totalTax,
    grandTotal,
    productDiscount,
    couponDiscount,
    cartRuleDiscount,
    totalDiscount,
  } = useCheckoutStore();
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>

      <div className="flex flex-col w-full gap-1">
        {/* Products */}
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
        <CartSummaryItem
          title="Grand Total"
          value={grandTotal || 0}
          titleClassName="font-bold text-lg"
          valueClassName="font-bold text-lg"
        />

        {/* Savings */}
        {totalDiscount > 0 && (
          <div className="text-emerald-600 font-semibold text-sm mt-2">
            🎉 You saved {totalDiscount.toFixed(2)} on this order
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
