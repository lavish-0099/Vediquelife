import {
  loadCartFromDatabase,
  mergeCarts,
  saveCartToDatabase,
} from "@/actions/cart";
import { CartItem } from "@/types/cart-item";

function isCartEqual(cartA: CartItem[], cartB: CartItem[]) {
  if (cartA.length !== cartB.length) return false;

  const sortCart = (cart: CartItem[]) =>
    [...cart].sort((a, b) => a.id.localeCompare(b.id));

  const sortedA = sortCart(cartA);
  const sortedB = sortCart(cartB);

  for (let i = 0; i < sortedA.length; i++) {
    const itemA = sortedA[i];
    const itemB = sortedB[i];

    if (itemA.id !== itemB.id || itemA.quantity !== itemB.quantity) {
      return false;
    }
  }

  return true;
}

export async function syncCart(userId: string, localCart: CartItem[]) {
  if (!userId) return { mergedCart: localCart, changed: false };

  try {
    const databaseCart = await loadCartFromDatabase(userId);
    if (localCart.length === 0 && databaseCart.length === 0) {
      return { mergedCart: [], changed: false };
    }
    const mergedCart = await mergeCarts(localCart, databaseCart);

    const changed = !isCartEqual(mergedCart, databaseCart);

    if (changed) {
      await saveCartToDatabase(mergedCart, userId);
    }

    return { mergedCart, changed };
  } catch (error) {
    console.error("Error syncing cart:", error);
    return { mergedCart: localCart, changed: false };
  }
}

export const getCartRulePercent = (
  cartValue: number,
  rules: { minOrderValue: number; discountPercent: number }[],
) => {
  for (const rule of rules) {
    if (cartValue >= rule.minOrderValue) {
      return rule.discountPercent;
    }
  }

  return 0;
};
