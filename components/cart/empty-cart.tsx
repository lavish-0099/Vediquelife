"use client";

import Image from "next/image";
import Link from "next/link";

import emptyCart from "@/public/assets/empty-cart.png";
import { CtaButton } from "../cta-button";

const EmptyCart = () => {
  return (
    <div className="text-center py-8">
      <div className="px-6 py-10">
        <Image
          src={emptyCart}
          alt="empty-cart"
          className="mx-auto"
          width={250}
        />
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Start adding product to your cart to see them here.
        </p>

        <div className="flex justify-center">
          <Link href="/products">
            <CtaButton label="Browse Products" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
