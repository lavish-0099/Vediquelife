"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/container";

const eligibilityPoints = [
  "Candidates should have done a CPD accredited course.",
  "Candidates should be able to operate Ranfort Wellness software.",
  "Candidates should be selected on the basis of final interview.",
];

const EligibilityCriteria = () => {
  return (
    <div className="w-full bg-pink-50/50 py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-semibold text-[#2b2b2b] mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Eligibility Criteria
          </motion.h2>

          <div className="space-y-6 text-left">
            {eligibilityPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-md border border-pink-100"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="text-red-500 mt-1 shrink-0" size={24} />
                <p className="text-gray-800 text-base sm:text-lg">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EligibilityCriteria;
