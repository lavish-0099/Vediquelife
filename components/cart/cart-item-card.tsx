"use client";

import { CartItem } from "@/types/cart-item";
import { IoTrashOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/formatCurrency";
import { useEffect, useState } from "react";
import { useUserCountry } from "@/context/user-country-context";
import {
  calculateDiscount,
  calculateItemTax,
  isItemEligibleForCoupon,
} from "@/lib/checkout";
import Image from "next/image";
import Link from "next/link";
import { useCartController } from "@/hooks/use-cart-controller";
import Loader from "../loader/loader";
import { cn } from "@/lib/utils";
import { useCouponStore } from "@/store/coupon-store";
import { distributeCartDiscount } from "@/utils/distributeCartDiscount";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const [itemPrice, setItemPrice] = useState<number>(item.price!);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const { userCurrency, userCountry } = useUserCountry();
  const { updateQuantity, removeFromCart } = useCartController();
  const { appliedCoupon } = useCouponStore();
  const { cartRuleDiscount } = useCheckoutStore();
  const { cartItems } = useCartStore();

  const cartDiscountMap = distributeCartDiscount(cartItems, cartRuleDiscount);
  const cartDiscountPerItem = cartDiscountMap[item.id] || 0;

  useEffect(() => {
    const fetchPriceDetails = async () => {
      if (!userCountry) return;

      const tax = await calculateItemTax(item, null, userCountry);

      const basePriceINR = item.price!;
      const basePriceUSD = item.int_price!;
      const basePrice = userCountry !== "IN" ? basePriceUSD : basePriceINR;

      const offerPrice =
        item.salePrice && item.salePrice < basePrice
          ? item.salePrice
          : basePrice;

      setItemPrice(offerPrice);
      setTaxAmount(tax);

      setLoading(false);
    };

    fetchPriceDetails();
  }, [item, userCountry]);

  if (loading) {
    return <Loader />;
  }

  const discountPerItem =
    appliedCoupon && isItemEligibleForCoupon(item, appliedCoupon)
      ? calculateDiscount(
          { ...item, price: itemPrice, quantity: 1 },
          appliedCoupon,
          userCountry,
        )
      : 0;

  const finalPrice = itemPrice - discountPerItem - cartDiscountPerItem;
  const totalPrice = finalPrice * item.quantity;

  return (
    <div className="relative flex items-center justify-between bg-white p-4 rounded-xl shadow-sm gap-4">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.imageUrl || "/assets/1.webp"}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-center gap-1">
        <Link href={`/product/${item.slug}`}>
          <h2 className="text-base text-webprimary font-semibold hover:text-webvedique break-words leading-snug">
            {item.title}
          </h2>
        </Link>

        {/* Price Section */}
        <div className="text-sm">
          <div className="text-xs font-semibold">
            MRP:{" "}
            {item.salePrice && item.salePrice < item.price! && (
              <span className="line-through text-gray-500 mr-1">
                {formatCurrency(item.price!, userCurrency)}
              </span>
            )}
            <span className="text-green-600">
              {formatCurrency(finalPrice, userCurrency)}
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            Tax: {formatCurrency(taxAmount, userCurrency)}
          </div>

          <div className="text-sm font-semibold mt-1">
            Total: {formatCurrency(totalPrice, userCurrency)}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={async () =>
              await updateQuantity(item.id, item.quantity - 1)
            }
            className="w-7 h-7 flex items-center justify-center rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
          >
            -
          </button>

          <span className="text-base">{item.quantity}</span>

          <button
            onClick={async () =>
              await updateQuantity(item.id, item.quantity + 1)
            }
            className="w-7 h-7 flex items-center justify-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600 text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={async () => await removeFromCart(item.id, null, () => {})}
        className="absolute bottom-4 right-4 text-red-500 hover:text-red-700 transition"
      >
        <IoTrashOutline size={22} />
      </button>
    </div>
  );
};

export default CartItemCard;
