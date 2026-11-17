import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart-item";
import { Coupon } from "@/types/coupon";
type CheckoutIntent = {
  type: "BUY_NOW";
  itemId: string;
  createdAt: number;
} | null;

type CartRule = {
  id: string;
  title: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderValue: number;
  discountPercent: number;
};

interface CartState {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  cartRules: CartRule[];
  setCartRules: (rules: CartRule[]) => void;
  availableCoupons: Coupon[];
  setAvailableCoupons: (coupons: any[]) => void;
  cartLoading: boolean;
  setCartLoading: (loading: boolean) => void;
  checkoutIntent: CheckoutIntent;
  setCheckoutIntent: (intent: CheckoutIntent) => void;
  clearCheckoutIntent: () => void;
  activeCartItem: CartItem | null;
  setActiveCartItem: (item: CartItem | null) => void;
  isBottomBarVisible: boolean;
  setBottomBarVisible: (v: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      setCartItems: (items) => set({ cartItems: items }),
      cartRules: [],
      setCartRules: (rules) => set({ cartRules: rules }),
      availableCoupons: [],
      setAvailableCoupons: (coupons) => set({ availableCoupons: coupons }),
      cartLoading: false,
      setCartLoading: (loading) => set({ cartLoading: loading }),
      checkoutIntent: null,
      setCheckoutIntent: (intent) => set({ checkoutIntent: intent }),
      clearCheckoutIntent: () => set({ checkoutIntent: null }),
      activeCartItem: null,
      setActiveCartItem: (item) => set({ activeCartItem: item }),
      isBottomBarVisible: false,
      setBottomBarVisible: (v: boolean) => set({ isBottomBarVisible: v }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
