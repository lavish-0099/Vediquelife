"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Ingredients } from "@prisma/client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { CtaButton } from "../cta-button";

interface IngredientsPanelProps {
  ingredients: Ingredients[];
}

function pickFive(arr: Ingredients[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(5, a.length));
}

export default function IngredientsPanel({
  ingredients,
}: IngredientsPanelProps) {
  if (!ingredients || ingredients.length === 0) return null;

  const [displayed, setDisplayed] = useState<Ingredients[] | null>(null);
  const [active, setActive] = useState<string>("");

  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const [marker, setMarker] = useState<{
    y: number;
    startX: number;
    width: number;
    dotX: number;
  } | null>(null);

  useEffect(() => {
    setDisplayed(pickFive(ingredients));
  }, [ingredients]);

  useEffect(() => {
    if (displayed && displayed.length > 0) {
      setActive((prev) => (prev ? prev : displayed[0].id));
    }
  }, [displayed]);

  useEffect(() => {
    let raf = 0;
    let mounted = true;

    function compute() {
      if (!mounted) return;
      if (
        !panelRef.current ||
        !listRef.current ||
        !imageRef.current ||
        !displayed
      ) {
        setMarker(null);
        return;
      }

      const panel = panelRef.current;
      const activeEl = listRef.current.querySelector(
        `[data-id="${active}"]`,
      ) as HTMLElement | null;

      if (!activeEl) {
        setMarker(null);
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      const itemCenterY = Math.round(
        activeRect.top - panelRect.top + activeRect.height / 2,
      );

      const startPad = 8;
      let startX = Math.round(activeRect.right - panelRect.left + startPad);

      const overlapPx = 48;
      let endX = Math.round(imageRect.left - panelRect.left + overlapPx);

      const minStart = 24;
      const maxEnd = Math.max(endX, minStart + 40);
      startX = Math.max(minStart, Math.min(startX, maxEnd - 24));
      endX = Math.max(startX + 24, endX);

      const width = endX - startX;
      const dotX = endX;

      setMarker({ y: itemCenterY, startX, width, dotX });
    }

    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => compute());
    };

    handler();
    const t1 = window.setTimeout(handler, 100);
    const t2 = window.setTimeout(handler, 300);
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, [active, displayed]);

  if (!displayed) return null;
  const activeItem = displayed.find((d) => d.id === active) || displayed[0];

  return (
    <section className="w-full py-12 lg:py-20">
      <div className="container mx-auto px-4 relative" ref={panelRef}>
        {/* SECTION HEADING */}

        <h2 className="text-2xl sm:text-4xl font-semibold text-webprimary text-center lg:text-left">
          Timeless Vedique Herbs
        </h2>

        <div className="absolute inset-0 pointer-events-none lg:block hidden">
          {marker ? (
            <>
              <motion.div
                initial={false}
                animate={{
                  top: marker.y,
                  left: marker.startX,
                  width: marker.width,
                }}
                transition={{ type: "spring", stiffness: 160, damping: 28 }}
                className="absolute h-[4px] bg-webprimary rounded z-40"
                style={{ transform: "translateY(-50%)" }}
              />

              <motion.div
                initial={false}
                animate={{ top: marker.y, left: marker.startX }}
                transition={{ type: "spring", stiffness: 160, damping: 28 }}
                className="absolute -translate-x-1/2 -left-3 w-5 h-5 rounded-full border-4 border-webprimary bg-white z-40"
                style={{ transform: `translate(-50%, -50%)` }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, top: marker.y, left: marker.dotX }}
                transition={{ type: "spring", stiffness: 160, damping: 28 }}
                className="absolute w-5 h-5 rounded-full border-4 border-webprimary bg-white shadow-sm z-50"
                style={{ transform: "translate(-50%, -50%)" }}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-[2px] bg-[#cfead0]" />
            </div>
          )}
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center gap-10">
          <div className="hidden lg:block w-full lg:w-1/3 h-full">
            <ul
              ref={listRef}
              className="space-y-6 h-full flex flex-col justify-center"
            >
              {displayed.map((ing) => {
                const isActive = ing.id === active;
                return (
                  <li key={ing.id} data-id={ing.id} className="cursor-pointer">
                    <button
                      onClick={() => setActive(ing.id)}
                      className={`flex font-semibold items-center gap-4 transition-all ${
                        isActive
                          ? "text-webprimary font-bold"
                          : "text-slate-700 font-medium"
                      }`}
                      style={{ fontSize: "1.75rem", lineHeight: 1.05 }}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`w-3 h-3 rounded-full transition-all ${
                          isActive
                            ? "bg-webprimary"
                            : "border-2 border-webblue/30 bg-transparent"
                        }`}
                      />
                      <span className="capitalize whitespace-nowrap ">
                        {ing.name}
                      </span>
                    </button>
                  </li>
                );
              })}
              <li className="mt-10">
                <Link href="/products">
                  <CtaButton label="Browse Products" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block relative flex-1 h-full" />

          {/* ================= MOBILE INGREDIENT VIEW ================= */}
          <div className="lg:hidden w-full items-center flex flex-col gap-8">
            <Swiper
              slidesPerView={1}
              spaceBetween={16}
              modules={[Pagination, Navigation]}
              pagination={false}
              navigation
              onSlideChange={(swiper) => {
                if (!displayed) return;
                setActive(displayed[swiper.activeIndex].id);
              }}
              className="w-full"
            >
              {displayed.map((ing) => (
                <SwiperSlide key={ing.id}>
                  <div className="flex flex-col items-center gap-6">
                    {/* Image */}
                    <div className="relative w-full max-w-[320px] aspect-square rounded-lg overflow-hidden bg-white">
                      <Image
                        src={ing.imageUrl || "/placeholder.jpg"}
                        alt={ing.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                    {/* Ingredient Name */}
                    <h3 className="text-xl font-semibold text-webprimary capitalize text-center">
                      {ing.name}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* CTA */}
            <Link href="/products">
              <CtaButton label="Browse Products" />
            </Link>
          </div>

          <div className="hidden lg:flex w-full lg:w-1/2 justify-end">
            <div ref={imageRef} className="relative w-full max-w-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-white">
                    <Image
                      src={activeItem.imageUrl || "/placeholder.jpg"}
                      alt={activeItem.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
