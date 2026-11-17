import Container from "@/components/container";
import { LuPhoneCall, LuMail } from "react-icons/lu";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";
import { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
const socialLinks = [
  {
    title: "Facebook",
    link: "https://www.facebook.com/Dr.ShikhasNutriHealth",
    icon: <FaFacebookF className="w-5 h-5" />,
    customCss: "bg-blue-500 text-white rounded-full p-1",
    hoverTextColor: "hover:text-blue-600 hover:bg-white",
  },
  {
    title: "Twitter",
    link: "https://x.com/nutrihealthsys",
    icon: <FaXTwitter className="w-5 h-5" />,
    customCss: "bg-black text-white rounded-full p-1",
    hoverTextColor: "hover:text-black hover:bg-white",
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/company/oneoealthbydrshikhasharma/",
    icon: <FaLinkedinIn className="w-5 h-5" />,
    customCss: "bg-blue-600 text-white rounded-full p-1",
    hoverTextColor: "hover:text-blue-700 hover:bg-white",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/nutrihealthsystems/",
    icon: <FaInstagram className="w-5 h-5" />,
    customCss: "bg-pink-600 text-white rounded-full p-1",
    hoverTextColor: "hover:text-pink-600 hover:bg-white",
  },
  {
    title: "Youtube",
    link: "https://www.youtube.com/@DrShikhasOneHealth",
    icon: <FaYoutube className="w-5 h-5" />,
    customCss: "bg-red-600 text-white rounded-full p-1",
    hoverTextColor: "hover:text-red-600 hover:bg-white",
  },
];

const meta = {
  title: "Contact Vedique - For Health & Wellness Support",
  description:
    "Reach out to Vedique for personalized health advice & consultations. Contact us today for expert guidance on your wellness journey.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/contact.webp`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
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
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
  },
};

const ContactPage = () => {
  return (
    <div>
      <PageHeader
        title="Let's Talk About Your Wellness Journey"
        pageTitle="Contact"
        className="py-24 relative"
      />
      <Container>
        <div className="relative -mt-16 mb-16 bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          {/* LEFT */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>

            <p className="mb-4 text-lg font-semibold leading-relaxed">
              Ranfort Wellness Pvt. Ltd.
            </p>

            <p className="mb-4 text-lg leading-relaxed">
              D - 158 B, First Floor, Okhla Phase 1, New Delhi - 110020
            </p>

            {/* PHONE 2 */}
            <Link href="tel:+919871100237" target="_blank">
              <div className="mb-3 flex items-start gap-2 text-lg leading-relaxed">
                <LuPhoneCall className="text-webtertiary w-5 h-5 mt-1 shrink-0" />
                <span>+91-9871100237</span>
              </div>
            </Link>

            {/* EMAIL — FIXED */}
            <Link href="mailto:info@vedique.life" target="_blank">
              <div className="mb-4 flex items-start gap-2 text-lg leading-relaxed break-all">
                <LuMail className="text-webtertiary w-5 h-5 mt-1 shrink-0" />
                <span className="break-all">info@vedique.life</span>
              </div>
            </Link>

            {/* SOCIAL */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 pt-4">
              <h4 className="text-xl text-webprimary w-full md:w-auto text-center md:text-left">
                Follow Us:
              </h4>

              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  className={`${social.customCss} ${social.hoverTextColor} text-xl`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
