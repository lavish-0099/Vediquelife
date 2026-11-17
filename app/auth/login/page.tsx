import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
const meta = {
  title: "Member Login | Vedique Ayurveda Store – Herbal Wellness & Nutrition",
  description:
    "Log in to your Vedique Ayurveda account to manage your orders, access personalized wellness recommendations, subscribe to herbal nutrition plans, and explore authentic Ayurvedic products.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/login.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`,
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
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`,
  },
};
const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
