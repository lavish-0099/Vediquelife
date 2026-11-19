"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RevampedPrakritiAnalysis from "@/components/home/revamped/prakriti-analysis";

/* Header, announcement bar and footer come from your site layout.
   Put the design's photos in /public/images/vedique-wellness/ or use your Shopify CDN links. */
const IMG = "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/wellness-banner_S1.webp?v=1794820571";

const STATS = [
  { n: "100k+", l: ["Wellness", "Journeys"] },
  { n: "50+", l: ["Countries", "Served"] },
  { n: "99.6%", l: ["Success", "Rate"] },
  { n: "4.5", l: ["Rated on", "Google"] },
];

const TEAMS = [
  { tab: "Doctor Consultation", title: "Meet Your Doctors", body: "Get to know Vedique's doctors and find personalised guidance to help you build a plan that works for you.", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/dr_Consultation.webp?v=1794824074" },
  { tab: "Yoga Consultation", title: "Meet Your Yoga Coaches", body: "Get to know Vedique's yoga coaches and find personalised guidance to help you build a practice that works for you.", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/yoga_Consultation.webp?v=1794824018" },
  { tab: "Success Coach", title: "Meet Your Success Coaches", body: "Get to know Vedique's success coaches and find the daily support that keeps your habits consistent.", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Success_Coaching.webp?v=1794824375" },
  { tab: "Corporate Wellness", title: "Wellness for Your Team", body: "Bring Vedique's expert-led wellness programs to your workplace and help your people build healthier routines.", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/corporate_wellness.webp?v=1794821304" },
  { tab: "Corporate Wellness", title: "Ayurvedic consultation", body: "Bring Vedique's expert-led wellness programs to your workplace and help your people build healthier routines.", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Ayurvedic_consultation.webp?v=1794821055" },
];

type Expert = { img: string; title: string; sub: string };
const EXPERTS: Record<string, Expert[]> = {
  "Doctor Consultation": [
    { img: `${IMG}/e1.jpg`, title: "Ayurvedic physicians", sub: "Prakriti-led preventive care" },
    { img: `${IMG}/e2.jpg`, title: "Clinical Nutritionists", sub: "Food plans made for real life" },
    { img: `${IMG}/e3.jpg`, title: "Wellness Counsellors", sub: "Guidance that keeps you consistent" },
  ],
  "Yoga Consultation": [
    { img: `${IMG}/e3.jpg`, title: "Yoga Coaches", sub: "Practice built around your diet plan" },
    { img: `${IMG}/e1.jpg`, title: "Therapeutic Yoga Experts", sub: "Gentle, condition-aware sessions" },
    { img: `${IMG}/e2.jpg`, title: "Breathwork Guides", sub: "Calm routines for daily stress" },
  ],
  "Success Coach": [
    { img: `${IMG}/e2.jpg`, title: "Success Coaches", sub: "Daily check-ins and accountability" },
    { img: `${IMG}/e3.jpg`, title: "Habit Mentors", sub: "Small steps that stay" },
    { img: `${IMG}/e1.jpg`, title: "Progress Analysts", sub: "Track what is working" },
  ],
  "Ayurvedic Physicians": [
    { img: `${IMG}/e1.jpg`, title: "Ayurvedic physicians", sub: "Prakriti-led preventive care" },
    { img: `${IMG}/e3.jpg`, title: "Panchakarma Specialists", sub: "Guided cleansing routines" },
    { img: `${IMG}/e2.jpg`, title: "Herbal Medicine Experts", sub: "Evidence-aware formulations" },
  ],
  "Corporate Wellness": [
    { img: `${IMG}/e2.jpg`, title: "Workplace Nutritionists", sub: "Plans for busy teams" },
    { img: `${IMG}/e3.jpg`, title: "Corporate Yoga Coaches", sub: "Sessions at your office" },
    { img: `${IMG}/e1.jpg`, title: "Program Managers", sub: "One point of contact" },
  ],
};
const CATS = Object.keys(EXPERTS);

const WRAP = "mx-auto w-[88%] max-w-[1240px] lg:w-[84%]";
const H = "!font-medium !tracking-normal";
const PILL = "inline-flex items-center justify-center rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm text-[#1e3d34] transition hover:bg-[#1e3d34] hover:text-white";
const SOLID = "inline-flex items-center justify-center gap-2 rounded-full bg-[#1e3d34] px-5 py-2.5 text-sm text-white";

export default function VediqueWellnessPage() {
  const [team, setTeam] = useState(1);
  const [cat, setCat] = useState(CATS[0]);
  const [progress, setProgress] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const t = TEAMS[team];

  const goTeam = (d: 1 | -1) => setTeam((i) => (i + d + TEAMS.length) % TEAMS.length);
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const scrollBy = (d: 1 | -1) => scroller.current?.scrollBy({ left: d * 380, behavior: "smooth" });

  return (
    <main className="bg-white text-[#1e3d34]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#d9d4c4]">
        <Image src={`${IMG}/hero.jpg`} alt="" fill priority className="object-cover object-right" />
        <div className={`${WRAP} relative pb-52 pt-24 md:pb-64 md:pt-36`}>
          <p className="text-base font-medium uppercase tracking-[0.35em] md:text-xl">India&apos;s #1</p>
          <h1 className={`mt-3 max-w-[600px] text-4xl leading-[1.12] md:text-5xl lg:text-[52px] ${H}`}>
            Doctor-Led Scientific Weight Loss &amp; Wellness Program
          </h1>
          <Link href="#plan" className="mt-8 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-medium shadow-sm">
            Vedique Wellness Plan
          </Link>
        </div>
      </section>

      {/* INTRO + STATS */}
      <section id="plan" className="relative -mt-28 rounded-t-[56px] bg-white pb-24 pt-20">
        <div className={`${WRAP} grid items-center gap-10 md:grid-cols-[44%_1fr] md:gap-14`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src={`${IMG}/intro.jpg`} alt="Woman holding a healthy bowl" fill className="object-cover" />
          </div>
          <div>
            <h2 className={`text-3xl leading-tight md:text-4xl lg:text-5xl ${H}`}>
              Better Health Begins With a Plan That Sees You
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed md:text-base">
              Doctor-led nutrition rooted in Ayurvedic wisdom, personalised to your body, routine and health goals.
              Simple meals, expert guidance and habits you can sustain.
            </p>
            <Link href="/vedique-diet" className={`${SOLID} mt-8`}>
              Start Your Journey <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className={`${WRAP} mt-20 grid grid-cols-2 gap-y-10 md:grid-cols-4`}>
          {STATS.map((s, i) => (
            <div key={s.n} className={`flex items-center justify-center gap-3 ${i > 0 ? "md:border-l md:border-[#1e3d34]/70" : "md:justify-start"}`}>
              <span className="text-4xl font-light lg:text-6xl">{s.n}</span>
              <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.2em]">
                {s.l[0]}<br />{s.l[1]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM TABS + EXPERTS */}
      <section id="services" className="-mt-0 rounded-t-[56px] bg-[#e6e6e4] pb-24 pt-12">
        <div className={WRAP}>
          <div className="flex items-center gap-3 overflow-x-auto text-base md:text-lg">
            <button onClick={() => goTeam(-1)} aria-label="Previous" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#1e3d34]/50">
              <ArrowLeft size={16} />
            </button>
            {TEAMS.map((x, i) => (
              <div key={x.tab} className="flex shrink-0 items-center gap-4">
                <button onClick={() => setTeam(i)} className={i === team ? "font-semibold" : ""}>
                  <span className="mr-2 text-sm">0{i + 1}</span>{x.tab}
                </button>
                {i < TEAMS.length - 1 && <span className="px-3 opacity-60">|</span>}
              </div>
            ))}
            <button onClick={() => goTeam(1)} aria-label="Next" className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#1e3d34]/50">
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative mt-8 flex min-h-[380px] items-center overflow-hidden rounded-[28px] bg-[#1e3d34] text-white md:min-h-[420px]">
            {/* Full-width image (green area is part of the image itself) */}
            <Image src={t.img} alt="" fill className="object-cover object-right" />
            {/* Mobile only: darken so text stays readable when the green area is cropped */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3d34]/90 via-[#1e3d34]/50 to-transparent md:hidden" />
            <div className="relative z-10 w-full p-8 md:w-[40%] md:p-14">
              <h2 className={`max-w-xs text-4xl leading-tight lg:text-5xl ${H}`}>{t.title}</h2>
              <p className="mt-6 max-w-[18rem] text-sm leading-relaxed text-white/80">{t.body}</p>
              <Link href="/onboarding" className="mt-8 inline-block text-xs">Book Now ↗</Link>
            </div>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest">Expert-guided wellness</p>
              <h2 className={`mt-4 max-w-sm text-3xl leading-tight lg:text-4xl ${H}`}>Experts Behind Your Plans</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              A team of experts bringing Ayurveda, nutritional science and personalised lifestyle guidance together
              for a more considered approach to wellness.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border border-[#1e3d34]/50 px-3 py-2 text-xs transition ${c === cat ? "bg-[#1e3d34] text-white" : "hover:bg-[#1e3d34]/10"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div ref={scroller} onScroll={onScroll} className="mt-8 flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {EXPERTS[cat].map((e, i) => (
              <article key={e.title} className="w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl bg-[#f7f7f5] md:w-[calc((100%-2.5rem)/3)]">
                <div className="relative aspect-[4/3]">
                  <Image src={e.img} alt={e.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold">0{i + 1}</p>
                  <h3 className="mt-2 text-base font-semibold">{e.title}</h3>
                  <p className="mt-1 text-xs opacity-70">{e.sub}</p>
                  <Link href="/meet-our-team" className="mt-3 inline-block text-[10px] font-semibold underline underline-offset-2">
                    Discover expertise ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/onboarding" className={SOLID}>Book Your Consultation</Link>
            <Link href="/meet-our-team" className={PILL}>View All</Link>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative h-px w-40 bg-[#1e3d34]/30">
                <div className="absolute -top-px h-[3px] w-1/2 rounded bg-[#1e3d34]" style={{ left: `${progress * 50}%` }} />
              </div>
              <button onClick={() => scrollBy(-1)} aria-label="Scroll left" className="grid h-7 w-7 place-items-center rounded-full border border-[#1e3d34]/50"><ArrowLeft size={12} /></button>
              <button onClick={() => scrollBy(1)} aria-label="Scroll right" className="grid h-7 w-7 place-items-center rounded-full border border-[#1e3d34]/50"><ArrowRight size={12} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* PRAKRITI ANALYSIS (Uses the exact home/revamped design) */}
      <RevampedPrakritiAnalysis />
    </main>
  );
}

