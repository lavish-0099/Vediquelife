import { exchangePrice } from "./exchangePrice";

type BaseItem = {
  id: string;
  title: string;
  price: number;
  int_price?: number;
  salePrice?: number | null;
  int_salePrice?: number | null;
  crmId?: string | null;
  slug: string;
  imageUrl?: string | null;
  taxRate?: number | null;
  taxAmount?: number | null;
  stock: number | null;
};

interface CreateCartItemOptions {
  item: BaseItem;
  userCountry: string;
  userCurrency: string;
}

export const createCartItem = async ({
  item,
  userCountry,
  userCurrency,
}: CreateCartItemOptions) => {
  if (!item) {
    throw new Error("createCartItem error: 'item' is undefined.");
  }

  const isIndia = userCountry === "IN";

  // INR or USD (original)
  const basePrice = isIndia ? item.price : (item.int_price ?? item.price);

  // Final price for user's currency
  const finalBasePrice = isIndia
    ? basePrice
    : await exchangePrice(basePrice, userCurrency);
  const finalSalePrice = item.int_salePrice
    ? isIndia
      ? item.int_salePrice
      : await exchangePrice(item.int_salePrice, userCurrency)
    : item.int_price;

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    int_price: finalBasePrice,
    salePrice: item.salePrice ?? item.price,
    int_salePrice: finalSalePrice ?? finalBasePrice,
    taxRate: item.taxRate,
    taxAmount: item.taxAmount,
    imageUrl: item.imageUrl,
    quantity: 1,
    crmId: item.crmId || "",
    slug: item.slug,
    currency: userCurrency,
    stock: item.stock,
  };
};
