"use client";

import {
  FaUserMd,
  FaMobileAlt,
  FaLeaf,
  FaComments,
  FaUtensils,
  FaBan,
  FaSpa,
  FaPrayingHands,
  FaHeartbeat,
} from "react-icons/fa";
import Container from "../container";

export default function AboutVediqueDiet() {
  const benefits = [
    {
      icon: <FaUserMd className="text-webblue text-2xl" />,
      title: "1:1 Coaching",
      description:
        "Personalized guidance from experienced Vedique Doctors & Nutritionists.",
    },
    {
      icon: <FaMobileAlt className="text-webblue text-2xl" />,
      title: "Daily Updated Diets",
      description: "Customized meal plans updated daily on the Vedique App.",
    },
    {
      icon: <FaUtensils className="text-webblue text-2xl" />,
      title: "Simple, Kitchen-Friendly Meals",
      description: "Easy-to-follow diets using readily available ingredients.",
    },
    {
      icon: <FaComments className="text-webblue text-2xl" />,
      title: "On-Demand Support",
      description:
        "Chat or call your doctors & nutritionists via the Vedique App.",
    },
    {
      icon: <FaLeaf className="text-webblue text-2xl" />,
      title: "Bio-Energy Based Personalized Plans",
      description: "Plans based on your unique Prakriti (bio-energy).",
    },
    {
      icon: <FaBan className="text-webblue text-2xl" />,
      title: "No Fasting or Restrictions",
      description: "No need for extreme fasting or food abstinence.",
    },
    {
      icon: <FaSpa className="text-webblue text-4xl" />,
      title: "Holistic Approach",
      description:
        "We address body and mind to ensure long-term sustainable wellness, not just quick fixes.",
    },
    {
      icon: <FaPrayingHands className="text-webblue text-4xl" />,
      title: "Yoga Sessions",
      description:
        "Integrated yoga practices to improve flexibility, strength, and inner peace, aligned with your diet plan.",
    },
    {
      icon: <FaHeartbeat className="text-webblue text-4xl" />,
      title: "Stress Management",
      description:
        "Effective techniques including meditation and lifestyle tips to naturally reduce stress and anxiety.",
    },
  ];

  return (
    <section className=" pb-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <Container>
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <h2 className="text-4xl text-webblue  leading-tight">
            Why choose the{" "}
            <span className="text-webprimary">
              Vedique Diet® Fat Loss Program?
            </span>
          </h2>
          <p className="text-gray-700 text-base md:text-lg mt-4">
            The Vedique Diet is{" "}
            <strong>
              India's #1 Doctor-driven, scientific fat loss program.
            </strong>
            It's a perfect blend of Ayurvedic and modern nutrition principles
            designed for real results.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4 transition hover:shadow-lg"
            >
              {item.icon}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
