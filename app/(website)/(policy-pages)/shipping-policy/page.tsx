import { Metadata } from "next";

import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";

const meta = {
  title: "Shipping Policy - Vedique",
  description:
    "Read the Shipping Policy for Ranfort Wellness, including delivery timelines, shipping charges, service locations, and order tracking information.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/shipping.webp`,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/shipping-policy`,
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
        alt: "Shipping Policy - Vedique",
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

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white">
      <PageHeader title="Shipping Policy" pageTitle="Shipping Policy" />

      <Container>
        <div className="bg-white py-8 mb-16">
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            Payment Policy
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              An invoice will be provided once the Company will receive the full
              payment of the Product/Service Provided. However, In Case of Blood
              Test, Invoice will be provided after the Blood Sample collection.
            </li>
            <li className="mb-2">
              Company accepts the following forms of payment -
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li className="mb-2">
                  All electronic means like Debit Card / Net Banking/Mobile
                  Payment
                </li>
                <li className="mb-2">
                  Payments are processed through ICICI, Pay U and PayPal Payment
                  gateways.
                </li>
                <li className="mb-2">
                  MasterCard or Visa Credit Cards / Debit or ATM Card
                </li>
                <li className="mb-2">Wire / Bank / Fund Transfer</li>
                <li className="mb-2">Demand Draft</li>
                <li className="mb-2">
                  PhonePe/BHIM UPI, Paytm, Amazon Pay, Free Charge, Ola Money
                  (Postpaid Wallet), Airtel Money, Jio Money
                </li>
                <li className="mb-2">Cash on Delivery</li>
              </ul>
            </li>
          </ol>
          <p className="text-md mb-6 text-center md:text-left">
            Note: For secure payment flow we are using SSL Certificate.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            Shipping Policy
          </h2>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            How does the delivery process work?
          </h3>

          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Once Order is Placed, your order is processed.
            </li>
            <li className="mb-2">
              It takes 48 Hours to confirm payment with the bank.
            </li>
            <li className="mb-2">
              Once payment is confirmed with bank, our system processes your
              order, and your products are inspected thoroughly to ensure they
              are in a perfect condition.
            </li>
            <li className="mb-2">
              After they pass through the final round of quality checks, they
              are packed and handed over to our trusted and leading delivery
              partner.
            </li>
            <li className="mb-2">
              Our delivery partners then bring the package to you at the
              earliest possibility. In case, they are unable to reach your
              provided address or at a suitable time, they will contact you to
              resolve the issue.
            </li>
          </ol>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            How are items packaged?
          </h3>
          <p className="text-md mb-6 text-center md:text-left">
            We package our products in corrugated boxes. Each individual product
            is packaged in bubble wrap while fragile items like bottles are
            safely secured with additional bubble wrap.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            We pride ourselves on the quality of our packaging.
          </p>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            What is the range of locations to which a Company ships their
            products?
          </h3>
          <p className="text-md mb-6 text-center md:text-left">
            A Company ships throughout India.
          </p>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            My order has been shipped. Now how can I track it?
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Once your order has been dispatched, you will receive an email/SMS
              with the details of the tracking number and the courier company
              that is processing your order.
            </li>
            <li className="mb-2">
              You can track the status of your package 24 hours after your order
              is dispatched from our warehouse.
            </li>
            <li className="mb-2">
              Following are some our trusted courier partners:
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li className="mb-2">
                  Delhivery -{" "}
                  <a
                    href="https://www.delhivery.com/"
                    target="_blank"
                    className="text-webprimary"
                  >
                    http://www.delhivery.com/
                  </a>
                </li>
                <li className="mb-2">
                  Fedex -{" "}
                  <a
                    href="https://www.fedex.com/"
                    target="_blank"
                    className="text-webprimary"
                  >
                    https://www.fedex.com/
                  </a>
                </li>
              </ul>
            </li>
          </ol>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            What is the estimated delivery time?
          </h3>
          <p className="text-md mb-6 text-center md:text-left">
            We usually dispatch most orders within 7-10 business days (excluding
            Sundays and public holidays)
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            While Company shall make reasonable endeavor’s in ensuring that
            purchased Product(s) is delivered to its users in a timely manner,
            delivery may be delayed on account of
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">Unsuitable weather conditions;</li>
            <li className="mb-2">
              Political disruptions, strikes, employee-lockouts, Govt. directed
              lockdowns, etc.
            </li>
            <li className="mb-2">
              Acts of God such as floods, earthquakes, etc.; and
            </li>
            <li className="mb-2">Other unforeseen circumstances.</li>
          </ol>
          <p className="text-md mb-6 text-center md:text-left">
            In such events of delay, the Company shall make a reasonable attempt
            at proactively intimating the end user by writing to the end user’s
            registered email account and/or mobile number. Further, Company
            shall be under no obligation to compensate the user for any mental
            agony or any tortuous claim that may otherwise arise because of a
            delay in the shipment and delivery.
          </p>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            Are there any shipping charges applicable on my order?
          </h3>
          <p className="text-md mb-6 text-center md:text-left">
            Estimated shipping charges are calculated as per the value of the
            order and can be viewed in the cart section at the time of checkout.
            For any further shipping related information, please write to
            <a
              href="mailto:connect@ranfortwellness.com"
              className="text-webprimary"
            >
              {" "}
              connect@ranfortwellness.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
