"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import Container from "@/components/container";

interface LeadingBannerProps {
  className?: string;
}

const LeadingBanner = ({ className }: LeadingBannerProps) => {
  return (
    <div className={cn("bg-webprimary py-8", className)}>
      <Container>
        <div className="w-full flex flex-col md:flex-row items-center justify-center ">
          <div className="md:mr-6 flex-shrink-0">
            <Image
              src="/assets/harvard-business-review.png"
              alt="Harvard Business"
              width={250}
              height={250}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-normal text-white text-center md:text-left">
            Proud to be a Harvard Business case study in wellness!
          </h1>
        </div>
      </Container>
    </div>
  );
};

export default LeadingBanner;
