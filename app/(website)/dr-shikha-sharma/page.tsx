"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ───────── IMAGE SLOTS: paste your Shopify CDN links between the quotes ───────── */
const HERO_IMG = "/assets/revamp/dr.jpg.webp"; // Dr. Shikha on the LEFT, space for text on the right
const EXPERT_IMGS = [
  "/images/vedique-wellness/e1.jpg",
  "/images/vedique-wellness/e2.jpg",
  "/images/vedique-wellness/e3.jpg",
]; // expert card photos (used by every category tab)

type Expert = { title: string; sub: string };
const EXPERTS: Record<string, Expert[]> = {
  "Doctor Consultation": [
    { title: "Ayurvedic physicians", sub: "Prakriti-led preventive care" },
    { title: "Clinical Nutritionists", sub: "Food plans made for real life" },
    { title: "Wellness Counsellors", sub: "Guidance that keeps you consistent" },
  ],
  "Yoga Consultation": [
    { title: "Yoga Coaches", sub: "Practice built around your diet plan" },
    { title: "Therapeutic Yoga Experts", sub: "Gentle, condition-aware sessions" },
    { title: "Breathwork Guides", sub: "Calm routines for daily stress" },
  ],
  "Success Coach": [
    { title: "Success Coaches", sub: "Daily check-ins and accountability" },
    { title: "Habit Mentors", sub: "Small steps that stay" },
    { title: "Progress Analysts", sub: "Track what is working" },
  ],
  "Ayurvedic Physicians": [
    { title: "Ayurvedic physicians", sub: "Prakriti-led preventive care" },
    { title: "Panchakarma Specialists", sub: "Guided cleansing routines" },
    { title: "Herbal Medicine Experts", sub: "Evidence-aware formulations" },
  ],
  "Corporate Wellness": [
    { title: "Workplace Nutritionists", sub: "Plans for busy teams" },
    { title: "Corporate Yoga Coaches", sub: "Sessions at your office" },
    { title: "Program Managers", sub: "One point of contact" },
  ],
};
const CATS = Object.keys(EXPERTS);

const WRAP = "mx-auto w-[88%] max-w-[1240px] lg:w-[84%]";
const H = "!font-medium !tracking-normal";
const SOLID = "inline-flex items-center justify-center rounded-full bg-[#1e3d34] px-5 py-2.5 text-sm text-white";
const PILL = "inline-flex items-center justify-center rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm text-[#1e3d34] transition hover:bg-[#1e3d34] hover:text-white";

/* Renders the image if a link is set, otherwise an empty placeholder */
function Slot({ src, alt, dark = false, className = "object-cover" }: { src: string; alt: string; dark?: boolean; className?: string }) {
  return src ? (
    <Image src={src} alt={alt} fill className={className} />
  ) : (
    <div className={`absolute inset-0 grid place-items-center text-[10px] uppercase tracking-widest ${dark ? "bg-white/10 text-white/40" : "bg-[#1e3d34]/10 text-[#1e3d34]/40"}`}>
      Image
    </div>
  );
}

/**
 * Stacking section: it sticks while the next section slides up over it, so it feels like the
 * page isn't scrolling down but the next section is coming up.
 * A section taller than the screen scrolls until its bottom reaches the bottom of the screen,
 * then sticks (top = viewport height − section height).
 */
function Stack({ z, id, className = "", children }: { z: number; id?: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setOn(!mq.matches); // respect reduced motion: plain scrolling
      setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`${on ? "sticky" : "relative"} ${className}`}
      style={{ top, zIndex: z }}
    >
      {children}
    </section>
  );
}

export default function VediqueDrShikhaPage() {
  const [cat, setCat] = useState(CATS[0]);
  const [progress, setProgress] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const scrollBy = (d: 1 | -1) => scroller.current?.scrollBy({ left: d * 380, behavior: "smooth" });
  const arrowBtn = "grid h-7 w-7 place-items-center rounded-full border border-[#1e3d34]/50 transition hover:bg-[#1e3d34] hover:text-white";

  return (
    <main className="relative text-[#1e3d34]">
      {/* 1 · HERO (header + announcement bar come from your site layout) */}
      <Stack z={1} className="flex min-h-[100svh] items-center overflow-hidden bg-[#8a6a4d] text-white">
        <div className="absolute inset-0">
          <Slot src={HERO_IMG} alt="Dr. Shikha Sharma" dark className="object-cover object-[25%_center]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/20 to-transparent md:from-black/35" />
        <div className={`${WRAP} relative py-28`}>
          <div className="md:ml-[52%]">
            <p className="text-[9px] font-semibold uppercase tracking-widest">Dr. Shikha Sharma</p>
            <h1 className={`mt-4 max-w-md text-4xl leading-[1.1] md:text-5xl lg:text-[54px] ${H}`}>
              Understanding the Person Behind Every Vedique Plan
            </h1>
            <p className="mt-6 max-w-sm text-base font-medium leading-snug">
              Over 27 years dedicated to bringing nutrition and preventive health into focus.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85">
              Dr. Shikha Sharma combines her medical background, nutritional expertise and understanding of Ayurveda
              to guide personalised nutrition and preventive wellness, with an emphasis on individual needs and
              sustainable habits.
            </p>
            <Link href="#journey" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#1e3d34]">
              Explore Dr. Shikha&apos;s Approach <ArrowRight size={12} className="-rotate-45" />
            </Link>
          </div>
        </div>
      </Stack>

      {/* 2 · WHO IS */}
      <Stack z={2} className="-mt-14 rounded-t-[56px] bg-[#e6e6e4] pb-24 pt-16 lg:pt-24">
        <div className={WRAP}>
          <h2 className={`text-3xl leading-tight lg:text-5xl ${H}`}>Who Is Dr. Shikha Sharma?</h2>
          <div className="mt-8 max-w-5xl space-y-5 text-sm leading-relaxed md:text-base">
            <p>Dr. Shikha Sharma is a medical doctor, nutrition expert, wellness entrepreneur and the founder of the Vedique Diet Protocol.</p>
            <p>With over 27 years of experience, she has helped shape one of India&apos;s most trusted doctor-led nutrition programmes by combining a modern nutrition approach with the healing wisdom of Ayurveda and the philosophy of Food as Medicine.</p>
            <p>Today, thousands of people consult Dr. Shikha Sharma and her team when looking for a trusted nutritionist for weight loss. Her decades of work, clinical expertise and commitment to personalised nutrition have earned her recognition as one of the best dieticians in Delhi for preventive healthcare and sustainable weight management.</p>
          </div>
        </div>
      </Stack>

      {/* 3 · JOURNEY */}
      <Stack id="journey" z={3} className="-mt-14 rounded-t-[56px] bg-[#1e3d34] pb-28 pt-16 text-white lg:pt-24">
        <div className={WRAP}>
          <h2 className={`max-w-4xl text-3xl leading-tight lg:text-5xl ${H}`}>
            From OPDs to Nutrition: Dr. Shikha Sharma&apos;s Journey
          </h2>
          <div className="mt-8 max-w-5xl space-y-5 text-sm leading-relaxed text-white/85 md:text-base">
            <p>Dr. Shikha Sharma&apos;s journey from hospital OPDs to becoming the best doctor for weight loss began during her residency in the Department of Cardiology. While treating patients with heart disease, she realised that many of these conditions were linked to poor nutrition and unhealthy lifestyles and could often be prevented with the right food and lifestyle changes.</p>
            <p>This experience inspired her to shift her focus from treating disease to preventing it. She believed that nutrition could do much more than support health — it could help the body heal when used in the right way.</p>
            <p>Driven by this vision, she founded a wellness company and developed the Vedique Diet Protocol. Her approach combines modern nutritional science with Food as Medicine and Ayurvedic analysis of an individual&apos;s body type (Prakriti) to create personalised nutrition plans that support long-term healing and wellness.</p>
          </div>
        </div>
      </Stack>

      {/* 4 · EXPERTS (last section: not sticky, it just covers the one above) */}
      <section className="relative -mt-14 min-h-[100svh] rounded-t-[56px] bg-white pb-24 pt-16 lg:pt-24" style={{ zIndex: 4 }}>
        <div className={WRAP}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest">Expert-guided wellness</p>
              <h2 className={`mt-4 max-w-sm text-3xl leading-tight lg:text-5xl ${H}`}>Experts Behind Your Plans</h2>
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
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full border border-[#1e3d34]/50 px-3 py-2 text-xs transition ${c === cat ? "bg-[#1e3d34] text-white" : "hover:bg-[#1e3d34]/10"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div ref={scroller} onScroll={onScroll} className="mt-8 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {EXPERTS[cat].map((e, i) => (
              <article key={e.title} className="w-[280px] shrink-0 overflow-hidden rounded-3xl bg-[#f7f7f5] md:w-[calc((100%-2.5rem)/3)]">
                <div className="relative aspect-[4/3]">
                  <Slot src={EXPERT_IMGS[i]} alt={e.title} />
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
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll left" className={arrowBtn}><ArrowLeft size={12} /></button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll right" className={arrowBtn}><ArrowRight size={12} /></button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

