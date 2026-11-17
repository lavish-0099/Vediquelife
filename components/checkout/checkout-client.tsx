"use client";

import CheckoutForm from "@/components/checkout/checkout-form";
import EmptyCart from "@/components/cart/empty-cart";
import { useCartStore } from "@/store/cart-store";

const CheckoutClient = () => {
  const { cartItems } = useCartStore();

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  return <CheckoutForm />;
};

export default CheckoutClient;
