import { Metadata } from "next";
const meta = {
  title: "Vedique - Where Nature Nurtures You | Doctor-Led Ayurvedic Wellness",
  description:
    "Discover personalised Ayurvedic wellness and doctor-led clinical nutrition plans designed for your unique Prakriti.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/about.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/`,
    type: "website",
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    card: "summary_large_image",
  },
};

import RevampedHero from "@/components/home/revamped/hero";
import RevampedFeaturedProducts from "@/components/home/revamped/featured-products";
import RevampedVediqueWay from "@/components/home/revamped/vedique-way";
import RevampedExperts from "@/components/home/revamped/experts";
import RevampedMilestones from "@/components/home/revamped/milestones";
import RevampedPrakritiAnalysis from "@/components/home/revamped/prakriti-analysis";
import RevampedMediaPress from "@/components/home/revamped/media-press";
import RevampedExperienceTestimonials from "@/components/home/revamped/experience-testimonials";
import RevampedKnowledgeArticles from "@/components/home/revamped/knowledge-articles";
import RevampedVediqueCircle from "@/components/home/revamped/vedique-circle";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* PAGE 1: HERO & METRICS */}
      <RevampedHero />

      {/* PAGE 1 BOTTOM & PAGE 2 TOP: DISCOVER WELLNESS PRODUCTS */}
      <RevampedFeaturedProducts />

      {/* PAGE 2 & PAGE 3 TOP: THE VEDIQUE WAY & DR. SHIKHA SHARMA */}
      <RevampedVediqueWay />

      {/* PAGE 3: EXPERTS BEHIND YOUR PLANS */}
      <RevampedExperts />

      {/* PAGE 4 TOP: EVERY JOURNEY HAS ITS OWN MILESTONE */}
      <RevampedMilestones />

      {/* PAGE 4 BOTTOM: PRAKRITI ANALYSIS INTERACTIVE WIDGET */}
      <RevampedPrakritiAnalysis />

      {/* PAGE 5 TOP: FEATURED IN / PRESS LOGOS */}
      <RevampedMediaPress />

      {/* PAGE 5: REAL EXPERIENCE, REAL HEALTH JOURNEY (TESTIMONIALS & RESULTS) */}
      <RevampedExperienceTestimonials />

      {/* PAGE 6 TOP: KNOWLEDGE FOR EVERYDAY WELL-BEING (LATEST ARTICLES) */}
      <RevampedKnowledgeArticles />

      {/* PAGE 6 MIDDLE: VEDIQUE CIRCLE COMMUNITY */}
      <RevampedVediqueCircle />
    </div>
  );
};

export default HomePage;
