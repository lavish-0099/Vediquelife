"use client";

import { cn } from "@/lib/utils";

interface ProductFeatureItemProps {
  title: string;
  value?: string | number | null;
  titleClassName?: string;
  valueClassName?: string;
  currency?: string | null;
}

const ProductFeatureItem = ({
  title,
  value,
  titleClassName,
  valueClassName,
  currency,
}: ProductFeatureItemProps) => {
  return (
    <div className="w-full flex mx-2 my-4  border-b-2 border-gray-200 items-center justify-between">
      <div className="w-1/2">
        <span className={cn("text-gray-600 font-bold mr-2", titleClassName)}>
          {title}
        </span>
      </div>
      <div className="w-1/2 text-end">
        <span className={cn("text-black", valueClassName)}>
          {currency} {value}
        </span>
      </div>
    </div>
  );
};

export default ProductFeatureItem;
