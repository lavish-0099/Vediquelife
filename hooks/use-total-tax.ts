import { CartItem } from "@/types/cart-item";
import { useMemo } from "react";

export function useTotalTax(cartItems: CartItem[], userCountry: string) {
  return useMemo(() => {
    if (!cartItems?.length || userCountry !== "IN") return 0;

    return cartItems.reduce((totalTax, item) => {
      return totalTax + (item.taxAmount || 0) * item.quantity;
    }, 0);
  }, [cartItems, userCountry]);
}
