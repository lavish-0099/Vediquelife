"use client";

import Container from "../container";
import FreeAssessmentBtn from "./cta-btn";

export default function LeadingBanner() {
  return (
    <section className="bg-webblue py-10 px-4 sm:px-8 md:px-16 lg:px-24">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <p className="text-white text-base md:text-2xl max-w-6xl text-center mx-auto">
            We’ve helped over <strong> 1.5 lakh people</strong>, in different
            stages of health to{" "}
            <span className="italic">
              {" "}
              lose weight, feel better, and get healthier
            </span>
            .
          </p>

          <FreeAssessmentBtn
            btnTitle="Begin Your Health Journey"
            submitBtnTitle="Schedule a Callback"
            className="bg-webprimary text-white hover:bg-yellow-500 p-6 text-lg mt-4"
          />
        </div>
      </Container>
    </section>
  );
}
