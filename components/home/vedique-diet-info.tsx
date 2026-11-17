"use client";

import Container from "../container";
import { DownloadBroucherBtn } from "./download-broucher-btn";

export default function VediqueDietInfo() {
  return (
    <section className="bg-blue-50 py-10 px-4 sm:px-8 md:px-16 lg:px-24">
      <Container>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl text-center text-webblue mb-4">
            The Vedique Diet® <span className="text-webprimary"> Secret?</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg text-center mx-auto">
            We combine the best principles of research backed Ayurveda and
            modern dietary sciences, to recommend highly customized
            one-size-fits-one diets. It's <strong>proven.</strong> It's{" "}
            <strong>scientific</strong>. It <strong>works</strong>.
          </p>
          <DownloadBroucherBtn
            btnTitle="Download our brochure now"
            className="bg-webprimary text-white hover:bg-webblue p-6 text-lg mt-4"
          />
        </div>
      </Container>
    </section>
  );
}
