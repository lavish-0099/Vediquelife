import Container from "@/components/container";
import { Metadata } from "next";
import EligibilityCriteria from "@/components/team-members/eligibility-criteria";
import MemberApplicationSection from "@/components/team-members/member-application-section";
import TeamMemberRegisterBanner from "@/components/team-members/team-member-register-banner";

const meta = {
  title:
    "Register as Our team member with Dr. Shikha Sharma - For Health & Wellness Support",
  description:
    "Join Dr. Shikha Sharma's team as a team member. Help people achieve their health goals with personalized nutrition plans and expert guidance.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/nutrition-coach.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/meet-our-team/apply`,
    type: "website",
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: [meta.image],
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/meet-our-team/apply`,
  },
};

const TeamMemberRegisterPage = () => {
  return (
    <div>
      <TeamMemberRegisterBanner />
      <Container>
        <div className="relative -mt-16 bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <p className="text-lg md:text-xl text-gray-800 text-center">
            You will receive patients from Ranfort Wellness, who are from your
            or near your current location and for each consultation that you do,
            we will pay you a consultancy fee.
          </p>
        </div>
      </Container>
      <MemberApplicationSection />
      <EligibilityCriteria />
    </div>
  );
};

export default TeamMemberRegisterPage;
