import { create } from "zustand";
import { CheckoutData } from "@/types/checkout";

interface CheckoutStore {
  checkoutPayload: CheckoutData | null;
  setFormDataWithProducts: (data: CheckoutData) => void;
  clearCheckoutData: () => void;
  sameAsBilling: boolean;
  setSameAsBilling: (same: boolean) => void;
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  otpModalOpen: boolean;
  setOtpModalOpen: (open: boolean) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  isPaymentProcessing: boolean;
  setIsPaymentProcessing: (isProcessing: boolean) => void;
  totalTax: number;
  setTotalTax: (tax: number) => void;
  baseTotal: number;
  setBaseTotal: (total: number) => void;
  productDiscount: number;
  setProductDiscount: (discount: number) => void;
  couponDiscount: number;
  setCouponDiscount: (discount: number) => void;
  cartRuleDiscount: number;
  setCartRuleDiscount: (discount: number) => void;
  totalDiscount: number;
  setTotalDiscount: (discount: number) => void;
  subTotal: number;
  setSubTotal: (total: number) => void;
  grandTotal: number;
  setGrandTotal: (total: number) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  checkoutPayload: null,
  setFormDataWithProducts: (data) => set({ checkoutPayload: data }),
  clearCheckoutData: () => set({ checkoutPayload: null }),
  sameAsBilling: true,
  setSameAsBilling: (same) => set({ sameAsBilling: same }),
  selectedMethod: "Razorpay",
  setSelectedMethod: (method) => set({ selectedMethod: method }),
  otpModalOpen: false,
  setOtpModalOpen: (open) => set({ otpModalOpen: open }),
  name: "",
  setName: (name) => set({ name }),
  email: "",
  setEmail: (email) => set({ email }),
  phoneNumber: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  isPaymentProcessing: false,
  setIsPaymentProcessing: (isProcessing) =>
    set({ isPaymentProcessing: isProcessing }),
  totalTax: 0,
  setTotalTax: (tax) => set({ totalTax: tax }),
  baseTotal: 0,
  setBaseTotal: (total) => set({ baseTotal: total }),
  productDiscount: 0,
  setProductDiscount: (discount) => set({ productDiscount: discount }),
  couponDiscount: 0,
  setCouponDiscount: (discount) => set({ couponDiscount: discount }),
  cartRuleDiscount: 0,
  setCartRuleDiscount: (discount) => set({ cartRuleDiscount: discount }),
  totalDiscount: 0,
  setTotalDiscount: (discount) => set({ totalDiscount: discount }),
  subTotal: 0,
  setSubTotal: (total) => set({ subTotal: total }),
  grandTotal: 0,
  setGrandTotal: (total) => set({ grandTotal: total }),
}));
