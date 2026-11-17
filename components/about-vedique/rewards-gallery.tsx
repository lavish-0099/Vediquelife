"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const rewards = [
  "/assets/rewards/a.png",
  "/assets/rewards/b.png",
  "/assets/rewards/c.png",
  "/assets/rewards/d.png",
  "/assets/rewards/e.png",
];

export default function RewardsGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl  md:text-5xl text-center font-semibold  mb-10">
          Awards & <span className="text-webprimary">Recognition</span>
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {rewards.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => setSelected(src)}
                className="cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                {/* STRICT PORTRAIT CARD */}
                <div className="relative w-full h-[280px] md:h-[340px]">
                  <Image
                    src={src}
                    alt={`Award ${index + 1}`}
                    fill
                    className="object-cover object-top"
                    // 👆 object-top = face safe
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Lightbox */}
        <Dialog
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
            <DialogHeader className="hidden">
              <DialogTitle className="sr-only" />
            </DialogHeader>

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {selected && (
              <Image
                src={selected}
                alt="Award preview"
                width={1400}
                height={1000}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
