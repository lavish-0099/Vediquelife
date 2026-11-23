"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowLeft, ArrowRight, Check } from "lucide-react";
import Container from "@/components/container";
import { useCartController } from "@/hooks/use-cart-controller";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";
import { getProducts } from "@/actions/get-products";

interface ProductItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  tags: ("best" | "new")[];
  /** Lower-cased Shopify tags + category + title, used by the category tabs */
  searchText: string;
}

/* Tabs. "best" and "new" keep the old behaviour; the rest filter by keywords found in
   the product's Shopify tags, category name or title. Adjust keywords to match your tags. */
const TABS: { key: string; label: string; keywords?: string[] }[] = [
  { key: "best", label: "Best Sellers" },
  { key: "new", label: "New Arrivals" },
  { key: "hair-skin", label: "Hair & Skin", keywords: ["hair", "skin"] },
  { key: "gut", label: "Gut Health", keywords: ["gut", "digest"] },
  { key: "weight", label: "Weight Loss", keywords: ["weight"] },
  { key: "sleep", label: "Sleep", keywords: ["sleep"] },
  { key: "hormonal", label: "Hormonal Balance", keywords: ["hormon", "pcos", "thyroid"] },
  { key: "liver", label: "Liver Health", keywords: ["liver"] },
  { key: "sleep-stress", label: "Sleep/Stress", keywords: ["sleep", "stress"] },
  { key: "sexual", label: "Sexual Wellness", keywords: ["sexual", "libido"] },
];

const METRICS = [
  { value: "100k+", lines: ["Wellness", "Journeys"] },
  { value: "50+", lines: ["Countries", "Served"] },
  { value: "99.6%", lines: ["Success", "Rate"] },
  { value: "4.5", lines: ["Rated on", "Google"] },
];

const GAP = 20;

export default function RevampedFeaturedProducts() {
  const [activeTab, setActiveTab] = useState<string>("best");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [progress, setProgress] = useState({ start: 0, size: 1 });
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCartController();

  useEffect(() => {
    async function loadShopifyProducts() {
      try {
        const fetched = await getProducts({});
        if (fetched && fetched.length > 0) {
          const mapped: ProductItem[] = fetched.map((p: any) => {
            const rawTags: string[] = Array.isArray(p.tags)
              ? p.tags
              : typeof p.tags === "string"
                ? p.tags.split(",")
                : [];
            return {
              id: p.id,
              slug: p.slug,
              title: p.title,
              category: p.ProductCategories?.name || "HERBAL PRODUCTS",
              price: p.price,
              originalPrice: p.discountedPrice && p.discountedPrice < p.price ? p.price : undefined,
              imageUrl: p.imageUrl || "/assets/revamp/shilajit-gummies.jpg",
              tags: ["best", "new"],
              searchText: [...rawTags, p.ProductCategories?.name, p.title]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),
            };
          });
          setProductsList(mapped);
        }
      } catch (err) {
        console.error("Failed to load products from Shopify:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadShopifyProducts();
  }, []);

  const activeConfig = TABS.find((t) => t.key === activeTab);
  const products = productsList.filter((p) =>
    activeConfig?.keywords
      ? activeConfig.keywords.some((k) => p.searchText.includes(k))
      : p.tags.includes(activeTab as "best" | "new")
  );

  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.scrollWidth) return;
    const size = Math.min(1, el.clientWidth / el.scrollWidth);
    const max = el.scrollWidth - el.clientWidth;
    const start = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setProgress({ start, size });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress, activeTab, productsList]);

  /* Back to the first product whenever the tab changes */
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [activeTab]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 280) + GAP;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleQuickAdd = async (product: ProductItem) => {
    try {
      setAddedId(product.id);
      await addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        int_price: null,
        imageUrl: product.imageUrl,
        slug: product.slug,
        crmId: "",
        taxAmount: 0,
        taxRate: 0,
        currency: "INR",
        quantity: 1,
        stock: 100,
      });
      setTimeout(() => {
        setAddedId(null);
        setIsSheetOpen(true);
      }, 350);
    } catch {
      setAddedId(null);
    }
  };

  return (
    <section
      id="products"
      className="relative z-10 w-full bg-[#f7f7f6] -mt-12 lg:-mt-16 rounded-t-[24px] sm:rounded-t-[36px] lg:rounded-t-[56px] shadow-[0_-16px_40px_rgba(0,0,0,0.08)] pt-10 lg:pt-14 pb-12 sm:pb-16 lg:pb-24"
    >
      <Container>
        {/* METRICS */}
        <div className="border-b border-[#1e3d34]/40 pb-8 lg:pb-10">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:flex md:items-center md:justify-between">
            {METRICS.map((m, i) => (
              <Fragment key={m.value}>
                {i > 0 && (
                  <span className="hidden md:block h-9 w-px bg-[#1e3d34]/70" />
                )}
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  <span className="text-3xl lg:text-[40px] font-light text-[#1e3d34] tracking-tight leading-none">
                    {m.value}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase leading-[1.3] text-[#1e3d34]">
                    {m.lines[0]}
                    <br />
                    {m.lines[1]}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* SECTION HEADER + TABS */}
        <div className="pt-10 lg:pt-14">
          <div className="mb-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1e3d34] block mb-2">
              VEDIQUE APOTHECARY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1e3d34] tracking-tight">
              Discover wellness products
            </h2>
          </div>

          {/* Scrollable tab row (ten tabs don't fit beside the heading) */}
          <div
            role="tablist"
            aria-label="Product categories"
            className="mb-8 flex gap-2 overflow-x-auto pb-2 hide-scrollbar lg:mb-12"
          >
            {TABS.map((t) => {
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(t.key)}
                  className={`shrink-0 rounded-full border px-5 py-2 text-xs font-semibold tracking-wide transition-all ${active
                      ? "border-[#1e3d34] bg-[#1e3d34] text-white shadow-sm"
                      : "border-[#1e3d34]/25 text-[#1e3d34]/70 hover:border-[#1e3d34]/60 hover:text-[#1e3d34]"
                    }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* PRODUCTS CAROUSEL / GRID */}
          {isLoading ? (
            <div className="py-12 flex justify-center items-center">
              <p className="text-sm text-[#1e3d34]/60">Loading products from Shopify...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 flex justify-center items-center">
              <p className="text-sm text-[#1e3d34]/60">No products found in this category yet.</p>
            </div>
          ) : (
            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar snap-x snap-mandatory"
            >
              {products.map((p) => {
                const isAdded = addedId === p.id;
                return (
                  <div
                    key={p.id}
                    className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] snap-start group"
                  >
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-200/70 mb-3.5">
                      <Link href={`/product/${p.slug}`} className="block w-full h-full">
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Quick Add Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(p)}
                        aria-label={`Add ${p.title} to cart`}
                        className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${isAdded
                            ? "bg-[#1e3d34] text-white"
                            : "bg-white/95 text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white"
                          }`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#1e3d34]/70 block mb-1">
                        {p.category}
                      </span>
                      <Link
                        href={`/product/${p.slug}`}
                        className="text-sm font-medium text-neutral-900 hover:text-[#1e3d34] transition line-clamp-1 block mb-1.5"
                      >
                        {p.title}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#1e3d34]">
                          ₹{p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CONTROLS (ARROWS + PROGRESS) */}
          {products.length > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-[#1e3d34]/15 mt-4">
              <div className="relative w-40 sm:w-56 h-1 bg-[#1e3d34]/15 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 bg-[#1e3d34] rounded-full transition-all duration-150"
                  style={{
                    left: `${progress.start * 100}%`,
                    width: `${Math.max(0.15, progress.size) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous products"
                  className="w-9 h-9 rounded-full border border-[#1e3d34]/25 flex items-center justify-center text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next products"
                  className="w-9 h-9 rounded-full border border-[#1e3d34]/25 flex items-center justify-center text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Cart Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="p-0 border-none w-full sm:max-w-md">
          <CartDetails />
        </SheetContent>
      </Sheet>
    </section>
  );
}
