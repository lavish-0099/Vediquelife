"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import { CtaButton } from "../cta-button";

export default function HeroInfoBand() {
  return (
    <div className="w-full bg-white z-50">
      <div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12"
        role="region"
        aria-label="Hero info band"
      >
        <div
          className="rounded-2xl bg-white shadow-sm border border-white/40 text-slate-900 overflow-hidden"
          style={{ backdropFilter: "saturate(120%) blur(6px)" }}
        >
          {/* MAIN WRAPPER */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 px-4 sm:py-5 sm:px-6">
            {/* LEFT: IMAGE + TEXT */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white/30">
                  <Image
                    src="/assets/images/ayurvedic-nutrition.webp"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-semibold text-webprimary">
                  Vedique Diet — Personalized Ayurvedic Nutrition
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-600">
                  Custom plans based on your Prakriti and blood reports for
                  sustainable weight loss.
                </div>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="flex justify-center md:justify-end">
              <Link href="/vedique-diet">
                <CtaButton label="Explore Program" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
