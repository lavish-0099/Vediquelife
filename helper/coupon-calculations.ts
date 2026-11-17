import { CartItem } from "@/types/cart-item";
import { Coupon } from "@/types/coupon";

export const getCouponEligibleTotal = (
  coupon: Coupon,
  cartItems: CartItem[],
) => {
  return cartItems.reduce((total, item) => {
    const unitPrice = item.salePrice ?? item.price!;
    const itemTotal = unitPrice * item.quantity;

    // coupon all products
    if (!coupon.applicableProducts || coupon.applicableProducts.length === 0) {
      return total + itemTotal;
    }

    const isEligible = coupon.applicableProducts.some(
      (product) => product.id === item.id,
    );

    if (isEligible) {
      return total + itemTotal;
    }

    return total;
  }, 0);
};
