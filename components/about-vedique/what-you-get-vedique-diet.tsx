"use client";

import {
  FaUserMd,
  FaMobileAlt,
  FaLeaf,
  FaComments,
  FaUtensils,
  FaBan,
  FaSpa,
  FaPrayingHands,
  FaHeartbeat,
} from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { CtaButton } from "../cta-button";
import Link from "next/link";
import { BookConsultationCta } from "./book-consultation-cta";

export default function WhatYouGetVediqueDiet() {
  const benefits = [
    {
      icon: <FaUserMd className="text-webprimary text-2xl" />,
      title: "1:1 Coaching",
      description:
        "Personalized guidance from experienced Vedique Doctors & Nutritionists.",
    },
    {
      icon: <FaMobileAlt className="text-webprimary text-2xl" />,
      title: "Daily Updated Diets",
      description: "Customized meal plans updated daily on the Vedique App.",
    },
    {
      icon: <FaUtensils className="text-webprimary text-2xl" />,
      title: "Simple, Kitchen-Friendly Meals",
      description: "Easy-to-follow diets using readily available ingredients.",
    },
    {
      icon: <FaComments className="text-webprimary text-2xl" />,
      title: "On-Demand Support",
      description:
        "Chat or call your doctors & nutritionists via the Vedique App.",
    },
    {
      icon: <FaLeaf className="text-webprimary text-2xl" />,
      title: "Bio-Energy Based Personalized Plans",
      description: "Plans based on your unique Prakriti (bio-energy).",
    },
    {
      icon: <FaBan className="text-webprimary text-2xl" />,
      title: "No Fasting or Restrictions",
      description: "No need for extreme fasting or food abstinence.",
    },
    {
      icon: <FaSpa className="text-webprimary text-4xl" />,
      title: "Holistic Approach",
      description:
        "We address body and mind to ensure long-term sustainable wellness.",
    },
    {
      icon: <FaPrayingHands className="text-webprimary text-4xl" />,
      title: "Yoga Sessions",
      description: "Integrated yoga practices aligned with your diet plan.",
    },
    {
      icon: <FaHeartbeat className="text-webprimary text-4xl" />,
      title: "Stress Management",
      description: "Techniques to reduce stress and anxiety naturally.",
    },
  ];

  const columns = 3;

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      rotateY: 90,
      transformOrigin: "right center",
    },
    visible: (i: number) => {
      const row = Math.floor(i / columns);
      const col = i % columns;
      const delay = col * 0.2 + row * 0.25;
      return {
        opacity: 1,
        rotateY: 0,
        transition: {
          delay,
          duration: 0.6,
          ease: [0.25, 0.8, 0.25, 1],
        },
      };
    },
  };

  return (
    <section className="py-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold  leading-tight">
          What You Get with the{" "}
          <span className="text-webprimary">Vedique Diet®</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 hover:shadow-lg"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            {item.icon}
            <div>
              <h4 className="text-lg font-semibold text-webprimary mb-1">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <Link href="/how-vedique-diet-works" className="w-full sm:w-auto">
          <CtaButton
            label="How Vedique Diet Works"
            animate={false}
            variant="primary"
            className="w-full sm:w-auto"
          />
        </Link>
        <BookConsultationCta
          variant="outline"
          btnTitle="Book Your Consultation"
        />
      </div>
    </section>
  );
}
