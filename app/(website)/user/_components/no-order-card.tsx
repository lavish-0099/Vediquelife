"use client";

import Link from "next/link";

const NoOrdersCard = () => {
  return (
    <div className="bg-white rounded-md shadow-sm transition p-4 text-center">
      <h2 className="text-2xl font-bold text-gray-700">You have no orders</h2>
      <p className="text-gray-500 my-4">
        Please browse our plans and place your first order.
      </p>
      <Link
        href="/products"
        className="inline-block bg-webprimary text-white font-semibold py-2 px-4 rounded hover:bg-webtertiary"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default NoOrdersCard;
