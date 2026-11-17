"use client";

import { useUserCountry } from "@/context/user-country-context";
import { useCheckoutController } from "@/hooks/use-checkout-controller";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";

interface CartSummaryGrandTotalProps {
  title: string;
  value: number;
  titleClassName?: string;
}

const CartSummaryGrandTotal = ({
  title,
  value,
  titleClassName,
}: CartSummaryGrandTotalProps) => {
  const { userCurrency } = useUserCountry();

  return (
    <div
      className={cn(
        "flex my-4 items-center justify-between",
        title === "Grand Total" ? "" : "border-b-2 pb-2 border-gray-100",
      )}
    >
      <div>
        <span
          className={cn(
            "text-gray-600 mr-2",
            title === "Grand Total" ? "font-bold" : "",
            titleClassName,
          )}
        >
          {title}
        </span>
      </div>
      <div className="text-right text-gray-600 mr-2 font-bold">
        {formatCurrency(value as number, userCurrency)}
      </div>
    </div>
  );
};

export default CartSummaryGrandTotal;
