"use client";

import { useUserCountry } from "@/context/user-country-context";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";

interface ProductItemInCartProps {
  title: string;
  price: number | null;
  quantity: number;
}

const ProductItemInCart = ({
  title,
  price,
  quantity,
}: ProductItemInCartProps) => {
  const { userCurrency } = useUserCountry();

  return (
    <div
      className={cn(
        "flex my-2   items-center justify-between",
        title === "Grand Total" ? "" : "border-b-2 pb-2 border-gray-100",
      )}
    >
      <div>
        <span
          className={cn(
            "text-gray-600 mr-2",
            title === "Grand Total" ? "font-bold" : "",
          )}
        >
          {title}
        </span>
        <span>x {quantity}</span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-600 mr-2",
            title === "Grand Total" ? "font-bold" : "",
          )}
        >
          {formatCurrency(price! * quantity, userCurrency)}
        </span>
      </div>
    </div>
  );
};

export default ProductItemInCart;
