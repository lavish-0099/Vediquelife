import Link from "next/link";
import { Metadata } from "next";

import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";

const meta = {
  title: "Grievance Redressal Policy - Vedique",
  description:
    "Read the Grievance Redressal Policy for Ranfort Wellness, detailing complaint handling procedures, timelines, escalation matrix, and resolution process.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/grievance.webp`,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/grievance-redressal-policy`,
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
        alt: "Grievance Redressal Policy - Vedique",
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

export default function GrievanceRedressalPolicyPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Grievance Redressal Policy"
        pageTitle="Grievance Redressal Policy"
      />

      <Container>
        <div className="bg-white py-8 mb-16">
          <p className="text-md mb-6 text-center md:text-left">
            This grievance redressal policy (the “Policy”) sets out Vedique, a
            brand owned by Ranfort Wellness Private Limited’s (the “Company” or
            “
            <Link href="/" className="text-webprimary">
              https://www.ranfortwellness.com
            </Link>
            ” or “We” or “Us”) policy towards redressing grievances raised by
            consumers purchasing goods and services from the Company’s website
            (“Consumer” or “You”) from time to time.
          </p>

          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            1. Details of the Company
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            The details of the Company responsible for the Website and the
            contact information are provided below. You may contact Us through
            the below mentioned contact details and We will be glad to assist
            You.
          </p>

          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Legal Entity Name: Ranfort Wellness Private Limited
            </li>
            <li className="mb-2">Brand Name: Vedique</li>
            <li className="mb-2">
              Registered Office: D - 158 B, First Floor, Okhla Phase 1, New
              Delhi-110020.
            </li>
            <li className="mb-2">
              Name of the website: Ranfort Wellness (“Website”)
            </li>
            <li className="mb-2">
              Details of the website: https://www.ranfortwellness.com/
            </li>
            <li className="mb-2">
              Contact details:
              <ul className="list-disc list-inside ml-4">
                <li className="mb-2">
                  Email:{" "}
                  <a
                    href="mailto:connect@ranfortwellness.com"
                    className="text-webprimary"
                  >
                    connect@ranfortwellness.com
                  </a>
                </li>
                <li className="mb-2">
                  Landline:{" "}
                  <a href="tel:+919266682733" className="text-webprimary">
                    +91 - 9266682733
                  </a>
                </li>
              </ul>
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-webprimary mb-4 mt-4">
            2. Purpose of the Policy
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              The Policy aims to address any Consumer complaints or issues
              through a well-defined and proper mechanism to ensure maximum
              consumer satisfaction.
            </li>
            <li className="mb-2">
              The Policy functions on attempting to ensure that the Consumers
              would be treated fairly at all times, and the Company would
              undertake its best efforts to deal with any Consumer grievance
              promptly, efficiently and with courtesy.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-webprimary my-4">
            3. Grievance Redressal Mechanism
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              At Ranfort Wellness, customer centricity is our topmost priority
              and hence we believe in providing the best experience to all our
              Consumers. We look forward to any feedback which will help us
              improve further. You may contact us through e-mail at
              <a
                href="mailto:connect@ranfortwellness.com"
                className="text-webprimary"
              >
                {" "}
                connect@ranfortwellness.com
              </a>{" "}
              and we will be glad to assist you.
            </li>
            <li className="mb-2">
              For the purpose of this Policy, “grievance” or “complaint”
              includes any communication from the Consumer that expresses
              dissatisfaction in respect of the products or services offered
              through the Website and which seeks a remedial action, but does
              not include the following:
              <ul className="list-disc list-inside ml-4">
                <li className="mb-2">
                  Complaints that are incomplete or not specific in nature;
                </li>
                <li className="mb-2">
                  Communications in the nature of offering suggestions; or
                </li>
                <li className="mb-2">
                  Communications seeking guidance or explanation.
                </li>
              </ul>
            </li>
            <li className="mb-2">
              Ranfort Wellness shall address any complaints and grievances of
              the Consumers with respect to any goods or services provided over
              the Website in a time-bound manner. For this purpose, Ranfort
              Wellness has designated a grievance officer (“Grievance Officer”).
              The Grievance Officer shall be responsible for Consumer grievance
              redressal in accordance with the grievance redressal mechanism
              provided in this Policy. You can contact the Grievance Officer
              through the below mentioned contact details.
              <ul className="list-disc list-inside ml-4">
                <li className="mb-2">Name: Dr. Reena Rawat</li>
                <li className="mb-2">
                  Email:{" "}
                  <a
                    href="mailto:connect@ranfortwellness.com"
                    className="text-webprimary"
                  >
                    connect@ranfortwellness.com
                  </a>
                </li>
                <li className="mb-2">
                  Phone:{" "}
                  <a href="tel:+919266682733" className="text-webprimary">
                    +91 - 9266682733
                  </a>
                </li>
              </ul>
            </li>
            <li className="mb-2">
              Once a Consumer files a complaint via email or telephonic
              communication on the channels specified above, the Consumer will
              receive an acknowledgment of the grievance from the Grievance
              Officer, within 48 (forty-eight) hours.
            </li>
            <li className="mb-2">
              Each Consumer who has filed a complaint with the Grievance Officer
              shall receive a unique ID for tracking the status of their
              complaint. Consumer can track their complaint by writing email to
              <a
                href="mailto:connect@ranfortwellness.com"
                className="text-webprimary"
              >
                {" "}
                connect@ranfortwellness.com
              </a>
              .
            </li>
            <li className="mb-2">
              The Grievance Officer will undertake best endeavours to redress
              the grievances of the customer expeditiously but in any case,
              grievances will be redressed within 1 (one) month from the date of
              receipt of the grievance.
            </li>
            <li className="mb-2">
              A grievance will be considered as disposed-off and closed in any
              of the following instances, namely:
              <ul className="list-disc list-inside ml-4">
                <li className="mb-2">
                  Where the complainant has communicated its acceptance of the
                  response of the Grievance Officer / any other person
                  associated with the Company; or
                </li>
                <li className="mb-2">
                  Where the complainant has not responded within thirty days of
                  the receipt of the written response and has not raised any
                  grievance or complaint in respect of the same subject.
                </li>
              </ul>
            </li>
            <li className="mb-2">
              In the unlikely event that your issue remains unresolved to your
              satisfaction despite escalating to our Grievance Officer, you can
              reach out to our Nodal Officer (details specified below). We will
              respond within 7 (seven) business days from the date of receipt of
              your email.
            </li>
            <li className="mb-2">
              The contact numbers displayed above shall be operational on Monday
              to Saturday from 10:00 AM to 06:00 PM only (excluding national
              holidays).
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-webprimary my-4">
            4. Details of the Nodal Officer:
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            In accordance with the Consumer Protection (E-Commerce) Rules, 2020,
            the Company has appointed a resident nodal person (“Nodal Person”)
            who shall be responsible for ensuring compliance with the provisions
            of the Consumer Protection Act, 2019 and the rules made thereunder.
            You can contact the Nodal Officer through the below mentioned
            contact details in case of any escalation of complaints.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">Name: Mr. Sandeep Pandey</li>
            <li className="mb-2">
              Email:{" "}
              <a
                href="mailto:connect@ranfortwellness.com"
                className="text-webprimary"
              >
                connect@ranfortwellness.com
              </a>
            </li>
            <li className="mb-2">
              Phone:{" "}
              <a href="tel:+919266682733" className="text-webprimary">
                +91 - 9266682733
              </a>
            </li>
          </ol>
        </div>
      </Container>
    </div>
  );
}
