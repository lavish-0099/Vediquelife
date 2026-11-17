"use client";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Preview } from "../preview";
import { ProductWithCategory } from "@/types/product";
import Image from "next/image";

interface ProductAccorditionProps {
  product: ProductWithCategory;
  className?: string;
}

const ProductAccordition = ({
  product,
  className,
}: ProductAccorditionProps) => {
  const productIngredients = product.ProductIngredients ?? [];
  const productDirectionsForUse = product.productDirectionsForUse ?? [];

  return (
    <div className={cn("w-full mt-10", className)}>
      {/* Accordion */}
      <Accordion type="multiple" className="w-full space-y-3">
        {/* DESCRIPTION */}
        {product.description && (
          <AccordionItem
            value="description"
            className="border rounded-lg px-3 md:px-4"
          >
            <AccordionTrigger className="py-3 md:py-4 text-left text-sm md:text-base font-semibold tracking-wide hover:no-underline no-underline">
              <span className="uppercase text-xs md:text-sm">Description</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {product.description ? (
                <Preview value={product.description} />
              ) : (
                <p>No description available.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        )}
        {/* WHY SHOULD YOU BUY IT */}
        {product.whyShouldBuy && product.whyShouldBuy.trim() !== "" && (
          <AccordionItem
            value="why-buy"
            className="border rounded-lg px-3 md:px-4"
          >
            <AccordionTrigger className="py-3 md:py-4 text-left text-sm md:text-base font-semibold tracking-wide hover:no-underline no-underline">
              <span className="uppercase text-xs md:text-sm">
                Why should you buy it?
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {product.whyShouldBuy ? (
                <Preview value={product.whyShouldBuy} />
              ) : (
                <p>We will add this information soon.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* INGREDIENTS */}
        {productIngredients && productIngredients.length > 0 && (
          <AccordionItem
            value="ingredients"
            className="border rounded-lg px-3 md:px-4"
          >
            <AccordionTrigger className="py-3 md:py-4 text-left text-sm md:text-base font-semibold tracking-wide hover:no-underline no-underline">
              <span className="uppercase text-xs md:text-sm">Ingredients</span>
            </AccordionTrigger>

            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {productIngredients && productIngredients.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {productIngredients.map((pi) => {
                    const ing = pi.ingredient;
                    const firstLetter =
                      ing.name?.charAt(0).toUpperCase() ?? "?";

                    return (
                      <div
                        key={pi.id}
                        className="flex items-start gap-3 rounded-lg border bg-slate-50/70 p-3 hover:shadow-sm transition"
                      >
                        {/* Image / avatar */}
                        <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-webprimary/10 via-white to-webpink/10 border border-border flex items-center justify-center">
                          {ing.imageUrl ? (
                            <Image
                              src={ing.imageUrl}
                              alt={ing.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-webblue">
                              {firstLetter}
                            </span>
                          )}
                        </div>

                        {/* Text content */}
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            {ing.name}
                          </p>

                          {ing.description && (
                            <p className="text-xs text-muted-foreground line-clamp-3">
                              {ing.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>Ingredients information will be added soon.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Directions For Use  */}
        {productDirectionsForUse.length > 0 && (
          <AccordionItem
            value="directions"
            className="border rounded-lg px-3 md:px-4"
          >
            <AccordionTrigger className="py-3 md:py-4 text-left text-sm md:text-base font-semibold tracking-wide hover:no-underline no-underline">
              <span className="uppercase text-xs md:text-sm">
                How to use it?
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-md leading-relaxed ">
              {productDirectionsForUse.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {productDirectionsForUse
                    .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
                    .map((direction) => (
                      <li key={direction.id}>{direction.name}</li>
                    ))}
                </ul>
              ) : (
                <p>This information will be added soon.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default ProductAccordition;
