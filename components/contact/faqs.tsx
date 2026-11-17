import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>
          You can reach our support team via email at{" "}
          <a
            href="mailto:marketing@thevedique.com"
            className="text-red-700 hover:underline"
          >
            marketing@thevedique.com
          </a>{" "}
          or through the contact form on our website.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>When can I expect a response?</AccordionTrigger>
        <AccordionContent>
          We typically respond to inquiries within 24 hours during weekdays.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you offer phone support?</AccordionTrigger>
        <AccordionContent>
          At this time, we provide support via email and the contact form only.
          We are committed to responding promptly to your queries.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          How do I choose the right Ayurvedic product for me?
        </AccordionTrigger>
        <AccordionContent>
          You can use our online consultation tool to get personalized Ayurvedic
          product recommendations based on your unique needs and dosha type. You
          can also explore our detailed product descriptions for more
          information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Can I save my favorite products?</AccordionTrigger>
        <AccordionContent>
          Yes, by creating an account, you can save your favorite products to
          easily access them later. This allows you to keep track of the
          products you love and quickly reorder them.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          How do I use Ayurvedic products effectively?
        </AccordionTrigger>
        <AccordionContent>
          Each product comes with detailed usage instructions. Additionally, our
          website and app provide expert tips and guides on how to incorporate
          Ayurveda into your daily routine for maximum benefits.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
