import Link from "next/link";
import { Metadata } from "next";

import Container from "@/components/container";
import { PageHeader } from "@/components/page-header";

const meta = {
  title: "Terms & Conditions - Vedique",
  description:
    "Read the Terms & Conditions of using Ranfort Wellness services, including payments, subscriptions, prohibited uses, and legal disclaimers.",
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
        alt: "Terms & Conditions - Vedique",
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

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white">
      <PageHeader title="Terms & Conditions" pageTitle="Terms & Conditions" />

      <Container>
        <div className="bg-white py-8 mb-16">
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            1. Introduction
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Welcome to Vedique, a brand owned by Ranfort Wellness Pvt. Ltd.
            (“Company”, “we”, “our”, “us”)!
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            These Terms of Service (“Terms”, “Terms of Service”) govern your use
            of our website located at{" "}
            <Link href="/" className="text-webprimary">
              https://www.vedique.life
            </Link>{" "}
            (the “Service”) operated by{" "}
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Our Privacy Policy also governs your use of our Service and explains
            how we collect, safeguard and disclose information resulting from
            your use of our web pages.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Your agreement with us includes these Terms and our Privacy Policy
            (“Agreements”). You acknowledge that you have read and understood
            Agreements and agree to be bound by them.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            If you do not agree with (or cannot comply with) Agreements, then
            you may not use the Service. These Terms apply to all visitors,
            users and others who wish to access or use Service.
          </p>

          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            2. Communications
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            By using our Service, you agree to receive newsletters, marketing or
            promotional materials and other information we may send. You may opt
            out at any time by using the unsubscribe link or emailing{" "}
            <a
              href="mailto:connect@ranfortwellness.com"
              target="_blank"
              className="text-webprimary"
            >
              connect@ranfortwellness.com
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            3. Purchases
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            If you wish to purchase any product or service made available
            through Service (“Purchase”), you may be asked to supply certain
            information relevant to your Purchase including but not limited to,
            your credit or debit card number, the expiration date of your card,
            your billing address, and your shipping information.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            You represent and warrant that: (i) you have the legal right to use
            any card(s) or other payment method(s) in connection with any
            Purchase; and that (ii) the information you supply to us is true,
            correct and complete.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            We may employ the use of third-party services for the purpose of
            facilitating payment and the completion of Purchases. By submitting
            your information, you grant us the right to provide the information
            to these third parties subject to our Privacy Policy.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            We reserve the right to refuse or cancel your order at any time for
            reasons including but not limited to: product or service
            availability, errors in the description or price of the product or
            service, error in your order or other reasons.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            We reserve the right to refuse or cancel your order if fraud or an
            unauthorized or illegal transaction is suspected.
          </p>

          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            4. Contests, Sweepstakes and Promotions
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Any contests, sweepstakes or other promotions (collectively,
            “Promotions”) made available through Service may be governed by
            rules that are separate from these Terms of Service. If you
            participate in any Promotions, please review the applicable rules as
            well as our Privacy Policy. If the rules for a Promotion conflict
            with these Terms of Service, Promotion rules will apply.
          </p>

          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            5. Subscriptions
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Some parts of Service are billed on a subscription basis
            (&quot;Subscription(s)&quot;). You will be billed in advance on a
            recurring and periodic basis (&quot;Billing Cycle&quot;). Billing
            cycles will be set depending on the type of subscription plan you
            select when purchasing a Subscription. At the end of each Billing
            Cycle, your Subscription will automatically renew under the exact
            same conditions unless you cancel it or{" "}
            <span className="text-webprimary"> Ranfort Wellness Pvt. Ltd.</span>
            cancels it.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            You may cancel your Subscription renewal either through your online
            account management page or by contacting at{" "}
            <a
              href="mailto:connect@ranfortwellness.com"
              className="text-webprimary"
            >
              connect@ranfortwellness.com
            </a>{" "}
            customer support team.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            A valid payment method is required to process the payment for your
            subscription. You shall provide{" "}
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>{" "}
            with accurate and complete billing information that may include but
            not limited to full name, address, state, postal or zip code,
            telephone number, and a valid payment method information. By
            submitting such payment information, you automatically authorize
            Ranfort Wellness Pvt. Ltd. to charge all Subscription fees incurred
            through your account to any such payment instruments.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Should automatic billing fail to occur for any reason, Ranfort
            Wellness Pvt. Ltd. reserves the right to terminate your access to
            the Service with immediate effect.
          </p>

          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            6. Refund
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Once payments are received, no return/refund can be entertained.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            7. Fee Changes
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>,
            in its sole discretion and at any time, may modify Subscription fees
            for the Subscriptions. Any Subscription fee change will become
            effective at the end of the then-current Billing Cycle.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>{" "}
            will provide you with a reasonable prior notice of any change in
            Subscription fees to give you an opportunity to terminate your
            Subscription before such change becomes effective.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Your continued use of Service after Subscription fee change comes
            into effect constitutes your agreement to pay the modified
            Subscription fee amount.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            8. Content
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Content found on or through this Service are the property of{" "}
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>{" "}
            or used with permission. You may not distribute, modify, transmit,
            reuse, download, repost, copy, or use said Content, whether in whole
            or in part, for commercial purposes or for personal gain, without
            express advance written permission from us.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            9. Prohibited Uses
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            You may use Service only for lawful purposes and in accordance with
            Terms. You agree not to use Service:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              In any way that violates any applicable national or international
              law or regulation.
            </li>
            <li className="mb-2">
              For the purpose of exploiting, harming, or attempting to exploit
              or harm minors in any way by exposing them to inappropriate
              content or otherwise.
            </li>
            <li className="mb-2">
              To transmit, or procure the sending of, any advertising or
              promotional material, including any “junk mail”, “chain letter,”
              “spam,” or any other similar solicitation.
            </li>
            <li className="mb-2">
              To impersonate or attempt to impersonate Company, a Company
              employee, another user, or any other person or entity.
            </li>
            <li className="mb-2">
              In any way that infringes upon the rights of others, or in any way
              is illegal, threatening, fraudulent, or harmful, or in connection
              with any unlawful, illegal, fraudulent, or harmful purpose or
              activity.
            </li>
            <li className="mb-2">
              To engage in any other conduct that restricts or inhibits anyone’s
              use or enjoyment of Service, or which, as determined by us, may
              harm Company or users of Service or expose them to liability.
            </li>
          </ol>
          <p className="text-md mb-6 text-center md:text-left">
            Additionally, you agree not to:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-md leading-relaxed pl-4">
            <li className="mb-2">
              Use Service in any manner that could disable, overburden, damage,
              or impair Service or interfere with any other party’s use of
              Service, including their ability to engage in real time activities
              through Service.
            </li>
            <li className="mb-2">
              Use any robot, spider, or other automatic device, process, or
              means to access Service for any purpose, including monitoring or
              copying any of the material on Service.
            </li>
            <li className="mb-2">
              Use any manual process to monitor or copy any of the material on
              Service or for any other unauthorized purpose without our prior
              written consent.
            </li>
            <li className="mb-2">
              Use any device, software, or routine that interferes with the
              proper working of Service.
            </li>
            <li className="mb-2">
              Introduce any viruses, trojan horses, worms, logic bombs, or other
              material which is malicious or technologically harmful.
            </li>
            <li className="mb-2">
              Attempt to gain unauthorized access to, interfere with, damage, or
              disrupt any parts of Service, the server on which Service is
              stored, or any server, computer, or database connected to Service.
            </li>
            <li className="mb-2">
              Attack Service via a denial-of-service attack or a distributed
              denial-of-service attack.
            </li>
            <li className="mb-2">
              Take any action that may damage or falsify Company rating.
            </li>
            <li className="mb-2">
              Otherwise attempt to interfere with the proper working of Service.
            </li>
          </ol>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            10. Analytics
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            We may use third-party Service Providers to monitor and analyse the
            use of our Service.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            11. No Use By Minors
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Service is intended only for access and use by individuals at least
            eighteen (18) years old. By accessing or using Service, you warrant
            and represent that you are at least eighteen (18) years of age and
            with the full authority, right, and capacity to enter into this
            agreement and abide by all of the terms and conditions of Terms. If
            you are not at least eighteen (18) years old, you are prohibited
            from both the access and usage of Service.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            12. Accounts
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            When you create an account with us, you guarantee that you are above
            the age of 18, and that the information you provide us is accurate,
            complete, and current at all times. Inaccurate, incomplete, or
            obsolete information may result in the immediate termination of your
            account on Service.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            You are responsible for maintaining the confidentiality of your
            account and password, including but not limited to the restriction
            of access to your computer and/or account. You agree to accept
            responsibility for any and all activities or actions that occur
            under your account and/or password, whether your password is with
            our Service or a third-party service. You must notify us immediately
            upon becoming aware of any breach of security or unauthorized use of
            your account.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            You may not use as a username the name of another person or entity
            or that is not lawfully available for use, a name or trademark that
            is subject to any rights of another person or entity other than you,
            without appropriate authorization. You may not use as a username any
            name that is offensive, vulgar or obscene.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            We reserve the right to refuse service, terminate accounts, remove
            or edit content, or cancel orders in our sole discretion.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            13. Intellectual Property
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Service and its original content (excluding Content provided by
            users), features and functionality are and will remain the exclusive
            property of{" "}
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>{" "}
            and its licensors. Service is protected by Indian copyright and
            trademark Law. Our trademarks may not be used in connection with any
            product or service without the prior written consent of{" "}
            <span className="text-webprimary">
              Ranfort Wellness Pvt. Ltd.
            </span>{" "}
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            14. Links To Other Web Sites
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Our Service may contain links to third party web sites or services
            that are not owned or controlled by{" "}
            <span className="text-webprimary">
              Ranfort Wellness Pvt. Ltd.
            </span>{" "}
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>{" "}
            has no control over, and assumes no responsibility for the content,
            privacy policies, or practices of any third-party web sites or
            services. We do not warrant the offerings of any of these
            entities/individuals or their websites.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            You acknowledge and agree that{" "}
            <span className="text-webprimary">Ranfort Wellness Pvt. Ltd.</span>{" "}
            shall not be responsible or liable, directly or indirectly, for any
            damage or loss caused or alleged to be caused by or in connection
            with the use of or reliance on any such content, goods or services
            available on or through any such web sites or services.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            15. Disclaimer Of Warranty
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            These services are provided by the company on an “as is” and “as
            available” basis. The company makes no representations or warranties
            of any kind, express or implied, as to the operation of their
            services, or the information, content or materials included therein.
            You expressly agree that your use of these services, their content,
            and any services or items obtained from us is at your sole risk.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Neither the company nor any person associated with the company makes
            any warranty or representation with respect to the completeness,
            security, reliability, quality, accuracy, or availability of the
            services. Without limiting the foregoing, neither the company nor
            anyone associated with the company represents or warrants that the
            services, their content, or any services or items obtained through
            the services will be accurate, reliable, error-free, or
            uninterrupted; that defects will be corrected; that the services or
            the server that makes it available are free of viruses or other
            harmful components; or that the services or any services or items
            obtained through the services will otherwise meet your needs or
            expectations.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Company hereby disclaims all warranties of any kind, whether express
            or implied, statutory, or otherwise, including but not limited to
            any warranties of merchantability, non-infringement, and fitness for
            a particular purpose.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            The foregoing does not affect any warranties which cannot be
            excluded or limited under applicable law.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            16. Limitation Of Liability
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Except as prohibited by law, you will hold us and our officers,
            directors, employees, and agents harmless for any indirect,
            punitive, special, incidental, or consequential damage, however it
            arises (including attorneys’ fees and all related costs and expenses
            of litigation and arbitration, or at trial or on appeal, if any,
            whether or not litigation or arbitration is instituted), whether in
            an action of contract, negligence, or other tortious action, or
            arising out of or in connection with this agreement, including
            without limitation any claim for personal injury or property damage,
            arising from this agreement and any violation by you of any federal,
            state, or local laws, statutes, rules, or regulations, even if
            company has been previously advised of the possibility of such
            damage.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Except as prohibited by law, if there is liability found on the part
            of company, it will be limited to the amount paid for the products
            and/or services, and under no circumstances will there be
            consequential or punitive damages.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Some states do not allow the exclusion or limitation of punitive,
            incidental or consequential damages, so the prior limitation or
            exclusion may not apply to you.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            17. Termination
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            We may terminate or suspend your account and bar access to Service
            immediately, without prior notice or liability, under our sole
            discretion, for any reason whatsoever and without limitation,
            including but not limited to a breach of Terms.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            If you wish to terminate your account, you may simply discontinue
            using Service.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            All provisions of Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            18. Governing Law
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            These Terms shall be governed and construed in accordance with the
            laws of India, which governing law applies to agreement without
            regard to its conflict of law provisions.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service and supersede and replace any prior agreements we might have
            had between us regarding Service.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            19. Changes To Service
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            We reserve the right to withdraw or amend our Service, and any
            service or material we provide via Service, in our sole discretion
            without notice. We will not be liable if for any reason all or any
            part of Service is unavailable at any time or for any period. From
            time to time, we may restrict access to some parts of Service, or
            the entire Service, to users, including registered users.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            20. Amendments To Terms
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            We may amend Terms at any time by posting the amended terms on this
            site. It is your responsibility to review these Terms periodically.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            Your continued use of the Platform following the posting of revised
            Terms means that you accept and agree to the changes. You are
            expected to check this page frequently so you are aware of any
            changes, as they are binding on you.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            By continuing to access or use our Service after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            Service.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            21. Waiver And Severability
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            No waiver by Company of any term or condition set forth in Terms
            shall be deemed a further or continuing waiver of such term or
            condition or a waiver of any other term or condition, and any
            failure of Company to assert a right or provision under Terms shall
            not constitute a waiver of such right or provision.
          </p>
          <p className="text-md mb-6 text-center md:text-left">
            If any provision of Terms is held by a court or other tribunal of
            competent jurisdiction to be invalid, illegal or unenforceable for
            any reason, such provision shall be eliminated or limited to the
            minimum extent such that the remaining provisions of Terms will
            continue in full force and effect.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            22. Acknowledgement
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            By using this service or other services provided by us, you
            acknowledge that you have read these terms and conditions and agree
            to be bound by them.
          </p>
          <h2 className="text-2xl font-semibold text-webprimary mb-4">
            23. Contact Us
          </h2>
          <p className="text-md mb-6 text-center md:text-left">
            Please send your feedback, comments, requests for technical support
            by email:{" "}
            <a
              href="mailto:connect@ranfortwellness.com"
              target="_blank"
              className="text-webprimary"
            >
              connect@ranfortwellness.com
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
