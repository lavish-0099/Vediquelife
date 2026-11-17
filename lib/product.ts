import { ItemWithRelations } from "@/types/order";
interface ProductItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
  slug: string;
  int_price: number;
  taxRate: number;
  taxAmount: number;
}
export const calculateItemTax = async (
  item: ItemWithRelations,
  currency: string | null,
  exchangeRate: number | null
): Promise<number> => {
  const basePriceINR = item.price!;
  const basePriceUSD = item.int_price!;
  const priceToUse =
    currency !== "INR"
      ? (basePriceUSD as number) * (exchangeRate ?? 1)
      : basePriceINR;

  const taxRate = item.product?.taxRate || 0;
  const tax = (priceToUse * taxRate) / (100 + taxRate);
  return tax * item.quantity;
};

export const getItemPrice = (
  item: ProductItem,
  currency: string,
  exchangeRate: number | null
) => {
  const basePriceINR = item.price!;
  const basePriceUSD = item.int_price!;
  const priceToUse =
    currency !== "INR"
      ? (basePriceUSD as number) * (exchangeRate ?? 1)
      : basePriceINR;
  return priceToUse;
};

export const getItemTaxAmount = (
  item: ProductItem,
  currency: string,
  exchangeRate: number | null
) => {
  const basePriceINR = item.price!;
  const basePriceUSD = item.int_price!;
  const priceToUse =
    currency !== "INR"
      ? (basePriceUSD as number) * (exchangeRate ?? 1)
      : basePriceINR;
  const taxRate = item?.taxRate || 0;
  const tax = (priceToUse * taxRate) / (100 + taxRate);
  return tax * item.quantity;
};
