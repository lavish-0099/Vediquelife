"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, Star } from "lucide-react";
import { useCartController } from "@/hooks/use-cart-controller";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";

/* ───────── Types ───────── */
export type PdpVariant = { id: string; label: string; price?: number };

export type PdpProduct = {
  id: string;
  slug: string;
  title: string;
  category: string; // small label under the title (e.g. "Revitalizes")
  categoryHref?: string;
  price: number;
  compareAtPrice?: number;
  images: string[]; // first image is the main one
  stock: number; // 0 = out of stock
  rating?: number; // e.g. 5.0
  reviewCount?: number;
  purchasedCount?: number; // "89 people have purchased this product"
  badge?: string; // e.g. "Best Seller"
  variants?: PdpVariant[]; // e.g. sizes: 50 ml, 100 ml
  variantLabel?: string; // e.g. "Size"
  /* Tab content: a tab is hidden when its content is empty */
  details?: {
    amountAndMethod?: string[];
    howToUse?: string[];
    benefits?: string[];
    ingredients?: string[];
    returnPolicy?: string[];
  };
};

export type PdpRelated = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  image: string;
  rating?: number;
};

type Props = {
  product: PdpProduct;
  related?: PdpRelated[];
  moreProductsHref?: string;
};

const TAB_ORDER: { key: keyof NonNullable<PdpProduct["details"]>; label: string }[] = [
  { key: "amountAndMethod", label: "Amount & Method" },
  { key: "howToUse", label: "How to use" },
  { key: "benefits", label: "Benefits" },
  { key: "ingredients", label: "Ingredients" },
  { key: "returnPolicy", label: "Return Policy" },
];

const WRAP = "mx-auto w-[90%] max-w-[1240px]";
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function VediquePDP({ product, related = [], moreProductsHref = "/products" }: Props) {
  const router = useRouter();
  const { addToCart } = useCartController();

  const [activeImg, setActiveImg] = useState(0);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const tabs = TAB_ORDER.filter((t) => (product.details?.[t.key]?.length ?? 0) > 0);
  const [tab, setTab] = useState(tabs[0]?.key);

  const variant = product.variants?.find((v) => v.id === variantId);
  const price = variant?.price ?? product.price;
  const outOfStock = product.stock <= 0;
  const overStock = qty > product.stock;
  const canBuy = !outOfStock && !overStock && !busy;

  const addItem = async () => {
    await addToCart({
      id: product.id,
      title: variant ? `${product.title} (${variant.label})` : product.title,
      price,
      int_price: null,
      imageUrl: product.images[0] ?? "",
      slug: product.slug,
      crmId: "",
      taxAmount: 0,
      taxRate: 0,
      currency: "INR",
      quantity: qty,
      stock: product.stock,
    });
  };

  const handleAdd = async () => {
    if (!canBuy) return;
    try {
      setBusy(true);
      await addItem();
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        setSheetOpen(true);
      }, 350);
    } finally {
      setBusy(false);
    }
  };

  const handleBuyNow = async () => {
    if (!canBuy) return;
    try {
      setBusy(true);
      await addItem();
      router.push("/checkout");
    } finally {
      setBusy(false);
    }
  };

  const mainImg = product.images[activeImg];
  const activeTab = tabs.find((t) => t.key === tab) ?? tabs[0];

  return (
    <main className="bg-[#f7f7f6] text-[#1e3d34]">
      {/* BREADCRUMB */}
      <div className={`${WRAP} pb-6 pt-8 text-xs`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link href="/" className="opacity-60 transition hover:opacity-100">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/products" className="opacity-60 transition hover:opacity-100">Shop</Link>
          <span className="opacity-40">/</span>
          <span className="font-medium">{product.title}</span>
        </nav>
      </div>

      {/* PRODUCT */}
      <section className={`${WRAP} grid gap-10 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-24`}>
        {/* Gallery: thumbnails + main image */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto lg:max-h-[640px] lg:flex-col lg:overflow-y-auto">
              {product.images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition lg:w-20 ${
                    i === activeImg ? "border-[#1e3d34]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white lg:flex-1">
            {mainImg ? (
              <Image src={mainImg} alt={product.title} fill priority sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[#1e3d34]/10 text-[10px] uppercase tracking-widest text-[#1e3d34]/40">
                Image
              </div>
            )}
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-[#1e3d34] px-3 py-1 text-[11px] font-medium text-white">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-4xl font-medium leading-tight tracking-tight lg:text-5xl">{product.title}</h1>
          <Link
            href={product.categoryHref ?? "/products"}
            className="mt-2 inline-block text-sm opacity-70 transition hover:opacity-100"
          >
            {product.category}
          </Link>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{inr(price)}</span>
            {product.compareAtPrice && product.compareAtPrice > price && (
              <span className="text-base line-through opacity-50">{inr(product.compareAtPrice)}</span>
            )}
          </div>

          {/* Variants (e.g. Size) */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium">
                {product.variantLabel ?? "Size"}: <span className="font-normal">{variant?.label}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${
                      v.id === variantId
                        ? "border-[#1e3d34] bg-[#1e3d34] text-white"
                        : "border-[#1e3d34]/30 hover:border-[#1e3d34]"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rating + purchased */}
          {(product.rating || product.purchasedCount) && (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {product.rating !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <Star size={15} fill="currentColor" />
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                  {product.reviewCount !== undefined && <span className="opacity-60">({product.reviewCount})</span>}
                </span>
              )}
              {product.purchasedCount !== undefined && (
                <span className="opacity-70">
                  <strong className="font-semibold opacity-100">{product.purchasedCount}</strong> people have purchased this product
                </span>
              )}
            </div>
          )}

          {/* Quantity + stock */}
          <div className="mt-7">
            <p className="text-sm font-medium">Quantity</p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-[#1e3d34]/30 bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#1e3d34]/10"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-[#1e3d34]/10"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="text-sm opacity-70">
                Current Stock: <strong className="font-semibold opacity-100">{Math.max(0, product.stock)}</strong>
              </p>
            </div>
            {overStock && !outOfStock && (
              <p role="alert" className="mt-2 text-sm text-red-700">Product is not available in this quantity.</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!canBuy}
              className="rounded-full bg-[#1e3d34] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#2c5b4d] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!canBuy}
              className="inline-flex items-center gap-2 rounded-full border border-[#1e3d34] px-8 py-3 text-sm font-semibold transition hover:bg-[#1e3d34] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {added ? <><Check size={14} /> Added</> : "Add to cart"}
            </button>
          </div>
          {outOfStock && <p role="alert" className="mt-3 text-sm text-red-700">This product is out of stock.</p>}

          {/* Tabs */}
          {tabs.length > 0 && activeTab && (
            <div className="mt-10">
              <div role="tablist" className="flex gap-x-6 gap-y-2 overflow-x-auto border-b border-[#1e3d34]/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {tabs.map((t) => {
                  const on = t.key === activeTab.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setTab(t.key)}
                      className={`-mb-px shrink-0 whitespace-nowrap border-b-2 pb-3 text-sm transition ${
                        on ? "border-[#1e3d34] font-semibold" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <div role="tabpanel" className="space-y-4 pt-5 text-sm leading-relaxed text-[#1e3d34]/85">
                {product.details?.[activeTab.key]?.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* YOU MIGHT ALSO LIKE */}
      {related.length > 0 && (
        <section className="rounded-t-[40px] bg-white pb-20 pt-14 lg:rounded-t-[56px] lg:pt-20">
          <div className={WRAP}>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-medium tracking-tight lg:text-4xl">You might also like</h2>
              <Link href={moreProductsHref} className="rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm transition hover:bg-[#1e3d34] hover:text-white">
                More products
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {related.map((r) => (
                <Link key={r.id} href={`/product/${r.slug}`} className="group block overflow-hidden rounded-3xl bg-[#f7f7f6]">
                  <div className="relative aspect-square overflow-hidden bg-white">
                    {r.image ? (
                      <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-[#1e3d34]/10 text-[10px] uppercase tracking-widest text-[#1e3d34]/40">Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">{r.category}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug">{r.title}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span>{inr(r.price)}</span>
                      {r.rating !== undefined && (
                        <span className="inline-flex items-center gap-1 text-xs">
                          <Star size={12} fill="currentColor" /> {r.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cart drawer */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full overflow-y-auto border-none p-0 sm:max-w-md">
          <CartDetails />
        </SheetContent>
      </Sheet>
    </main>
  );
}
