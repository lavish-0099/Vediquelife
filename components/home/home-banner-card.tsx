"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/container";
import CtaBtn from "./cta-btn";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

type Slide = {
  id: number;
  bg?: string;
  accent?: string;
  product?: string;
  flowerTop?: string;
  flowerBottom?: string;
  primaryCta: string;
  primaryCtaHref: string;
  gridOpacity?: number;
  headline: string;
  subline?: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    bg: "#f3faf4",
    accent: "#264d25",
    product: "/assets/slider/banner-1/all-product-banner.png",
    flowerTop: "/assets/slider/banner-1/jasmine-flower.png",
    flowerBottom: "/assets/slider/banner-1/green-grass.png",
    primaryCta: "Get Your Perfect Herbal Blend",
    primaryCtaHref: "/products",
    gridOpacity: 0.18,
    headline: "Rooted in care, crafted with confidence.",
    subline: "Wellness, Crafted by Nature. Perfected by Vedique.",
  },
  {
    id: 2,
    bg: "#f3faf4",
    accent: "#264d25",
    product: "/assets/slider/banner-1/herbal-infusions.png",
    flowerTop: "/assets/slider/banner-1/jasmine-flower.png",
    flowerBottom: "/assets/slider/banner-1/green-grass.png",
    primaryCta: "Explore Herbal Infusions",
    primaryCtaHref: "/products",
    gridOpacity: 0.18,
    headline: "Every sip brings you closer to balance.",
    subline: "Crafted with nature’s most trusted ingredients. ",
  },
  {
    id: 3,
    bg: "#f3faf4",
    accent: "#264d25",
    product: "/assets/slider/banner-1/banner-0002.png",
    flowerTop: "/assets/slider/banner-1/jasmine-flower.png",
    flowerBottom: "/assets/slider/banner-1/green-grass.png",
    primaryCta: "Start Your Journey Today",
    primaryCtaHref: "/vedique-diet",
    gridOpacity: 0.18,
    headline: "Vedique Diet - A Weight loss plan as unique as you.",
    subline: "Personalized Diets | Expert Support | Real Food",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: 80 * dir, scale: 0.996 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -80 * dir,
    scale: 0.996,
    transition: { duration: 0.45 },
  }),
};

export default function HomeBannerFullScreen() {
  const [[idx, dir], setIdx] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const slidesLen = SLIDES.length;
  const touchStartX = useRef<number | null>(null);
  const { cartRules } = useCartStore();

  const bestRule =
    cartRules
      ?.filter((rule) => rule.discountPercent > 0)
      ?.sort((a, b) => b.discountPercent - a.discountPercent)[0] ?? null;
  function paginate(d: number) {
    setIdx(([i]) => [(i + d + slidesLen) % slidesLen, d]);
  }
  function goTo(i: number) {
    setIdx(([cur]) => [i, i > cur ? 1 : -1]);
  }

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(
      () => setIdx(([i]) => [(i + 1) % slidesLen, 1]),
      5000,
    );
    return () => clearInterval(id);
  }, [isPaused, slidesLen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    touchStartX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (touchStartX.current == null) return;
    const diff = e.clientX - touchStartX.current;
    if (Math.abs(diff) > 40) paginate(diff < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  const current = SLIDES[idx];

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Vedique full screen slider"
    >
      <div
        className="relative w-full h-[90vh] overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={current.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 "
            style={{
              backgroundColor: current.bg || "#ffffff",
              backgroundImage:
                "url('/assets/slider/banner-1/vedique-grid-tile.png')",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
          >
            {/* LEFT COLOR STRIP */}
            {current.accent && (
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden sm:block w-[70px] md:w-[70px]">
                <div
                  className="relative h-full w-full rounded-tr-[22px] rounded-br-[22px]"
                  style={{
                    background: `linear-gradient(to bottom, ${current.accent}, ${current.accent}E6)`,
                  }}
                />
              </div>
            )}

            {/* MAIN CONTENT */}

            <Container>
              <div className="relative w-full h-[90vh] lg:h-screen flex items-center">
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 py-4 lg:py-20 lg:px-6">
                  {/* LEFT: BIG PRODUCT, OVERLAPPING STRIP */}
                  <div className="flex w-full lg:w-[55%] items-center justify-center lg:justify-start relative order-1 lg:order-none">
                    {current.product && (
                      <div
                        className={cn(
                          "relative w-full max-w-[420px] sm:max-w-[360px] lg:max-w-none lg:w-[700px] xl:w-[650px] mt-16 md:-mt-16",
                          current.id === 3 && "xl:w-[520px] sm:mt-5 md:ml-24",
                        )}
                      >
                        <Image
                          src={current.product}
                          alt="product overlay"
                          width={820}
                          height={480}
                          className="w-full h-auto object-contain"
                          priority={idx === 0}
                        />
                      </div>
                    )}
                  </div>

                  {/* RIGHT: TEXT + BUTTONS */}
                  <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-start order-2 lg:order-none">
                    <div className="flex flex-col items-center lg:items-start gap-4 px-6 lg:px-4 py-1 md:py-10 max-w-xl">
                      {current.id !== 3 && bestRule && (
                        <div className="relative overflow-hidden rounded-lg px-6 py-3 mb-2 text-white font-semibold text-sm shadow-lg">
                          {/* gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-webprimary via-green-700 to-webprimary opacity-90" />

                          {/* animated shine */}
                          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shine_3s_linear_infinite]" />

                          <span className="relative flex text-xs items-center gap-2">
                            🔥 Extra {bestRule.discountPercent} % OFF on orders
                            above ₹ {bestRule.minOrderValue}
                          </span>
                        </div>
                      )}
                      <h1 className="text-xl md:text-[40px] font-semibold leading-tight text-[#111827] text-center lg:text-left">
                        {current.headline}
                      </h1>
                      {current.subline && (
                        <p className="text-sm sm:text-base text-neutral-600 text-center lg:text-left">
                          {current.subline}
                        </p>
                      )}

                      <div className="mt-4 mb-12 flex flex-col sm:flex-row items-center gap-3 w-full">
                        <CtaBtn
                          btnTitle={current.primaryCta}
                          btnHref={current.primaryCtaHref}
                          btnBg={current.accent}
                          className={` hover:bg-[#163516] text-white px-6 py-4 rounded-lg shadow-lg w-full sm:w-auto`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {current.flowerTop && (
              <div className="pointer-events-none absolute hidden sm:block z-40 -top-4 -right-2 md:-top-16 md:right-6 opacity-80">
                <Image
                  src={current.flowerTop}
                  alt="flower top"
                  width={260}
                  height={180}
                />
              </div>
            )}

            {current.flowerBottom && (
              <div className="pointer-events-none absolute hidden sm:block bottom-0 right-0 translate-y-[12%] opacity-80">
                <Image
                  src={current.flowerBottom}
                  alt="green grass strip"
                  width={340}
                  height={220}
                />
              </div>
            )}

            {/* BOTTOM SHADOW */}
            <div
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.08), transparent)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* CONTROLS – right side, absolute (layout me space nahi lete) */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous"
            className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next"
            className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center"
          >
            ›
          </button>
        </div>

        {/* DOTS */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-12 md:bottom-16 z-40 hidden md:flex">
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full ${
                  i === idx ? "bg-webprimary" : "bg-white/60"
                } shadow`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
