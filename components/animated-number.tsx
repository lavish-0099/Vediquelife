"use client";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const [displayedValue, setDisplayedValue] = useState(value);

  useEffect(() => {
    let start = 0;
    const end = Math.floor(value);
    const duration = 1000;
    const increment = 50;

    const totalIncrements = Math.ceil(duration / increment);
    const incrementValue = (end - start) / totalIncrements;

    const interval = setInterval(() => {
      start += incrementValue;
      if (Math.floor(start) >= end) {
        setDisplayedValue(end);
        clearInterval(interval);
      } else {
        setDisplayedValue(Math.floor(start));
      }
    }, increment);

    return () => clearInterval(interval);
  }, [value]);

  return <h4 className="text-3xl">{displayedValue}</h4>;
};

export default AnimatedNumber;
