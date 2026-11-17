"use client";

import { useCheckoutController } from "@/hooks/use-checkout-controller";

const CartTotalBar = () => {
  const { subTotal } = useCheckoutController();

  return (
    <div className="flex justify-between items-center py-2 text-sm font-medium">
      <span>Total</span>
      <span className="text-lg font-semibold text-webprimary">₹{subTotal}</span>
    </div>
  );
};

export default CartTotalBar;
