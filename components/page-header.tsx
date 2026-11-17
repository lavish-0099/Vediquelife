"use client";

import { motion } from "framer-motion";

import Container from "@/components/container";
import PageBreadcum from "@/components/page-breadcum";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  pageTitle?: string;
  className?: string;
}

export const PageHeader = ({
  title,
  pageTitle,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("w-full flex bg-webprimary py-12", className)}>
      <Container>
        <div className="flex items-start justify-start">
          <div className="text-start w-full">
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-2xl lg:text-3xl xl:text-4xl  mb-2 text-center text-white"
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              <PageBreadcum
                currentPage={pageTitle}
                className="text-yellow-500"
                hoverClassName="hover:text-websecondary"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};
