import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppliedCoupon } from "@/types/coupon";

interface CouponStore {
  couponStatus: string | null;
  setCouponStatus: (status: string | null) => void;
  isSuccess: boolean;
  setIsSuccess: (success: boolean) => void;
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
  clearCoupon: () => void;
}

export const useCouponStore = create<CouponStore>()(
  persist(
    (set) => ({
      couponStatus: null,
      setCouponStatus: (status) => set({ couponStatus: status }),
      isSuccess: false,
      setIsSuccess: (success) => set({ isSuccess: success }),
      appliedCoupon: null,
      setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),
      clearCoupon: () => {
        set({ appliedCoupon: null, couponStatus: null, isSuccess: false });
      },
    }),
    {
      name: "coupon-storage",
      partialize: (state) => ({
        appliedCoupon: state.appliedCoupon,
        isSuccess: state.isSuccess,
        couponStatus: state.couponStatus,
      }),
    }
  )
);
