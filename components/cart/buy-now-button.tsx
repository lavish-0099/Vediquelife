"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cart-item";
import { useRouter } from "next/navigation";
import { Loader, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartController } from "@/hooks/use-cart-controller";

interface BuyNowProps {
  item: CartItem;
  btnText?: string;
  className?: string;
  disabled?: boolean;
}

const BuyNowButton = ({
  item,
  btnText = "Buy Now",
  className,
  disabled,
}: BuyNowProps) => {
  const router = useRouter();
  const { buyNow } = useCartController();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = async () => {
    setIsProcessing(true);
    console.log("buy now");
    await buyNow(item);
    router.push("/checkout");
    setIsProcessing(false);
  };

  return (
    <Button
      className={cn(
        "mt-0 px-4 py-2 rounded-lg font-semibold",
        "bg-webyellow hover:bg-webpink text-webtertiary hover:text-white w-full",
        className,
      )}
      onClick={handleBuyNow}
      disabled={isProcessing || disabled}
    >
      {isProcessing ? (
        <Loader className="w-5 h-5 mr-2 animate-spin" />
      ) : (
        <CreditCard className="w-5 h-5 mr-2" />
      )}
      {isProcessing ? "Processing..." : btnText}
    </Button>
  );
};

export default BuyNowButton;
