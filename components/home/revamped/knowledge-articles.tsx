"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/container";

export default function RevampedKnowledgeArticles() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white" id="articles">
      <Container>
        {/* HEADER AREA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 text-center sm:text-left">
          <div>
            <span className="text-[11px] font-semibold tracking-widest text-[#1e3d34] uppercase block mb-3">
              LATEST ARTICLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#111827] tracking-tight">
              Knowledge for <br />
              <span className="font-semibold text-[#1e3d34]">everyday well-being.</span>
            </h2>
          </div>

          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-300 text-xs sm:text-sm font-medium text-neutral-800 hover:border-[#1e3d34] hover:text-[#1e3d34] hover:bg-neutral-50 transition"
            >
              <span>Explore the Journal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ASYMMETRIC GRID: 1 BIG FEATURED LEFT, 2 STACKED RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* BIG FEATURED ARTICLE (LEFT) */}
          <Link
            href="/blog"
            className="group lg:col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 aspect-[4/3] lg:aspect-auto lg:h-[460px] shadow-sm hover:shadow-xl transition-all duration-300 block"
          >
            <Image
              src="/assets/approach.jpg"
              alt="Ayurvedic herbs and powders"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-center sm:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white tracking-wider uppercase mb-3">
                NUTRITION • 6 MIN
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-emerald-200 transition">
                How to Control Sugar Cravings Naturally &amp; Effectively
              </h3>
            </div>
          </Link>

          {/* 2 STACKED CARDS (RIGHT) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Right Card */}
            <Link
              href="/blog"
              className="group flex-1 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 aspect-[16/9] lg:aspect-auto shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <Image
                src="/assets/vedique-philosophy.jpg"
                alt="Fresh nutrition and fruits"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white tracking-wider uppercase mb-2">
                  NUTRITION • 4 MIN
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-emerald-200 transition">
                  How to Control Sugar Cravings Naturally &amp; Effectively
                </h3>
              </div>
            </Link>

            {/* Bottom Right Card */}
            <Link
              href="/blog"
              className="group flex-1 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 aspect-[16/9] lg:aspect-auto shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <Image
                src="/assets/impact.jpg"
                alt="Curcumin and golden herbs"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white tracking-wider uppercase mb-2">
                  WELLNESS • 7 MIN
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-emerald-200 transition">
                  10 Benefits of Curcumin on Human Health
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
