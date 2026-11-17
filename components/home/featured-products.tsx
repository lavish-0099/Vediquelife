"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { getProducts } from "@/actions/get-products";
import Container from "@/components/container";
import ProductCard from "@/components/products/product-card";
import { ProductCategories, Products, Reviews } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedProducts } from "@/actions/get-featured-products";

type ProductWithCategory = Products & {
  ProductCategories: ProductCategories;
  reviews: Reviews[];
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getFeaturedProducts({});
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="w-full pt-12 pb-10 mt-10 bg-[#f8faf8]" id="products">
      <Container>
        {/* Heading */}
        <h3 className="text-3xl md:text-4xl font-semibold text-center text-webvedique mb-2">
          Herbal Infusions and Daily Wellness
        </h3>

        <p className="text-center text-sm mb-10 text-slate-600">
          Simple, natural, science-backed blends crafted by our nutrition
          experts
        </p>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex justify-center gap-6 flex-wrap">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[280px] flex flex-col space-y-3 p-4 border rounded-lg bg-white"
              >
                <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* ================= MOBILE SLIDER ================= */}
            <div className="block md:hidden w-full">
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                centeredSlides
                navigation
                className="w-full"
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="flex justify-center">
                      <div className="w-[280px]">
                        <ProductCard
                          product={product}
                          reviews={product.reviews}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ================= DESKTOP GRID ================= */}
            <div className="hidden md:flex justify-center gap-6 flex-wrap">
              {products.map((product) => (
                <div key={product.id} className="w-[280px]">
                  <ProductCard product={product} reviews={product.reviews} />
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default FeaturedProducts;
