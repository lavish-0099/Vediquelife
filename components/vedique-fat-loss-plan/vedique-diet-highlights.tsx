import Container from "@/components/container";
import Image from "next/image";

export default function VediqueDietHighlights() {
  return (
    <section className="bg-[#fff5f5] py-16 text-[#2b2b2b]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl text-center text-webvedique mb-4">
            What is Unique about{" "}
            <span className="text-webprimary">Vedique Diet?</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-700">
            Discover how Vedique Diet stands apart with its deeply personalized
            and holistic approach to your health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src="/assets/images/ayurvedic-nutrition.webp"
                alt="Ayurveda and Modern Nutrition"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Ayurvedic + Modern Nutrition
            </h3>
            <p className="text-sm text-gray-600">
              Vedique Diet is a combination of the best practices of Ayurvedic
              nutrition, modern nutrition and modern healthcare. this holistic
              approach takes into count your unique Bio-Energy, blood bio
              markers, personal likes and dislikes, age, existing diseases or
              health condition, health goals and practical lifestyle
              consideration.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src="/assets/images/personalized-plan.webp"
                alt="Personalized Diet Plan"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Plan</h3>
            <p className="text-sm text-gray-600">
              What you get - It is a highly personalized nutrition plan because
              it takes into account your body physiology, psychology, habits,
              seasons, daily circadian rhythm, cultural preferences and many
              such unique parameters to give you a highly effective plan.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src="/assets/images/expert-team.webp"
                alt="Expert Team Support"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Led by Expert Team</h3>
            <p className="text-sm text-gray-600">
              India's No 1 programme which offer a holistic approach towards
              health transformation, led by multiple experts in one program like
              - Nutritionists, stress management coach, yoga coach and Ayurvedic
              doctor.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
