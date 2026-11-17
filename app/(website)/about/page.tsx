import type { Metadata } from "next";
import AboutIntro from "@/components/about-vedique/about-intro";
import Principles from "@/components/about-vedique/principles";
import HealthAware from "@/components/about-vedique/health-aware";

export const metadata: Metadata = {
  title: "About Us | Vedique",
  description:
    "A doctor-led, personalised approach to health and wellness, created by Dr Shikha Sharma, bringing together Ayurvedic wisdom, modern medicine, scientific evidence, nutrition and lifestyle science.",
};

// Save as app/about/page.tsx
// The announcement bar, header pill and footer come from your layout.
export default function AboutPage() {
  return (
    <main>
      <AboutIntro />
      <Principles />
      <HealthAware />
    </main>
  );
}
