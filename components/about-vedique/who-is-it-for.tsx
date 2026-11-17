"use client";

import { motion } from "framer-motion";
import {
  FaFire,
  FaHeartbeat,
  FaBalanceScale,
  FaLeaf,
  FaSmile,
} from "react-icons/fa";

const tiles = [
  {
    icon: <FaFire className="w-6 h-6" />,
    title: "Lose weight safely",
    desc: "Sustainable plans without crash diets.",
  },
  {
    icon: <FaHeartbeat className="w-6 h-6" />,
    title: "Digestive health",
    desc: "Heal digestive issues, acidity, or bloating.",
  },
  {
    icon: <FaBalanceScale className="w-6 h-6" />,
    title: "Hormonal balance",
    desc: "Support for PCOS, thyroid & metabolic health.",
  },
  {
    icon: <FaLeaf className="w-6 h-6" />,
    title: "Boost immunity",
    desc: "Food-first approach for steady energy & resilience.",
  },
  {
    icon: <FaSmile className="w-6 h-6" />,
    title: "Feel like yourself",
    desc: "No extreme interventions — long-term balance.",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 px-2 sm:px-0"
        >
          <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold leading-tight">
            Who Is It <span className="text-webprimary">For?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            The Vedique Diet® is ideal for people who want to
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-6">
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative rounded-2xl p-6 shadow-sm hover:shadow-xl bg-[#e1f1e8] 
                 transition-transform duration-300 hover:-translate-y-1
                 w-full sm:w-[45%] lg:w-[30%] max-w-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-webprimary text-white flex items-center justify-center">
                  {t.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-webprimary">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{t.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
