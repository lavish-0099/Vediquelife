"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "@/components/container";

interface MilestoneStory {
  id: string;
  category: string;
  headline: string;
  imageUrl: string;
  link: string;
}

const STORIES: MilestoneStory[] = [
  {
    id: "story-1",
    category: "WEIGHT MANAGEMENT",
    headline: "17kg Down, A Journey Built on Consistency",
    imageUrl: "/assets/weight-loss.jpg",
    link: "/how-vedique-diet-works",
  },
  {
    id: "story-2",
    category: "LIFESTYLE DISEASE MANAGEMENT",
    headline: "Changes That Shaped Sanjana's Health Journey",
    imageUrl: "/assets/approach.jpg",
    link: "/how-vedique-diet-works",
  },
  {
    id: "story-3",
    category: "FAMILY NUTRITION",
    headline: "How Alka's Approach to Nutrition Changed",
    imageUrl: "/assets/vedique-philosophy.jpg",
    link: "/how-vedique-diet-works",
  },
];

const GAP = 20; // px, matches gap-5

export default function RevampedMilestones() {
  const [activeTab, setActiveTab] = useState<"arrivals" | "explore">("explore");
  const [progress, setProgress] = useState({ start: 0, size: 1 });
  const trackRef = useRef<HTMLDivElement>(null);

  /* Progress bar: fill width = visible share, fill position = scroll position */
  const updateProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.scrollWidth) return;
    const size = Math.min(1, el.clientWidth / el.scrollWidth);
    const max = el.scrollWidth - el.clientWidth;
    const start = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
    setProgress({ start, size });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 300) + GAP;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    /* Grey rounded card pulled up over the section above */
    <section className="relative z-20 w-full bg-[#e4e4e1] -mt-12 lg:-mt-16 rounded-t-[24px] sm:rounded-t-[36px] lg:rounded-t-[56px] pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 lg:pb-36">
      <Container>
        {/* ───────── HEADER ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 mb-10 lg:mb-12">
          {/* Left: eyebrow, title, progress + arrows */}
          <div className="lg:col-span-8 text-center lg:text-left">
            <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#1e3d34] mb-6">
              Vedique Diet
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-[#1e3d34] tracking-tight leading-[1.15] mb-5 sm:mb-8">
              Every journey has its <br />
              own milestone.
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              {/* progress bar */}
              <div className="relative h-[3px] w-24 bg-[#1e3d34]/30 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-[#1e3d34] rounded-full transition-all duration-200"
                  style={{
                    left: `${progress.start * 100}%`,
                    width: `${progress.size * 100}%`,
                  }}
                />
              </div>

              <button
                type="button"
                aria-label="Previous story"
                onClick={() => scrollByCard(-1)}
                className="w-9 h-9 sm:w-7 sm:h-7 rounded-full border border-[#1e3d34] flex items-center justify-center text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              </button>
              <button
                type="button"
                aria-label="Next story"
                onClick={() => scrollByCard(1)}
                className="w-9 h-9 sm:w-7 sm:h-7 rounded-full border border-[#1e3d34] flex items-center justify-center text-[#1e3d34] hover:bg-[#1e3d34] hover:text-white transition"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          </div>

          {/* Right: description (top) + pills (bottom, aligned with arrows) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 text-center lg:text-left">
            <p className="text-sm text-[#1e3d34]/80 leading-relaxed max-w-[300px] mx-auto lg:mx-0">
              Hear from the people who have taken meaningful steps toward better
              health with Vedique&apos;s nutrition experts.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("arrivals")}
                className={`px-5 py-2.5 sm:py-2 rounded-full text-[11px] tracking-wide border border-[#1e3d34] transition ${activeTab === "arrivals"
                  ? "bg-[#1e3d34] text-white font-semibold"
                  : "text-[#1e3d34] font-normal hover:bg-[#1e3d34]/5"
                  }`}
              >
                New arrivals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("explore")}
                className={`px-5 py-2.5 sm:py-2 rounded-full text-[11px] tracking-wide border border-[#1e3d34] transition ${activeTab === "explore"
                  ? "bg-[#1e3d34] text-white font-semibold"
                  : "text-[#1e3d34] font-normal hover:bg-[#1e3d34]/5"
                  }`}
              >
                Explore Vedique Diet
              </button>
            </div>
          </div>
        </div>

        {/* ───────── STORY CARDS (carousel) ───────── */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STORIES.map((story) => (
            <div
              key={story.id}
              className="group shrink-0 snap-start basis-[78%] sm:basis-[calc((100%-20px)/2)] lg:basis-[calc((100%-40px)/3)] rounded-[32px] overflow-hidden bg-white flex flex-col"
            >
              {/* Photo */}
              <Link
                href={story.link}
                className="relative block aspect-[3/2] overflow-hidden"
              >
                <Image
                  src={story.imageUrl}
                  alt={story.headline}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Content */}
              <div className="px-4 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 flex flex-col flex-1 items-center text-center sm:items-start sm:text-left">
                <span className="block text-[10px] sm:text-[9px] font-semibold tracking-[0.08em] uppercase text-[#1e3d34]">
                  {story.category}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-[#1e3d34] leading-snug">
                  {story.headline}
                </h3>
                <Link
                  href={story.link}
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[11px] sm:text-[9px] font-semibold text-[#1e3d34]"
                >
                  <span>View case study</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-2.5 sm:h-2.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
