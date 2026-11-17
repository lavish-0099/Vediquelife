"use client";

import { cn } from "@/lib/utils";

import Container from "@/components/container";
import PageBreadcum from "@/components/page-breadcum";

interface BannerPageTitleProps {
  title: string;
  pageTitle?: string;
  className?: string;
  backgroundImageUrl: string;
}

export default function BannerPageTitle({
  title,
  pageTitle,
  className,
  backgroundImageUrl,
}: BannerPageTitleProps) {
  return (
    <div
      className={cn("w-full flex items-center bg-cover bg-center", className)}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <Container>
        <div className="flex items-center justify-center relative z-10">
          <div className="text-center w-full">
            <h2 className="text-white text-2xl lg:text-3xl xl:text-5xl transition-all duration-1000 ease-in-out transform animate-slide-in">
              {title}
            </h2>
            <PageBreadcum currentPage={pageTitle || title} />
          </div>
        </div>
      </Container>
    </div>
  );
}
