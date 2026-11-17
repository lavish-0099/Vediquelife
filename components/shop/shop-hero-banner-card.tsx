"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/container";
import { Ingredients } from "@prisma/client";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 * index },
  }),
};

interface ShopHeroBannerCardProps {
  className?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  secondaryText?: string;
  ingredients: Ingredients[];
}

export default function ShopHeroBannerCard({
  className,
  heading = "herbal tea",
  subheading = "Explore Our Products",
  description = "Discover a blend of herbal wonder with our range of masterfully created herbal teas, each blended by our in-house team of herbal experts to nourish your mind and body.",
  secondaryText = "From refreshing mint to warming ginger and antioxidant-rich berries, explore ingredients that bring balance, flavour and everyday wellness to your cup.",
  ingredients,
}: ShopHeroBannerCardProps) {
  const ingredientsToShow = ingredients.slice(0, 3);

  return (
    <section
      className={`relative w-full overflow-hidden bg-gradient-to-b from-[#faf7ef] via-[#fffef9] to-[#fdfaf1] text-[#16351a] ${
        className || ""
      }`}
    >
      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 md:gap-12 pt-20 pb-10 md:pt-24 md:pb-14 lg:pt-36 lg:pb-16">
          {/* LEFT: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="w-full lg:w-1/2 space-y-4"
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#3c6b31]">
              {subheading}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide text-[#16401e] capitalize">
              {heading}
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-[#28522a] max-w-xl">
              {description}
            </p>

            <p className="text-sm md:text-base text-[#2f4b2b] max-w-md">
              {secondaryText}
            </p>
          </motion.div>

          {/* RIGHT: Ingredients */}
          <div className="w-full lg:w-1/2">
            {/* Mobile / small screens: horizontal slider (1 card full-width at a time) */}
            <div className="md:hidden">
              <div
                className="
      flex overflow-x-auto snap-x snap-mandatory
      [-ms-overflow-style:none] [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
              >
                {ingredientsToShow.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="snap-start shrink-0 w-full px-4"
                  >
                    <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md shadow-lg shadow-[#9fd28a]/40 border border-white/80 flex flex-col max-w-sm mx-auto">
                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={item.imageUrl || "/assets/default-product.png"}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="px-4 py-3 flex justify-center">
                        <span className="text-sm font-semibold tracking-wide text-[#184321] text-center">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tablet / Desktop: 3-column grid */}
            <div className="hidden md:grid grid-cols-3 gap-5 md:gap-6">
              {ingredientsToShow.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md shadow-lg shadow-[#9fd28a]/40 border border-white/80 flex flex-col"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={item.imageUrl || "/assets/default-product.png"}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="px-4 py-2 flex justify-center">
                    <span className="text-sm font-semibold tracking-wide text-[#184321] text-center">
                      {item.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="w-full h-[3px] bg-green-600" />
      </Container>
    </section>
  );
}
