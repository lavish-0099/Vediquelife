"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Minus, Star } from "lucide-react";
import RevampedPrakritiAnalysis from "@/components/home/revamped/prakriti-analysis";

/* ───────── IMAGE SLOTS: paste your Shopify CDN links between the quotes ───────── */
const HERO_IMG = "/images/vedique-diet/case-weight.jpg"; // woman, subject on the RIGHT, green area on the left
const PLAN_IMGS = [
  "/images/vedique-diet/case-weight.jpg",
  "/images/vedique-wellness/intro.jpg",
  "/images/vedique-diet/hero.jpg",
  "/images/vedique-wellness/team-coach.jpg",
  "/images/vedique-wellness/team-doctor.jpg",
]; // one per accordion item (shown when expanded)
const TESTIMONIAL_IMGS = [
  "/images/vedique-diet/t1.jpg",
  "/images/vedique-diet/t2.jpg",
  "/images/vedique-diet/t3.jpg",
  "/images/vedique-diet/t4.jpg",
];

type Plan = { n: string; title: string; body: string[]; img: string };
const PLAN: Plan[] = [
  { n: "01", title: "Personalised Nutrition Guidance", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Ayurvedic_Pulse_Consultation.webp?v=1794891906", body: ["Meal guidance built around your body, health needs, preferences and routine, with no one-size-fits-all plans.", "Your nutritionist adjusts the plan as your needs and progress change."] },
  { n: "02", title: "Prakriti-Based Approach", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Balanced_Indian_lunch_at_home.webp?v=1794892310", body: ["Your Prakriti helps shape which foods and routines suit you best.", "It is considered alongside your health history, lifestyle and goals."] },
  { n: "03", title: "Healthy Eating Habits", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Indian_nutritionist_reviewing_a_balanced_meal_plan.webp?v=1794892463", body: ["Learn practical ways to eat well without extreme diets or fasting.", "Simple, home-style meals that fit into everyday life."] },
  { n: "04", title: "Lifestyle and Daily Routine", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Sage_Morning_Garden_Walk.webp?v=1794892521", body: ["Sleep, movement, stress and daily habits are part of the plan, not an afterthought.", "Small routines you can keep up over time."] },
  { n: "05", title: "Sustainable Weight Management", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Sunlit_Side_Stretch_by_the_Window.webp?v=1794892583", body: ["The focus is on steady, lasting change rather than quick fixes.", "Ongoing support helps you stay consistent after the first results."] },
];

const TESTIMONIALS = [
  { quote: "I finally understood what my body needed instead of following another generic diet.", name: "Anitta K." },
  { quote: "The plan was realistic, personal and easy to follow around my work schedule.", name: "Rhea M." },
  { quote: "The Vedique team supported me throughout—not only when I was doing well.", name: "Priya S." },
  { quote: "My Prakriti analysis explained patterns I had struggled to understand for years.", name: "Neha R." },
];

const WRAP = "mx-auto w-[88%] max-w-[1240px] lg:w-[84%]";
const H = "!font-medium !tracking-normal";
const PILL = "inline-flex items-center justify-center rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm text-[#1e3d34] transition hover:bg-[#1e3d34] hover:text-white";

/* Renders the image if a link is set, otherwise an empty placeholder */
function Slot({ src, alt }: { src: string; alt: string }) {
  return src ? (
    <Image src={src} alt={alt} fill className="object-cover" />
  ) : (
    <div className="absolute inset-0 grid place-items-center bg-current/10 text-[10px] uppercase tracking-widest opacity-40">
      Image
    </div>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/80 text-white">
      {children}
    </span>
  );
}

export default function VediqueWeightManagementPage() {
  /* accordion (same behaviour as Principles: one open at a time) */
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTo = (i: number) =>
    setTimeout(() => rows.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  const toggle = (i: number) => {
    if (openIndex === i) setOpenIndex(null);
    else {
      setOpenIndex(i);
      scrollTo(i);
    }
  };
  const step = (dir: 1 | -1) => {
    const next =
      openIndex === null
        ? dir === 1 ? 0 : PLAN.length - 1
        : Math.min(PLAN.length - 1, Math.max(0, openIndex + dir));
    setOpenIndex(next);
    scrollTo(next);
  };

  /* testimonials scroller */
  const [progress, setProgress] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const scrollBy = (d: 1 | -1) => scroller.current?.scrollBy({ left: d * 380, behavior: "smooth" });

  return (
    <main className="bg-white text-[#1e3d34]">
      <style>{`
        .wm-fade { animation: wm-fade .35s ease; }
        @keyframes wm-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .wm-fade { animation: none; } }
      `}</style>

      {/* HERO (header + announcement bar come from your site layout) */}
      <section className="relative overflow-hidden bg-[#1e3d34] text-white">
        <div className="absolute inset-0">
          <Slot src={HERO_IMG} alt="Weight management" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3d34] via-[#1e3d34]/60 to-transparent" />
        <div className={`${WRAP} relative pb-56 pt-24 md:pb-64 md:pt-32`}>
          <h1 className={`max-w-[420px] text-4xl leading-[1.1] md:text-5xl lg:text-[56px] ${H}`}>
            Weight Management
          </h1>
          <p className={`mt-8 max-w-[300px] text-2xl leading-snug lg:text-[32px] ${H}`}>
            17kg Down, A Journey Built on Consistency
          </p>
          <Link href="#consult" className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#1e3d34]">
            View case study <ArrowRight size={12} className="-rotate-45" />
          </Link>
        </div>
      </section>

      {/* INTRO + ACCORDION */}
      <section className="relative -mt-28 rounded-t-[56px] bg-[#e6e6e4] pb-28 pt-16 lg:pt-24">
        <div className={WRAP}>
          <h2 className={`text-3xl leading-tight lg:text-[44px] ${H}`}>
            Your Journey Towards a Healthier Weight Starts Here
          </h2>
          <p className="mt-5 max-w-5xl text-sm leading-relaxed md:text-base">
            At Vedique, we offer personalised nutrition guidance based on your Prakriti, dietary needs and lifestyle,
            helping you build balanced eating habits without extreme diets or quick-fix solutions. The focus is on
            practical nutrition guidance and sustainable lifestyle changes that fit into your everyday life.
          </p>
          <hr className="mt-10 border-[#1e3d34]" />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <h3 className={`max-w-md text-3xl leading-tight lg:text-4xl ${H}`}>
              What Your Weight Management Plan Includes
            </h3>
            <div className="flex items-center gap-3">
              <Link href="/onboarding" className={PILL}>View All</Link>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" aria-label="Previous item" onClick={() => step(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1e3d34] transition hover:bg-[#1e3d34] hover:text-white">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Next item" onClick={() => step(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1e3d34] transition hover:bg-[#1e3d34] hover:text-white">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 lg:gap-5">
            {PLAN.map((p, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={p.n} ref={(el) => { rows.current[i] = el; }} className="scroll-mt-24">
                  {!isOpen ? (
                    <button
                      type="button"
                      aria-expanded={false}
                      onClick={() => toggle(i)}
                      className="wm-fade flex min-h-[64px] w-full items-center justify-between gap-4 rounded-xl bg-[#1e3d34] px-5 py-4 text-left text-white transition-colors hover:bg-[#25493f] sm:px-6 lg:min-h-[84px] lg:px-8"
                    >
                      <span className="text-lg font-medium leading-snug sm:text-xl lg:text-[28px]">
                        {p.n} — {p.title}
                      </span>
                      <IconCircle><ArrowDown className="h-3.5 w-3.5" /></IconCircle>
                    </button>
                  ) : (
                    <div className="wm-fade flex flex-col overflow-hidden rounded-xl bg-[#1e3d34] text-white md:flex-row">
                      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 lg:px-10 lg:py-9">
                        <button type="button" aria-expanded onClick={() => toggle(i)} className="flex w-full items-start gap-4 text-left lg:gap-6">
                          <span className="text-5xl font-light leading-none lg:text-6xl xl:text-[72px]">{p.n}</span>
                          <span className="flex-1 pt-1 text-xl font-medium leading-tight lg:text-2xl xl:text-[28px]">{p.title}</span>
                          <IconCircle><Minus className="h-3.5 w-3.5" /></IconCircle>
                        </button>
                        <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/85 lg:mt-8 lg:text-base">
                          {p.body.map((para, idx) => <p key={idx}>{para}</p>)}
                        </div>
                      </div>
                      <div className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-[300px] md:w-[40%]">
                        <Slot src={p.img} alt={p.title} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRAKRITI ANALYSIS: your existing form component */}
      <RevampedPrakritiAnalysis />

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 lg:py-28">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <article key={t.name} className="w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl bg-white shadow-[0_0_0_1px_rgba(30,61,52,0.06)] md:w-[calc(25%-1.1rem)]">
              <div className="relative aspect-[6/5] text-[#1e3d34]">
                <Slot src={TESTIMONIAL_IMGS[i]} alt={t.name} />
              </div>
              <div className="p-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={12} fill="currentColor" />)}
                </div>
                <p className="mt-3 min-h-[60px] text-sm leading-snug">“{t.quote}”</p>
                <p className="mt-4 text-xs font-semibold">{t.name} · Vedique member</p>
              </div>
            </article>
          ))}
        </div>

        <div className={`${WRAP} mt-10 flex flex-wrap items-center gap-6`}>
          <Link href="/onboarding" className={PILL}>View All</Link>
          <div className="ml-auto flex w-full max-w-lg items-center gap-3">
            <button onClick={() => scrollBy(-1)} aria-label="Scroll left"><ArrowLeft size={12} /></button>
            <div className="relative h-px flex-1 bg-[#1e3d34]/30">
              <div className="absolute -top-px h-[3px] w-1/3 rounded bg-[#1e3d34]" style={{ left: `${progress * 66.6}%` }} />
            </div>
            <button onClick={() => scrollBy(1)} aria-label="Scroll right"><ArrowRight size={12} /></button>
          </div>
        </div>
      </section>
    </main>
  );
}

