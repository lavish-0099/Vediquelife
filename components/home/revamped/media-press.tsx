"use client";

import Image from "next/image";

// Folder with the logo files. After running scripts/trim-logos.mjs, change this to
// "/assets/media-trimmed" so every logo uses its tightly-cropped version.
const LOGO_DIR = "/assets/media";

// Order follows your folder. `name` is used as alt text.
const PRESS_LOGOS = [
  { name: "Business Insider", file: "1.webp" },
  { name: "Zee", file: "2.webp" },
  { name: "Press logo 3", file: "3.webp" }, // <- the blank one in your screenshot
  { name: "Cosmopolitan", file: "4.webp" },
  { name: "Hindustan Times", file: "6.webp" },
  { name: "Femina", file: "7.webp" },
  { name: "BBC Radio", file: "8.webp" },
  { name: "The Quint", file: "9.webp" },
  { name: "CNBC", file: "10.webp" },
  { name: "Harvard Business Review", file: "11.webp" },
  { name: "Press logo 12", file: "12.webp" },
  { name: "Press logo 14", file: "14.webp" },
];

export default function RevampedMediaPress() {
  return (
    <div className="w-full bg-[#fcfbf9] border-y border-neutral-200/60 py-6 sm:py-8 overflow-hidden">
      <style>{`
        .mp-track { display: flex; width: max-content; animation: mp-scroll 40s linear infinite; }
        .mp-wrap:hover .mp-track { animation-play-state: paused; }
        @keyframes mp-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .mp-track { animation: none; } }
      `}</style>

      <div className="mp-wrap [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="mp-track items-center">
          {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, idx) => (
            <div
              key={idx}
              aria-hidden={idx >= PRESS_LOGOS.length}
              className="px-5 sm:px-7 shrink-0 select-none"
            >
              {/* Every logo gets the SAME fixed box; object-contain fits it inside
                  without stretching, so sizes are consistent. */}
              <div className="relative h-8 w-28 sm:h-10 sm:w-36">
                <Image
                  src={`${LOGO_DIR}/${logo.file}`}
                  alt={idx >= PRESS_LOGOS.length ? "" : logo.name}
                  fill
                  sizes="150px"
                  className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
