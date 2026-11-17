import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { handleRazorpayPayment } from "@/utils/payments/handle-razorpay";
import { initializePayUPayment } from "@/utils/payments/handle-payu";
import { handleCOD } from "@/utils/payments/handle-cod";

import { useUserCountry } from "@/context/user-country-context";

import {
  calculateGrandTotal,
  calculateProductsTotal,
  calculateTotalBaseAmount,
  calculateTotalDiscountAmount,
  calculateTotalTaxAmount,
  getProductPerDiscountDetails,
} from "@/lib/checkout";
import { CartItem } from "@/types/cart-item";

import { useCheckoutStore } from "@/store/checkout-store";
import { checkoutRegister } from "@/actions/checkout-register";
import { DynamicFormValues } from "@/types/checkout";
import { User } from "@/types/user";
import { useCouponStore } from "@/store/coupon-store";
import { useCartStore } from "@/store/cart-store";
import { clearCartAfterCheckout, saveCartToDatabase } from "@/actions/cart";
import { useCartController } from "./use-cart-controller";

export function useCheckoutController() {
  const { cartItems, checkoutIntent, cartRules } = useCartStore();

  const { emptyCart, removeFromCart } = useCartController();
  const { userCountry, userCurrency, exchangeRate } = useUserCountry();
  const router = useRouter();
  const user = useCurrentUser();
  const { initializeRazorpayPayment } = handleRazorpayPayment();

  const checkoutItems = (() => {
    if (checkoutIntent?.type === "BUY_NOW") {
      const only = cartItems.filter((i) => i.id === checkoutIntent.itemId);
      return only.length > 0 ? only : cartItems;
    }
    return cartItems;
  })();

  const {
    sameAsBilling,
    selectedMethod,
    setOtpModalOpen,
    setFormDataWithProducts,
    setName,
    setEmail,
    setPhoneNumber,
    name,
    email,
    phoneNumber,
    setIsPaymentProcessing,
    setTotalTax,
    setBaseTotal,
    setProductDiscount,
    setCouponDiscount,
    setCartRuleDiscount,
    setTotalDiscount,
    setGrandTotal,
    subTotal,
    baseTotal,
    totalTax,
    totalDiscount,
    cartRuleDiscount,
    setSubTotal,
    grandTotal,
  } = useCheckoutStore();

  const { appliedCoupon, clearCoupon } = useCouponStore();

  const productPerDiscountDetails = getProductPerDiscountDetails(
    checkoutItems,
    appliedCoupon,
    userCountry,
  );

  useEffect(() => {
    const calculateTotals = async () => {
      if (!checkoutItems.length) return;

      try {
        const [mrpTotal, subTotal, totalTax, discountData, grandTotal] =
          await Promise.all([
            calculateProductsTotal(checkoutItems, userCountry),

            calculateTotalBaseAmount(
              checkoutItems,
              appliedCoupon,
              userCountry,
              userCurrency,
              cartRules,
            ),

            calculateTotalTaxAmount(
              checkoutItems,
              appliedCoupon,
              userCountry,
              userCurrency,
              cartRules,
            ),

            calculateTotalDiscountAmount(
              checkoutItems,
              appliedCoupon,
              userCountry,
              cartRules,
            ),

            calculateGrandTotal(
              checkoutItems,
              appliedCoupon,
              userCountry,
              userCurrency,
              cartRules,
            ),
          ]);

        setBaseTotal(mrpTotal);
        setSubTotal(subTotal);
        setTotalTax(totalTax);

        setProductDiscount(discountData.productDiscount);
        setCouponDiscount(discountData.couponDiscount);
        setCartRuleDiscount(discountData.cartRuleDiscount);

        setTotalDiscount(discountData.totalDiscount);

        setGrandTotal(grandTotal);
      } catch (error) {
        console.error("Error calculating totals:", error);
      }
    };

    calculateTotals();
  }, [checkoutItems, appliedCoupon, userCountry, userCurrency, cartRules]);
  const removeCoupon = () => {
    clearCoupon();
    toast.success("Coupon removed successfully!");
  };
  const createUserIfNotExist = async (values: DynamicFormValues) => {
    const registerPhoneNumber = values.billing_phoneNumber.startsWith("+")
      ? values.billing_phoneNumber
      : `+${values.billing_phoneNumber}`;
    const registerPayload = {
      name: name || values.billing_firstName + " " + values.billing_lastName,
      email: email || values.billing_email,
      phoneNumber: phoneNumber || registerPhoneNumber,
    };

    if (!registerPayload) return;

    try {
      const data = await checkoutRegister(registerPayload);

      if (data?.error) {
        console.error("Something went wrong");
        return;
      }

      if (data.twoFactor) {
        setOtpModalOpen(true);
        return;
      }

      if (data?.user) {
        return data.user;
      }
    } catch (err) {
      console.error("Something went wrong");
    }
  };

  const handlePaymentSubmit = async (values: DynamicFormValues) => {
    try {
      const productDetails = checkoutItems?.map((item: CartItem) => ({
        productId: item.id,
        crmId: item.crmId!,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        int_price: item.int_price,
        taxRate: item.taxRate,
        taxAmount: item.taxAmount,
      }));

      const cartData = {
        subTotal: parseFloat(baseTotal.toFixed(2)),
        totalTax: parseFloat(totalTax.toFixed(2)),
        discount: parseFloat(totalDiscount.toFixed(2)),
        grandTotal: parseFloat(grandTotal.toFixed(2)),
        couponCode: appliedCoupon?.code,
      };
      const formDataWithProducts = {
        ...values,
        ...cartData,
        products: productDetails,
        paymentMethod: selectedMethod,
        currency: userCurrency,
        sameAsBilling,
      };

      setFormDataWithProducts(formDataWithProducts);

      const tempName = values.billing_firstName + " " + values.billing_lastName;
      const tempEmail = values.billing_email;
      const formattedPhoneNumber = values.billing_phoneNumber.startsWith("+")
        ? values.billing_phoneNumber
        : `+${values.billing_phoneNumber}`;
      setName(tempName);
      setEmail(tempEmail);
      setPhoneNumber(formattedPhoneNumber);

      let currentUser: User | undefined = user;

      if (!currentUser) {
        // User does not exist, so create the user first
        currentUser = await createUserIfNotExist(values);
        if (!currentUser) {
          return;
        }
      }
      await saveCartToDatabase(cartItems, currentUser.id);
      setIsPaymentProcessing(true);
      const checkoutPayload = {
        ...formDataWithProducts,
        user: currentUser,
        exchangeRate,
      };

      const checkoutRes = await axios.post("/api/checkout", checkoutPayload);

      const checkoutData = checkoutRes.data;

      if (checkoutData.paymentMethod === "COD") {
        // Handle Cash on Delivery
        const result = await handleCOD(
          values,
          checkoutData,
          productPerDiscountDetails,
        );
        if (result.success) {
          if (checkoutIntent?.type === "BUY_NOW") {
            // remove purchased items from cart (both DB and local)
            for (const it of checkoutItems) {
              await removeFromCart(it.id, appliedCoupon, () => {});
            }
          } else {
            await clearCartAfterCheckout(currentUser.id);
            await emptyCart();
          }
          router.push(`/success?orderId=${checkoutData.id}`);
        }
      } else if (checkoutData.paymentMethod === "Razorpay") {
        try {
          const res = await initializeRazorpayPayment(
            values,
            checkoutData,
            productPerDiscountDetails,
            exchangeRate,
          );

          if (res.status === "success") {
            if (checkoutIntent?.type === "BUY_NOW") {
              // remove purchased items from cart (both DB and local)
              for (const it of checkoutItems) {
                await removeFromCart(it.id, appliedCoupon, () => {});
              }
            } else {
              await clearCartAfterCheckout(currentUser.id);
              await emptyCart();
            }
            router.push(`/success?orderId=${checkoutData.id}`);
          } else if (res.status === "cancelled") {
            toast.warning(res.message || "Payment was cancelled.");
            setIsPaymentProcessing(false);
          } else if (res.status === "error") {
            toast.error(res.message || "Payment failed.");
            setIsPaymentProcessing(false);
          }
        } catch (err) {
          toast.error("Something went wrong during Razorpay payment.");
        } finally {
          setIsPaymentProcessing(false); // ALWAYS set false
        }
      } else if (checkoutData.paymentMethod === "PayU") {
        await initializePayUPayment(
          values,
          checkoutData,
          productPerDiscountDetails,
        );
        if (checkoutIntent?.type === "BUY_NOW") {
          // remove purchased items from cart (both DB and local)
          for (const it of checkoutItems) {
            await removeFromCart(it.id, appliedCoupon, () => {});
          }
        } else {
          await clearCartAfterCheckout(currentUser.id);
          await emptyCart();
        }
      }
    } catch (err) {
      toast.error("Checkout failed");
    } finally {
      setIsPaymentProcessing(false); // ALWAYS set false
    }
  };

  return {
    removeCoupon,
    handlePaymentSubmit,
    baseTotal,
    subTotal,
    grandTotal,
    cartRuleDiscount,
  };
}
