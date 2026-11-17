"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Ingredients } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface KeyIngredientsSliderProps {
  ingredients: Ingredients[];
  className?: string;
}

const textVariants = {
  enter: { opacity: 0, x: -20 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

const imageVariants = {
  enter: { opacity: 0, x: 20, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, x: -20, scale: 0.97, transition: { duration: 0.3 } },
};

export default function KeyIngredientsSlider({
  ingredients,
  className,
}: KeyIngredientsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!ingredients || ingredients.length === 0) return null;

  const current = ingredients[activeIndex];

  const handleNext = () => {
    setActiveIndex((i) => (i + 1) % ingredients.length);
  };

  const handlePrev = () => {
    setActiveIndex((i) => (i === 0 ? ingredients.length - 1 : i - 1));
  };

  return (
    <section
      className={cn(
        "relative w-full text-[#16351a] overflow-hidden", // 👈 overflow hidden, no horizontal scroll
        className
      )}
    >
      <div className="py-6 pt-16">
        {/* Heading */}
        <div className="mb-6 md:mb-10 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#7f6b3b]">
            Key Ingredients
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2c1f17]">
            Discover the herbs in your cup
          </h2>
        </div>

        {/* Yellow rounded block */}
        <div
          className="relative w-full rounded-3xl md:rounded-[32px] bg-gradient-to-br
                     from-[#fff9dc] via-[#ffe89f] to-[#ffd867]
                     px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9
                     shadow-md shadow-[#e4c872]/70 overflow-hidden" // 👈 yahan bhi hidden
        >
          {/* Soft decorative blobs - safe positions, no negative offsets */}
          <div className="pointer-events-none absolute right-0 bottom-0 w-40 h-40 rounded-full bg-white/30 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-0 w-32 h-32 rounded-full bg-white/20 blur-3xl" />

          {/* Content layout */}
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-10 items-start lg:items-center">
            {/* LEFT: Text + controls */}
            <div className="w-full lg:w-1/2 relative z-10 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-image"}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={imageVariants}
                  className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto"
                >
                  {/* Glow inside safe area */}
                  <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#fff4da] via-[#ffe3a8] to-[#ffd27b] opacity-60 blur-2xl" />

                  <div className="relative rounded-[2.5rem] bg-[#fffaf1]/90 shadow-lg shadow-[#d5b86b]/70 border border-white/80 overflow-hidden">
                    <div className="relative w-full aspect-[4/5] md:aspect-[4/5]">
                      <Image
                        src={current.imageUrl || "/assets/default-product.png"}
                        alt={current.name}
                        fill
                        className="object-contain "
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* RIGHT: Image - responsive, no absolute, no breakout for now */}

            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={textVariants}
                  className="space-y-4"
                >
                  <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#7f6b3b]">
                    Key Ingredients
                  </p>

                  <h3 className="text-2xl md:text-3xl font-semibold text-[#2f2016]">
                    {current.name}
                  </h3>

                  <p className="text-sm md:text-base leading-relaxed text-[#3c2f1f]">
                    {current.description || "No description available."}
                  </p>

                  <Badge className="text-sm md:text-base font-semibold bg-white text-[#7a6235] border-webyellow hover:bg-webpink hover:text-white">
                    {current.benefit}
                  </Badge>

                  {/* Arrows + counter inside left */}
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={handlePrev}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-[#d3c49f] bg-white/85 shadow-sm hover:bg-[#f6efdf] transition"
                    >
                      <ChevronLeft className="h-5 w-5 text-[#7a6235]" />
                    </button>

                    <span className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-[#7a6235]">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(ingredients.length).padStart(2, "0")}
                    </span>

                    <button
                      onClick={handleNext}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-[#d3c49f] bg-white/85 shadow-sm hover:bg-[#f6efdf] transition"
                    >
                      <ChevronRight className="h-5 w-5 text-[#7a6235]" />
                    </button>
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
