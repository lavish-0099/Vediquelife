"use client";

import Image from "next/image";
import Container from "../container";

const data = {
  title: "Hey, you made it to the end of the page!",
  description: "Don't forget to take care, have fun!",
  appImage: "/assets/images/app-thumbnail.png",
};

const OurStory = () => {
  const { title, description, appImage } = data;
  return (
    <div className="bg-slate-100">
      <Container>
        <div className="mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section: Content */}
          <div className="lg:w-1/2 py-6 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 lg:mb-4">
              Our Story
            </h2>
            <p className="text-base text-brand-dark text-opacity-70 pb-5 lg:pb-7">
              The Vedique Brand was born when a need was felt to bring India's
              legacy of healing infusions to the world. India has a rich legacy
              of flowers, herbs, and spices which are used together to make
              natural and powerful healing infusions and decoctions. For
              example, a bright red flower of the Uttarakhand region of the
              Himalayas known locally as "Buransh" (Scientific name
              Rhododendron) has been used for centuries by the locals to treat a
              host of illnesses (Cardiovascular, liver, cholesterol, and blood
              disorders) due to its very powerful inflammation-reducing
              properties. Our aim is to bring the rich legacy of Indian
              traditional healing wisdom to the world.
            </p>
          </div>

          {/* Right Section: Image */}
          <div className="lg:w-1/2 hidden  md:flex justify-center lg:justify-end items-center">
            <Image
              src={appImage}
              alt="Vedique"
              width={600}
              height={450}
              className="w-full h-auto max-w-[600px]"
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurStory;
