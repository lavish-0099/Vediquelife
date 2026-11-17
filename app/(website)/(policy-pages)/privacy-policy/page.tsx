import Link from "next/link";
import { Metadata } from "next";

import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";

const meta = {
  title: "Privacy Policy - Vedique",
  description:
    "Read the privacy policy of using Ranfort Wellness services, including payments, subscriptions, prohibited uses, and legal disclaimers.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/terms.webp`,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/terms-and-conditions`,
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    type: "article",
    images: [
      {
        url: meta.image,
        alt: "Privacy Policy - Vedique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.image],
  },
  alternates: {
    canonical: meta.url,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <PageHeader title="Privacy Policy" pageTitle="Privacy Policy" />

      <Container>
        <div className="bg-white py-8 mb-16">
          <p className="text-md mb-6 text-center md:text-left">
            <strong>Ranfort Wellness Private Limited</strong>
            <br />
            Effective Date: March 1, 2026
          </p>

          {/* 1 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            1. Introduction
          </h2>
          <p className="text-md mb-6">
            Ranfort Wellness Private Limited (“Company”, “we”, “our”, “us”) is
            committed to protecting your privacy and ensuring the security of
            your personal information.
          </p>
          <p className="text-md mb-6">
            This Privacy Policy applies to all users of our websites:
          </p>

          <ul className="ml-4 list-disc">
            <li>
              <Link href="https://www.ranfortwellness.com">
                www.ranfortwellness.com
              </Link>
            </li>
            <li>
              <Link href="https://www.drshikhasharma.com">
                www.drshikhasharma.com
              </Link>
            </li>
            <li>
              <Link href="https://www.vedique.life">www.vedique.life</Link>
            </li>
            <li>
              <Link href="https://www.unitusacademy.com">
                www.unitusacademy.com
              </Link>
            </li>
          </ul>

          <p className="text-md my-6">
            Ranfort Wellness Private Limited owns and operates the brands:
            Vedique, Dr Shikha Sharma, and Unitus Health Academy.
          </p>

          <p className="text-md mb-6">
            By accessing our websites or using our services, you agree to the
            terms of this Privacy Policy.
          </p>

          {/* 2 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            2. Information We Collect
          </h2>

          <h3 className="font-semibold mb-2">a) Personal Information</h3>
          <p className="text-md">We may collect:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address</li>
            <li>Age and gender</li>
          </ul>

          <h3 className="font-semibold mb-2">
            b) Health & Lifestyle Information
          </h3>
          <p className="text-md">
            For our diet, wellness, or educational services, we may collect:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>Medical history</li>
            <li>Dietary habits</li>
            <li>Lifestyle information</li>
            <li>Body measurements</li>
          </ul>

          <p className="mb-6">
            This information is collected only with your consent.
          </p>

          <h3 className="font-semibold mb-2">c) Payment Information</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>Billing details</li>
            <li>Transaction information</li>
          </ul>
          <p className="mb-6">
            We do not store card details. Payments are processed through secure
            third-party payment gateways.
          </p>

          <h3 className="font-semibold mb-2">d) Technical Information</h3>
          <ul className="list-disc ml-6 mb-6">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data (pages visited, time spent, etc.)</li>
          </ul>

          {/* 3 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-md mb-2">Your information is used for:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Providing personalized services</li>
            <li>Processing orders</li>
            <li>Communication (calls, SMS, WhatsApp, email)</li>
            <li>Sending offers (with consent)</li>
            <li>Improving website</li>
            <li>Legal compliance</li>
          </ul>

          {/* 4 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            4. Consent
          </h2>
          <p className="mb-6">
            By using our services or submitting your information, you consent
            to:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>Collection and use of your personal and health data</li>
            <li>Receiving communication via calls, SMS, WhatsApp, and email</li>
          </ul>
          <p className="mb-6">
            You can opt out of promotional communication at any time.
          </p>
          {/* 5 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            5. Data Sharing and Disclosure
          </h2>
          <p className="mb-6">We do not sell your data.</p>

          <p className="mb-6">We may share your information with:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Internal team members (nutritionists, support staff)</li>
            <li>
              Trusted third-party service providers such as:
              <ul className="list-disc ml-6">
                <li>Payment gateways</li>
                <li>CRM platforms</li>
                <li>Email/SMS service providers</li>
              </ul>
            </li>
            <li>Legal authorities if required by law</li>
          </ul>

          <p className="mb-6">
            All third parties are obligated to keep your information
            confidential.
          </p>

          {/* 6 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            6. Data Security
          </h2>
          <p className="mb-6">
            We implement appropriate security measures including:
          </p>
          <ul className="list-disc ml-6 mb-6">
            <li>Secure servers</li>
            <li>Restricted access to data</li>
            <li>Encryption where applicable</li>
          </ul>
          <p className="mb-6">
            However, no method of transmission over the internet is completely
            secure.
          </p>

          {/* 7 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            7. Cookies Policy
          </h2>
          <p className="mb-6">We use cookies to:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Enhance user experience</li>
            <li>Analyze website traffic</li>
            <li>Improve functionality</li>
          </ul>
          <p className="mb-6">
            You can disable cookies through your browser settings.
          </p>

          {/* 8 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            8. Third-Party Links
          </h2>
          <p className="mb-4">
            Our websites may contain links to external websites.
          </p>
          <p className="mb-6">
            We are not responsible for the privacy practices of such third-party
            websites. Users are advised to review their privacy policies
            separately.
          </p>

          {/* 9 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            9. Data Retention
          </h2>

          <p className="mb-6">We retain your data:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>As long as necessary to provide services</li>
            <li>To comply with legal and regulatory obligations</li>
          </ul>
          <p className="mb-6">
            You may request deletion of your data at any time.
          </p>

          {/* 10 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            10. Your Rights
          </h2>
          <p className="mb-6">You have the right to:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Access your personal data</li>
            <li>Request corrections or updates</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent</li>
          </ul>
          <p>To exercise these rights, contact us at:</p>
          <p className="mb-6">
            Email:{" "}
            <a href="mailto:connect@ranfortwellness.com">
              {" "}
              connect@ranfortwellness.com
            </a>
          </p>

          {/* 11 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            11. Children’s Privacy
          </h2>
          <p className="mb-6">
            Our services are not intended for individuals under 18 years of age
            without parental consent.
          </p>

          {/* 12 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            12. Medical Disclaimer
          </h2>
          <p className="mb-6">
            Our services, diet plans, consultations, and products are based on
            Ayurvedic and nutritional principles and are intended for general
            wellness.
          </p>
          <p className="mb-6">
            They are not a substitute for professional medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare
            provider for medical concerns.
          </p>

          {/* 13 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            13. Advertising and Tracking
          </h2>
          <p className="mb-6">We may use third-party tools such as:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Meta (Facebook) Pixel</li>
            <li>Google Analytics</li>
            <li>Google Ads</li>
          </ul>
          <p className="mb-6">These tools help us:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>Understand user behaviour</li>
            <li>Improve our services</li>
            <li>Show relevant advertisements</li>
          </ul>
          <p className="mb-6">
            Users can manage preferences through browser or ad settings.
          </p>

          {/* 14 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            14. Updates to This Policy
          </h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time.
          </p>
          <p className="mb-6">
            Any changes will be posted on this page with an updated effective
            date.
          </p>

          {/* 15 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            15. Contact Information
          </h2>
          <p className="mb-6">
            Ranfort Wellness Private Limited
            <br />
            First Floor, D - 158 B, Near Honda City Showroom
            <br />
            Pocket D, Okhla Phase I
            <br />
            Okhla Industrial Estate, New Delhi - 110020
            <br />
            Phone: <a href="tel:+919871100237">+91 9871100237</a>
            <br />
            Email:{" "}
            <a href="mailto:connect@ranfortwellness.com">
              {" "}
              connect@ranfortwellness.com
            </a>
          </p>

          {/* 16 */}
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            16. Governing Law
          </h2>
          <p className="mb-6">
            This Privacy Policy shall be governed by and interpreted in
            accordance with the laws of India.
          </p>
        </div>
      </Container>
    </div>
  );
}
