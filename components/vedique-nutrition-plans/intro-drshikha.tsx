"use client";

import Container from "../container";
import { motion } from "framer-motion";

export default function IntroDrShikha() {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const videoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full pb-12 md:py-12">
      <Container>
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between md:gap-12"
          initial="hidden"
          animate="visible"
        >
          {/* Left Section - Video */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mt-6 md:mt-0"
            variants={videoVariants}
          >
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6 text-webprimary text-center md:text-left">
              Dr. Shikha Explains the Benefits of the Personalized Nutrition
              Plan
            </h2>
            <div className="w-full md:w-[700px] max-w-full aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/fRTlFAL2FG4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </motion.div>

          {/* Right Section - About Dr. Shikha */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left "
            variants={textVariants}
          >
            <h2 className="text-2xl md:text-3xl text-webprimary my-4 md:mb-6">
              Know About Dr. Shikha Sharma
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 text-justify leading-relaxed">
              Dr. Shikha Nehru Sharma is a medical doctor from Maulana Azad
              Medical College, who realised, while working with heart patients,
              the importance of preventive healthcare in cardiology. She has
              been a pioneer in the field of using nutrition as a backbone of
              preventive healthcare.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 text-justify leading-relaxed">
              Her articles in <strong>Hindustan Times - Brunch Magazine</strong>{" "}
              and her programs on television, like <strong> NDTV </strong> have
              always focused on using{" "}
              <strong>Nutrition as a form of medicine</strong> to treat diseases
              from their root cause.
            </p>
            <p className="text-base md:text-lg text-gray-700 text-justify leading-relaxed">
              The awarded and renowned doctor has created India's first
              integrated Nutrition protocol called{" "}
              <strong>"Holistic Nutrition Protocol"</strong>. This is based on{" "}
              <strong>functional health</strong>, utilizing food as medicine,
              and understanding the body as an integrated unit comprising of the{" "}
              <strong>mind, emotions, and physical self.</strong>
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
