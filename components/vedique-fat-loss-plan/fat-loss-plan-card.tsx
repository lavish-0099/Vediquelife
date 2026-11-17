"use client";

import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { useUserCountry } from "@/context/user-country-context";
import { getSubscriptionPlans } from "@/actions/get-subscription-plans";
import AddToCart from "../cart/add-to-cart-button";
import { createCartItem } from "@/lib/create-cart-item";
import { CartItem } from "@/types/cart-item";
import { SubscriptionPlan } from "@/types/subscription-plan";

const FatLossPlanCard = () => {
  const { userCountry, userCurrency, exchangeRate } = useUserCountry();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [fatLossPlan, setFatLossPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      const { plans } = await getSubscriptionPlans("Premium", true);

      setFatLossPlan(plans[0] || null);
      setLoading(false);
    };

    fetchPlan();
  }, [userCurrency]);

  useEffect(() => {
    const prepareCartItem = async () => {
      if (!fatLossPlan || !userCountry || !userCurrency) return;

      const cartItems = await createCartItem({
        item: {
          id: fatLossPlan.id,
          title: fatLossPlan.name,
          price: fatLossPlan.priceInr ?? 0,
          int_price: fatLossPlan.priceUsd ?? 0, // this goes to backend
          crmId: fatLossPlan.crmId,
          slug: fatLossPlan.slug,
          type: "sp",
        },
        userCountry,
        userCurrency,
      });

      setCartItem(cartItems);
    };

    prepareCartItem();
  }, [fatLossPlan, userCountry, userCurrency, exchangeRate]);

  if (loading || !fatLossPlan) {
    return (
      <div className="text-center text-webprimary py-8">
        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
      </div>
    );
  }

  const durationMonths = Math.floor((fatLossPlan.durationDays || 30) / 30);
  const regularPrice =
    userCountry !== "IN"
      ? parseFloat(
          ((fatLossPlan.regularPriceUsd || 0) * (exchangeRate || 1)).toFixed(2)
        )
      : fatLossPlan.regularPriceInr || 0;
  const actualPrice =
    userCountry !== "IN"
      ? parseFloat(
          ((fatLossPlan.priceUsd || 0) * (exchangeRate || 1)).toFixed(2)
        )
      : fatLossPlan.priceInr || 0;
  const savings = parseFloat(
    Math.max(0, regularPrice - actualPrice).toFixed(2)
  );

  return (
    <div
      className="mx-4 sm:mx-6 lg:mx-auto my-6 lg:my-10 max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      id="pricing"
    >
      {/* Header */}
      <div className="p-4 md:p-6 bg-webvedique text-white">
        <h2 className="text-2xl md:text-3xl font-bold">
          {fatLossPlan.name} | Entry level plan
        </h2>
      </div>

      {/* Body */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Price + Action */}
        <div className="flex flex-col justify-between">
          <div className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-bold text-webvedique mb-1">
              {userCurrency} {actualPrice}
            </div>
            {savings > 0 && (
              <p className="text-sm text-green-600 font-medium mb-2">
                You save {userCurrency} {savings}
              </p>
            )}
            <p className="text-gray-600 text-sm mb-4">
              Valid for {durationMonths} month{durationMonths > 1 ? "s" : ""}
            </p>
          </div>
          {cartItem && <AddToCart item={cartItem} btnText="Buy Now" />}
        </div>

        {/* Right: Static Features */}
        <div>
          <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
            This plan includes:
          </h4>
          <ul className="text-sm text-gray-700 space-y-3 mt-4 md:mt-6">
            {fatLossPlan.additionalFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <IoIosCheckmarkCircle className="text-webvedique mt-0.5" />
                {feature.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FatLossPlanCard;
