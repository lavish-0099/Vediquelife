"use client";

import Image from "next/image";
import Container from "@/components/container";
import { CtaButton } from "../cta-button";
import Link from "next/link";

export default function VediqueStorySplit() {
  return (
    <section className="bg-[#fdfdfd] pt-12 md:pt-0">
      <Container>
        <div className="w-full grid grid-cols-1 lg:grid-cols-[60%_40%] items-center">
          {/* LEFT SIDE — TEXT */}
          <div className="order-1">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className=" text-webprimary text-3xl md:text-3xl lg:text-4xl font-semibold">
                The Vedique Story
              </span>
            </div>

            <p className="text-base md:text-lg  mb-4 text-justify">
              Vedique stands as a pillar of Ayurveda, where food is treated as
              medicine to heal, nourish, and support overall wellness.
            </p>

            <p className="text-base md:text-lg  mb-4 text-justify">
              Every person can live healthier when guided according to their{" "}
              <strong className="text-webprimary">Prakriti</strong>, their
              unique body type. Vedique blends modern medical science with
              ancient wisdom to prevent lifestyle diseases and restore balance
              naturally.
            </p>

            <p className="text-base md:text-lg mb-6 text-justify">
              Backed by{" "}
              <strong className="text-webprimary">Dr. Shikha Sharma</strong>, a
              leading wellness expert who has guided lakhs toward sustainable
              health, Vedique now brings that same philosophy through herbal
              infusions and daily wellness products, making preventive health
              simple and part of everyday life.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6">
              <Link href="/vedique-diet">
                <CtaButton
                  label="Learn about our programmes"
                  className="w-full sm:w-auto"
                />
              </Link>
              <Link href="/products">
                <CtaButton
                  label="Browse Products"
                  animate={false}
                  variant="outline"
                  className="w-full sm:w-auto"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div className="order-2 mt-10 lg:mt-0">
            {/* 
              Mobile: full-bleed image
              Desktop: normal contained image
            */}
            <div
              className="
              relative
              -mx-4 sm:-mx-6 lg:mx-0
              flex justify-center lg:justify-end
            "
            >
              <Image
                src="/assets/images/vedique-life-main-page-image.jpg"
                alt="Vedique wellness"
                width={600}
                height={600}
                priority
                className="w-full max-w-none lg:max-w-[600px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
