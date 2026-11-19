"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/container";

type Dosha = "Vata" | "Pitta" | "Kapha";

interface Question {
  id: string;
  question: string;
  // Order matters: [Vata, Pitta, Kapha]
  options: [string, string, string];
}

const DOSHAS: Dosha[] = ["Vata", "Pitta", "Kapha"];

const DOSHA_INFO: Record<Dosha, string> = {
  Vata: "Light, active energy with tendencies for fast bursts and creative flow.",
  Pitta: "Sharp, goal-driven metabolism with strong focus and digestive fire.",
  Kapha: "Grounded, consistent stamina with calm resilience and steady rhythm.",
};

const QUESTIONS: Question[] = [
  {
    id: "energy",
    question: "How would you describe your energy through the day?",
    options: ["Quick and changeable", "Focused and intense", "Steady and enduring"],
  },
  {
    id: "appetite",
    question: "How would you describe your appetite and digestion?",
    options: ["Variable and irregular", "Strong and punctual", "Slow and steady"],
  },
  {
    id: "sleep",
    question: "How do you usually sleep?",
    options: ["Light and easily disturbed", "Sound but fairly short", "Deep and long"],
  },
  {
    id: "stress",
    question: "How do you tend to respond to stress?",
    options: ["Anxious or overthinking", "Irritable or impatient", "Calm or withdrawn"],
  },
  {
    id: "body",
    question: "How would you describe your body and skin?",
    options: ["Light, lean and dry", "Warm, medium and sensitive", "Sturdy, soft and smooth"],
  },
];

const TOTAL = QUESTIONS.length;

export default function RevampedPrakritiAnalysis() {
  // step 0..TOTAL-1 = questions, step === TOTAL = result
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL).fill(null)
  );
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const isResult = step === TOTAL;

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL)), 250);
  };

  const handleBack = () => {
    if (timer.current) clearTimeout(timer.current);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleRetake = () => {
    if (timer.current) clearTimeout(timer.current);
    setAnswers(Array(TOTAL).fill(null));
    setStep(0);
  };

  /* Result */
  const scores = [0, 0, 0];
  answers.forEach((a) => {
    if (a !== null) scores[a] += 1;
  });
  const top = Math.max(...scores);
  const leading = DOSHAS.filter((_, i) => scores[i] === top);

  const progress = isResult ? 100 : ((step + 1) / TOTAL) * 100;
  const current = QUESTIONS[Math.min(step, TOTAL - 1)];

  return (
    <section id="prakriti" className="w-full bg-[#1e3d34] text-white py-12 sm:py-16 lg:py-28 overflow-hidden scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* ───────── LEFT: INFORMATION & CTA ───────── */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-white mb-6">
              Prakriti Analysis
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight leading-[1.15] mb-6 sm:mb-8">
              Every body has its <br />
              unique Prakriti.
            </h2>

            <p className="text-sm text-white/80 leading-relaxed max-w-[340px] mx-auto lg:mx-0 mb-10">
              Explore your Prakriti through simple questions covering digestion,
              appetite, sleep, and other personal characteristics to help you
              understand your natural constitution.
            </p>

            <Link
              href="/how-vedique-diet-works"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white text-white text-[11px] font-medium tracking-wide hover:bg-white hover:text-[#1e3d34] transition-colors duration-200"
            >
              Discover Your Prakriti
            </Link>
          </div>

          {/* ───────── RIGHT: MULTI-STEP QUIZ CARD ───────── */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[460px] bg-[#e4e4e1] rounded-[24px] sm:rounded-[36px] p-5 sm:p-8 text-[#1e3d34] text-center sm:text-left">
              {/* Meta header */}
              <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.1em] uppercase mb-3">
                <span>
                  {isResult
                    ? "Result"
                    : `${String(step + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`}
                </span>
                <span>Your natural rhythm</span>
              </div>

              {/* Progress bar */}
              <div
                className="h-1 w-full bg-[#1e3d34]/20 rounded-full overflow-hidden mb-6"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className="h-full bg-[#1e3d34] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {!isResult ? (
                <>
                  {/* Question */}
                  <h3 className="text-[26px] sm:text-[30px] font-semibold tracking-tight leading-[1.1] min-h-[7.2rem] sm:min-h-[6.2rem] mb-6">
                    {current.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2">
                    {current.options.map((label, i) => {
                      const active = answers[step] === i;
                      return (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={active}
                          onClick={() => handleSelect(i)}
                          className={`w-full text-center sm:text-left px-5 py-3.5 sm:py-3 rounded-full text-sm sm:text-[13px] font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3d34] ${active
                            ? "bg-[#1e3d34] text-white"
                            : "bg-white text-[#1e3d34]/55 hover:text-[#1e3d34]"
                            }`}
                        >
                          <span className="mr-2 text-[11px]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Back */}
                  <div className="flex justify-center sm:justify-start min-h-8 mt-3">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-1.5 py-2 text-[10px] font-semibold tracking-[0.1em] uppercase hover:opacity-70 transition"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        Back
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Result */}
                  <h3 className="text-[26px] sm:text-[30px] font-semibold tracking-tight leading-[1.1] mb-5">
                    Your Prakriti leans {leading.join(" – ")}.
                  </h3>

                  <div className="space-y-3 mb-5">
                    {leading.map((d) => (
                      <p key={d} className="text-sm leading-relaxed text-[#1e3d34]/85">
                        <strong className="font-semibold text-[#1e3d34]">{d}:</strong>{" "}
                        {DOSHA_INFO[d]}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
                    {DOSHAS.map((d, i) => (
                      <span
                        key={d}
                        className="px-4 py-1.5 rounded-full bg-white text-[11px] font-semibold tracking-wide text-[#1e3d34]"
                      >
                        {d} {scores[i]}/{TOTAL}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link
                      href="/how-vedique-diet-works"
                      className="px-5 py-2 rounded-full bg-[#1e3d34] text-white text-[11px] font-semibold tracking-wide hover:bg-[#2c5b4d] transition"
                    >
                      Explore Vedique Diet
                    </Link>
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="px-5 py-2 rounded-full border border-[#1e3d34] text-[11px] font-medium tracking-wide hover:bg-[#1e3d34]/5 transition"
                    >
                      Retake
                    </button>
                  </div>
                  <div className="h-2" />
                </>
              )}

              {/* Footnote */}
              <p className="text-[10px] sm:text-[9px] font-semibold text-[#1e3d34] leading-relaxed mt-2">
                Introductory analysis only. This does not replace professional
                medical advice.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
