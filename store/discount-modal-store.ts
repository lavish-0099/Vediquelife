import { create } from "zustand";

type DiscountType = "coupon" | "cart";

interface DiscountModalStore {
  open: boolean;
  percent?: number;
  amount?: number;
  type?: DiscountType;

  showCouponDiscount: (amount: number) => void;
  showCartDiscount: (percent: number) => void;

  close: () => void;
}

export const useDiscountModalStore = create<DiscountModalStore>((set) => ({
  open: false,
  percent: undefined,
  amount: undefined,
  type: undefined,

  showCouponDiscount: (amount) =>
    set({
      open: true,
      amount,
      type: "coupon",
    }),

  showCartDiscount: (percent) =>
    set({
      open: true,
      percent,
      type: "cart",
    }),

  close: () =>
    set({
      open: false,
      percent: undefined,
      amount: undefined,
      type: undefined,
    }),
}));
