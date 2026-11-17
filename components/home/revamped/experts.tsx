"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/container";

interface Expert {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  ctaText: string;
  href: string;
  imageUrl: string;
}

// NOTE: the first 3 are your real experts. The last 3 are PLACEHOLDERS so the
// carousel has something to scroll (progress bar fills ~50% like your design).
// Replace their title / subtitle / href / image, or delete them.
const EXPERTS: Expert[] = [
  {
    id: "ayurvedic-physicians",
    index: "01",
    title: "Ayurvedic physicians",
    subtitle: "Prakriti-led preventive care",
    ctaText: "Discover expertise",
    href: "/meet-our-team",
    imageUrl: "/assets/indian-doctor.jpg",
  },
  {
    id: "clinical-nutritionists",
    index: "02",
    title: "Clinical Nutritionists",
    subtitle: "Food plans made for real life",
    ctaText: "Discover expertise",
    href: "/meet-our-team",
    imageUrl: "/assets/staff/dr-akanksha.png",
  },
  {
    id: "wellness-counsellors",
    index: "03",
    title: "Wellness Counsellors",
    subtitle: "Guidance that keeps you consistent",
    ctaText: "Discover expertise",
    href: "/meet-our-team",
    imageUrl: "/assets/staff/aarti-chaurasiya.png",
  },
  // ───── placeholders (replace) ─────
  {
    id: "yoga-experts",
    index: "04",
    title: "Yoga Experts",
    subtitle: "Movement that fits your body",
    ctaText: "Discover expertise",
    href: "/meet-our-team",
    imageUrl: "/assets/staff/aarti-chaurasiya.png", // TODO: replace
  },
  {
    id: "stress-coaches",
    index: "05",
    title: "Stress Coaches",
    subtitle: "Calm that lasts beyond the session",
    ctaText: "Discover expertise",
    href: "/meet-our-team",
    imageUrl: "/assets/indian-doctor.jpg", // TODO: replace
  },
  {
    id: "fitness-coaches",
    index: "06",
    title: "Fitness Coaches",
    subtitle: "Strength built at your pace",
    ctaText: "Discover expertise",
    href: "/meet-our-team",
    imageUrl: "/assets/staff/dr-akanksha.png", // TODO: replace
  },
];

const FILTER_TAGS = [
  "Doctor Consultation",
  "Yoga Consultation",
  "Success Coach",
  "Ayurvedic Physicians",
  "Corporate Wellness",
];

const GAP = 20; // px, matches gap-5

export default function RevampedExperts() {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [progress, setProgress] = useState({ start: 0, size: 1 });
  const trackRef = useRef<HTMLDivElement>(null);

  /* Progress bar: fill width = visible share, fill position = scroll position */
  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.scrollWidth) return;
    const size = Math.min(1, el.clientWidth / el.scrollWidth);
    const max = el.scrollWidth - el.clientWidth;
    const start = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setProgress({ start, size });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + GAP;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <Container>
        {/* ───────── HEADER ───────── */}
        <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#1e3d34] mb-5 text-center lg:text-left">
          Expert-Guided Wellness
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start mb-8 lg:mb-10">
          <h2 className="lg:col-span-7 text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1e3d34] tracking-tight leading-[1.1] text-center lg:text-left">
            Experts Behind <br />
            Your Plans
          </h2>

          <p className="lg:col-span-5 text-sm text-[#1e3d34]/80 leading-relaxed max-w-[340px] mx-auto lg:mx-0 text-center lg:text-left">
            A team of experts bringing Ayurveda, nutritional science and
            personalised lifestyle guidance together for a more considered
            approach to wellness
          </p>
        </div>

        {/* ───────── FILTER PILLS (above the cards) ───────── */}
        <div className="mb-8 lg:mb-10 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible lg:grid lg:grid-cols-5 lg:gap-6 max-sm:[&>:first-child]:ml-auto max-sm:[&>:last-child]:mr-auto">
          {FILTER_TAGS.map((tag, i) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveFilter(activeFilter === i ? null : i)}
              className={`shrink-0 px-5 py-2.5 lg:py-2 rounded-full border border-[#1e3d34] text-xs lg:text-[11px] whitespace-nowrap text-center transition ${activeFilter === i
                ? "bg-[#1e3d34] text-white"
                : "text-[#1e3d34] hover:bg-[#1e3d34]/5"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ───────── EXPERT CARDS (carousel) ───────── */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERTS.map((expert) => (
            <div
              key={expert.id}
              className="group shrink-0 snap-start basis-[78%] sm:basis-[calc((100%-20px)/2)] lg:basis-[calc((100%-40px)/3)] rounded-[32px] overflow-hidden bg-[#f5f5f3] flex flex-col"
            >
              {/* Photo */}
              <Link
                href={expert.href}
                className="relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={expert.imageUrl}
                  alt={expert.title}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Content */}
              <div className="px-4 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-9 text-center sm:text-left">
                <span className="block text-[10px] font-semibold text-[#1e3d34] mb-5">
                  {expert.index}
                </span>
                <h3 className="text-[17px] font-semibold text-[#1e3d34] leading-tight">
                  {expert.title}
                </h3>
                <p className="text-xs text-[#1e3d34]/80 mt-1.5">
                  {expert.subtitle}
                </p>
                <Link
                  href={expert.href}
                  className="mt-3 inline-flex items-center gap-1.5 py-0.5 text-[11px] sm:text-[9px] font-semibold text-[#1e3d34] border-b border-[#1e3d34] pb-px"
                >
                  <span>{expert.ctaText}</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-2.5 sm:h-2.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ───────── BOTTOM BAR: CTAs left, progress + arrows right ───────── */}
        <div className="mt-8 lg:mt-10 flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[#1e3d34] border border-[#1e3d34] text-white text-[11px] font-semibold tracking-wide hover:bg-[#2c5b4d] transition"
            >
              Book Your Consultation
            </Link>
            <Link
              href="/meet-our-team"
              className="px-6 py-2.5 rounded-full border border-[#1e3d34] text-[#1e3d34] text-[11px] font-medium tracking-wide hover:bg-[#1e3d34]/5 transition"
            >
              View All
            </Link>
          </div>

          {/* Progress + arrows */}
          <div className="flex items-center gap-3">
            <div className="relative h-[3px] w-32 bg-[#1e3d34]/25 rounded-full overflow-hidden">
              <div
                className="absolute top-0 h-full bg-[#1e3d34] rounded-full transition-all duration-200"
                style={{
                  left: `${progress.start * 100}%`,
                  width: `${progress.size * 100}%`,
                }}
              />
            </div>

            <button
              type="button"
              aria-label="Previous experts"
              onClick={() => scrollByCard(-1)}
              className="w-9 h-9 sm:w-7 sm:h-7 rounded-full border border-[#1e3d34] flex items-center justify-center text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
            </button>
            <button
              type="button"
              aria-label="Next experts"
              onClick={() => scrollByCard(1)}
              className="w-9 h-9 sm:w-7 sm:h-7 rounded-full border border-[#1e3d34] flex items-center justify-center text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
