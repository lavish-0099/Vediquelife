"use server";

import { db } from "@/lib/db";

export const getCartCoupons = async () => {
  const now = new Date();

  return db.coupon.findMany({
    where: {
      isActive: true,

      OR: [{ expiryDate: null }, { expiryDate: { gte: now } }],
    },

    select: {
      id: true,
      code: true,
      description: true,
      discountType: true,
      discountValue: true,
      ProductOnCoupon: {
        select: {
          productId: true,
        },
      },
    },

    orderBy: {
      discountValue: "desc",
    },
  });
};
