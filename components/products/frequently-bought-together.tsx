"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Products, ProductCategories } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useUserCountry } from "@/context/user-country-context";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ReviewWithRelations } from "@/types/review";
import { Loader, Plus, ShoppingCart } from "lucide-react";
import { useCartController } from "@/hooks/use-cart-controller";
import CartDetails from "@/components/header/cart-details";
import { createCartItem } from "@/lib/create-cart-item";
import { CartItem } from "@/types/cart-item";
import Link from "next/link";

/* =======================
   Helpers
======================= */

const isOutOfStock = (product: Products) =>
  product.stock === null || product.stock === undefined || product.stock <= 0;

interface FrequentlyBoughtTogetherProps {
  products: (Products & {
    ProductCategories: ProductCategories;
    reviews?: ReviewWithRelations[];
  })[];
  className?: string;
}

const FrequentlyBoughtTogether = ({
  products,
  className,
}: FrequentlyBoughtTogetherProps) => {
  const { userCurrency, userCountry, exchangeRate } = useUserCountry();
  const { addManyToCart } = useCartController();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  /* =======================
     Filter in-stock products
  ======================= */
  const availableProducts = useMemo(
    () => products.filter((p) => !isOutOfStock(p)),
    [products],
  );

  if (availableProducts.length < 2) return null;

  const mainProduct = availableProducts[0];

  const [selectedIds, setSelectedIds] = useState<string[]>(
    availableProducts.map((p) => p.id),
  );

  /* =======================
     Pricing
  ======================= */

  const getProductPricing = (p: Products) => {
    let basePrice = 0;
    let salePrice: number | null = null;

    if (!userCountry || userCountry === "IN") {
      basePrice = p.price ?? 0;
      salePrice = p.salePrice ?? null;
    } else {
      basePrice = (p.int_price ?? 0) * (exchangeRate ?? 1);
      salePrice = p.int_salePrice
        ? p.int_salePrice * (exchangeRate ?? 1)
        : null;
    }

    basePrice = +basePrice.toFixed(2);
    salePrice = salePrice ? +salePrice.toFixed(2) : null;

    return {
      finalPrice: salePrice && salePrice < basePrice ? salePrice : basePrice,
      originalPrice: salePrice && salePrice < basePrice ? basePrice : null,
    };
  };
  const getProductPrice = (p: Products) => {
    if (!userCountry || userCountry === "IN") return p.price ?? 0;
    return +((p.int_price ?? 0) * (exchangeRate ?? 1)).toFixed(2);
  };

  const toggleProduct = (id: string) => {
    if (id === mainProduct.id) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const selectedProducts = availableProducts.filter((p) =>
    selectedIds.includes(p.id),
  );

  const totalPrice = selectedProducts.reduce(
    (acc, p) => acc + getProductPrice(p),
    0,
  );

  /* =======================
     Add to cart
  ======================= */
  const handleAddSelectedToCart = async () => {
    if (!userCountry || !userCurrency) return;

    try {
      setIsProcessing(true);

      const items: CartItem[] = await Promise.all(
        selectedProducts.map((product) =>
          createCartItem({
            item: {
              id: product.id,
              title: product.title,
              price: product.price ?? 0,
              int_price: product.int_price ?? 0,
              taxRate: product.taxRate ?? 0,
              taxAmount: product.taxAmount ?? 0,
              imageUrl: product.imageUrl || "/assets/default-product.png",
              crmId: product.crmId,
              slug: product.slug,
              stock: product.stock,
            },
            userCountry,
            userCurrency,
          }),
        ),
      );

      await addManyToCart(items);
    } finally {
      setIsProcessing(false);
      setIsSheetOpen(true);
    }
  };

  /* =======================
     DESKTOP CARD (PORTRAIT)
  ======================= */
  const renderDesktopCard = (
    product: Products & { ProductCategories: ProductCategories },
    isMain?: boolean,
  ) => {
    const { finalPrice, originalPrice } = getProductPricing(product);
    const imageUrl = product.imageUrl || "/assets/default-product.png";

    return (
      <div className="w-[140px] sm:w-[150px] md:w-[160px] bg-white rounded-md p-2 shrink-0">
        <div className="relative w-full aspect-square bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain"
            />
          </Link>

          <input
            type="checkbox"
            checked
            readOnly={isMain}
            onChange={() => !isMain && toggleProduct(product.id)}
            className="absolute top-2 left-2 h-4 w-4 accent-webblue"
          />
        </div>

        <div className="mt-2">
          <p className="text-xs font-medium line-clamp-2">{product.title}</p>
          <p className="text-[11px] text-webpink">
            {product.ProductCategories.name}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm font-semibold text-webblue">
              {formatCurrency(finalPrice, userCurrency ?? "INR")}
            </p>

            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(originalPrice, userCurrency ?? "INR")}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* =======================
     MOBILE CARD (LANDSCAPE)
  ======================= */
  const renderMobileCard = (
    product: Products & { ProductCategories: ProductCategories },
    isMain?: boolean,
  ) => {
    const { finalPrice, originalPrice } = getProductPricing(product);
    const imageUrl = product.imageUrl || "/assets/default-product.png";

    return (
      <div className="w-full bg-white rounded-lg border p-3 flex gap-3">
        {/* LEFT IMAGE */}
        <div className="relative w-24 aspect-square bg-gray-50 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-contain"
            />
          </Link>

          <input
            type="checkbox"
            checked
            readOnly={isMain}
            onChange={() => !isMain && toggleProduct(product.id)}
            className="absolute top-1 left-1 h-4 w-4 accent-webpink"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium line-clamp-2">{product.title}</p>
            <p className="text-xs text-webpink mt-0.5">
              {product.ProductCategories.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-base font-semibold text-webprimary">
              {formatCurrency(finalPrice, userCurrency ?? "INR")}
            </p>

            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(originalPrice, userCurrency ?? "INR")}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const offerPrice =
    selectedProducts.length > 1 ? +(totalPrice * 0.9).toFixed(2) : totalPrice;

  /* =======================
     Render
  ======================= */
  return (
    <div className={cn("w-full mt-10", className)}>
      <div className="bg-green-50 rounded-md border p-4">
        <h2 className="text-center font-semibold mb-4">
          Frequently Bought Together
        </h2>

        {/* DESKTOP */}
        <div className="hidden lg:flex gap-3 overflow-x-auto pb-2">
          {availableProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              {i !== 0 && <Plus className="text-webpink" />}
              {renderDesktopCard(p, i === 0)}
            </div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="lg:hidden flex flex-col gap-4">
          {availableProducts.map((p, i) => (
            <div key={p.id} className="flex flex-col gap-2">
              {i !== 0 && (
                <div className="flex justify-center">
                  <Plus className="text-webpink" />
                </div>
              )}
              {renderMobileCard(p, i === 0)}
            </div>
          ))}
        </div>

        {/* ACTION */}
        <div className="mt-6 text-center">
          <Button
            disabled={isProcessing || selectedProducts.length === 0}
            onClick={handleAddSelectedToCart}
            className="bg-webprimary hover:bg-webyellow text-white hover:text-webtertiary rounded-full px-6 py-3"
          >
            {isProcessing && <Loader className="w-4 h-4 animate-spin mr-2" />}
            <ShoppingCart className="mr-1" size={16} /> Add bundle @{" "}
            {formatCurrency(offerPrice, userCurrency)}
          </Button>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right">
            <h2 className="text-xl font-bold mb-4">Your Shopping Cart</h2>
            <CartDetails />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
