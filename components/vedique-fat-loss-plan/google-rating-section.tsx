"use client";

import Container from "@/components/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

// Function to extract initials from name
const getInitials = (name: string) => {
  const nameParts = name.split(" ");
  if (nameParts.length === 1) {
    // Only first name is provided
    return nameParts[0].slice(0, 2).toUpperCase();
  } else {
    // First name and last name provided
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[1].charAt(0).toUpperCase()
    );
  }
};

const reviews = [
  {
    id: 1,
    name: "Abhinav Srivastava",
    review:
      "Hi, My name is Abhinav, and it's been just about a month since I joined. So far, it's been a really great experience. My nutritionist is fantastic.",
    avatar: "/assets/images/user-1.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Shruti Singhal",
    review:
      "Neha Singh is the most recommendable Dietitian. she did not leave any stone unturned to motivate me",
    avatar: "/assets/images/user-2.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Devina Coutinho",
    review:
      "Very professional service. I've been consistently losing weight over the last 3 weeks. My dietician Muskan has been amazing too.",
    avatar: "/assets/images/user-3.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Abhinav Chhabra",
    review:
      "I've had a great experience consulting with Nutritionist Jaya. She truly understands individual problem areas and tailors the diet plan accordingly.",
    avatar: "/assets/images/user-4.png",
    rating: 5,
  },
  {
    id: 5,
    name: "Sushmitha",
    review:
      "I joined the Shikha Diet Plan about 1 month back. The daily diet is possible to be strictly followed. Within 1 month, I have lost 5 kg of weight.",
    avatar: "/assets/images/user-1.png",
    rating: 5,
  },
  {
    id: 6,
    name: "Anandita Gupta",
    review:
      "I am thrilled to share my weight loss journey with Yogita, the nutritionist at Doctor Shikha Sharma's clinic",
    avatar: "/assets/images/user-2.png",
    rating: 5,
  },
  {
    id: 7,
    name: "Muna Siddiqui",
    review:
      "Wonderful and great experience. My nutritionist Vijay Laxmi was amazing all throughout my weight loss journey",
    avatar: "/assets/images/user-3.png",
    rating: 5,
  },
  {
    id: 8,
    name: "Gagan Jyot",
    review:
      "I am having a great experience with Dr. Riya. She listened to my needs and helped me create a plan that worked for me",
    avatar: "/assets/images/user-4.png",
    rating: 5,
  },
];

const GoogleRatingSection = () => {
  return (
    <div className="w-full py-10 px-6">
      <Container>
        <div className="flex flex-col items-center justify-center mb-20">
          <h2 className="text-4xl sm:text-4xl text-webvedique  mb-4 text-center">
            Trusted by Users in{" "}
            <span className="text-webprimary">165+ Countries</span>
          </h2>
          <Image
            src="/assets/images/google-rating.png"
            alt="google-rating"
            width={200}
            height={200}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {reviews.map((review) => (
            <Link
              href="https://www.google.com/search?gs_ssp=eJzj4tZP1zcsyS0oSbYoMGC0UjWoMLY0SDFMNTdLMbJMszAyTrMyqDAzNDNKTjE3S0ozTEkzNE31kk4pUijOyMzOSARSiUW5iQr5eakKGamJOSUZAMxxGSk&q=dr+shikha+sharma+one+health&rlz=1C1ONGR_enIN1118IN1118&oq=dr+shikha+sharma+&gs_lcrp=EgZjaHJvbWUqEAgDEC4YrwEYxwEYgAQYjgUyBggAEEUYOzIGCAEQIxgnMgYIAhAjGCcyEAgDEC4YrwEYxwEYgAQYjgUyBwgEEAAYgAQyBggFEEUYPDIGCAYQRRg9MgYIBxBFGD3SAQg5NDcxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x390d1e76d29f823f:0x6162cd76bf1df15e,1,,,,"
              target="_blank"
              key={review.id}
            >
              <div
                key={review.id}
                className="bg-[#fff5f5] p-6 rounded-lg shadow-lg flex flex-col items-center"
              >
                {/* User Avatar */}
                <Avatar>
                  <AvatarFallback className="bg-gray-800 text-white font-extrabold text-sm">
                    {getInitials(review.name)}
                  </AvatarFallback>
                </Avatar>

                {/* User Name */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>

                {/* User Review */}
                <p className="text-sm text-gray-600 text-center mt-2 mb-4">
                  {review.review}
                </p>

                {/* Star Rating */}
                <div className="flex">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <MdStar key={index} className="text-yellow-500 w-6 h-6" />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default GoogleRatingSection;
