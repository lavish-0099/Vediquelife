import Image from "next/image";
import React from "react";

const features = [
  {
    text: "Other diet plans are mostly based on eating less or calories based plans.",
    image: "/images/point1.jpg",
  },
  {
    text: "The plans are very general and do not honour your unique bio energy type.",
    image: "/images/point2.jpg",
  },
  {
    text: "Other diet plans lead to weight loss including muscle loss and loose skin tissue which makes you look unhealthy and a little aged.",
    image: "/images/point3.jpg",
  },
  {
    text: "Other weight loss plans leave you feeling tired and nutritionally depleted.",
    image: "/images/point4.jpg",
  },
  {
    text: "Other diet plans are not holistic and lack functional nutritional elements e.g. Amla, Aloe vera, moringa (According to your body type).",
    image: "/images/point5.jpg",
  },
  {
    text: "Other diet plans do not offer multiple experts in one program like stress management coach, yoga coach and Ayurvedic doctor.",
    image: "/images/point6.jpg",
  },
];

const SuperiorDiet = () => {
  return (
    <div className="space-y-12">
      {features.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center gap-6 md:gap-12`}
        >
          <div className="w-full md:w-1/3">
            <Image
              src={item.image}
              alt={`feature-${index + 1}`}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 text-lg text-gray-800">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuperiorDiet;
