"use client";

import { CtaButton } from "@/components/cta-button";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

interface QuoteBannerProps {
  quote?: string | null;
}

export const QuoteBanner = ({ quote }: QuoteBannerProps) => {
  if (!quote) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 mb-12">
      <div className="relative rounded-3xl p-6 md:p-10 overflow-hidden shadow-lg">
        {/* 🔥 Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-100 to-emerald-200 opacity-80" />

        {/* 🔥 Shine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.6),transparent_40%)]" />

        {/* 🔥 Glow blobs */}
        <div className="absolute -top-10 left-10 w-48 h-48 bg-green-400/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-emerald-400/30 blur-3xl rounded-full" />

        {/* 🔥 Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Quote */}
          <div className="text-center md:text-left">
            <div className="text-md font-normal text-gray-800 leading-relaxed max-w-2xl ">
              “{quote}”
            </div>
          </div>

          {/* CTA */}
          <Link
            href={process.env.NEXT_PUBLIC_WHATSAPP_API_URL || "/contact"}
            className="w-full sm:w-auto"
          >
            <CtaButton
              label="Book A Consult"
              variant="primary"
              icon={<Stethoscope size={18} />}
              iconPosition="left"
              className="w-full sm:w-auto justify-center shadow-md hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
