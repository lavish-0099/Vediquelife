"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Brain, Home, Leaf, MessageCircle, Smartphone,
  Star, UserRound, UtensilsCrossed, HeartHandshake, PersonStanding,
} from "lucide-react";

/* Put the design's real photos in /public and update these paths */
const HERO_IMG = "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/wellness-diet-banner.webp?v=1794817941"; // the woman holding the bowl, subject on the RIGHT

const CASES = [
  { tab: "Weight Management", title: "Weight Management", sub: "17kg Down, A Journey Built on Consistency", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Weight-managment.webp?v=1794819955", heading: "Your Journey Towards a Healthier Weight Starts Here", body: "At Vedique, we offer personalised nutrition guidance based on your Prakriti, dietary needs and lifestyle, helping you build balanced eating habits without extreme diets or quick-fix solutions. The focus is on practical nutrition guidance and sustainable lifestyle changes that fit into your everyday life.", href: "/vedique-diet/weight-management" },
  { tab: "Lifestyle Disease Management", title: "Lifestyle Disease Management", sub: "Food-first care for everyday health conditions", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/lifestyle-disease-management.webp?v=1794818271", heading: "Manage Lifestyle Conditions Through Food and Routine", body: "Our doctors and nutritionists build meal plans around your condition, your Prakriti and your routine, so you can support long-term health without giving up the food you enjoy.", href: "/vedique-diet/lifestyle-disease-management" },
  { tab: "Family Nutrition", title: "Family Nutrition", sub: "One kitchen, healthier meals for everyone", img: "https://cdn.shopify.com/s/files/1/1010/8731/4292/files/Family-nutrition.webp?v=1794820023", heading: "Healthy Eating That Works for the Whole Family", body: "Simple, home-style meal plans that suit different ages and needs at the same table, guided by experienced Vedique Doctors and Nutritionists.", href: "/vedique-diet/family-nutrition" },
];

const TESTIMONIALS = [
  { img: "/images/vedique-diet/t1.jpg", quote: "I finally understood what my body needed instead of following another generic diet.", name: "Anitta K." },
  { img: "/images/vedique-diet/t2.jpg", quote: "The plan was realistic, personal and easy to follow around my work schedule.", name: "Rhea M." },
  { img: "/images/vedique-diet/t3.jpg", quote: "The Vedique team supported me throughout—not only when I was doing well.", name: "Priya S." },
  { img: "/images/vedique-diet/t4.jpg", quote: "My Prakriti analysis explained patterns I had struggled to understand for years.", name: "Neha R." },
  { img: "/images/vedique-diet/t1.jpg", quote: "Meals fit my family's routine, and I never felt like I was on a diet.", name: "Sunita P." },
];

const FEATURES = [
  { icon: UserRound, title: "1:1 Coaching", desc: "Personalized guidance from experienced Vedique Doctors & Nutritionists." },
  { icon: Smartphone, title: "Daily Updated Diets", desc: "Customized meal plans updated daily on the Vedique App." },
  { icon: Home, title: "Home-Style Nutrition", desc: "Follow meal plans built around familiar ingredients and meals that fit your routine." },
  { icon: MessageCircle, title: "On-Demand Support", desc: "Chat or call your doctors & nutritionists via the Vedique App." },
  { icon: Leaf, title: "Prakriti-Based Personalisation", desc: "Get a plan that considers your unique Prakriti and individual health needs." },
  { icon: UtensilsCrossed, title: "No Fasting or Restrictions", desc: "No need for extreme fasting or food abstinence." },
  { icon: HeartHandshake, title: "Holistic Approach", desc: "We address body and mind to ensure long-term sustainable wellness." },
  { icon: PersonStanding, title: "Yoga Sessions", desc: "Integrated yoga practices aligned with your diet plan." },
  { icon: Brain, title: "Stress Management", desc: "Techniques to reduce stress and anxiety naturally." },
];

const WHO = [
  { title: "Lose weight safely", desc: "Sustainable plans without crash diets." },
  { title: "Digestive health", desc: "Heal digestive issues, acidity, or bloating." },
  { title: "Hormonal balance", desc: "Support for PCOS, thyroid & metabolic health." },
  { title: "Boost immunity", desc: "Food-first approach for steady energy & resilience." },
  { title: "Feel like yourself", desc: "No extreme interventions — long-term balance." },
];

const WRAP = "mx-auto w-[88%] max-w-[1240px] lg:w-[84%]";
const PILL =
  "inline-flex items-center rounded-full border border-[#1e3d34]/50 px-5 py-2 text-sm text-[#1e3d34] transition hover:bg-[#1e3d34] hover:text-white";
const H = "!font-medium !tracking-normal";

export default function VediqueDietPage() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const c = CASES[active];

  const go = (d: 1 | -1) => setActive((i) => (i + d + CASES.length) % CASES.length);
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  const scrollBy = (d: 1 | -1) => scroller.current?.scrollBy({ left: d * 380, behavior: "smooth" });

  return (
    <main className="bg-[#f7f7f5] text-[#1e3d34]">
      {/* HERO (header + announcement bar come from your site layout) */}
      <section className="relative overflow-hidden bg-[#1e3d34] text-white">
        <Image src={HERO_IMG} alt="" fill priority className="object-cover object-right" />
        <div className="absolute inset-0 bg-[#1e3d34]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3d34] via-[#1e3d34]/60 to-transparent" />
        <div className={`${WRAP} relative pb-56 pt-24 md:pb-64 md:pt-32`}>
          <h1 className={`max-w-[560px] text-4xl leading-[1.12] md:text-5xl lg:text-[56px] ${H}`}>
            Better Health Begins With a Plan That Sees You
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
            Doctor-led nutrition rooted in Ayurvedic wisdom, personalised to your body,
            routine and health goals. Simple meals, expert guidance and habits you can sustain.
          </p>
          <Link href="#consult" className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#1e3d34]">
            Start Your Journey <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* CASE STUDIES + TESTIMONIALS */}
      <section className="relative z-10 -mt-28 rounded-[56px] bg-[#f7f7f5] pb-20 pt-12">
        <div className={WRAP}>
          <div className="relative text-base md:text-lg">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#1e3d34]/50 bg-[#f7f7f5]"
            >
              <ArrowLeft size={16} />
            </button>

            {/* px-14 keeps the tabs clear of the arrows; w-max + mx-auto centers them */}
            <div className="overflow-x-auto px-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mx-auto flex w-max items-center gap-4">
                {CASES.map((x, i) => (
                  <div key={x.tab} className="flex shrink-0 items-center gap-4">
                    <button onClick={() => setActive(i)} className={i === active ? "font-semibold" : "font-normal"}>
                      <span className="mr-2 text-sm">0{i + 1}</span>{x.tab}
                    </button>
                    {i < CASES.length - 1 && <span className="px-3 opacity-60">|</span>}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#1e3d34]/50 bg-[#f7f7f5]"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative mt-8 flex min-h-[380px] items-center overflow-hidden rounded-[28px] bg-[#1e3d34] text-white md:min-h-[420px]">
            {/* Full-width image (green area is part of the image itself) */}
            <Image src={c.img} alt="" fill className="object-cover object-right" />
            {/* Mobile only: darken so text stays readable when the green area is cropped */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3d34]/90 via-[#1e3d34]/50 to-transparent md:hidden" />
            <div className="relative z-10 w-full p-8 md:w-[40%] md:p-14">
              <h2 className={`text-4xl leading-tight lg:text-5xl ${H}`}>{c.title}</h2>
              <p className="mt-8 max-w-[18rem] text-lg leading-snug">{c.sub}</p>
              <Link href={c.href} className="mt-8 inline-block text-xs">View case study ↗</Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h3 className="text-xl font-semibold">{c.heading}</h3>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed md:text-base">{c.body}</p>
            </div>
            <Link href={c.href} className={PILL}>Read More</Link>
          </div>
          <hr className="mt-14 border-[#1e3d34]" />

          <div className="mt-14 grid gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest">Vedique Diet</p>
              <h2 className={`mt-4 max-w-md text-4xl leading-tight lg:text-5xl ${H}`}>
                Every journey has its own milestone.
              </h2>
            </div>
            <p className="max-w-[18rem] text-sm leading-relaxed">
              Hear from the people who have taken meaningful steps toward better health with Vedique&apos;s nutrition experts.
            </p>
          </div>
        </div>

        <div
          ref={scroller}
          onScroll={onScroll}
          className="mt-10 flex snap-x gap-5 overflow-x-auto pb-2 pl-[8%] pr-[8%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl bg-white md:w-[360px]">
              <div className="relative aspect-[6/5]">
                <Image src={t.img} alt={t.name} fill className="object-cover" />
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
          <div className="flex gap-2">
            <span className={PILL}>New arrivals</span>
            <Link href="/shop" className="inline-flex items-center rounded-full bg-[#1e3d34] px-5 py-2 text-sm text-white">Explore Vedique Diet</Link>
          </div>
          <div className="ml-auto flex w-full max-w-md items-center gap-3">
            <button onClick={() => scrollBy(-1)} aria-label="Scroll left"><ArrowLeft size={12} /></button>
            <div className="relative h-px flex-1 bg-[#1e3d34]/30">
              <div className="absolute -top-px h-[3px] w-1/3 rounded bg-[#1e3d34]" style={{ left: `${progress * 66.6}%` }} />
            </div>
            <button onClick={() => scrollBy(1)} aria-label="Scroll right"><ArrowRight size={12} /></button>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-24">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className={`text-3xl lg:text-4xl ${H}`}>What you&apos;ll get with the Vedique Diet?</h2>
            <Link href="#how-it-works" className={PILL}>How Vedique Diet Works</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border-[1.5px] border-[#1e3d34]/70 bg-white px-5 py-7">
                <Icon size={48} strokeWidth={1} className="shrink-0" />
                <div>
                  <h3 className="text-base font-semibold leading-tight">{title}</h3>
                  <p className="mt-1 text-xs leading-snug opacity-70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="rounded-t-[56px] bg-[#1e3d34] pb-36 pt-20 text-white">
        <div className={WRAP}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className={`text-3xl lg:text-4xl ${H}`}>Who Is It For?</h2>
            <p className="text-xs">The Vedique Diet® is ideal for people who want to</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-6">
            {WHO.map((w, i) => (
              <div
                key={w.title}
                className={`rounded-2xl bg-white px-6 py-7 text-[#1e3d34] md:col-span-2 ${i === 3 ? "md:col-start-2" : ""} ${i === 4 ? "md:col-start-4" : ""}`}
              >
                <h3 className="text-base font-semibold">{w.title}</h3>
                <p className="mt-2 text-xs opacity-70">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="consult" className="relative -mt-16 rounded-t-[56px] bg-[#f7f7f5] py-28">
        <div className={`${WRAP} grid gap-10 md:grid-cols-2 md:items-center`}>
          <h2 className={`text-4xl leading-tight lg:text-5xl ${H}`}>
            Your Body.<br />Your Wellness.<br />Your Way.
          </h2>
          <div className="md:justify-self-end">
            <p className="max-w-xs text-sm">Share your goals with our experts and get a clear Vedique roadmap.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/book-consultation" className={PILL}>Book Your Consultation</Link>
              <Link href="/talk-to-expert" className="inline-flex items-center rounded-full bg-[#1e3d34] px-5 py-2 text-sm text-white">Talk to an Expert Now</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
