"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ProductCategories, Products } from "@prisma/client";
import ProductCard from "./product-card";
import Container from "@/components/container";
import { ReviewWithRelations } from "@/types/review";
import { cn } from "@/lib/utils";

interface RelatedProductsSliderProps {
  relatedProducts: (Products & {
    ProductCategories: ProductCategories;
    reviews?: ReviewWithRelations[];
  })[];
}

const RelatedProductsSlider = ({
  relatedProducts,
}: RelatedProductsSliderProps) => {
  const count = relatedProducts.length;
  if (count === 0) return null;

  const isCenteredDesktop = count <= 4;
  const showArrows = count > 4;

  return (
    <div className="w-full mt-12">
      <Container>
        <div className="bg-white px-4 md:px-6 py-5">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              You may also like
            </h2>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: isCenteredDesktop ? "center" : "start",
                loop: false,
              }}
              className="w-full"
            >
              {/* ================= TRACK ================= */}
              <CarouselContent
                className={cn(
                  "-ml-4 overflow-visible",
                  isCenteredDesktop && "md:justify-center",
                )}
              >
                {relatedProducts.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className={cn(
                      "pl-4 flex-none overflow-visible",
                      // MOBILE
                      "basis-full",
                      // TABLET
                      "md:basis-1/2",
                      // DESKTOP
                      "lg:basis-1/4",
                    )}
                  >
                    <ProductCard product={product} reviews={product.reviews} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* ================= ARROWS ================= */}
              {showArrows && (
                <>
                  <CarouselPrevious
                    className="
                      absolute 
                      top-1/2 
                      -translate-y-1/2 
                      -left-5
                      hidden md:inline-flex
                      h-10 w-10 rounded-full 
                      bg-white shadow-md border border-slate-200
                      hover:bg-slate-50
                    "
                  />
                  <CarouselNext
                    className="
                      absolute 
                      top-1/2 
                      -translate-y-1/2 
                      -right-5
                      hidden md:inline-flex
                      h-10 w-10 rounded-full 
                      bg-white shadow-md border border-slate-200
                      hover:bg-slate-50
                    "
                  />
                </>
              )}
            </Carousel>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RelatedProductsSlider;
