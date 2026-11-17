import { useCartStore } from "@/store/cart-store";
import { saveCartToDatabase } from "@/actions/cart";
import { CartItem } from "@/types/cart-item";
import { AppliedCoupon } from "@/types/coupon";
import { useCurrentUser } from "./use-current-user";
import { getCartCoupons } from "@/actions/get-cart-coupons";
import { useDiscountModalStore } from "@/store/discount-modal-store";
import { runCartRules } from "@/helper/cart-rule-engine";
import { useRef } from "react";
export const useCartController = () => {
  const {
    cartItems,
    setCartItems,
    checkoutIntent,
    setCheckoutIntent,
    clearCheckoutIntent,
  } = useCartStore();
  const user = useCurrentUser();
  const prevPercentRef = useRef(0);
  const { setAvailableCoupons, cartRules } = useCartStore();
  const { showCartDiscount } = useDiscountModalStore();
  const addToCart = async (item: CartItem) => {
    let updatedCart = [...cartItems];

    const existingItem = updatedCart.find((i) => i.id === item.id);

    if (existingItem) {
      updatedCart = updatedCart.map((i) =>
        i.id === item.id
          ? {
              ...i,
              quantity: i.quantity + item.quantity,
            }
          : i,
      );
    } else {
      updatedCart.push({
        ...item,
        quantity: item.quantity,
      });
    }

    if (checkoutIntent?.type === "BUY_NOW") {
      clearCheckoutIntent();
    }

    setCartItems(updatedCart);
    runCartRules(
      updatedCart,
      0,
      0,
      cartRules,
      prevPercentRef,
      showCartDiscount,
    );

    await refreshCoupons(updatedCart);

    if (user) {
      await saveCartToDatabase(updatedCart, user.id);
    }
  };

  const addManyToCart = async (items: CartItem[]) => {
    // current cart ka copy
    let updatedCart = [...cartItems];

    // har incoming item ko existing cart ke saath merge karo
    for (const item of items) {
      const existingItem = updatedCart.find((i) => i.id === item.id);

      if (existingItem) {
        updatedCart = updatedCart.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
              }
            : i,
        );
      } else {
        updatedCart.push({
          ...item,
          quantity: item.quantity,
        });
      }
    }

    // BUY_NOW intent clear same tarah jaise addToCart me
    if (checkoutIntent?.type === "BUY_NOW") {
      clearCheckoutIntent();
    }

    // ek hi baar cart update
    setCartItems(updatedCart);
    await refreshCoupons(updatedCart);

    // aur ek hi baar DB me save
    if (user) {
      await saveCartToDatabase(updatedCart, user.id);
    }
  };

  // --- NEW: set/overwrite quantity for a specific item (used by Buy Now) ---
  const setCartItemQuantity = async (item: CartItem) => {
    const qty = Math.max(1, item.quantity ?? 1);
    let updatedCart = [...cartItems];
    const idx = updatedCart.findIndex((i) => i.id === item.id);

    if (idx >= 0) {
      updatedCart[idx] = {
        ...updatedCart[idx],
        quantity: qty,
      };
    } else {
      updatedCart.push({ ...item, quantity: qty });
    }

    setCartItems(updatedCart);
    await refreshCoupons(updatedCart);

    if (user) {
      await saveCartToDatabase(updatedCart, user.id);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item,
    );

    setCartItems(updatedCart);
    await refreshCoupons(updatedCart);

    if (user) {
      await saveCartToDatabase(updatedCart, user.id);
    }
  };

  const removeFromCart = async (
    id: string,
    appliedCoupon: AppliedCoupon | null,
    clearCoupon: () => void,
  ) => {
    const filteredCart = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCart);
    await refreshCoupons(filteredCart);

    if (filteredCart.length === 0) {
      if (useCartStore.persist?.clearStorage) {
        await useCartStore.persist.clearStorage();
      } else {
        localStorage.removeItem("cart-storage");
      }
    }

    if (
      appliedCoupon &&
      appliedCoupon.applicableProducts?.some((p) => p.id === id)
    ) {
      clearCoupon();
    }

    if (user) {
      await saveCartToDatabase(filteredCart, user.id);
    }
  };

  const emptyCart = async () => {
    setCartItems([]);
    setAvailableCoupons([]);
    if (useCartStore.persist?.clearStorage) {
      await useCartStore.persist.clearStorage();
    } else {
      localStorage.removeItem("cart-storage");
    }
    if (user) {
      await saveCartToDatabase([], user.id);
    }
  };

  const buyNow = async (item: CartItem) => {
    const qty = Math.max(1, item.quantity ?? 1);
    await setCartItemQuantity({ ...item, quantity: qty });

    if (checkoutIntent?.itemId !== item.id) {
      setCheckoutIntent({
        type: "BUY_NOW",
        itemId: item.id,
        createdAt: Date.now(),
      });
    }
  };

  const refreshCoupons = async (cart: CartItem[]) => {
    if (!cart.length) {
      setAvailableCoupons([]);
      return;
    }

    const coupons = await getCartCoupons();
    const mappedCoupons = coupons.map((coupon) => ({
      ...coupon,
      applicableProducts: coupon.ProductOnCoupon.map((p) => ({
        id: p.productId,
      })),
    }));
    setAvailableCoupons(mappedCoupons);
  };

  return {
    addToCart,
    addManyToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
    buyNow,
    clearCheckoutIntent,
    refreshCoupons,
  };
};
