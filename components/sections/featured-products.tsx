"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/actions/get-products";
import Container from "@/components/container";
import ProductCard from "@/components/products/product-card";
import { ProductCategories, Products, Reviews } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
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
        const fetchedProducts = await getProducts({});
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching initial products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div
      className="w-full flex items-center justify-center pt-12 pb-10 mt-10  bg-[#f9f9ff]"
      id="products"
    >
      <Container>
        <h3 className="text-3xl font-bold text-center text-websecondary mb-10">
          Our Featured Products
        </h3>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col space-y-3 p-4 border rounded-lg min-w-[300px]"
              >
                <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                  <Skeleton className="h-4 w-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center">
            {products.map((product, index) => (
              <div key={index} className="my-4 flex flex-col w-full text-sm">
                <ProductCard product={product} reviews={product.reviews} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default FeaturedProducts;
