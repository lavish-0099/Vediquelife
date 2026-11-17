"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface USPCardProps {
  usps: {
    label: string;
    value: number;
    suffix?: string;
  }[];
}

export const USPCard = ({ usps }: USPCardProps) => {
  return (
    <div className="w-full py-6">
      <div
        className="
          flex flex-col md:flex-row
          divide-y md:divide-y-0 md:divide-x
          divide-white/25
        "
      >
        {usps.map((usp, index) => (
          <motion.div
            key={index}
            className="flex-1 flex flex-col items-center text-center px-4 py-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <AnimatedNumber value={usp.value} suffix={usp.suffix} />
            <h3 className="mt-2 text-xs sm:text-sm md:text-sm text-white leading-snug">
              {usp.label}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

const AnimatedNumber = ({ value, suffix }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);

  // decimal places detect
  const decimalPlaces = Number.isInteger(value)
    ? 0
    : value.toString().split(".")[1]?.length || 1;

  useEffect(() => {
    let start = 0;
    const end = value;

    if (start === end) return;

    const duration = 1500;
    const stepTime = 40;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Number(start.toFixed(decimalPlaces)));
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, decimalPlaces]);

  // Indian number format
  const formattedValue = count.toLocaleString("en-IN", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
      {formattedValue}
      {suffix && (
        <span className="ml-1 text-xs sm:text-sm md:text-base">{suffix}</span>
      )}
    </div>
  );
};
