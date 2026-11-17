"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const container = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

type ClientAnimationWrapperProps = {
  children: ReactNode;
};

export const ClientAnimationWrapper = ({
  children,
}: ClientAnimationWrapperProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
    >
      {children}
    </motion.div>
  );
};
