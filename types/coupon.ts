import { DiscountType } from "@prisma/client";

export type AppliedCoupon = {
  code: string;
  calculatedDiscount: number;
  discountValue: number;
  discountType: DiscountType;
  applicableProducts?: {
    id: string;
    title: string;
    price: number;
    int_price: number;
    taxRate: number;
  }[];
};

export type Coupon = {
  id: string;
  code: string;
  description?: string | null;
  discountType: DiscountType;
  discountValue?: number | null;
  expiryDate?: Date | null;
  applicableProducts?: {
    id: string;
    title: string;
    price: number;
    int_price: number;
    taxRate: number;
  }[];
  isActive: boolean;
};
