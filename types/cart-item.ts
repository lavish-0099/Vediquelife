export interface CartItem {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string | null;
  price: number | null;
  int_price: number | null;
  salePrice?: number | null;
  int_salePrice?: number | null;
  quantity: number;
  taxRate?: number | null;
  crmId?: string | null;
  taxAmount?: number | null;
  currency: string;
  stock: number | null;
}
