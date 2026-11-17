import { Coupon } from "@/types/coupon";
import { CartItem } from "@/types/cart-item";
import { getEffectivePrice } from "@/lib/checkout";

export const calculateCouponTotalDiscount = (
  coupon: Coupon,
  cartItems: CartItem[],
  userCountry?: string,
): number => {
  if (!coupon?.discountValue) return 0;

  let discount = 0;

  switch (coupon.discountType) {
    case "PERCENTAGE": {
      const cartTotal = cartItems.reduce(
        (sum, item) =>
          sum + getEffectivePrice(item, userCountry) * item.quantity,
        0,
      );

      discount = (cartTotal * coupon.discountValue) / 100;
      break;
    }

    case "CART_PERCENTAGE": {
      const cartTotal = cartItems.reduce(
        (sum, item) =>
          sum + getEffectivePrice(item, userCountry) * item.quantity,
        0,
      );

      discount = (cartTotal * coupon.discountValue) / 100;
      break;
    }

    case "FIXED_PRODUCT": {
      for (const item of cartItems) {
        const eligible =
          !coupon.applicableProducts?.length ||
          coupon.applicableProducts.some((p) => p.id === item.id);

        if (!eligible) continue;

        discount += coupon.discountValue * item.quantity;
      }

      break;
    }

    default:
      discount = 0;
  }

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + getEffectivePrice(item, userCountry) * item.quantity,
    0,
  );

  return discount;
};

/**
 * Calculate coupon discount (cart level)
 */
export const calculateCouponDiscount = (
  coupon: Coupon,
  cartTotal: number,
): number => {
  if (!coupon.discountValue) return 0;

  let discount = 0;

  switch (coupon.discountType) {
    case "PERCENTAGE":
      discount = (cartTotal * coupon.discountValue) / 100;
      break;

    case "FIXED_PRODUCT":
      discount = coupon.discountValue;
      break;

    default:
      discount = 0;
  }

  return Math.min(discount, cartTotal);
};

/**
 * Check if coupon is applicable to cart products
 */
export const isCouponProductEligible = (
  coupon: Coupon,
  cartItems: CartItem[],
) => {
  // coupon sab products par apply ho sakta hai
  if (!coupon.applicableProducts || coupon.applicableProducts.length === 0) {
    return true;
  }

  const cartProductIds = new Set(cartItems.map((item) => item.id));

  return coupon.applicableProducts.some((product) =>
    cartProductIds.has(product.id),
  );
};

/**
 * Validate coupon
 */
export const validateCoupon = (
  coupon: Coupon,
  cartItems: CartItem[],
  cartTotal: number,
) => {
  if (!cartItems.length) {
    return {
      valid: false,
      reason: "Cart is empty",
    };
  }

  const productValid = isCouponProductEligible(coupon, cartItems);

  if (!productValid) {
    return {
      valid: false,
      reason: "Coupon not applicable to cart items",
    };
  }

  const discount = calculateCouponTotalDiscount(coupon, cartItems);
  if (discount <= 0) {
    return {
      valid: false,
      reason: "Invalid coupon value",
    };
  }

  if (discount >= cartTotal) {
    return {
      valid: false,
      reason: "Discount exceeds cart value",
    };
  }

  return {
    valid: true,
    reason: null,
  };
};
