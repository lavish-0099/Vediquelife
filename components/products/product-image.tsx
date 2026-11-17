"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { TouchEvent } from "react";
import { Products, ProductCategories } from "@prisma/client";
import { cn } from "@/lib/utils";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ProductImageProps {
  product: Products & {
    ProductCategories: ProductCategories;
    ProductGallery: { id: string; url: string }[];
  };
  className?: string;
}

export const ProductImage = ({ product, className }: ProductImageProps) => {
  const mainImageUrl = product.imageUrl || "/assets/default-product.png";
  const galleryUrls = product.ProductGallery.map((g) => g.url);
  const images = [mainImageUrl, ...galleryUrls];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  /* ---------------- NAVIGATION ---------------- */
  const goNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  /* ---------------- MOBILE SWIPE ---------------- */
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;

    if (Math.abs(diffX) > threshold) {
      diffX < 0 ? goNext() : goPrev();
    }

    touchStartX.current = null;
  };

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {/* ================= IMAGE WRAPPER ================= */}
      <div
        className="relative w-full max-w-[520px] mt-4 lg:mt-0 mx-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* IMAGE */}
        <div className="relative w-full overflow-hidden">
          <Image
            src={currentImage}
            alt={product.title || "Product image"}
            width={520}
            height={520}
            priority
            className="w-full h-auto object-contain transition-transform duration-300 lg:hover:scale-110"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>

        {/* ================= MOBILE ARROWS ================= */}
        {hasMultiple && !isFirst && (
          <button
            type="button"
            onClick={goPrev}
            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow"
          >
            <MdKeyboardArrowLeft className="text-2xl text-gray-700" />
          </button>
        )}

        {hasMultiple && !isLast && (
          <button
            type="button"
            onClick={goNext}
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow"
          >
            <MdKeyboardArrowRight className="text-2xl text-gray-700" />
          </button>
        )}
      </div>

      {/* ================= MOBILE DOTS ================= */}
      {hasMultiple && (
        <div className="flex justify-center gap-2 mt-3 lg:hidden">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === currentIndex ? "bg-gray-900" : "bg-gray-400/60",
              )}
            />
          ))}
        </div>
      )}

      {/* ================= DESKTOP THUMBNAILS (LEFT ALIGNED) ================= */}
      {hasMultiple && (
        <div className="hidden lg:flex gap-3 mt-6 justify-center">
          {images.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-20 h-20 rounded-md overflow-hidden border transition-all",
                idx === currentIndex
                  ? "border-gray-900"
                  : "border-gray-300 hover:border-gray-500",
              )}
            >
              <Image
                src={url}
                alt={product.title}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
