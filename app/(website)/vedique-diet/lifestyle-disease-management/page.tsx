"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Baby, Droplet, Flower2, Star, Venus, Waves } from "lucide-react";

/* ───────── IMAGE SLOTS: paste your Shopify CDN links between the quotes ───────── */
const HERO_IMG = "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/lifestyle-disease-management.webp?v=1794818271"; // woman in kitchen, subject on the RIGHT, green area on the left
const OUTCOME_IMGS = [
  "/images/vedique-diet/case-lifestyle.jpg",
  "/images/vedique-wellness/intro.jpg",
  "/images/vedique-diet/case-weight.jpg",
  "/images/vedique-wellness/team-coach.jpg",
  "/images/vedique-wellness/team-doctor.jpg",
]; // one per outcome slide
const TESTIMONIAL_IMGS = [
  "/images/vedique-diet/t1.jpg",
  "/images/vedique-diet/t2.jpg",
  "/images/vedique-diet/t3.jpg",
  "/images/vedique-diet/t4.jpg",
];
/* Optional: line-art icons for the condition boxes (PCOS, Diabetes, Thyroid, Menopause, Postpartum).
   Leave empty to use the fallback icons. */
const CONDITION_ICONS = ["", "", "", "", ""];

const CONDITIONS = [
  { title: "PCOS", desc: "Nutrition and lifestyle guidance to support women's health and overall wellbeing.", href: "/lifestyle-disease-management/pcos", Fallback: Droplet },
  { title: "Diabetes", desc: "Personalised nutrition and lifestyle support to help you manage your health alongside your medical care.", href: "/lifestyle-disease-management/diabetes", Fallback: Venus },
  { title: "Thyroid", desc: "Individualised nutrition and lifestyle guidance based on your health needs.", href: "/lifestyle-disease-management/thyroid", Fallback: Waves },
  { title: "Menopause", desc: "Nutrition and lifestyle guidance to support your changing needs through midlife and menopause.", href: "/lifestyle-disease-management/menopause", Fallback: Flower2 },
  { title: "Postpartum", desc: "Personalised nutrition and lifestyle support to help you care for yourself during the postpartum phase.", href: "/lifestyle-disease-management/postpartum", Fallback: Baby },
];

const OUTCOMES = [
  { label: "Improved", title: "HbA1c Levels", body: "Personalised nutrition and lifestyle support for people managing diabetes.", href: "#" },
  { label: "Better", title: "Hormonal Balance", body: "Nutrition and lifestyle support for people managing PCOS.", href: "#" },
  { label: "Healthier", title: "Thyroid Markers", body: "Individualised guidance alongside ongoing medical care.", href: "#" },
  { label: "Easier", title: "Menopause Transition", body: "Support for changing needs through midlife and menopause.", href: "#" },
  { label: "Stronger", title: "Postpartum Recovery", body: "Care for yourself through the postpartum phase.", href: "#" },
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

export default function VediqueLifestyleDiseasePage() {
  const [slide, setSlide] = useState(0);
  const o = OUTCOMES[slide];
  const goSlide = (d: 1 | -1) => setSlide((i) => (i + d + OUTCOMES.length) % OUTCOMES.length);

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
        <Slot src={HERO_IMG} alt="Lifestyle disease management" dark />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3d34]/90 via-[#1e3d34]/50 to-transparent md:hidden" />
        <div className={`${WRAP} relative pb-56 pt-24 md:pb-64 md:pt-32`}>
          <h1 className={`max-w-[460px] text-4xl leading-[1.1] md:text-5xl lg:text-[56px] ${H}`}>
            Lifestyle Disease Management
          </h1>
          <p className={`mt-8 max-w-[300px] text-xl leading-snug lg:text-[26px] ${H}`}>
            Changes That Shaped Sanjana&apos;s Health Journey
          </p>
          <Link href="#" className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-[#1e3d34]">
            View case study <ArrowRight size={12} className="-rotate-45" />
          </Link>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="relative -mt-28 rounded-t-[56px] bg-[#e6e6e4] pb-28 pt-16 lg:pt-24">
        <div className={WRAP}>
          <h2 className={`text-3xl leading-tight lg:text-[44px] ${H}`}>
            Personalised Support for Lifestyle &amp; Health Conditions
          </h2>
          <p className="mt-5 max-w-5xl text-sm leading-relaxed md:text-base">
            Every person&apos;s health needs are different. At Vedique, we consider your Prakriti, lifestyle, nutrition
            and individual health needs to offer personalised guidance that fits into your daily life.
          </p>

          <div className="mt-12 flex items-center gap-5">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.25em]">Explore personalised support for</p>
            <hr className="flex-1 border-[#1e3d34]" />
          </div>

          <div className="mt-8 flex flex-col gap-4 lg:gap-5">
            {CONDITIONS.map(({ title, desc, href, Fallback }, i) => {
              const iconLeft = i % 2 === 1;
              const iconSrc = CONDITION_ICONS[i];
              const icon = (
                <div className="relative grid w-[72px] shrink-0 place-items-center rounded-xl border-[1.5px] border-[#1e3d34] sm:w-[110px] lg:w-[150px]">
                  {iconSrc ? (
                    <Image src={iconSrc} alt="" width={80} height={80} className="h-1/2 w-1/2 object-contain" />
                  ) : (
                    <Fallback strokeWidth={1} className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
                  )}
                </div>
              );
              return (
                <div key={title} className="flex items-stretch gap-4 lg:gap-5">
                  {iconLeft && icon}
                  <Link
                    href={href}
                    className="group flex min-h-[100px] flex-1 items-center justify-between gap-4 rounded-xl bg-[#1e3d34] px-5 py-4 text-white transition-colors hover:bg-[#25493f] sm:px-8 lg:min-h-[150px] lg:px-14"
                  >
                    <span className={`text-3xl leading-none lg:text-[52px] ${H}`}>{title}</span>
                    <span className="flex items-center gap-4 lg:gap-6">
                      <span className="hidden max-w-[230px] text-xs leading-snug text-white/85 sm:block">{desc}</span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/80">
                        <ArrowRight size={12} />
                      </span>
                    </span>
                  </Link>
                  {!iconLeft && icon}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="bg-[#1e3d34] py-20 text-white lg:py-28">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className={`max-w-sm text-3xl leading-tight lg:text-4xl ${H}`}>Health and Wellbeing Outcomes</h2>
            <div className="flex items-center gap-3">
              <Link href="#" className="inline-flex items-center rounded-full border border-white/70 px-5 py-2 text-sm transition hover:bg-white hover:text-[#1e3d34]">
                View All
              </Link>
              <button onClick={() => goSlide(-1)} aria-label="Previous" className="grid h-8 w-8 place-items-center rounded-full border border-white/70"><ArrowLeft size={14} /></button>
              <button onClick={() => goSlide(1)} aria-label="Next" className="grid h-8 w-8 place-items-center rounded-full border border-white/70"><ArrowRight size={14} /></button>
            </div>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-3xl bg-[#e6e6e4] text-[#1e3d34] md:grid-cols-[36%_1fr]">
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] lg:text-base">{o.label}</p>
              <h3 className={`mt-2 text-3xl leading-tight lg:text-[40px] ${H}`}>{o.title}</h3>
              <p className="mt-5 max-w-[16rem] text-sm leading-snug">{o.body}</p>
              <Link href={o.href} className="mt-10 inline-block text-[10px] font-semibold">View case study ↗</Link>
            </div>
            <div className="relative min-h-[280px] md:min-h-[420px]">
              <Slot src={OUTCOME_IMGS[slide]} alt={o.title} />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {OUTCOMES.map((x, i) => (
              <button
                key={x.title}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 w-2 rounded-full transition ${i === slide ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 lg:py-28">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <article key={t.name} className="w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl bg-white shadow-[0_0_0_1px_rgba(30,61,52,0.06)] md:w-[calc(25%-1.1rem)]">
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

