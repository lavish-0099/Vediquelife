"use client";

import Image from "next/image";
import Container from "@/components/container";
import MemberApplicationForm from "./member-application-form";

const MemberApplicationSection = () => {
  return (
    <section className="w-full bg-gray-50 -mt-16 pt-28">
      <Container>
        <div className="relative bg-white border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-10 mb-10 overflow-hidden">
          {/* Lady PNG image with left fade mask */}
          <div className="absolute bottom-0 right-0 w-[220px] sm:w-[280px] md:w-[330px] lg:w-[560px] hidden lg:block hide-on-ipad-pro">
            <Image
              src="/assets/images/nutrition-coach-bg.png"
              alt="Sitting Lady"
              width={560}
              height={500}
              className="object-contain object-bottom pointer-events-none select-none mask-left-fade"
              priority
            />
          </div>

          {/* Content inside white box */}
          <div className="relative z-10 max-w-full lg:max-w-2xl ipad-pro-max-w-full">
            <h2 className="text-3xl font-bold text-center text-webprimary mb-6">
              Join as a team member
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-8">
              Become a part of our trusted professional community & grow with
              guidance.
            </p>
            <MemberApplicationForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MemberApplicationSection;
