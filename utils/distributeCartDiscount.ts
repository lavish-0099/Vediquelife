import { CartItem } from "@/types/cart-item";

export const distributeCartDiscount = (
  cartItems: CartItem[],
  cartRuleDiscount: number,
) => {
  const cartTotal = cartItems.reduce((total, item) => {
    const price =
      item.salePrice && item.salePrice < item.price!
        ? item.salePrice
        : item.price!;

    return total + price * item.quantity;
  }, 0);

  if (!cartTotal || !cartRuleDiscount) return {};

  const discountMap: Record<string, number> = {};

  cartItems.forEach((item) => {
    const price =
      item.salePrice && item.salePrice < item.price!
        ? item.salePrice
        : item.price!;

    const itemTotal = price * item.quantity;

    const share = (itemTotal / cartTotal) * cartRuleDiscount;

    discountMap[item.id] = share / item.quantity;
  });

  return discountMap;
};
