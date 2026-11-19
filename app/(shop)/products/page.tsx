"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Plus, Check } from "lucide-react";
import { getProducts } from "@/actions/get-products";
import { useCartController } from "@/hooks/use-cart-controller";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CartDetails from "@/components/header/cart-details";

/* ───────── IMAGE SLOTS: paste your Shopify CDN links between the quotes ───────── */
const HERO_IMG = "/assets/slider/banner-1/all-product-banner.png"; // pomegranate hero, product box on the RIGHT
const BANNER_IMGS = [
  "/assets/slider/banner-1/all-product-banner.png",
  "/assets/revamp/Vedique -Banner 1.jpg",
  "/assets/revamp/Vedique -Banner 2.jpg",
  "/assets/revamp/Vedique -Banner 3.jpg",
]; // wide banner slides in the product grid
const INGREDIENT_IMGS = [
  "/assets/revamp/hero-woman.jpg",
  "/assets/revamp/ashwagandha.jpg",
  "/assets/revamp/shilajit-gummies.jpg",
  "/assets/revamp/rhodo-tea.jpg",
  "/assets/revamp/pomm-tea.jpg",
]; // one per key ingredient

type Product = {
  id: string;
  title: string;
  category: string;
  price: string;
  priceNumber: number;
  compareAt?: string;
  img: string; // product image link
  href: string;
  isNew?: boolean;
};

/* Default fallback products if loading or empty */
const FALLBACK_PRODUCTS: Product[] = [
  { id: "1", title: "Shilajit Gummies", category: "Herbal Products", price: "₹890", priceNumber: 890, compareAt: "₹1,190", img: "/assets/revamp/shilajit-gummies.jpg", href: "/product/vedique-shilajit" },
  { id: "2", title: "Ashwagandha KSM-66®", category: "Herbal Products", price: "₹1,090", priceNumber: 1090, img: "/assets/revamp/ashwagandha.jpg", href: "/product/ashwagandha-ksm-66" },
  { id: "3", title: "POMM Herbal Infusion", category: "Tea & Infusions", price: "₹399", priceNumber: 399, img: "/assets/revamp/pomm-tea.jpg", href: "/product/pomm-herbal-infusion", isNew: true },
  { id: "4", title: "Rhododendron Herbal Infusion", category: "Tea & Infusions", price: "₹399", priceNumber: 399, img: "/assets/revamp/rhodo-tea.jpg", href: "/product/rhododendron-herbal-infusion", isNew: true },
  { id: "5", title: "Rhodo Herbal Infusion", category: "Tea & Infusions", price: "₹399", priceNumber: 399, img: "/assets/revamp/rhodo-tea.jpg", href: "/product/rhodo-herbal-infusion" },
  { id: "6", title: "Jasmine Herbal Infusion", category: "Tea & Infusions", price: "₹399", priceNumber: 399, img: "/assets/slider/banner-1/jasmine-flower.png", href: "/product/jasmine-herbal-infusion", isNew: true },
  { id: "7", title: "Chamomile Herbal Infusion", category: "Tea & Infusions", price: "₹399", priceNumber: 399, img: "/assets/slider/banner-1/jasmine-flower.png", href: "/product/chamomile-herbal-infusion" },
  { id: "8", title: "Garcinia Capsules", category: "Herbal Products", price: "₹790", priceNumber: 790, img: "/assets/revamp/shilajit-gummies.jpg", href: "/product/garcinia-capsules" },
  { id: "9", title: "Triphala Gummies", category: "Herbal Products", price: "₹690", priceNumber: 690, img: "/assets/revamp/shilajit-gummies.jpg", href: "/product/triphala-gummies" },
];

const INGREDIENTS = [
  { title: "Garcinia Cambogia", body: "Known as Vrikshamala in Ayurveda, it pacifies Kapha and Vata doshas while balancing the seven dhatus. It naturally slows fat buildup, supports fat burning, boosts metabolism, and reduces stubborn belly fat. It also improves energy use, supports healthy cholesterol, and keeps blood sugar steady." },
  { title: "Ashwagandha", body: "A well-known adaptogen in Ayurveda, traditionally used to support strength, stamina and a calm response to everyday stress." },
  { title: "Shilajit", body: "A mineral-rich resin from the Himalayas, traditionally used to support energy, vitality and overall resilience." },
  { title: "Rhododendron", body: "A Himalayan flower used in herbal infusions, valued for its refreshing taste and traditional wellness uses." },
  { title: "Pomegranate", body: "Rich in natural antioxidants, pomegranate has long been part of traditional food and wellness practices." },
];

const WRAP = "mx-auto w-[88%] max-w-[1240px] lg:w-[84%]";
const H = "!font-medium !tracking-normal";
const PAGE_SIZE = 9;

/* Renders the image if a link is set, otherwise an empty placeholder */
function Slot({ src, alt, dark = false, contain = false }: { src: string; alt: string; dark?: boolean; contain?: boolean }) {
  return src ? (
    <Image src={src} alt={alt} fill className={contain ? "object-contain" : "object-cover"} />
  ) : (
    <div className={`absolute inset-0 grid place-items-center text-[10px] uppercase tracking-widest ${dark ? "bg-white/10 text-white/40" : "bg-[#1e3d34]/10 text-[#1e3d34]/40"}`}>
      Image
    </div>
  );
}

function ProductCard({
  p,
  onAddToCart,
  isAdded,
}: {
  p: Product;
  onAddToCart: (p: Product) => void;
  isAdded: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-[#e6e6e4] flex flex-col justify-between">
      <Link href={p.href} className="relative block aspect-[11/10] overflow-hidden bg-[#e0ded8]">
        <Slot src={p.img} alt={p.title} />
      </Link>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wide opacity-60">{p.category}</p>
          <Link href={p.href} className="mt-1 block text-sm font-semibold leading-snug hover:underline">
            {p.title}
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-medium">
            {p.price}
            {p.compareAt && <span className="ml-2 text-xs line-through opacity-50">{p.compareAt}</span>}
          </span>
          <button
            type="button"
            aria-label={`Add ${p.title} to cart`}
            onClick={() => onAddToCart(p)}
            className={`grid h-7 w-7 place-items-center rounded-full transition ${isAdded
                ? "bg-[#1e3d34] text-white"
                : "border border-[#1e3d34]/40 hover:bg-[#1e3d34] hover:text-white"
              }`}
          >
            {isAdded ? <Check size={13} /> : <Plus size={14} />}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function VediqueShopPage() {
  const [tab, setTab] = useState<"new" | "best">("best");
  const [page, setPage] = useState(0);
  const [banner, setBanner] = useState(0);
  const [ing, setIng] = useState(0);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { addToCart } = useCartController();

  useEffect(() => {
    async function loadShopifyProducts() {
      try {
        const fetched = await getProducts({});
        if (fetched && fetched.length > 0) {
          const mapped: Product[] = fetched.map((p: any, idx: number) => {
            const priceVal = typeof p.price === "number" ? p.price : parseFloat(p.price) || 0;
            const originalPriceVal = p.discountedPrice && p.discountedPrice < priceVal ? priceVal : undefined;
            return {
              id: p.id,
              title: p.title,
              category: p.ProductCategories?.name || "Herbal Products",
              price: `₹${priceVal.toLocaleString("en-IN")}`,
              priceNumber: priceVal,
              compareAt: originalPriceVal ? `₹${originalPriceVal.toLocaleString("en-IN")}` : undefined,
              img: p.imageUrl || FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length]?.img || "",
              href: `/product/${p.slug}`,
              isNew: idx % 2 === 0,
            };
          });

          // Merge any fallback products not already in fetched so grid is always rich
          const existingSlugs = new Set(mapped.map((m) => m.href));
          const additions = FALLBACK_PRODUCTS.filter((f) => !existingSlugs.has(f.href));
          setProducts([...mapped, ...additions]);
        }
      } catch (err) {
        console.error("Failed to load products from Shopify:", err);
      }
    }
    loadShopifyProducts();
  }, []);

  const handleAddToCart = async (p: Product) => {
    try {
      setAddedId(p.id);
      await addToCart({
        id: p.id,
        title: p.title,
        price: p.priceNumber,
        int_price: null,
        imageUrl: p.img,
        slug: p.href.replace("/product/", "").replace("/products/", ""),
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

  const list = tab === "new" ? products.filter((p) => p.isNew) : products;
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const items = list.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const grid = items.slice(0, 8);
  const last = items[8];

  const goPage = (d: 1 | -1) => setPage((p) => Math.min(pages - 1, Math.max(0, p + d)));
  const changeTab = (t: "new" | "best") => { setTab(t); setPage(0); };
  const goIng = (d: 1 | -1) => setIng((i) => (i + d + INGREDIENTS.length) % INGREDIENTS.length);
  const k = INGREDIENTS[ing];

  const arrowBtn = "grid h-7 w-7 place-items-center rounded-full border border-[#1e3d34]/60 transition hover:bg-[#1e3d34] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <main className="bg-white text-[#1e3d34]">
      {/* HERO (header + announcement bar come from your site layout) */}
      <section className="relative overflow-hidden bg-[#a8602f] text-white">
        <Slot src={HERO_IMG} alt="Vedique herbal infusions" dark />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
        <div className={`${WRAP} relative pb-56 pt-24 md:pb-64 md:pt-32`}>
          <h1 className={`max-w-[460px] text-4xl leading-[1.1] md:text-5xl lg:text-[56px] ${H}`}>
            Bring Nature Into Your Wellness
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/90 md:text-base">
            Explore carefully crafted herbal blends that bring together nature&apos;s ingredients and the principles of mindful wellness.
          </p>
          <Link href="/vedique-wellness" className="mt-10 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#1e3d34]">
            Vedique Wellness Plan
          </Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="relative -mt-28 rounded-t-[56px] bg-white pb-20 pt-16 lg:pt-24">
        <div className={WRAP}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest">Vedique Shop</p>
              <h2 className={`mt-4 max-w-md text-3xl leading-tight lg:text-[44px] ${H}`}>
                Discover Wellness with Ayurvedic Blend
              </h2>
            </div>
            <p className="max-w-[17rem] text-xs leading-relaxed">
              Explore herbal infusions and science-backed wellness products, guided by nature and our nutritional expertise.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="relative h-px w-36 bg-[#1e3d34]/30 lg:w-44">
                <div
                  className="absolute -top-px h-[3px] rounded bg-[#1e3d34] transition-all"
                  style={{ width: `${100 / pages}%`, left: `${(page * 100) / pages}%` }}
                />
              </div>
              <button type="button" aria-label="Previous page" disabled={page === 0} onClick={() => goPage(-1)} className={arrowBtn}><ArrowLeft size={12} /></button>
              <button type="button" aria-label="Next page" disabled={page >= pages - 1} onClick={() => goPage(1)} className={arrowBtn}><ArrowRight size={12} /></button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => changeTab("new")}
                className={`rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm transition ${tab === "new" ? "bg-[#1e3d34] text-white" : "hover:bg-[#1e3d34]/10"}`}
              >
                New Arrivals
              </button>
              <button
                type="button"
                onClick={() => changeTab("best")}
                className={`rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm transition ${tab === "best" ? "bg-[#1e3d34] text-white" : "hover:bg-[#1e3d34]/10"}`}
              >
                Best Sellers
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {grid.map((p, i) => (
              <ProductCard
                key={`${p.id}-${i}`}
                p={p}
                onAddToCart={handleAddToCart}
                isAdded={addedId === p.id}
              />
            ))}
          </div>

          {/* Last row: one product + wide banner slider */}
          <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-5 lg:grid-cols-4 lg:gap-5">
            {last && (
              <ProductCard
                p={last}
                onAddToCart={handleAddToCart}
                isAdded={addedId === last.id}
              />
            )}
            <div className={`relative col-span-2 min-h-[240px] overflow-hidden rounded-3xl lg:min-h-0 ${last ? "lg:col-span-3" : "lg:col-span-4 lg:min-h-[300px]"}`}>
              <Slot src={BANNER_IMGS[banner]} alt="Vedique herbal infusion range" />
              <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-2">
                {BANNER_IMGS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Banner ${i + 1}`}
                    onClick={() => setBanner(i)}
                    className={`h-1.5 w-1.5 rounded-full transition ${i === banner ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY INGREDIENTS */}
      <section className="pb-24 lg:pb-32">
        <div className={WRAP}>
          <div className="grid overflow-hidden rounded-[28px] bg-[#e6e6e4] md:grid-cols-[46%_1fr]">
            <div className="relative min-h-[280px] md:min-h-[440px]">
              <Slot src={INGREDIENT_IMGS[ing]} alt={k.title} />
            </div>
            <div className="flex flex-col p-8 md:p-10 lg:p-12">
              <div className="flex items-start justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-widest">Key Ingredients</p>
                <div className="flex gap-2">
                  <button type="button" aria-label="Previous ingredient" onClick={() => goIng(-1)} className={arrowBtn}><ArrowLeft size={12} /></button>
                  <button type="button" aria-label="Next ingredient" onClick={() => goIng(1)} className={arrowBtn}><ArrowRight size={12} /></button>
                </div>
              </div>
              <h3 className={`mt-4 max-w-xs text-4xl leading-tight lg:text-[44px] ${H}`}>{k.title}</h3>
              <p className="mt-6 text-sm leading-relaxed">{k.body}</p>
              <div className="mt-auto flex justify-end gap-2 pt-8">
                {INGREDIENTS.map((x, i) => (
                  <button
                    key={x.title}
                    type="button"
                    aria-label={`Ingredient ${i + 1}`}
                    onClick={() => setIng(i)}
                    className={`h-1.5 w-1.5 rounded-full transition ${i === ing ? "bg-[#1e3d34]" : "bg-[#1e3d34]/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-out Cart Drawer on Quick Add */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto">
          <CartDetails />
        </SheetContent>
      </Sheet>
    </main>
  );
}
