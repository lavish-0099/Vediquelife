import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";
import Image from "next/image";

const meta = {
  title: "Create Account | Vedique Ayurveda – Join the Herbal Wellness Journey",
  description:
    "Sign up for your Vedique Ayurveda account to access premium herbal wellness products, personalized nutrition guidance, exclusive offers, and a holistic Ayurvedic lifestyle experience.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/register.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/register`,
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
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/auth/register`,
  },
};
const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
