"use server";

import { db } from "@/lib/db";
import { CartItem } from "@/types/cart-item";

export async function saveCartToDatabase(
  cartItems: CartItem[],
  userId: string
) {
  if (!userId) {
    throw new Error("User ID is required to save cart");
  }

  await db.cart.deleteMany({
    where: { userId },
  });
  const validCartItems = cartItems.filter((item) => item.quantity > 0);
  if (validCartItems.length > 0) {
    await db.cart.createMany({
      data: validCartItems.map((item) => ({
        userId,
        productId: item.id,
        quantity: item.quantity,
      })),
    });
  }
}

export async function loadCartFromDatabase(
  userId: string
): Promise<CartItem[]> {
  if (!userId) {
    throw new Error("User ID is required to load cart");
  }

  const cartRecords = await db.cart.findMany({
    where: { userId },
    include: {
      products: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const databaseCart: CartItem[] = cartRecords.map((record) => {
    const product = record.products;

    return {
      id: product?.id || "",
      title: product?.title || "",
      slug: product?.slug || "",
      imageUrl: product?.imageUrl || null,
      price: product?.price || null,
      int_price: product?.int_price || null,
      quantity: record.quantity,
      currency: record.currency || "INR",
    };
  });

  return databaseCart;
}

export async function clearCartAfterCheckout(userId: string) {
  await db.cart.deleteMany({
    where: { userId },
  });
}

export const mergeCarts = (localCart: CartItem[], databaseCart: CartItem[]) => {
  let mergedCart: CartItem[] = [];

  const normalItemsMap = new Map<string, CartItem>();

  databaseCart.forEach((item) => {
    normalItemsMap.set(item.id, { ...item });
  });

  // Then intelligently merge local cart items
  localCart.forEach((item) => {
    if (normalItemsMap.has(item.id)) {
      const existing = normalItemsMap.get(item.id)!;
      // ✅ Instead of adding quantities, keep maximum quantity
      normalItemsMap.set(item.id, {
        ...existing,
        quantity: Math.max(existing.quantity, item.quantity),
      });
    } else {
      normalItemsMap.set(item.id, { ...item });
    }
  });

  mergedCart = [...mergedCart, ...Array.from(normalItemsMap.values())];

  return mergedCart;
};
