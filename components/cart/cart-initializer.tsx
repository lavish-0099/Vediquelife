"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

const CartInitializer = () => {
  const { setCartRules } = useCartStore();

  useEffect(() => {
    async function loadRules() {
      try {
        const res = await fetch("/api/settings/cart-rules");

        if (!res.ok) throw new Error("Failed to fetch rules");

        const data = await res.json();

        setCartRules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cart rules load failed", err);
        setCartRules([]);
      }
    }

    loadRules();
  }, []);

  return null;
};

export default CartInitializer;
