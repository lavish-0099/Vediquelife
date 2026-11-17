"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/container";
import { cn } from "@/lib/utils";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.12 },
  }),
};

interface DiscoverCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tag?: string;
  image?: string;
}

interface DiscoverMoreSectionProps {
  className?: string;
  cards?: DiscoverCard[];
}

const defaultCards: DiscoverCard[] = [
  {
    id: 1,
    title: "Our approach",
    subtitle: "Your body. Your Prakriti. Your transformation.",
    description:
      "For thousands of years, Ayurveda has understood what modern science is now discovering: no two bodies are the same.At Vedique, we blend ancient Ayurvedic wisdom with modern nutrition to create Prakriti-based diet plans for weight loss, uniquely crafted for your individual body type.Every plan is deeply personalized, using herbal blends that restore balance, ignite digestion, and revive vitality.",
    href: "/vedique-diet",
    tag: "The Vedique way",
    image: "/assets/approach.jpg",
  },
  {
    id: 2,
    title: "About Vedique",
    subtitle: "Vedique - Where ancient wisdom becomes your daily wellness.",
    description:
      "Vedique was born from an ancient Ayurvedic truth: food is medicine.In a world where wellness has become reactive, Vedique chooses prevention. Each of our herbal infusions is rooted in timeless Ayurvedic wisdom, formulated to address modern lifestyle challenges such as weak immunity, stress, poor digestion, and imbalance.",
    href: "/vedique-diet",
    tag: "Food is medicine",
    image: "/assets/about-vedique.jpg",
  },
  {
    id: 3,
    title: "How Vedique Diet Works",
    subtitle:
      "Your transformation begins with an in-depth analysis by our senior Ayurvedic doctor.",
    description:
      "Your journey to holistic wellness begins here. From ancient Ayurvedic wisdom to modern nutritional science, we craft a personalized path designed exclusively for your unique body, your goals, and your life. They review your blood reports, understand your Prakriti (unique body constitution), and assess your medical conditions, whether it's PCOS, thyroid, diabetes, or you just want to manage weight.",
    href: "/how-vedique-diet-works",
    tag: "How Vedique Diet Works",
    image: "/assets/impact.jpg",
  },
];

export default function DiscoverMoreSection({
  className,
  cards = defaultCards,
}: DiscoverMoreSectionProps) {
  return (
    <section
      className={cn("relative w-full bg-[#fdfaf1] text-[#2b2418]", className)}
    >
      <Container>
        <div className="py-6">
          {/* Heading */}
          <div className="mb-8 md:mb-10 text-center">
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-[#8a6c3c]">
              Discover more
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-semibold text-[#2c1f17]">
              Go deeper into Vedique wellness
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
            {cards.map((card, index) => (
              <motion.article
                key={card.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className={cn(
                  "group relative flex flex-col justify-between rounded-3xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden",

                  // 🔥 DIFFERENT BG FOR EACH CARD
                  index === 0 &&
                    "bg-gradient-to-br from-[#fff6dd] via-[#ffecb4] to-[#ffe38a] border-[#f2d394]",
                  index === 1 &&
                    "bg-gradient-to-br from-[#e8f6e8] via-[#d4ecd7] to-[#c2e3c5] border-[#a8d2ad]",
                  index === 2 &&
                    "bg-gradient-to-br from-[#ffeef0] via-[#ffd9df] to-[#ffc8d1] border-[#f5b6c1]"
                )}
              >
                {/* Inner glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-300
                      bg-gradient-to-br from-white/30 via-transparent to-white/10"
                />

                {/* Content */}
                <div className="relative p-6 md:p-7 lg:p-4 space-y-3 flex-1">
                  {card.tag && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full border bg-white/60 text-[0.7rem] md:text-xs font-medium uppercase tracking-[0.18em] text-[#6c5530]">
                      {card.tag}
                    </span>
                  )}

                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={400}
                      height={400}
                      className="w-full object-cover rounded-md"
                    />
                  )}

                  <h3 className="text-xl md:text-[1.35rem] font-semibold text-[#2f2016]">
                    {card.title}
                  </h3>

                  <p className="text-sm md:text-base font-medium text-[#6a4d2e]">
                    {card.subtitle}
                  </p>

                  <p className="text-sm md:text-[0.95rem] leading-relaxed text-[#4a3a24]">
                    {card.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative px-6 md:px-7 lg:px-8 pb-5 md:pb-6 pt-1">
                  <Link
                    href={card.href}
                    className="inline-flex items-center text-sm md:text-[0.95rem] font-semibold text-[#5b410d] hover:text-[#3d2c0b] transition-colors"
                  >
                    <span>Learn more</span>
                    <span className="ml-1.5 inline-block translate-x-0 group-hover:translate-x-0.5 transition-transform">
                      ↗
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
