"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import CtaBtn from "../home/cta-btn";

const TeamMemberBanner = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#f3faf4]">
      {/* Light animation blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-4 sm:top-16 sm:left-10 w-36 h-36 sm:w-52 sm:h-52 bg-pink-100/40 rounded-[40%] blur-2xl animate-pulse" />
        <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-pink-200/30 rounded-[50%] blur-3xl animate-pulse delay-1000" />
      </div>

      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 py-10 sm:py-14 md:py-20">
          {/* Left Text */}
          <motion.div
            className="w-full lg:w-1/2 text-[#2b2b2b] space-y-3 sm:space-y-4 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
              Want to be part of the{" "}
              <span className="text-webprimary font-semibold block sm:inline">
                Holistic Nutrition Coach Network ?
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-2">
              Connect, grow, and lead with expert guidance and a like-minded
              health community.
            </p>

            <CtaBtn
              btnTitle="Join Now"
              btnHref="/meet-our-team/apply"
              btnBg="#264d25"
              className={` hover:bg-[#163516] text-white px-6 py-4 mt-4 rounded-lg shadow-lg w-full sm:w-auto`}
            />
          </motion.div>

          {/* Right Side — Image inside shape */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-white/60 rounded-[40%] border-4 border-white shadow-lg backdrop-blur-md overflow-hidden">
              <Image
                src="/assets/slider/nutrition-caoch.webp"
                alt="Coach Lady"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 400px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default TeamMemberBanner;
