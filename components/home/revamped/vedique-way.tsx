"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/container";

// Empty (transparent) space at the bottom of about1.png, in SVG units (viewBox is 1000x360).
// Increase it if the figure still floats above the line, decrease it if it sinks below.
const FIG_SHIFT = 42;

export default function RevampedVediqueWay() {
  return (
    <section className="relative z-20 w-full bg-[#1e3d34] text-white -mt-12 lg:-mt-16 rounded-t-[24px] sm:rounded-t-[36px] lg:rounded-t-[56px] shadow-[0_-16px_40px_rgba(0,0,0,0.12)] pt-12 sm:pt-16 lg:pt-20 pb-14 sm:pb-20 lg:pb-28 overflow-hidden">
      {/* Arrow + dot animations */}
      <style>{`
        .vw-line { stroke-dasharray: 1 1; stroke-dashoffset: 1; animation: vw-draw 3.4s ease-in-out infinite; }
        .vw-head { opacity: 0; animation: vw-head 3.4s ease-in-out infinite; }
        .vw-ring { transform-box: fill-box; transform-origin: center; animation: vw-pulse 2s ease-out infinite; }
        @keyframes vw-draw {
          0%   { stroke-dashoffset: 1; }
          40%  { stroke-dashoffset: 0; }
          70%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1; }
        }
        @keyframes vw-head {
          0%, 36% { opacity: 0; }
          42%, 68% { opacity: 1; }
          76%, 100% { opacity: 0; }
        }
        @keyframes vw-pulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vw-line { animation: none; stroke-dashoffset: 0; }
          .vw-head { animation: none; opacity: 1; }
          .vw-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <Container>
        {/* ================= DESKTOP: EXACT LAYOUT ================= */}
        <div
          className="hidden lg:block relative w-full max-w-[1100px] mx-auto aspect-[1000/360] [container-type:inline-size]"
        >
          {/* Eyebrow */}
          <span
            className="absolute left-0 uppercase tracking-[0.12em] font-medium text-white"
            style={{ top: "6.5%", fontSize: "0.85cqw" }}
          >
            The Vedique Way
          </span>

          {/* LEFT: headings */}
          <div className="absolute left-0" style={{ top: "18%", width: "34%" }}>
            <h2
              className="font-medium tracking-tight text-white"
              style={{ fontSize: "4cqw", lineHeight: 1.1 }}
            >
              Understand First.
              <br />
              Personalise Next.
            </h2>
          </div>

          <div className="absolute left-0" style={{ top: "49%", width: "21%" }}>
            <p
              className="font-light text-white"
              style={{ fontSize: "2.8cqw", lineHeight: 1.07 }}
            >
              Support with Science.
            </p>
            <p
              className="font-light text-white"
              style={{ fontSize: "2.8cqw", lineHeight: 1.07, marginTop: "1.2cqw" }}
            >
              Build for Life.
            </p>
          </div>

          {/* CENTER: figure — pushed down by FIG_SHIFT so the transparent padding at
              the bottom of the PNG falls below the line and the figure itself
              sits on the base line (y=348). */}
          <div
            className="absolute"
            style={{
              left: "34.5%",
              width: "32.5%",
              top: `${0.7 + (FIG_SHIFT / 360) * 100}%`,
              height: "96%",
            }}
          >
            <Image
              src="/assets/revamp/about1.png"
              alt="Ayurvedic energy balance and Prakriti"
              fill
              sizes="33vw"
              className="object-contain object-bottom"
            />
          </div>

          {/* RIGHT: copy */}
          <div
            className="absolute right-0 text-right"
            style={{ top: "20.5%", width: "33%", fontSize: "1.4cqw", lineHeight: 1.3 }}
          >
            <p className="font-light text-white/90">
              A <strong className="font-semibold text-white">doctor-led, personalised approach to health and wellness,</strong>{" "}
              created by <strong className="font-semibold text-white">Dr Shikha Sharma®</strong>, bringing together the best
              practices of <strong className="font-semibold text-white">Ayurvedic wisdom, modern medicine, scientific evidence,
                nutrition and lifestyle science.</strong>
            </p>
          </div>

          <div
            className="absolute right-0 text-right"
            style={{ top: "49%", width: "33%", fontSize: "1.7cqw", lineHeight: 1.3 }}
          >
            <p className="font-medium text-white">
              Not just treating the problem,
              <br />
              Understanding the person
            </p>
          </div>

          <Link
            href="/how-vedique-diet-works"
            className="absolute right-0 inline-flex items-center justify-center gap-[1.2cqw] rounded-full border border-white/70 text-white hover:bg-white hover:text-[#1e3d34] transition-colors duration-200"
            style={{ top: "68.5%", fontSize: "1.1cqw", padding: "0.9cqw 1.7cqw" }}
          >
            <span>Learn More about Vedique</span>
            <ArrowUpRight style={{ width: "1.3cqw", height: "1.3cqw" }} />
          </Link>

          {/* ARROWS + DOTS + BASE LINE (one SVG, same coordinate space as the stage) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 360"
            fill="none"
            aria-hidden="true"
          >
            {/* base line (the figure sits on this) */}
            <line x1="0" y1="348" x2="1000" y2="348" stroke="white" strokeOpacity="0.85" strokeWidth="1" />

            {/* LEFT ARROW: figure → "Understand First." */}
            <path
              className="vw-line"
              pathLength={1}
              d={`M505 ${227 + FIG_SHIFT} H440 C405 ${227 + FIG_SHIFT} 397 ${215 + FIG_SHIFT} 397 ${185 + FIG_SHIFT} V130 C397 100 380 88 350 88 L345 88`}
              stroke="white"
              strokeWidth="1.2"
            />
            <path
              className="vw-head"
              d="M352 82 L345 88 L352 94"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* RIGHT ARROW: figure → copy */}
            <path
              className="vw-line"
              pathLength={1}
              style={{ animationDelay: "0.4s" }}
              d={`M528 ${172 + FIG_SHIFT} H580 C610 ${172 + FIG_SHIFT} 622 ${160 + FIG_SHIFT} 622 ${135 + FIG_SHIFT} V115 C622 95 635 84 645 84 L650 84`}
              stroke="white"
              strokeWidth="1.2"
            />
            <path
              className="vw-head"
              style={{ animationDelay: "0.4s" }}
              d="M643 78 L650 84 L643 90"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* DOTS on the figure */}
            <circle className="vw-ring" cx="505" cy={227 + FIG_SHIFT} r="7" stroke="white" strokeWidth="1" />
            <circle cx="505" cy={227 + FIG_SHIFT} r="7" fill="white" />
            <circle className="vw-ring" style={{ animationDelay: "0.4s" }} cx="528" cy={172 + FIG_SHIFT} r="6" stroke="white" strokeWidth="1" />
            <circle cx="528" cy={172 + FIG_SHIFT} r="6" fill="white" />
          </svg>
        </div>

        {/* ================= MOBILE / TABLET: STACKED ================= */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium mb-4">
            The Vedique Way
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5">
            Understand First.
            <br />
            Personalise Next.
          </h2>

          <div className="mb-6">
            <p className="text-2xl sm:text-3xl font-light leading-tight">Support with Science.</p>
            <p className="text-2xl sm:text-3xl font-light leading-tight mt-2">Build for Life.</p>
          </div>

          {/* Same box shape as the desktop figure (325:346), so the dots land on the
              same spots of the body and the arrows can be drawn over it */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[325/346] mx-auto mt-4">
            <Image
              src="/assets/revamp/about1.png"
              alt="Ayurvedic energy balance and Prakriti"
              fill
              sizes="(max-width: 640px) 340px, 400px"
              className="object-contain object-bottom"
            />

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 325 346"
              fill="none"
              aria-hidden="true"
            >
              {/* LEFT ARROW: stomach dot -> up towards the headings */}
              <path
                className="vw-line"
                pathLength={1}
                d="M160 225 H60 C40 225 32 215 32 195 V110"
                stroke="white"
                strokeWidth="1.4"
              />
              <path
                className="vw-head"
                d="M25 118 L32 110 L39 118"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* RIGHT ARROW: chest dot -> down towards the copy */}
              <path
                className="vw-line"
                pathLength={1}
                style={{ animationDelay: "0.4s" }}
                d="M183 170 H265 C285 170 293 180 293 200 V285"
                stroke="white"
                strokeWidth="1.4"
              />
              <path
                className="vw-head"
                style={{ animationDelay: "0.4s" }}
                d="M286 277 L293 285 L300 277"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* DOTS on the figure */}
              <circle className="vw-ring" cx="160" cy="225" r="7" stroke="white" strokeWidth="1" />
              <circle cx="160" cy="225" r="7" fill="white" />
              <circle className="vw-ring" style={{ animationDelay: "0.4s" }} cx="183" cy="170" r="6" stroke="white" strokeWidth="1" />
              <circle cx="183" cy="170" r="6" fill="white" />
            </svg>
          </div>

          <p className="text-sm font-light text-white/90 leading-relaxed mt-6 mb-5">
            A <strong className="font-semibold text-white">doctor-led, personalised approach to health and wellness,</strong>{" "}
            created by <strong className="font-semibold text-white">Dr Shikha Sharma®</strong>, bringing together the best
            practices of <strong className="font-semibold text-white">Ayurvedic wisdom, modern medicine, scientific evidence,
              nutrition and lifestyle science.</strong>
          </p>

          <p className="text-base font-medium mb-6">
            Not just treating the problem,
            <br />
            Understanding the person
          </p>

          <Link
            href="/how-vedique-diet-works"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/70 text-sm font-medium text-white hover:bg-white hover:text-[#1e3d34] transition-colors duration-200"
          >
            <span>Learn More about Vedique</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="w-full h-px bg-white/80 mt-12" />
        </div>

        {/* ================= DR. SHIKHA SHARMA SPOTLIGHT ================= */}
        <div className="pt-12 lg:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT: PHOTO — takes the majority of the row (8 of 12 columns) */}
            <div className="lg:col-span-8">
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-700/40 shadow-2xl bg-emerald-900/30">
                <Image
                  src="/assets/revamp/dr.jpg.webp"
                  alt="Dr. Shikha Sharma"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* RIGHT: DETAILS (4 of 12 columns) */}
            <div className="lg:col-span-4 space-y-5 text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold block">
                DR. SHIKHA SHARMA
              </span>

              <h2 className="text-2xl sm:text-3xl font-normal leading-snug">
                Understanding the Person <br />
                <span className="font-semibold text-white">Behind Every Vedique Plan</span>
              </h2>

              <p className="text-base text-emerald-100 font-light leading-relaxed">
                Over 27 years dedicated to bringing nutrition and preventive health into focus.
              </p>

              <p className="text-sm text-white/75 leading-relaxed">
                Dr Shikha Sharma combines her medical background, nutritional expertise and understanding of Ayurveda to guide personalised nutrition and preventive wellness, with an emphasis on individual needs and sustainable habits.
              </p>

              <div className="pt-2">
                <Link
                  href="/vedique-diet"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white text-xs sm:text-sm font-medium text-white hover:bg-white hover:text-[#1e3d34] transition-all duration-200"
                >
                  <span>Explore Dr. Shikha&apos;s Approach</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
