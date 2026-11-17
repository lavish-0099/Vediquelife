"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart-item";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";
import { useCartController } from "@/hooks/use-cart-controller";
import { Loader, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  item: CartItem;
  btnText?: string;
  className?: string;
  disabled?: boolean;
}

const AddToCartButton = ({
  item,
  btnText,
  className,
  disabled,
}: AddToCartButtonProps) => {
  const { addToCart } = useCartController();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleAddToCart = async () => {
    setIsProcessing(true);
    await addToCart(item);
    setIsProcessing(false);
    setIsSheetOpen(true);
  };
  return (
    <>
      <Button
        className={cn(
          "w-full bg-webprimary hover:bg-webpink text-white py-3 rounded-lg transition-colors duration-300",
          className
        )}
        onClick={handleAddToCart}
        disabled={isProcessing || disabled}
      >
        {isProcessing ? (
          <Loader className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <ShoppingCart className="w-5 h-5 mr-2" />
        )}
        {isProcessing ? "Adding..." : btnText ? btnText : "Add to Cart"}
      </Button>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <h2 className="text-2xl font-bold mb-5 border-b pb-2">
            Your Shopping Cart
          </h2>
          <CartDetails />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddToCartButton;
