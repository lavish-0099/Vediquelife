import { z } from "zod";
import { billingSchema, checkoutSchema } from "@/schemas";

export type DynamicFormValues = z.infer<typeof billingSchema>;

export type ProductDetail = {
  productId: string;
  crmId?: string;
  title: string;
  quantity: number;
  price: number | null;
  int_price: number | null;
  imageUrl?: string | null;
  taxRate?: number | null;
  taxAmount?: number | null;
  type?: string | null;
};

export type CartData = {
  subTotal: number;
  totalTax: number;
  discount?: number;
  grandTotal: number;
  couponCode?: string;
};

export type CheckoutData = DynamicFormValues &
  CartData & {
    products: ProductDetail[];
    paymentMethod: string;
    currency: string;
    sameAsBilling: boolean;
  };
