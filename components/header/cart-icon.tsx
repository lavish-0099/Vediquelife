"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";
import { useCartStore } from "@/store/cart-store";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BAG_TEXT =
  "text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1e3d34] whitespace-nowrap";

const CartIcon = () => {
  const { cartItems } = useCartStore();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const pathname = usePathname();
  const isCartOrCheckoutPage = pathname === "/cart" || pathname === "/checkout";

  // On the cart / checkout pages the bag just links to the cart page
  if (isCartOrCheckoutPage) {
    return (
      <Link
        href="/cart"
        aria-label={`Bag, ${totalQuantity} items`}
        className={`hidden md:block ${BAG_TEXT} hover:opacity-70 transition`}
      >
        Bag · {totalQuantity}
      </Link>
    );
  }

  return (
    <div className="hidden md:block">
      <Sheet>
        <SheetTrigger
          aria-label={`Bag, ${totalQuantity} items`}
          className={`${BAG_TEXT} hover:opacity-70 transition`}
        >
          Bag · {totalQuantity}
        </SheetTrigger>
        <SheetContent side="right">
          <h2 className="text-2xl font-bold mb-5 border-b-2 pb-2">
            Your Shopping Cart
          </h2>
          <CartDetails />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartIcon;
