"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";

export default function RevampedHero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[520px] sm:min-h-[600px] lg:min-h-[780px] flex flex-col">
      {/* FULL-SECTION BACKGROUND IMAGE */}
      <Image
        src="/assets/revamp/hero-desktop.webp"
        alt="Woman relaxing with Vedique herbal tea"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] lg:object-center"
      />

      {/* READABILITY OVERLAYS */}
      <div className="absolute inset-0 bg-black/45 lg:bg-transparent" />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

      {/* HERO MAIN — extra bottom padding so the overlap card peeks up */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-32 lg:pb-36">
            <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:items-start lg:text-left pr-0 lg:pr-6">
              <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight text-white leading-[1.15] mb-4 sm:mb-6">
                Your Body Is Unique <br />
                <span className="font-semibold text-[#f7f7f7]">Your Wellness</span> <br />
                Should Be Too
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8">
                Discover personalised wellness based on Ayurvedic wisdom, backed by modern science and designed for your daily life.
              </p>

              <Link
                href="/vedique-diet"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white text-[#1e3d34] text-sm sm:text-base font-medium tracking-wide shadow-md hover:bg-[#f1f5ee] hover:shadow-lg transition-all duration-200"
              >
                Vedique Wellness Plan
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}