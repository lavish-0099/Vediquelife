"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, PhoneCall, Search } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUserCountry } from "@/context/user-country-context";
import { formatCurrency } from "@/lib/formatCurrency";
import { CtaButton } from "./cta-button";
import { useEffect, useState } from "react";
import { useCartController } from "@/hooks/use-cart-controller";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";
import { CartItem } from "@/types/cart-item";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function BottomFixedBar() {
  const pathname = usePathname();

  const { activeCartItem } = useCartStore();
  const { addToCart } = useCartController();
  const { userCurrency } = useUserCountry();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const setBottomBarVisible = useCartStore(
    (state) => state.setBottomBarVisible,
  );

  useEffect(() => {
    setBottomBarVisible(true);
    return () => setBottomBarVisible(false);
  }, [setBottomBarVisible]);

  const hiddenRoutes = ["/cart", "/checkout"];
  if (hiddenRoutes.some((r) => pathname.startsWith(r))) return null;

  const isHome = pathname === "/";
  const isProducts = pathname === "/products";
  const isProduct = pathname.startsWith("/product/");

  const handleAddToCart = async () => {
    if (adding || !activeCartItem) return;
    if (activeCartItem.stock === null || activeCartItem.stock <= 0) return;

    setAdding(true);
    await addToCart(activeCartItem as CartItem);
    setIsSheetOpen(true);
    setAdding(false);
  };

  const isOutOfStock =
    !activeCartItem ||
    activeCartItem.stock == null ||
    activeCartItem.stock <= 0;

  const discountPercent =
    activeCartItem?.salePrice && activeCartItem?.price
      ? Math.round(
          ((activeCartItem.price - activeCartItem.salePrice) /
            activeCartItem.price) *
            100,
        )
      : null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="bg-[#f2f9f3] border-t border-[#dcebdd]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* ================= PRODUCT PAGE ================= */}
          {isProduct && activeCartItem && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* PRODUCT INFO */}
              <div className="min-w-0 text-center sm:text-left">
                <p className="text-sm font-semibold text-[#264d25] truncate">
                  {activeCartItem.title}
                </p>

                <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
                  {/* CASE 1 : SALE PRICE EXISTS */}
                  {activeCartItem.salePrice ? (
                    <>
                      {/* Offer Price */}
                      <span className="text-base font-bold text-webprimary">
                        {formatCurrency(activeCartItem.salePrice, userCurrency)}
                      </span>

                      {/* Original Price */}
                      <span className="text-base text-gray-400 line-through">
                        {formatCurrency(activeCartItem.price!, userCurrency)}
                      </span>

                      {/* Discount Badge */}
                      {discountPercent && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 font-semibold px-2 py-1 text-xs rounded-md">
                          {discountPercent}% OFF
                        </Badge>
                      )}
                    </>
                  ) : (
                    /* CASE 2 : NO SALE PRICE */
                    <span className="text-base font-bold text-webprimary">
                      {formatCurrency(activeCartItem.price!, userCurrency)}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="w-full sm:w-auto">
                <CtaButton
                  onClick={handleAddToCart}
                  label={
                    isOutOfStock
                      ? "Out of Stock"
                      : adding
                        ? "Adding..."
                        : "Add to Cart"
                  }
                  variant={isOutOfStock ? "outline" : "primary"}
                  disabled={adding || isOutOfStock}
                  icon={isOutOfStock ? null : <ShoppingCart size={16} />}
                  iconPosition="left"
                  className={cn(
                    "w-full sm:w-auto justify-center",
                    isOutOfStock && "cursor-not-allowed opacity-70",
                  )}
                />
              </div>

              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b pb-2">
                    Your Shopping Cart
                  </h2>
                  <CartDetails />
                </SheetContent>
              </Sheet>
            </div>
          )}

          {/* ================= HOME / PRODUCTS ================= */}
          {isHome && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base font-semibold text-[#264d25]">
                  🎁 Vedique Blends
                </p>
                <p className="text-xs sm:text-sm text-[#4f6f4e]">
                  Rooted in Ayurveda, crafted for modern living
                </p>
              </div>

              <Link href="/products" className="w-full sm:w-auto">
                <CtaButton
                  label="Explore Now"
                  variant="primary"
                  icon={<Search size={16} />}
                  iconPosition="left"
                  className="w-full sm:w-auto justify-center"
                />
              </Link>
            </div>
          )}
          {isProducts && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base font-semibold text-[#264d25]">
                  Need help choosing the right product?
                </p>
                <p className="text-xs sm:text-sm text-[#4f6f4e]">
                  Talk to our wellness experts
                </p>
              </div>

              <Link
                href={process.env.NEXT_PUBLIC_WHATSAPP_API_URL || "/contact"}
                className="w-full sm:w-auto"
              >
                <CtaButton
                  label="Talk to Expert"
                  variant="primary"
                  icon={<PhoneCall size={16} />}
                  iconPosition="left"
                  className="w-full sm:w-auto justify-center"
                />
              </Link>
            </div>
          )}

          {/* ================= OTHER PAGES ================= */}
          {!isHome && !isProduct && !isProducts && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base font-semibold text-[#264d25]">
                  Need help choosing the right plan?
                </p>
                <p className="text-xs sm:text-sm text-[#4f6f4e]">
                  Talk to our wellness experts
                </p>
              </div>

              <Link
                href={process.env.NEXT_PUBLIC_WHATSAPP_API_URL || "/contact"}
                className="w-full sm:w-auto"
              >
                <CtaButton
                  label="Talk to Expert"
                  variant="primary"
                  icon={<PhoneCall size={16} />}
                  iconPosition="left"
                  className="w-full sm:w-auto justify-center"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
