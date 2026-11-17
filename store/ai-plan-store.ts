import { create } from "zustand";

interface TaxInfo {
  cgst: number | null;
  sgst: number | null;
  igst: number | null;
  totalTax: number;
}

interface AIPlanStore {
  pincode: string;
  setPincode: (pin: string) => void;

  subTotal: number;
  setSubTotal: (amount: number) => void;

  couponDiscount: number;
  setCouponDiscount: (amount: number) => void;

  totalPrice: number;
  setTotalPrice: (amount: number) => void;

  taxInfo: TaxInfo;
  setTaxInfo: (info: TaxInfo) => void;
}

export const useAIPlanStore = create<AIPlanStore>((set) => ({
  pincode: "",
  setPincode: (pin) => set({ pincode: pin }),
  subTotal: 0,
  setSubTotal: (amount) => set({ subTotal: amount }),

  couponDiscount: 0,
  setCouponDiscount: (amount) => set({ couponDiscount: amount }),

  totalPrice: 0,
  setTotalPrice: (amount) => set({ totalPrice: amount }),
  taxInfo: {
    cgst: null,
    sgst: null,
    igst: null,
    totalTax: 0,
  },
  setTaxInfo: (info) => set({ taxInfo: info }),
  reset: () =>
    set({
      pincode: "",
      subTotal: 0,
      couponDiscount: 0,
      totalPrice: 0,
      taxInfo: { cgst: null, sgst: null, igst: null, totalTax: 0 },
    }),
}));
