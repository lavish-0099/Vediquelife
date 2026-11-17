"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import Lottie from "lottie-react";
import successAnimation from "@/animations/Done.json";

interface DoneFormProps {
  source: string;
}

export function DoneForm({ source }: DoneFormProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const playConfetti = () => {
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        scalar: 1.2,
      });
    };
    const timeout = setTimeout(playConfetti, 2000);
    const audio = new Audio("/sounds/success.mp3");
    audio.play().catch(() => {
      console.log("Audio play was blocked.");
    });
    return () => clearTimeout(timeout);
  }, []);
  const successStoryUrl =
    source === "academy"
      ? "https://www.unitusacademy.com/student-speaks.php"
      : `https://www.drshikhasharma.com/success-stories?utm_source=${source}&utm_medium=ThankYouPage&utm_campaign=ViewSuccessStories`;
  return (
    <section className="bg-white pb-10">
      <div className="relative w-full flex justify-center items-center overflow-hidden -mt-10">
        <div className="inline-block w-64 h-64 -mt-10">
          <Lottie
            animationData={successAnimation}
            loop={true}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div className="text-center -mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank you for Reaching Out!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          {source === "academy"
            ? "Our team will connect with you at your chosen time to help you choose the right nutrition course and guide you in your growth journey."
            : "Our team will reach out at your chosen time to share your personalized   health roadmap and next steps."}
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-left shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-webprimary">
            What Happens Next?
          </h2>
          {source === "academy" ? (
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
              <li>
                ✅ Personal Connect: Our counselor will speak with you to
                understand your learning and career goals.
              </li>
              <li>
                ✅ Course Overview: You’ll receive a clear brief about what
                you’ll learn in each course.
              </li>
              <li>
                ✅ No Pressure: No spam, no sales push — just genuine guidance
                to help you choose the best path.
              </li>
            </ul>
          ) : (
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
              <li>
                ✅ Our health expert will reach out to understand your wellness
                goals.
              </li>
              <li>
                ✅ You&apos;ll get a brief about how our Vedique Diet program
                works.
              </li>
              <li>
                ✅ No spam, no pressure — just guidance to help you decide the
                best path.
              </li>
            </ul>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-yellow-700">
            In the Meantime...
          </h2>
          {source === "academy" ? (
            <p className="text-gray-700 mb-2">
              Discover how our courses have helped 2,000+ students build
              successful careers as nutritionists.
            </p>
          ) : (
            <p className="text-gray-700 mb-2">
              Learn more about how our Ayurvedic + Nutrition approach has helped{" "}
              <strong>1,00,000+ people</strong> transform their health
              naturally.
            </p>
          )}

          <a
            href={successStoryUrl}
            className="inline-block bg-webprimary hover:bg-webyellow hover:text-black text-white px-5 py-2 mt-3 rounded-lg font-medium transition"
          >
            🔍 View Success Stories
          </a>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Need help? Email us at{" "}
          <a
            href="mailto:connect@ranfortwellness.com"
            className="underline text-webprimary"
          >
            connect@ranfortwellness.com
          </a>
        </p>
      </div>
    </section>
  );
}
