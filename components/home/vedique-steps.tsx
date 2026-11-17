import Image from "next/image";
import Container from "../container";

const steps = [
  {
    title: "Know your Bio-Energy",
    description:
      "1:1 consultation with doctors: Our doctors analyze your body type, & deep dive into the cause of weight gain or excessive weight retention.",
    image: "/assets/indian-doctor.jpg",
  },
  {
    title: "Follow Fun, Tasty Diets",
    description:
      "Customized Diets - Created for you, Daily: No calorie-counting. No fasting. Losing weight has never been easier!",
    image: "/assets/app-slider.jpg",
  },
  {
    title: "Achieve your Dream Figure",
    description:
      "Visible results that last a lifetime: The new you is happier, healthier and wiser.",
    image: "/assets/weight-loss.jpg",
  },
];

export function VediqueSteps() {
  return (
    <section className="w-full py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl text-webblue mb-8 sm:mb-12 leading-snug">
            Following a diet has{" "}
            <span className="text-webprimary">
              never been this easy, or this fun.
            </span>
          </h2>

          {/* Grid layout for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 w-full">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-4">
                  {/* Number Badge */}
                  <div className="absolute top-2 right-2 bg-webprimary text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md font-semibold text-base sm:text-lg z-10">
                    {index + 1}
                  </div>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover rounded-xl shadow-md"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-webprimary mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
