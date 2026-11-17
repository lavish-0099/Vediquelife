"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/container";

interface Testimonial {
  id: string;
  photo: string;
  quote: string;
  author: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    photo: "/assets/staff/dr-charu.png",
    quote: "Finally understood what my body needed instead of following another generic diet",
    author: "Roshni K. • Vedique Customer",
  },
  {
    id: "test-2",
    photo: "/assets/staff/yogita.png",
    quote: "The plan was realistic, personal and easy to follow around my work schedule.",
    author: "Pooja M. • Vedique Customer",
  },
  {
    id: "test-3",
    photo: "/assets/staff/dr-shilpa.png",
    quote: "The Vedique team supported me throughout—not only when I was doing well.",
    author: "Priya S. • Vedique Customer",
  },
  {
    id: "test-4",
    photo: "/assets/staff/dr-reena-rawat.png",
    quote: "My Prakriti analysis explained patterns I had struggled to understand for years",
    author: "Neha G. • Vedique Customer",
  },
];

const METRIC_BADGES = [
  "HbA1c ↓ 30% | 20k+ Customers",
  "Thyroid Balance 88% | 15k+ Customers",
  "Sustained Weight Loss | 50k+ Customers",
];

export default function RevampedExperienceTestimonials() {
  return (
    <section id="testimonials" className="w-full py-16 lg:py-24 bg-[#faf9f6] scroll-mt-28">
      <Container>
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <span className="text-[11px] font-semibold tracking-widest text-[#1e3d34] uppercase block mb-3">
              THE VEDIQUE EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-[#111827] tracking-tight">
              Real Experience, <br />
              <span className="font-semibold text-[#1e3d34]">Real Health Journey.</span>
            </h2>
          </div>

          <div className="max-w-md mx-auto md:mx-0">
            <p className="text-sm text-neutral-600 leading-relaxed text-center md:text-right">
              Explore real stories of people who have taken steps towards better health with Vedique.
            </p>
          </div>
        </div>

        {/* 4 TESTIMONIAL CARDS */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 mb-8 sm:mb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group shrink-0 snap-start basis-[78%] sm:basis-auto text-center sm:text-left bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-xl bg-neutral-100 overflow-hidden mb-4">
                  <Image
                    src={t.photo}
                    alt={t.author}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* 5 Stars */}
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-3 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#111827] leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="pt-2 border-t border-neutral-100">
                <span className="text-[11px] text-neutral-500 font-medium block">
                  {t.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CLINICAL METRICS PILLS WITH CONTROLS */}
        <div className="flex items-center gap-3 pt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible max-sm:[&>:nth-child(2)]:ml-auto max-sm:[&>:nth-child(4)]:mr-auto">
          <button
            type="button"
            aria-label="Previous metric"
            className="hidden sm:flex w-8 h-8 rounded-full border border-neutral-300 items-center justify-center text-neutral-600 hover:border-[#1e3d34] hover:text-[#1e3d34] hover:bg-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {METRIC_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="shrink-0 whitespace-nowrap px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1e3d34] text-white text-[10px] sm:text-xs font-medium tracking-wide shadow-sm flex items-center gap-2"
            >
              <span>{badge}</span>
            </div>
          ))}

          <button
            type="button"
            aria-label="Next metric"
            className="hidden sm:flex w-8 h-8 rounded-full border border-neutral-300 items-center justify-center text-neutral-600 hover:border-[#1e3d34] hover:text-[#1e3d34] hover:bg-white transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}
