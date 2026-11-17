import Link from "next/link";
import { Metadata } from "next";

import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";

const meta = {
  title: "Return & Refund Policy - Vedique",
  description:
    "Read the Return & Refund Policy for Ranfort Wellness, including eligibility, process, timelines, and terms for product returns and refunds.",
  image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/meta-images/return-refund.webp`,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/return-and-refund-policy`,
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
        alt: "Return & Refund Policy - Vedique",
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

export default function ReturnRefundPolicyPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Return & Refund Policy"
        pageTitle="Return & Refund Policy"
      />

      <Container>
        <div className="bg-white py-8 mb-16">
          <p className="text-md mb-6 text-center md:text-left">
            RETURN, REFUND, AND CANCELLATION POLICY of Ranfort Wellness Private
            Limited&apos;s (the “Company” or “
            <Link href="/" className="text-webprimary">
              https://www.ranfortwellness.com
            </Link>
            ” or “We” or “Us”)
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            The Company facilitates processing correct products as per order and
            strives to service the products in the right conditions / without
            any damage every time a consumer places an order. We also strongly
            recommend the items are checked at the time of delivery.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            1 - Return, Replacement & Refund of Products
          </h2>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            1. Return
          </h3>
          <p className="text-md mb-6 text-center md:text-left">
            Return means an action of giving back the product ordered at Ranfort
            Wellness portal by the consumer. The following situations may arise
            which may cause the action of return of product:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Product(s) delivered do not match your order.
            </li>
            <li className="mb-2">
              Product(s) delivered were damaged in transit (do not to accept
              product which has a tampered seal)
            </li>
          </ol>
          <p className="text-md mb-6 text-center md:text-left">
            Note: If the product that you have received is damaged, then do not
            accept the delivery of that product. If after opening the package
            you discover that the product is damaged, the same may be returned
            for a refund. Please note that we cannot promise a replacement for
            all products as it will depend on the availability of the product,
            in such cases we will offer a refund.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            In the aforesaid unlikely situations, if there is something wrong
            with the order, we&apos;d be happy to assist and resolve your
            concern. You may raise a Return request with our customer care
            within 15 (Fifteen) days from the delivery of the product. The
            Company reserves the right to cancel the Return request if the
            customer reaches out to us after 15 days of delivery.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Upon receiving a Return/Refund request, the Company shall verify the
            authenticity and the nature of the request. If the Company finds
            that a request is genuine, it will initiate the Return and Refund
            process.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            In the event of frivolous and unjustified complaints regarding the
            quality and content of the products, The Company reserves the right
            to pursue necessary legal actions against you and you will be solely
            liable for all costs incurred by us in this regard.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            The returns are subject to the below conditions: -
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Any wrong ordering of product doesn’t qualify for Return;
            </li>
            <li className="mb-2">
              Product being returned should only be in their original
              manufacturer&apos;s packaging i.e., with original labels and
              invoice; and
            </li>
            <li className="mb-2">
              The product being returned should be unused and sealed.
            </li>
          </ol>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            2. RETURN PROCESS
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              For Return intimation, call us at{" "}
              <a href="tel:+911206489403" className="text-webprimary">
                {" "}
                +91-120-6489403
              </a>{" "}
              or send us an email at{" "}
              <a
                href="mailto:connect@ranfortwellness.com"
                className="text-webprimary"
              >
                connect@ranfortwellness.com
              </a>
              .
            </li>
            <li className="mb-2">
              The company customer care team will verify the claim made by the
              customer within 72 (seventy-two) business hours from the time of
              receipt of the return request.
            </li>
            <li className="mb-2">
              Once the claim is verified as genuine and reasonable, Company team
              will initiate the collection of products to be returned.
            </li>
            <li className="mb-2">
              The customer will be required to pack the product(s) in the
              original manufacturer’s packaging.
            </li>
            <li className="mb-2">
              Refund/Replacement will be completed within 30 (thirty) days from
              date of reverse pick up (if required).
            </li>
          </ol>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            2. Refund Policy of Blood Test:
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            In case of Blood tests, a Refund request may be raised in the
            following cases:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              If the customer has canceled the order for Blood test till the
              collection of samples or within 7 (Seven) days from the date of
              making the payment if sample is not collected. However, Refund
              will be subject to deduction of 3% as a cancellation fee on the
              amount paid by the Customer.
            </li>
            <li className="mb-2">
              In Case Customer fail to opt any option as mentioned in point (1),
              Company shall have right to forfeit the fees already paid in such
              a case.
            </li>
          </ol>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            3. Refund Policy for Online Consultation:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Company provides Nutritional Consultancy aimed at disease
              management besides enhancing the health status of the individual,
              however keeping in mind the complexity of the human body and
              behaviors. It is not possible for the Company to guarantee the
              results.
            </li>
            <li className="mb-2">
              The subscription fee is non-extendable. The client must start the
              program within 3 months of the date of making the payment. After
              that the company reserves the right to forfeit the amount paid by
              the client.
            </li>
            <li className="mb-2">
              In view of the above policy members are requested to avail
              consultations with regularity to benefit maximally.
            </li>
            <li className="mb-2">
              The Fees are non transferable to any another person.
            </li>
            <li className="mb-2">
              The clients are requested to register only after a clear
              understanding of the process involved, as the Company cannot be
              held liable thereafter.
            </li>
            <li className="mb-2">
              The results vary according to age, genetics, activity, gender, and
              compliance on Diet.
            </li>
            <li className="mb-2">The fees is non refundable in any case.</li>
            <li className="mb-2">
              Clients are requested to maintain regular contact with the
              respective health-consultant for the program.
            </li>
            <li className="mb-2">
              Clients are not allowed to take any break during the term of the
              program.
            </li>
          </ol>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            4. Refund Policy for Academy
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">The course fee is non-refundable.</li>
            <li className="mb-2">
              Students have an option to enroll for the selective course by
              making payment of the registration fee.
            </li>
            <li className="mb-2">
              The balance/remaining amount after the registration fees should be
              paid within 30 days from the date of registration.
            </li>
            <li className="mb-2">
              The balance amount after the registration should be paid in ONE
              GO.
            </li>
            <li className="mb-2">
              The registration fee will be forfeited in case of non-receipt of
              balance amount within 30 days.
            </li>
          </ol>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            5. Refund Process
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            In all the above cases, if the claim is found to be valid, Refund
            will be made as mentioned below:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Order placed through online wallet will be credited to the wallet
              or a credit will automatically be applied to your credit card or
              original method of payment; and
            </li>
            <li className="mb-2">
              Order placed through cash on delivery will be refunded through
              fund transfer to customer bank account or by issuing cheque in
              favor of Customer.
            </li>
          </ol>
          <p className="text-md mb-6 text-center md:text-left">
            For any further Refund related information, please write to
            <a
              href="mailto:connect@ranfortwellness.com"
              target="_blank"
              className="text-webprimary"
            >
              connect@ranfortwellness.com
            </a>
            .
          </p>
          <h2 className="text-2xl font-semibold text-webprimary my-4">
            6. Cancellation Policy
          </h2>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            Customer cancellation:
          </h3>

          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              The customer can cancel the order for the product till the Company
              ship it. Orders once shipped cannot be cancelled.
            </li>
            <li className="mb-2">
              The customer can cancel the order for Blood test till the
              collection of samples.
            </li>
            <li className="mb-2">
              No cancellation charges shall be levied for cancellation of an
              order in accordance with the terms of this policy.
            </li>
          </ol>
          <h3 className="text-xl font-semibold text-webprimary my-4">
            Company’s cancellation:
          </h3>
          <p className="text-md mb-6 text-center md:text-left">
            There may be certain orders that the Company is unable to accept and
            service and these may need to be cancelled. Some situations that may
            result in your order being cancelled include which may not be
            exhaustive, viz:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Non-availability of the product or quantities ordered by you or
              inaccuracies or errors in pricing information specified.
            </li>
            <li className="mb-2">Invalid address given in order details;</li>
            <li className="mb-2">Any malpractice used to place the order.</li>
          </ol>
        </div>
      </Container>
    </div>
  );
}
