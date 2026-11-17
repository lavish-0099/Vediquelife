import { FaKey, FaPhoneAlt, FaStethoscope } from "react-icons/fa";
import Container from "@/components/container";

export default function FreeAssessmentFeatures() {
  return (
    <section className="bg-[#fff5f5] py-16 text-[#2b2b2b]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl text-center text-webvedique mb-4">
            What will you get in
            <span className="text-webprimary"> Free Assessment?</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-700">
            A personalized call from our expert to understand your body and
            health better before recommending the right diet plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center items-center text-red-600 text-4xl mb-4">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              1-on-1 Doctor/Nutritionist Call
            </h3>
            <p className="text-sm text-gray-600">
              Speak directly with an expert who listens, understands your goals,
              and guides you with empathy.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center items-center text-red-600 text-4xl mb-4">
              <FaStethoscope />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Body & Health Assessment
            </h3>
            <p className="text-sm text-gray-600">
              Discover your unique bio imprint, which is the root of your body
              type, emotional framework, mental makeup, and habits.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="flex justify-center items-center text-red-600 text-4xl mb-4">
              <FaKey />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Unlock the key to your health
            </h3>
            <p className="text-sm text-gray-600">
              Knowing this is the key to unlocking powerful healing functions in
              your body.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
