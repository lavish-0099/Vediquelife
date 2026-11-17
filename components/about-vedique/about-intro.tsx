import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/container";

// Where the figure sits vertically inside the desktop stage (% of stage height).
// The PNG has empty space at its bottom, so the box is pushed down until the figure
// stands on the line. Raise it if the figure floats above the line, lower it if it sinks.
const FIG_TOP = 10.6;

const PARAGRAPH = (
  <>
    A <strong className="font-semibold text-white">doctor-led, personalised approach to health and wellness,</strong>{" "}
    created by <strong className="font-semibold text-white">Dr Shikha Sharma®</strong>, bringing together the best
    practices of{" "}
    <strong className="font-semibold text-white">
      Ayurvedic wisdom, modern medicine, scientific evidence, nutrition and lifestyle science.
    </strong>
  </>
);

export default function AboutIntro() {
  return (
    <section className="relative w-full bg-[#1e3d34] text-white pt-16 lg:pt-14 pb-24 lg:pb-56 overflow-hidden">      <style>{`
        .vw-line { stroke-dasharray: 1 1; stroke-dashoffset: 1; animation: vw-draw 3.4s ease-in-out infinite; }
        .vw-head { opacity: 0; animation: vw-head 3.4s ease-in-out infinite; }
        .vw-ring { transform-box: fill-box; transform-origin: center; animation: vw-pulse 2s ease-out infinite; }
        @keyframes vw-draw { 0% { stroke-dashoffset: 1; } 40% { stroke-dashoffset: 0; } 70% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 1; } }
        @keyframes vw-head { 0%, 36% { opacity: 0; } 42%, 68% { opacity: 1; } 76%, 100% { opacity: 0; } }
        @keyframes vw-pulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.6); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .vw-line { animation: none; stroke-dashoffset: 0; }
          .vw-head { animation: none; opacity: 1; }
          .vw-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <Container>
        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:block relative w-full max-w-[1100px] mx-auto aspect-[1000/470] [container-type:inline-size]">
          <span
            className="absolute left-0 uppercase tracking-[0.12em] font-medium"
            style={{ top: "4.1%", fontSize: "0.85cqw" }}
          >
            The Vedique Way
          </span>

          <h2
            className="absolute left-0 font-medium tracking-tight"
            style={{ top: "14%", width: "40%", fontSize: "4cqw", lineHeight: 1.1 }}
          >
            Understand First.
            <br />
            Personalise Next.
          </h2>

          <div className="absolute left-0" style={{ top: "38%", width: "24%" }}>
            <p className="font-light" style={{ fontSize: "2.8cqw", lineHeight: 1.07 }}>
              Support with Science.
            </p>
            <p className="font-light" style={{ fontSize: "2.8cqw", lineHeight: 1.07, marginTop: "1.2cqw" }}>
              Build for Life.
            </p>
          </div>

          <p
            className="absolute left-0 font-light text-white/90 text-justify"
            style={{ top: "68%", width: "34%", fontSize: "1.4cqw", lineHeight: 1.35 }}
          >
            {PARAGRAPH}
          </p>

          {/* Figure */}
          <div
            className="absolute"
            style={{ left: "43.1%", width: "44.2%", top: `${FIG_TOP}%`, height: "100%" }}
          >
            <Image
              src="/assets/revamp/about1.png"
              alt="Ayurvedic energy balance and Prakriti"
              fill
              sizes="45vw"
              className="object-contain object-bottom"
            />
          </div>

          {/* Right copy + button */}
          <p
            className="absolute font-semibold"
            style={{ left: "84.5%", top: "11%", width: "15.5%", fontSize: "1.6cqw", lineHeight: 1.25 }}
          >
            Not just treating
            <br />
            the problem,
            <br />
            Understanding
            <br />
            the person
          </p>

          <Link
            href="/how-vedique-diet-works"
            className="absolute inline-flex items-center justify-center gap-[0.8cqw] rounded-full border border-white/80 hover:bg-white hover:text-[#1e3d34] transition-colors duration-200 text-left"
            style={{ left: "84.5%", top: "33.6%", fontSize: "1cqw", lineHeight: 1.2, padding: "0.7cqw 1.3cqw" }}
          >
            <span>
              Learn More
              <br />
              about Vedique
            </span>
            <ArrowUpRight style={{ width: "1.2cqw", height: "1.2cqw" }} />
          </Link>

          {/* Base line + arrows + dots */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 470"
            fill="none"
            aria-hidden="true"
          >
            <line x1="0" y1="463" x2="1000" y2="463" stroke="white" strokeOpacity="0.85" strokeWidth="1" />

            {/* LEFT: stomach dot -> "Understand First." */}
            <path className="vw-line" pathLength={1} d="M670 252 H496 V90 H383" stroke="white" strokeWidth="1.2" />
            <path className="vw-head" d="M391 84 L383 90 L391 96" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* RIGHT: belly dot -> button */}
            <path className="vw-line" pathLength={1} style={{ animationDelay: "0.4s" }} d="M638 377 V300 H888 V237" stroke="white" strokeWidth="1.2" />
            <path className="vw-head" style={{ animationDelay: "0.4s" }} d="M881 245 L888 237 L895 245" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            <circle className="vw-ring" cx="670" cy="252" r="7" stroke="white" strokeWidth="1" />
            <circle cx="670" cy="252" r="7" fill="white" />
            <circle className="vw-ring" style={{ animationDelay: "0.4s" }} cx="638" cy="377" r="7" stroke="white" strokeWidth="1" />
            <circle cx="638" cy="377" r="7" fill="white" />
          </svg>
        </div>

        {/* ================= MOBILE / TABLET ================= */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium mb-4">The Vedique Way</span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] mb-5">
            Understand First.
            <br />
            Personalise Next.
          </h2>

          <div className="mb-6">
            <p className="text-2xl sm:text-3xl font-light leading-tight">Support with Science.</p>
            <p className="text-2xl sm:text-3xl font-light leading-tight mt-2">Build for Life.</p>
          </div>

          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[325/346] mx-auto mt-4">
            <Image
              src="/assets/revamp/about1.png"
              alt="Ayurvedic energy balance and Prakriti"
              fill
              sizes="(max-width: 640px) 340px, 400px"
              className="object-contain object-bottom"
            />
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 325 346" fill="none" aria-hidden="true">
              <path className="vw-line" pathLength={1} d="M160 225 H60 C40 225 32 215 32 195 V110" stroke="white" strokeWidth="1.4" />
              <path className="vw-head" d="M25 118 L32 110 L39 118" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path className="vw-line" pathLength={1} style={{ animationDelay: "0.4s" }} d="M183 170 H265 C285 170 293 180 293 200 V285" stroke="white" strokeWidth="1.4" />
              <path className="vw-head" style={{ animationDelay: "0.4s" }} d="M286 277 L293 285 L300 277" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle className="vw-ring" cx="160" cy="225" r="7" stroke="white" strokeWidth="1" />
              <circle cx="160" cy="225" r="7" fill="white" />
              <circle className="vw-ring" style={{ animationDelay: "0.4s" }} cx="183" cy="170" r="6" stroke="white" strokeWidth="1" />
              <circle cx="183" cy="170" r="6" fill="white" />
            </svg>
          </div>

          <p className="text-sm font-light text-white/90 leading-relaxed mt-6 mb-5">{PARAGRAPH}</p>

          <p className="text-base font-semibold mb-6">
            Not just treating the problem,
            <br />
            Understanding the person
          </p>

          <Link
            href="/how-vedique-diet-works"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/70 text-sm font-medium hover:bg-white hover:text-[#1e3d34] transition-colors duration-200"
          >
            <span>Learn More about Vedique</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="w-full h-px bg-white/80 mt-12" />
        </div>

        {/* ================= DR. SHIKHA SHARMA ================= */}
        <div className="pt-12 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[17/16] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-emerald-900/30">
                <Image
                  src="/assets/revamp/dr.jpg.webp"
                  alt="Dr. Shikha Sharma"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 space-y-5 text-center lg:text-left">
              <span className="block text-[10px] uppercase tracking-[0.12em] font-medium">Dr. Shikha Sharma</span>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[1.1] tracking-tight">
                Understanding
                <br />
                the Person
                <br />
                Behind Every
                <br />
                Vedique Plan
              </h2>

              <p className="text-sm font-semibold leading-relaxed max-w-sm mx-auto lg:mx-0">
                Over 27 years dedicated to bringing nutrition and preventive health into focus.
              </p>

              <p className="text-sm text-white/75 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Dr. Shikha Sharma combines her medical background, nutritional expertise and understanding of Ayurveda
                to guide personalised nutrition and preventive wellness, with an emphasis on individual needs and
                sustainable habits.
              </p>

              <div className="pt-2">
                <Link
                  href="/vedique-diet"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#1e3d34] text-[11px] sm:text-xs font-medium hover:bg-[#f1f5ee] transition-colors duration-200"
                >
                  <span>Explore Dr. Shikha&apos;s Approach</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
