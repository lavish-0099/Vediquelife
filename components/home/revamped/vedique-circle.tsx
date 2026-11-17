"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// `mobile` images are shown below the md breakpoint (768px), `desktop` from md up.
// The desktop file names contain a space, so it is written as %20 in the URL.
// Keep the exact upper/lower case of the mobile file names (M1 is capital, m2/m3 are
// lowercase) - Linux hosting is case-sensitive.
const BANNERS = [
  {
    id: "banner-1",
    desktop: "/assets/revamp/Vedique%20-Banner%201.jpg",
    mobile: "/assets/revamp/vedique-circle-M1.webp",
    alt: "Vedique Circle banner 1",
  },
  {
    id: "banner-2",
    desktop: "/assets/revamp/Vedique%20-Banner%202.jpg",
    mobile: "/assets/revamp/vedique-circle-m2.webp",
    alt: "Vedique Circle banner 2",
  },
  {
    id: "banner-3",
    desktop: "/assets/revamp/Vedique%20-Banner%203.jpg",
    mobile: "/assets/revamp/vedique-circle-m3.webp",
    alt: "Vedique Circle banner 3",
  },
];

const AUTOPLAY_MS = 5000;

export default function RevampedVediqueCircle() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = BANNERS.length;

  const goTo = (i: number) => setActive((i + total) % total);

  /* Auto-advance (pauses on hover / touch, off for reduced-motion users) */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    /* Full-width banner (edge to edge) with the dots on a white strip underneath */
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Vedique Circle banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="w-full bg-white"
    >
      {/* All banners share one grid cell: the section takes the banner's natural
          height (no cropping) and slides cross-fade */}
      <div className="grid w-full">
        {BANNERS.map((banner, i) => (
          <div
            key={banner.id}
            aria-hidden={active !== i}
            className={`col-start-1 row-start-1 transition-opacity duration-500 ${active === i ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
              }`}
          >
            {/* Mobile image */}
            <Image
              src={banner.mobile}
              alt={banner.alt}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto block md:hidden"
            />
            {/* Desktop / tablet image */}
            <Image
              src={banner.desktop}
              alt=""
              aria-hidden="true"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto hidden md:block"
            />
          </div>
        ))}
      </div>

      {/* Dots - below the image */}
      <div className="flex items-center justify-center gap-4 py-5 sm:py-6">
        {BANNERS.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to banner ${i + 1}`}
            aria-current={active === i}
            className={`relative h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-colors duration-300 before:absolute before:-inset-3 before:content-[''] ${active === i ? "bg-[#1e3d34]" : "bg-[#1e3d34]/35 hover:bg-[#1e3d34]/60"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
