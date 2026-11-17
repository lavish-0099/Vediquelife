"use client";

import Image from "next/image";

import Container from "../container";
import { motion } from "framer-motion";
import FreeAssessmentBtn from "./cta-btn";

const successStories = [
  {
    id: 1,
    name: "Mrs. Beena Thakur",
    image: "/assets/success-stories/beena.jpg",
    title: "mama aap small ho gaye",
    description:
      'The best compliment is from my own daughter when she said "mama aap small ho gaye" Cosmetologist, Spa and Salon professional I have not only lost weight but also my hair fall has stopped. My skin is much better and my entire system is cleaned.',
  },
  {
    id: 2,
    name: "Mr. Dharam Dass Malhotra",
    image: "/assets/success-stories/dharamdas.jpg",
    title: "I have lost 17 kilos",
    description:
      "I have lost 17 kilos of weight, my BP medication has reduced to one fourth and the acid reflux medicine has stopped completely normalized. My family and friends are inspired by my achievement.",
  },
  {
    id: 3,
    name: "Mrs. Amita Bindal",
    image: "/assets/success-stories/amita.jpg",
    title: "My entire family benefited from my health program",
    description:
      "My entire family benefited from my health program. The Nutri health plan is not just a diet plan but rather a life plan which I would like to adopt not only for myself but my entire family…..",
  },
  {
    id: 4,
    name: "Mrs. Gayatri",
    image: "/assets/success-stories/gayatri.jpg",
    title: "This program really works",
    description:
      "This program really works. My faith is this system is complete and I now suggest it to many others who ask me for a place which is honest and gives results.",
  },
  {
    id: 5,
    name: "Mr. Sushil Aggarwal",
    image: "/assets/success-stories/sushil.jpg",
    title: "I Controlled my Diseases",
    description:
      "The result is that my weight dropped over 10 kilos and the best part is that my medicines have been tapered and my health has improved. Now I expect to lead a healthy, cheerful life. Needless to say, my doctors are thrilled.",
  },
  {
    id: 6,
    name: "Mrs. Ritu Rajput",
    image: "/assets/success-stories/ritu.jpg",
    title: "Amazing transformation",
    description:
      "My Amazing transformation. As the program progressed I discovered new ways of eating and started enjoying the good foods. In three months I have lost 10 kilos and am feeling far more healthier.",
  },
  {
    id: 7,
    name: "Mr. Raja Biswas",
    image: "/assets/success-stories/raja.jpg",
    title: "I lost 11 kilos",
    description:
      "Don’t Diet……Rather Eat the Correct Food. I lost 11 kilos and gained energy and health. I liked the program so much that now I cannot imagine going back to old eating habits again.",
  },
  {
    id: 8,
    name: "Mrs. Neeta Malhotra",
    image: "/assets/success-stories/neeta.jpg",
    title: "It’s a new life I lead now.",
    description:
      "I am so motivated now that I have enrolled for a one year program. I lead an active life, travel, go out for social events and yet continue to lose weight! I feel full of energy, my spirits are high and I feel a renewed zest for life….",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Heading */}
        <motion.div className="text-center mb-10 sm:mb-14 px-4">
          <h2 className="text-3xl sm:text-4xl text-webblue leading-tight">
            India's #1 choice for{" "}
            <span className="text-webprimary">quick and safe Fat Loss</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-xl mt-2 max-w-2xl mx-auto">
            No Gimmicks, no False Promises. <strong>RESULTS</strong> that speak
            for themselves!
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 max-w-7xl mx-auto">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="w-full h-[340px] sm:h-[360px] md:h-[380px] [perspective:1000px] group"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-lg bg-webblue">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-[220px] sm:h-[240px] md:h-[260px]"
                  />
                  <div className="px-4 py-2 text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                      {story.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white line-clamp-2">
                      {story.title}
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-webblue rounded-xl shadow-lg flex items-center justify-center p-3 text-center">
                  <div className="border-2 border-white p-1 w-full h-full rounded-lg flex items-center justify-center">
                    <div className="border-2 border-white p-2 w-full h-full rounded-md overflow-y-auto">
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed tracking-wide">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 px-4">
          <p className="text-3xl sm:text-5xl text-webblue font-semibold mb-4">
            and many more...
          </p>

          <FreeAssessmentBtn
            btnTitle="Begin Your Health Journey"
            submitBtnTitle="Schedule a Callback"
            className="bg-webprimary text-white hover:bg-webblue p-6 text-lg mt-4"
          />
          <p className="text-sm text-gray-500 mt-2">
            Plans starting at ₹138 per day*
          </p>
        </div>
      </Container>
    </section>
  );
};

export default SuccessStories;
