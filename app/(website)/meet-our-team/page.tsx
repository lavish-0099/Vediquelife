import { Metadata } from "next";
import TeamMembersNetwork from "@/components/team-members/team-members-network";

const meta = {
  title: "Vedique Nutrition Coach Network - For Health & Wellness Support",
  description:
    "Join Dr. Shikha Sharma's team as a Nutrition Coach. Help people achieve their health goals with personalized nutrition plans and expert guidance.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/nutrition-coach.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/meet-our-team`,
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
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/meet-our-team`,
  },
};

const MeetOurTeamPage = async () => {
  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <div className="relative py-20 md:py-24 text-center px-4 overflow-hidden">
        {/* 🔥 Soft Green Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-50 via-white to-white" />

        {/* 🔥 Floating Gradient Blobs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-200/20 blur-3xl rounded-full -z-10" />
        <div className="absolute top-10 left-10 w-[250px] h-[250px] bg-green-300/10 blur-2xl rounded-full -z-10" />
        <div className="absolute top-20 right-10 w-[250px] h-[250px] bg-emerald-300/10 blur-2xl rounded-full -z-10" />

        {/* 🔥 Heading */}
        <h1 className="text-3xl md:text-5xl font-semibold text-webprimary">
          Meet Our Team
        </h1>

        {/* 🔥 Subheading */}
        <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
          Our team of expert nutritionists, doctors, and wellness coaches are
          dedicated to helping you achieve your health goals through
          personalized, sustainable, and science-backed guidance.
        </p>

        {/* 🔥 Elegant Divider */}
        <div className="mt-6 flex justify-center">
          <div className="w-20 h-[2px] bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
        </div>
      </div>

      {/* 🔥 TEAM GRID */}
      <TeamMembersNetwork />
    </div>
  );
};

export default MeetOurTeamPage;
