"use client";

import Container from "../container";
import { CtaButton } from "../cta-button";
import Link from "next/link";
import { BookConsultationCta } from "./book-consultation-cta";

export const BookConsultation = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-[#e1f1e8] to-[#f7fbf8]">
      <Container>
        <div className="text-center max-w-2xl mx-auto px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Your Body. Your Wellness. Your Way.
          </h2>

          <p className="mt-5 sm:mt-6 text-muted-foreground text-base sm:text-lg">
            Share your goals with our experts and get a clear Vedique roadmap.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <BookConsultationCta />
            <Link
              href={process.env.NEXT_PUBLIC_WHATSAPP_API_URL || "/contact"}
              className="w-full sm:w-auto"
            >
              <CtaButton
                label="Talk to an Expert Now"
                animate={false}
                variant="outline"
                className="w-full sm:w-auto"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
