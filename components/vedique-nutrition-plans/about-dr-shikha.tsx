"use client";

import Image from "next/image";
import Container from "../container";
import { motion } from "framer-motion";
import FreeAssessmentBtn from "../home/cta-btn";

export default function AboutDrShikha() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full py-12 lg:py-20">
      <Container>
        <motion.div
          className="flex flex-col lg:flex-row-reverse items-center lg:items-start justify-between gap-12 lg:gap-12"
          initial="hidden"
          animate="visible"
        >
          {/* Image section */}
          <motion.div
            className="w-full lg:w-1/3 flex justify-center"
            variants={imageVariants}
          >
            <div className="w-[260px] sm:w-[300px] md:w-[400px]">
              <Image
                src="/assets/images/dr-shikha-sharma.png"
                alt="Dr. Shikha Sharma"
                className="rounded-lg object-contain w-full h-auto"
                width={400}
                height={400}
              />
            </div>
          </motion.div>

          {/* Text content section */}
          <motion.div
            className="w-full lg:w-2/3 flex flex-col justify-center text-center lg:text-left"
            variants={textVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl text-webblue mb-6">
              India's most-trusted{" "}
              <span className="text-webprimary">Nutrition Evangelist</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 leading-relaxed tracking-wide">
              A medical doctor by training, <strong>Dr Shikha Sharma</strong> is
              India’s most prominent nutrition evangelist.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 leading-relaxed tracking-wide">
              She pioneered the concept of Nutrigenetics, combining modern
              medicine and the <strong>principles of Ayurveda</strong>. She's
              advised many celebrities, politicians, and professionals on diet &
              health.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 leading-relaxed tracking-wide">
              The Vedique Diet programme was created under her guidance. Join
              now and receive <strong>personalized guidance</strong> from her
              highly qualified team of experts.
            </p>

            <div className="flex justify-center lg:justify-start">
              <FreeAssessmentBtn
                btnTitle="Start Your Transformation"
                submitBtnTitle="Schedule a Callback"
                className="bg-webprimary text-white hover:bg-webblue p-6 text-lg mt-4"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
