"use client";

import { cn } from "@/lib/utils";
import Container from "@/components/container";

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className }: AboutSectionProps) => {
  return (
    <div className={cn("bg-webprimary", className)}>
      <Container>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-websecondary mb-6">
            About Vedique
          </h1>
          <p className="text-lg mb-6">
            At Vedique, we believe in the power of nature and the ancient wisdom
            of Ayurveda to bring balance and wellness to modern lives. Our
            mission is to provide premium Ayurvedic products that are carefully
            crafted using the finest natural ingredients, ensuring they are both
            effective and safe.
          </p>

          <h2 className="text-3xl font-bold mb-4">Our Commitment:</h2>
          <ul>
            <li className="mb-2 text-lg">
              <b>Quality:</b> We source the highest quality herbs and natural
              ingredients to create products that you can trust.
            </li>
            <li className="mb-2 text-lg">
              <b>Purity:</b> Our formulations are free from harmful chemicals
              and synthetic additives, staying true to the natural essence of
              Ayurveda.
            </li>
            <li className="mb-2 text-lg">
              <b>Sustainability:</b> We are committed to environmentally
              friendly practices, from sourcing to packaging, to ensure we
              protect our planet for future generations.
            </li>
            <li className="mb-2 text-lg">
              <b>Holistic Wellness:</b> Our Infusions have been formulated with
              a purpose of detoxifying and rejuvenating the body as part of the
              holistic approach as suggested by inhouse our team of Doctors.
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default AboutSection;
