import { BookConsultationCta } from "@/components/about-vedique/book-consultation-cta";
import Container from "@/components/container";
import { CtaButton } from "@/components/cta-button";
import { VediqueTimeline } from "@/components/how-vedique-diet/timeline";
import { Metadata } from "next";
import Link from "next/link";

const meta = {
  title: "How Vedique Diet Works | A Doctor-Led Wellness Journey",
  description:
    "Understand how the Vedique Diet works through a step-by-step, doctor-led process combining Ayurveda and modern nutrition for personalized, sustainable wellness.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/how-vedique-diet-works.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/how-vedique-diet-works`,
    type: "website",
    images: [{ url: meta.image }],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [meta.image],
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/how-vedique-diet-works`,
  },
};

const steps = [
  {
    no: "01",
    title: "Deep Dive Into Your Health Blueprint",
    text: (
      <>
        Your journey begins with an in-depth analysis by our senior Ayurvedic
        doctor. They review your blood reports, understand your Prakriti (unique
        body constitution), and assess medical conditions such as PCOS, thyroid,
        diabetes, or weight concerns.
        <br />
        <br />
        This isn’t just data collection — it’s understanding{" "}
        <strong>YOU</strong> at a cellular level.
      </>
    ),
  },
  {
    no: "02",
    title: "Your Personal Nutrition Consultation",
    text: (
      <>
        A senior nutritionist with 8–10 years of experience has a detailed
        conversation with you about your dietary habits, routine, supplements,
        and relationship with food.
        <br />
        <br />
        This isn’t a questionnaire. It’s a genuine dialogue built around your
        lifestyle.
      </>
    ),
  },
  {
    no: "03",
    title: "Your Personalized Plan Is Born",
    text: (
      <>
        Our Ayurvedic doctor and nutritionist collaborate to design a plan
        tailored to your Prakriti, goals, and health condition.
        <br />
        <br />
        No expensive supplements. No unrealistic restrictions.
        <br />
        <strong>Just real, home-cooked food as medicine.</strong>
      </>
    ),
  },
  {
    no: "04",
    title: "Constant Support, Every Step of the Way",
    text: (
      <>
        Regular follow-ups every 2 days with your senior nutritionist ensure
        you’re never alone. A detailed consultation with our senior Ayurvedic
        doctor every 15 days keeps your progress aligned.
        <br />
        <br />
        We refine and optimize your plan as your body evolves.
      </>
    ),
  },
  {
    no: "05",
    title: "Mind, Body & Expert-Guided Healing",
    text: (
      <>
        Weekly yoga and success-coach sessions help manage stress, build
        discipline, and sustain motivation.
        <br />
        <br />
        Weekly interactive sessions with Dr. Shikha Sharma allow you to ask
        questions and receive direct guidance.
      </>
    ),
  },
  {
    no: "06",
    title: "Visible Results & Your Roadmap Forward",
    text: (
      <>
        As you reach your goals, we provide a maintenance plan and a final
        analysis brochure — a complete record of your journey, results, and next
        steps.
        <br />
        <br />
        You leave with clarity, confidence, and a blueprint for lifelong
        wellness.
      </>
    ),
  },
];

export default function HowVediqueDietWorksPage() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f8f4_0%,#ffffff_40%,#f7fbf8_100%)]">
      {/* ================= HERO ================= */}
      <section className="relative py-24 overflow-hidden">
        {/* background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#e3f3ea,transparent_55%),radial-gradient(circle_at_bottom_right,#d6ece0,transparent_55%)]" />

        {/* decorative blobs */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-[#dfeee6] rounded-full blur-3xl opacity-80" />
        <div className="absolute top-40 -right-32 w-[420px] h-[420px] bg-[#eaf6f0] rounded-full blur-3xl opacity-80" />

        <Container>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* eyebrow */}
            <p className="inline-block text-sm uppercase tracking-widest text-webprimary mb-6">
              The Vedique Process
            </p>

            {/* main heading */}
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              How Vedique Diet
              <span className="text-webprimary"> Works</span>
            </h1>

            {/* subline */}
            <p className="mt-8 text-xl md:text-2xl font-medium">
              A carefully guided, doctor-led journey to holistic wellness
            </p>

            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              From ancient Ayurvedic wisdom to modern nutritional science, every
              step is designed around your body, your goals, and your lifestyle.
            </p>

            {/* CTA */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <BookConsultationCta btnTitle="Start Your Health Journey today!" />

              <Link
                href={process.env.NEXT_PUBLIC_WHATSAPP_API_URL || "/contact"}
                className="w-full sm:w-auto"
              >
                <CtaButton
                  label="Talk to an Expert Now"
                  animate={false}
                  variant="outline"
                  className="w-full sm:w-auto"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= TIMELINE ================= */}
      <VediqueTimeline steps={steps} />

      {/* ================= CTA ================= */}
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold">
              Ready to Begin Your Transformation?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Your body deserves expert care. Your health deserves a
              personalized approach. Join thousands who’ve transformed their
              lives with the Vedique Diet.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <BookConsultationCta btnTitle="Start Your Health Journey today!" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
