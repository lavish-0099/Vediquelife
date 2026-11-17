"use client";

import { ProductCategories, Products } from "@prisma/client";
import ProductOverview from "./product-overview";
import Container from "../container";

interface ProductDetailsProps {
  product: Products & { ProductCategories: ProductCategories };
  className?: string;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="w-full">
      <Container>
        <div className="w-full md:min-w-[600px] text-start items-start bg-white rounded-md shadow-sm p-4">
          <h2 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            About {product.title}
          </h2>
          <ProductOverview product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
