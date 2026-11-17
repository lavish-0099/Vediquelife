"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import Container from "@/components/container";

type Principle = {
  n: string;
  lines: [string, string];
  image: string;
  lead?: string; // highlighted opening line
  body: string[]; // paragraphs
  tags?: string[]; // optional pill list (shown after the body)
  closing?: string; // highlighted closing line
};

// Photos live in /public/assets/about/ (about-1.jpg ... about-8.jpg)
const PRINCIPLES: Principle[] = [
  {
    n: "01",
    lines: ["Understand", "The Individual First"],
    image: "/assets/about/about-1.jpg",
    lead: "Every individual is unique.",
    body: [
      "Health needs, nutritional requirements and lifestyle differ from person to person. An approach that works for one individual may not be suitable for another.",
      "The Vedique Way begins by understanding the individual, including their physiology, Prakriti, health history, nutritional needs, lifestyle, environment and goals.",
    ],
    closing: "Understanding the person comes first.",
  },
  {
    n: "02",
    lines: ["Doctor-Led.", "Science-Informed."],
    image: "/assets/about/about-2.jpg",
    body: [
      "The Vedique Way places medical understanding at the heart of its approach.",
      "It begins by understanding how the body functions and what an individual needs before shaping a plan to support their health.",
      "Scientific frameworks, clinical understanding, diagnostic information and available evidence are considered alongside Ayurvedic principles.",
      "The aim is to translate this understanding into practical, structured and personalised health guidance.",
    ],
  },
  {
    n: "03",
    lines: ["Ayurvedic Principles", "Meet Modern Science"],
    image: "/assets/about/about-3.jpg",
    body: [
      "Ayurveda offers a traditional understanding of individual constitution, food, lifestyle and balance.",
      "Modern science and medicine bring insights from physiology, diagnostics, clinical evidence and ongoing research.",
      "The Vedique Way brings these perspectives together, applying relevant principles and scientific understanding according to each individual’s needs.",
    ],
  },
  {
    n: "04",
    lines: ["Food As A Foundation", "For Health"],
    image: "/assets/about/about-4.jpg",
    body: [
      "Food plays an important role in supporting health and well-being. Its value goes beyond calories and nutrients; what an individual eats also needs to be considered in the context of their health, lifestyle and nutritional needs.",
      "The Vedique Way places personalised nutrition at the heart of its approach, making food a foundational part of an individual’s health plan.",
    ],
  },
  {
    n: "05",
    lines: ["Look At", "The Whole Person"],
    image: "/assets/about/about-5.jpg",
    body: [
      "Health is influenced by several interconnected aspects of life. Nutrition, digestion, metabolism, sleep, stress and lifestyle can all play a role in how a person feels and functions.",
      "The Vedique Way considers these aspects together, looking beyond an individual symptom to understand the broader picture of health.",
    ],
    tags: [
      "Mind",
      "Body",
      "Nutrition",
      "Metabolism",
      "Digestion",
      "Sleep",
      "Stress",
      "Movement",
      "Lifestyle",
      "Environment",
    ],
    closing: "Because understanding health means understanding the individual as a whole.",
  },
  {
    n: "06",
    lines: ["Functional Foods And", "Herbs With Purpose"],
    image: "/assets/about/about-6.jpg",
    body: [
      "Functional foods, herbs and nutritional ingredients can play a supporting role in a personalised wellness approach.",
      "The Vedique Way considers them in the context of an individual’s needs and health goals, as part of a broader plan that includes nutrition, lifestyle and appropriate medical care.",
      "Their role is to complement the overall approach to health, not serve as standalone solutions.",
    ],
  },
  {
    n: "07",
    lines: ["Mind And Body,", "In Connection"],
    image: "/assets/about/about-7.jpg",
    body: [
      "Physical health and mental well-being are closely connected. Stress, sleep, emotions, behaviour and eating patterns can influence how an individual feels and functions.",
      "The Vedique Way considers these connections when shaping a personalised approach to health, recognising the role of both mind and body in overall well-being.",
    ],
  },
  {
    n: "08",
    lines: ["Lifestyle Is Part", "Of The Approach"],
    image: "/assets/about/about-8.jpg",
    body: [
      "Long-term well-being is shaped by the habits and routines that form part of everyday life.",
      "Food choices, physical activity, sleep, stress management and daily behaviours all contribute to an individual’s overall health.",
      "The Vedique Way considers these factors when building practical lifestyle changes that can be sustained over time.",
    ],
  },
];

const TOTAL = PRINCIPLES.length;

function IconCircle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-7 w-7 lg:h-8 lg:w-8 shrink-0 items-center justify-center rounded-full border border-white/80 text-white ${className}`}
    >
      {children}
    </span>
  );
}

export default function Principles() {
  // Only one principle can be open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (i: number) =>
    setTimeout(() => rows.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);

  const toggle = (i: number) => {
    if (openIndex === i) {
      setOpenIndex(null);
    } else {
      setOpenIndex(i);
      scrollTo(i);
    }
  };

  /* Up / down circles: open the previous / next principle */
  const step = (dir: 1 | -1) => {
    const next =
      openIndex === null
        ? dir === 1
          ? 0
          : TOTAL - 1
        : Math.min(TOTAL - 1, Math.max(0, openIndex + dir));
    setOpenIndex(next);
    scrollTo(next);
  };

  return (
    <section className="relative z-10 w-full bg-[#e4e4e1] -mt-12 lg:-mt-16 rounded-t-[36px] lg:rounded-t-[56px] pt-16 lg:pt-28 pb-20 lg:pb-32">
      <style>{`
        .ab-fade { animation: ab-fade .35s ease; }
        @keyframes ab-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .ab-fade { animation: none; } }
      `}</style>

      <Container>
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#1e3d34] tracking-tight leading-[1.1]">
            The Principles Behind <br />
            The Vedique Way
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous principle"
              onClick={() => step(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1e3d34] text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next principle"
              onClick={() => step(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1e3d34] text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {PRINCIPLES.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={p.n} ref={(el) => { rows.current[i] = el; }} className="scroll-mt-24">
                {!isOpen ? (
                  /* ───── collapsed row ───── */
                  <button
                    type="button"
                    aria-expanded={false}
                    onClick={() => toggle(i)}
                    className="ab-fade flex w-full items-center justify-between gap-4 rounded-[14px] bg-[#1e3d34] px-5 sm:px-6 lg:px-8 min-h-[64px] lg:min-h-[92px] py-4 text-left text-white hover:bg-[#25493f] transition-colors"
                  >
                    <span className="text-base sm:text-xl lg:text-[26px] font-medium leading-snug">
                      {p.n} — {p.lines.join(" ")}
                    </span>
                    <IconCircle>
                      <ArrowDown className="h-3.5 w-3.5" />
                    </IconCircle>
                  </button>
                ) : (
                  /* ───── expanded row ───── */
                  <div className="ab-fade flex flex-col md:flex-row overflow-hidden rounded-[14px] bg-[#1e3d34] text-white">
                    {/* Text side */}
                    <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 lg:px-10 lg:py-9">
                      {/* Clickable header (collapses the row) */}
                      <button
                        type="button"
                        aria-expanded={true}
                        onClick={() => toggle(i)}
                        className="flex w-full items-start gap-4 lg:gap-6 text-left"
                      >
                        <span className="text-5xl lg:text-6xl xl:text-[72px] font-light leading-none">{p.n}</span>
                        <span className="flex-1 pt-1 text-xl lg:text-2xl xl:text-[28px] font-medium leading-tight">
                          {p.lines[0]}
                          <br />
                          {p.lines[1]}
                        </span>
                        <IconCircle>
                          <Minus className="h-3.5 w-3.5" />
                        </IconCircle>
                      </button>

                      {/* Reveal content */}
                      <div className="mt-6 lg:mt-8 space-y-4 text-sm lg:text-base leading-relaxed text-white/85">
                        {p.lead && <p className="text-base lg:text-lg font-medium text-white">{p.lead}</p>}

                        {p.body.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}

                        {p.tags && (
                          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Aspects of health">
                            {p.tags.map((t) => (
                              <li
                                key={t}
                                className="rounded-full border border-white/30 px-3 py-1 text-xs lg:text-[13px] tracking-wide text-white/90"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}

                        {p.closing && <p className="pt-1 text-base lg:text-lg font-medium text-white">{p.closing}</p>}
                      </div>
                    </div>

                    {/* Image side — stretches to match the text height on desktop */}
                    <div className="relative w-full md:w-[40%] aspect-[16/10] md:aspect-auto md:min-h-[320px] bg-[#2a5045]">
                      <Image
                        src={p.image}
                        alt={p.lines.join(" ")}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
