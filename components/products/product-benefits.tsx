"use client";

import { cn } from "@/lib/utils";
import { ProductWithCategory } from "@/types/product";
import { CheckCircle2 } from "lucide-react";

interface ProductBenefitsProps {
  product: ProductWithCategory;
  className?: string;
}

const ProductBenefits = ({ product, className }: ProductBenefitsProps) => {
  const benefits = product.productBenefits ?? [];

  if (!benefits || benefits.length === 0) return null;

  return (
    <div className={cn("w-full mt-10 md:mt-14", className)}>
      <div className="relative bg-green-50 rounded-xl border border-slate-300 shadow-sm p-4 sm:p-5 md:p-8">
        {/* Heading */}
        <div className="mb-3 md:mb-0 md:absolute md:-top-4 md:left-1/2 md:-translate-x-1/2">
          <span
            className={cn(
              "inline-block border border-webprimary rounded-full shadow-sm",
              "bg-webprimary text-white",
              "text-xs sm:text-sm md:text-lg font-semibold",
              "px-3 py-1 sm:px-4 sm:py-1 md:px-6"
            )}
          >
            Why you'll love it?
          </span>
        </div>

        {/* Benefits list */}
        <ul className="mt-2 md:mt-6 space-y-3 md:space-y-4">
          {benefits
            .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
            .map((benefit) => (
              <li
                key={benefit.id}
                className="flex items-start gap-2.5 md:gap-3"
              >
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 mt-1 flex-shrink-0" />
                <span className="text-slate-700 text-sm md:text-base leading-relaxed">
                  {benefit.name}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductBenefits;
