import { CartItem } from "@/types/cart-item";
import { AppliedCoupon } from "@/types/coupon";
import { getCartRulePercent } from "./cart";

/**
 * Effective product price (MRP or Sale)
 */
export const getEffectivePrice = (
  item: CartItem,
  userCountry?: string,
): number => {
  const mrp = userCountry !== "IN" ? (item.int_price ?? 0) : (item.price ?? 0);

  const sale =
    userCountry !== "IN"
      ? (item.int_salePrice ?? null)
      : (item.salePrice ?? null);

  if (sale && sale < mrp) return sale;

  return mrp;
};

/** Calculate MRP */

export const calculateProductsTotal = (
  cartItems: CartItem[],
  userCountry: string,
) => {
  let total = 0;

  for (const item of cartItems) {
    const mrp =
      userCountry !== "IN" ? (item.int_price ?? 0) : (item.price ?? 0);

    total += mrp * item.quantity;
  }

  return total;
};

/**
 * Total product discount
 */

export const calculateProductDiscount = (
  cartItems: CartItem[],
  userCountry: string,
) => {
  let total = 0;

  for (const item of cartItems) {
    const mrp =
      userCountry !== "IN" ? (item.int_price ?? 0) : (item.price ?? 0);

    const sale = getEffectivePrice(item, userCountry);

    const discount = mrp - sale;

    if (discount > 0) {
      total += discount * item.quantity;
    }
  }

  return total;
};

/**
 * Coupon applicability
 */
export const isItemEligibleForCoupon = (
  item: CartItem,
  appliedCoupon: AppliedCoupon | null,
): boolean => {
  if (!appliedCoupon) return false;

  if (
    !appliedCoupon.applicableProducts ||
    appliedCoupon.applicableProducts.length === 0
  )
    return true;

  return appliedCoupon.applicableProducts.some(
    (product) => product.id === item.id,
  );
};

/**
 * Coupon discount per item
 */
export const calculateDiscount = (
  item: CartItem,
  appliedCoupon?: AppliedCoupon | null,
  userCountry?: string,
): number => {
  if (!appliedCoupon) return 0;

  if (!isItemEligibleForCoupon(item, appliedCoupon)) return 0;

  const price = getEffectivePrice(item, userCountry);

  if (appliedCoupon.discountType === "FIXED_PRODUCT") {
    return (
      appliedCoupon.discountValue /
      (appliedCoupon.applicableProducts?.length || 1)
    );
  }

  if (
    appliedCoupon.discountType === "PERCENTAGE" ||
    appliedCoupon.discountType === "CART_PERCENTAGE"
  ) {
    return (price * appliedCoupon.discountValue) / 100;
  }

  return 0;
};

/* Calculate total coupon discount for the entire cart */

export const calculateCouponDiscountTotal = (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
) => {
  let total = 0;

  for (const item of cartItems) {
    const discount = calculateDiscount(item, appliedCoupon, userCountry);

    total += discount * item.quantity;
  }

  return total;
};

/**
 * Price after coupon
 */
export const calculateDiscountedPrice = (
  item: CartItem,
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
): number => {
  const price = getEffectivePrice(item, userCountry);

  const discount = appliedCoupon
    ? calculateDiscount(item, appliedCoupon, userCountry)
    : 0;

  return price - discount;
};

/**
 * Subtotal after product offer + coupon
 */
export const calculateSubTotal = async (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
  userCurrency: string,
): Promise<number> => {
  let total = 0;

  for (const item of cartItems) {
    const price = calculateDiscountedPrice(item, appliedCoupon, userCountry);

    total += price * item.quantity;
  }

  return total;
};

/**
 * Cart rule discount
 */
export const calculateCartRuleDiscount = async (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
  cartRules: any[],
): Promise<number> => {
  const subTotal = await calculateSubTotal(
    cartItems,
    appliedCoupon,
    userCountry,
    "INR",
  );

  const percent = getCartRulePercent(subTotal, cartRules);

  return (subTotal * percent) / 100;
};

/**
 * Total discount (coupon + cart rule)
 */
export const calculateTotalDiscountAmount = async (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
  cartRules: any[],
) => {
  const productDiscount = calculateProductDiscount(cartItems, userCountry);

  const couponDiscount = calculateCouponDiscountTotal(
    cartItems,
    appliedCoupon,
    userCountry,
  );

  const cartRuleDiscount = await calculateCartRuleDiscount(
    cartItems,
    appliedCoupon,
    userCountry,
    cartRules,
  );

  return {
    productDiscount,
    couponDiscount,
    cartRuleDiscount,
    totalDiscount: productDiscount + couponDiscount + cartRuleDiscount,
  };
};

/**
 * Final subtotal after all discounts
 */
export const calculateTotalBaseAmount = async (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
  userCurrency: string,
  cartRules: any[] = [],
): Promise<number> => {
  const subTotal = await calculateSubTotal(
    cartItems,
    appliedCoupon,
    userCountry,
    userCurrency,
  );

  const cartRuleDiscount = await calculateCartRuleDiscount(
    cartItems,
    appliedCoupon,
    userCountry,
    cartRules,
  );

  return subTotal - cartRuleDiscount;
};

/**
 * Tax AFTER discounts
 */
export const calculateTotalTaxAmount = async (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
  userCurrency: string,
  cartRules: any[] = [],
): Promise<number> => {
  const finalTotal = await calculateTotalBaseAmount(
    cartItems,
    appliedCoupon,
    userCountry,
    userCurrency,
    cartRules,
  );

  let tax = 0;

  for (const item of cartItems) {
    const taxRate = item.taxRate || 0;

    const itemTotal = finalTotal / cartItems.length;

    const itemTax = (itemTotal * taxRate) / (100 + taxRate);

    tax += itemTax;
  }

  return tax;
};

/**
 * GRAND TOTAL
 */
export const calculateGrandTotal = async (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
  userCurrency: string,
  cartRules: any[],
): Promise<number> => {
  return await calculateTotalBaseAmount(
    cartItems,
    appliedCoupon,
    userCountry,
    userCurrency,
    cartRules,
  );
};
/**
 * Calculate tax amount AFTER discount
 */
export const calculateItemTax = async (
  item: CartItem,
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
): Promise<number> => {
  const priceToUse = getEffectivePrice(item, userCountry);
  const discount =
    appliedCoupon && isItemEligibleForCoupon(item, appliedCoupon)
      ? calculateDiscount(item, appliedCoupon, userCountry)
      : 0;

  const discountedPrice = priceToUse - discount;

  const taxRate = item.taxRate || 0;
  const tax = (discountedPrice * taxRate) / (100 + taxRate);
  return tax * item.quantity;
};

/**
 * Build per-product discount details string (CRMID#Qty#FinalPrice)
 */
export const getProductPerDiscountDetails = (
  cartItems: CartItem[],
  appliedCoupon: AppliedCoupon | null,
  userCountry: string,
): string => {
  return cartItems
    .map((item) => {
      const finalPrice = calculateDiscountedPrice(
        item,
        appliedCoupon,
        userCountry,
      );
      return `${item.crmId}#${item.quantity}#${finalPrice.toFixed(2)}`;
    })
    .join(",");
};
