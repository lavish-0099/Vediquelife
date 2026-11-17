import { getCartRulePercent } from "@/lib/cart";
import { CartItem } from "@/types/cart-item";

export const runCartRules = (
  cartItems: CartItem[],
  couponDiscount: number,
  productDiscount: number,
  cartRules: any[],
  prevPercentRef: { current: number },
  showCartDiscount: (percent: number) => void,
) => {
  const baseTotal = cartItems.reduce(
    (sum, item) => sum + item.price! * item.quantity,
    0,
  );

  const effectiveTotal =
    baseTotal - (couponDiscount || 0) - (productDiscount || 0);

  const percent = getCartRulePercent(effectiveTotal, cartRules);

  if (percent > prevPercentRef.current) {
    showCartDiscount(percent);
  }

  prevPercentRef.current = percent;
};
