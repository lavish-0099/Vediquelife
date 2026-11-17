"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { syncCart } from "@/lib/cart";
import { useCartStore } from "@/store/cart-store";
import { useCartController } from "@/hooks/use-cart-controller";

export const CartSyncOnLogin = () => {
  const { data: session, status } = useSession();
  const { cartItems, setCartItems } = useCartStore();
  const { refreshCoupons } = useCartController();

  useEffect(() => {
    const loadCoupons = async () => {
      if (!cartItems.length) return;
      await refreshCoupons(cartItems);
    };

    loadCoupons();
  }, [cartItems]);
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      syncCart(session.user.id, cartItems).then(({ mergedCart, changed }) => {
        if (changed) {
          setCartItems(mergedCart || []);
        }
      });
    }
  }, [status, session]);

  return null;
};
