"use client";

import Link from "next/link";
import CartItems from "@/components/header/cart-items";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import PopUpEmptyCart from "@/components/cart/popup-empty-cart";
import { useCartStore } from "@/store/cart-store";
import { Loader2 } from "lucide-react";
import CartDiscountProgress from "../cart/cart-discount-progress";
import CartTotalBar from "../cart/cart-total-bar";

const CartDetails = () => {
  const { cartItems, cartLoading } = useCartStore();
  if (cartLoading) {
    return (
      <div className="flex items-center justify-center text-center py-8">
        <Loader2 className="w-10 h-10 animate-spin text-webprimary" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      {cartItems && cartItems.length === 0 ? (
        <PopUpEmptyCart />
      ) : (
        <>
          <div className="flex-grow overflow-y-auto mb-4">
            {cartItems.map((item) => (
              <CartItems key={item.id} item={item} />
            ))}
          </div>
          <div className="mb-24 mt-auto sticky bottom-0 bg-white w-full">
            {cartItems.length > 0 && (
              <>
                <CartDiscountProgress />

                <CartTotalBar />
                <SheetClose className="w-full" asChild>
                  <Link href="/cart">
                    <Button className="bg-webprimary hove:text-white hover:bg-green-600 text-md  px-4 py-4 rounded-md mb-2 w-full">
                      View Cart
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose className="w-full" asChild>
                  <Link href="/checkout">
                    <Button className="bg-webyellow text-webtertiary hover:bg-emerald-600 hover:text-white  text-md  px-4 py-4 rounded-md mb-2 w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
