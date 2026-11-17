"use server";

import { db } from "@/lib/db";

export const getProductCoupons = async (productId: string) => {
  const now = new Date();
  // product price fetch
  const product = await db.products.findUnique({
    where: { id: productId },
    select: {
      price: true,
      salePrice: true,
    },
  });

  if (!product) return [];

  const effectivePrice = product.salePrice ?? product.price ?? 0;

  return db.coupon.findMany({
    where: {
      isActive: true,
      isDisplayOnProductPage: true,

      OR: [{ expiryDate: null }, { expiryDate: { gte: now } }],

      AND: [
        {
          OR: [
            // coupon for all products
            {
              ProductOnCoupon: {
                none: {},
              },
            },

            // coupon for specific product
            {
              ProductOnCoupon: {
                some: {
                  productId,
                },
              },
            },
          ],
        },

        // ❗ price comparison logic
        {
          OR: [
            {
              discountType: "PERCENTAGE",
            },
            {
              discountType: "FIXED_PRODUCT",
              discountValue: {
                lte: effectivePrice,
              },
            },
          ],
        },
      ],
    },

    orderBy: {
      discountValue: "desc",
    },
  });
};
