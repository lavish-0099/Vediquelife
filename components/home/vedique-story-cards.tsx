"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LucideIcon,
  Leaf,
  UserRound,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/container";

type Card = {
  id: number;
  title: string;
  text: string;
  icon: LucideIcon;
  cta: string;
  href: string;
};

const cards: Card[] = [
  {
    id: 1,
    title: "Nature's Pharmacy",
    text: "From healing herbal infusions to wellness blends, discover products that work with your body, not against it.",
    icon: Leaf,
    cta: "Shop Herbal Blends",
    href: "/products",
  },
  {
    id: 2,
    title: "Your Personalized Path",
    text: "Weight loss and wellness designed for your unique Prakriti. Real food. Real healing. Real results.",
    icon: UserRound,
    cta: "See How It Works",
    href: "/how-vedique-diet-works",
  },
  {
    id: 3,
    title: "27 Years of Healing",
    text: "Founded by Dr. Shikha Sharma, where Ayurvedic wisdom meets modern medical expertise.",
    icon: Stethoscope,
    cta: "Explore Vedique  Diet",
    href: "/vedique-diet",
  },
];

export default function VediqueStoryCards() {
  return (
    <section className="bg-[#f8faf8] pt-2 pb-12 md:py-10">
      <Container>
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-6xl text-center mb-12">
          {/* Logo + Way of Healing */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <Image
              src="/vedique-logo-with-tagline.png"
              alt="Vedique"
              width={220}
              height={156}
              className="object-contain"
            />
          </div>

          {/* Sub heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Blending ancient wisdom with modern science
          </h2>

          {/* Description (small font) */}
          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Preventive health made simple through herbal infusions, wellness
            products, and guided programs rooted in Ayurveda.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;

            return (
              <div
                key={c.id}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col"
              >
                {/* Icon + Content */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#eaf7ee] rounded-lg flex items-center justify-center">
                    <Icon
                      className="w-7 h-7 text-[#264d25]"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600">{c.text}</p>
                  </div>
                </div>

                {/* CTA (designed, subtle) */}
                <div className="mt-6">
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold
                      text-[#264d25] group-hover:text-webpink
                      transition"
                  >
                    <span className="relative">
                      {c.cta}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-webpink transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
