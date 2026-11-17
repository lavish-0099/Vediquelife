"use client";

import { Products } from "@prisma/client";
import { Preview } from "../preview";

interface ProductOverviewProps {
  product: Products;
}

const ProductOverview = ({ product }: ProductOverviewProps) => {
  return (
    <div className="w-full items-start justify-start">
      <Preview value={product.description!} />
    </div>
  );
};

export default ProductOverview;
