"use client";

import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

import CartSummary from "@/components/cart/cart-summary";
import EmptyCart from "@/components/cart/empty-cart";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

import { useCartStore } from "@/store/cart-store";

import CartItemCard from "@/components/cart/cart-item-card";

const CartPage = () => {
  const { cartItems, checkoutIntent, clearCheckoutIntent } = useCartStore();

  useEffect(() => {
    if (checkoutIntent?.type === "BUY_NOW") {
      clearCheckoutIntent();
    }
  }, [checkoutIntent]);
  return (
    <div className="w-full bg-slate-100 pb-20">
      <PageHeader title="Cart" className="py-4" />

      <Container>
        {cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* LEFT SIDE - CART ITEMS */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* RIGHT SIDE - SUMMARY */}
            <div className="w-full">
              <div className="sticky top-24 bg-white rounded-md p-6 shadow-sm flex flex-col gap-6">
                <CartSummary />

                <Button
                  className="w-full bg-webprimary hover:bg-webvedique rounded-md p-6 shadow-sm"
                  asChild
                >
                  <Link
                    href="/checkout"
                    className="flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <FaArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
