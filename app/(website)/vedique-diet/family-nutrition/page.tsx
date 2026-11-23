"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarCheck, Fingerprint, HeartPulse, Hourglass, Leaf, Star } from "lucide-react";

/* ───────── IMAGE SLOTS: paste your Shopify CDN links between the quotes ───────── */
const HERO_IMG = "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Family-nutrition.webp?v=1794820023"; // family at the table, subject on the RIGHT, green area on the left
const TESTIMONIAL_IMGS = [
  "/images/vedique-diet/t1.jpg",
  "/images/vedique-diet/t2.jpg",
  "/images/vedique-diet/t3.jpg",
  "/images/vedique-diet/t4.jpg",
];
/* Optional: line-art icons for the five factors (white, transparent PNG/SVG).
   Leave empty to use the fallback icons. */
const FACTOR_ICONS = ["", "", "", "", ""];

const FACTORS = [
  { label: ["Prakriti and", "Individual", "Body Constitution"], Fallback: HeartPulse },
  { label: ["Age and", "Nutritional", "Needs"], Fallback: Hourglass },
  { label: ["Existing", "Health", "Concerns"], Fallback: Fingerprint },
  { label: ["Lifestyle and", "Daily", "Routine"], Fallback: CalendarCheck },
  { label: ["Food Preferences", "and Eating", "Habits"], Fallback: Leaf },
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
function Slot({ src, alt, dark = false }: { src: string; alt: string; dark?: boolean }) {
  return src ? (
    <Image src={src} alt={alt} fill className="object-cover object-right" />
  ) : (
    <div className={`absolute inset-0 grid place-items-center text-[10px] uppercase tracking-widest ${dark ? "bg-white/10 text-white/40" : "bg-[#1e3d34]/10 text-[#1e3d34]/40"}`}>
      Image
    </div>
  );
}

export default function VediqueFamilyNutritionPage() {
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
      {/* HERO (header + announcement bar come from your site layout) */}
      <section className="relative overflow-hidden bg-[#1e3d34] text-white">
        <Slot src={HERO_IMG} alt="Family sharing a meal" dark />
        {/* Mobile only: darken so text stays readable when the green area is cropped */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3d34]/90 via-[#1e3d34]/50 to-transparent md:hidden" />
        <div className={`${WRAP} relative pb-56 pt-24 md:pb-64 md:pt-32`}>
          <h1 className={`max-w-[360px] text-4xl leading-[1.1] md:text-5xl lg:text-[56px] ${H}`}>
            Family Nutrition
          </h1>
          <p className={`mt-8 max-w-[260px] text-2xl leading-snug lg:text-[30px] ${H}`}>
            How Alka&apos;s Approach to Nutrition Changed
          </p>
          <Link href="#" className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#1e3d34]">
            View case study <ArrowRight size={12} className="-rotate-45" />
          </Link>
        </div>
      </section>

      {/* EVERY FAMILY MEMBER */}
      <section className="relative -mt-28 rounded-t-[56px] bg-[#e6e6e4] pb-24 pt-16 lg:pb-28 lg:pt-24">
        <div className={`${WRAP} grid gap-8 md:grid-cols-2 md:gap-16`}>
          <h2 className={`max-w-sm text-3xl leading-tight lg:text-5xl ${H}`}>
            Every Family Member Is Different
          </h2>
          <div className="space-y-5 text-sm leading-relaxed md:text-base">
            <p>A son, a father and a grandmother all have different nutritional needs. So, one common meal plan rarely works for everyone.</p>
            <p>At Vedique, our Family Nutrition Plan considers each member&apos;s body constitution, health needs and daily routine. It brings individual nutritional guidance together in a practical plan your whole family can follow at home.</p>
          </div>
        </div>
      </section>

      {/* NUTRITIONIST THAT UNDERSTANDS YOUR FAMILY */}
      <section className="bg-[#1e3d34] py-20 text-white lg:py-28">
        <div className={`${WRAP} grid items-start gap-12 lg:grid-cols-[30%_1fr] lg:gap-10`}>
          <div>
            <h2 className={`max-w-xs text-3xl leading-tight lg:text-[40px] ${H}`}>
              Nutritionist That Understands Your Family
            </h2>
            <p className="mt-5 max-w-[16rem] text-sm leading-snug text-white/85">
              Our approach looks at each individual, not just the family as a whole.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {FACTORS.map(({ label, Fallback }, i) => (
              <div key={label.join(" ")} className="flex flex-col items-center text-center">
                <div className="grid h-20 w-20 place-items-center lg:h-24 lg:w-24">
                  {FACTOR_ICONS[i] ? (
                    <Image src={FACTOR_ICONS[i]} alt="" width={96} height={96} className="h-full w-full object-contain" />
                  ) : (
                    <Fallback strokeWidth={1} className="h-16 w-16 lg:h-20 lg:w-20" />
                  )}
                </div>
                <p className="mt-4 text-[11px] leading-snug text-white/90 lg:text-xs">
                  {label.map((line, n) => (
                    <span key={n} className="block">{line}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#e6e6e4] py-20 lg:py-28">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <article key={t.name} className="w-[280px] shrink-0 overflow-hidden rounded-3xl bg-white md:w-[calc(25%-1.1rem)]">
              <div className="relative aspect-[6/5]">
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
          <Link href="/testimonials" className={PILL}>View All</Link>
          <div className="ml-auto flex w-full max-w-lg items-center gap-3">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll left"><ArrowLeft size={12} /></button>
            <div className="relative h-px flex-1 bg-[#1e3d34]/30">
              <div className="absolute -top-px h-[3px] w-1/3 rounded bg-[#1e3d34]" style={{ left: `${progress * 66.6}%` }} />
            </div>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll right"><ArrowRight size={12} /></button>
          </div>
        </div>
      </section>
    </main>
  );
}

