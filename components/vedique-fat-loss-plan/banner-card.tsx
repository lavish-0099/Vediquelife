"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/container";
import useWindowSize from "@/hooks/use-window-size";
import { Dancing_Script } from "next/font/google";
import FreeAssessmentBtn from "../home/cta-btn";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "500" });

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

interface BannerCardProps {
  banner: {
    id: number;
    title: string;
    spanTxt: string;
    btnTxt: string;
    image: string;
    vediqueLogo: string;
    ratingImage: string;
    href?: string;
    otherTxt?: string;
  };
  className?: string;
}

export default function BannerCard({ banner, className }: BannerCardProps) {
  const { width } = useWindowSize();
  const isMobile = width !== undefined && width <= 767;

  return (
    <section className="relative w-full overflow-hidden pb-16 bg-gradient-to-br from-[#ffe6e6] to-[#fff0f0] text-[#2b2b2b]">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-200/30 rounded-[40%] blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-300/20 rounded-[50%] blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-10 left-1/2 w-60 h-60 bg-red-100/40 rounded-full blur-xl animate-pulse delay-2000 -translate-x-1/2" />
      </div>

      {/* Dotted grids */}
      <motion.div className="absolute hidden lg:block top-16 right-12 h-24 w-16 dotted-grid z-0" />
      <motion.div className="absolute hidden lg:block bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-16 dotted-grid z-0" />

      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row ipadpro:flex-col items-center justify-between pt-32 md:pt-36 lg:pt-32 ipadpro:pt-40 gap-10">
          {/* Text Side */}
          <motion.div
            className="w-full lg:w-1/2 ipadpro:w-full flex flex-col items-center text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <Image
              src={banner.ratingImage}
              alt="Rating"
              width={isMobile ? 250 : 300}
              height={isMobile ? 250 : 300}
              className="mx-auto"
            />

            <h1 className="text-xl font-semibold text-red-800">
              {banner.title}
            </h1>

            <div className="relative border-y-2 border-red-300 px-6 py-4 bg-white/70 backdrop-blur-md rounded-xl shadow-md text-[#3e2723] w-full">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 rounded-full px-3 text-sm font-medium tracking-wide text-white whitespace-nowrap">
                Dr Shikha Sharma’s
              </span>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Image
                  src={banner.vediqueLogo}
                  alt="Vedique Logo"
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-center">
                  <div className="flex gap-2 items-end">
                    <span className="text-4xl sm:text-6xl tracking-widest uppercase font-light text-red-700">
                      Vedique
                    </span>
                    <span
                      className={`${dancing.className} text-5xl sm:text-6xl tracking-widest lowercase font-light text-red-700`}
                    >
                      diet
                    </span>
                  </div>
                  <p className="text-lg sm:text-2xl tracking-wider uppercase text-center">
                    FAT LOSS PROGRAMME
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-xl font-normal text-center text-[#4b3c2a] max-w-xl">
              Natural, customized & easy-to-follow diets to{" "}
              <b>lose fat, shed inches</b>, and{" "}
              <b>improve physical & mental well-being</b>
            </p>

            <div className="flex justify-center items-center flex-col p-4">
              <FreeAssessmentBtn
                btnTitle="Schedule a Health Assessment"
                submitBtnTitle="Schedule a Callback"
                className="bg-red-600 text-white hover:bg-red-700 p-6 text-lg mt-4"
              />
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="w-full lg:w-1/2 ipadpro:w-full flex justify-center relative mt-10 pb-12"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            {/* Floating Dots */}
            <div className="absolute top-4 right-24 w-4 h-4 bg-red-300 rounded-full blur-sm animate-pulse" />
            <div className="absolute top-16 right-12 w-2 h-2 bg-red-200 rounded-full blur-[1px] animate-pulse" />
            <div className="absolute bottom-10 left-10 w-3 h-3 bg-red-400 rounded-full blur animate-pulse" />
            <div className="absolute bottom-20 right-16 w-3 h-3 bg-red-200 rounded-full blur-sm animate-pulse" />

            {/* Main Circular Image */}
            <div className="relative z-50 overflow-hidden rounded-full border-[8px] border-white shadow-2xl w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] backdrop-blur-sm">
              <Image
                src="/assets/slider/fat-loss-banner.webp"
                alt="Vedique Diet Woman"
                fill
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
