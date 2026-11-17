"use client";

import Image from "next/image";
import Container from "../container";

const images = [
  "/assets/media/1.png",
  "/assets/media/2.png",
  "/assets/media/3.png",
  "/assets/media/4.png",
  "/assets/media/5.png",
  "/assets/media/6.png",
  "/assets/media/7.png",
  "/assets/media/8.png",
  "/assets/media/9.png",
  "/assets/media/10.png",
  "/assets/media/11.png",
  "/assets/media/12.png",
  "/assets/media/13.png",
  "/assets/media/14.png",
];

const MediaPresenceBanner = () => {
  return (
    <div className="py-12 bg-blue-50 overflow-hidden">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-4xl text-webblue ">
            Featured <span className="text-webprimary"> In</span>
          </h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative overflow-hidden w-full">
          <div className="animate-marquee whitespace-nowrap gap-8 flex">
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[150px] h-[130px] flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt={`Media ${index + 1}`}
                  width={140}
                  height={110}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MediaPresenceBanner;
