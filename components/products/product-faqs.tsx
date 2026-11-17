"use client";

import Container from "../container";
import { ProductWithCategory } from "@/types/product";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface ProductFaqsProps {
  product: ProductWithCategory;
  className?: string;
}

const ProductFaqs = ({ product }: ProductFaqsProps) => {
  const faqs = product.productFaqs || [];

  return (
    <div className="w-full">
      <Container>
        <div className="w-full md:min-w-[600px] bg-white rounded-xl shadow-sm p-4 md:p-6 border border-slate-100">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-slate-900 border-b border-slate-100 pb-3 md:pb-4 mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>

          {faqs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2 md:space-y-3"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border border-slate-200 rounded-lg px-3 md:px-4 bg-slate-50/60 data-[state=open]:bg-white transition-colors"
                >
                  <AccordionTrigger
                    className="
                      group
                      py-3 md:py-4
                      text-left text-sm md:text-base font-semibold
                      hover:no-underline no-underline
                      [&>svg]:hidden
                    "
                  >
                    <div className="flex flex-1 items-start gap-3 md:gap-4">
                      <span className="mt-0.5 text-xs md:text-sm font-medium text-slate-400">
                        {index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}
                      </span>
                      <span className="flex-1 text-slate-800">
                        {faq.question}
                      </span>
                    </div>

                    {/* + / - icon on the right */}
                    <div className="ml-3 flex items-center justify-center">
                      <span className="text-xl leading-none group-data-[state=open]:hidden">
                        +
                      </span>
                      <span className="text-xl leading-none hidden group-data-[state=open]:inline">
                        −
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-0 pb-4 md:pb-5 pl-7 md:pl-9 text-sm md:text-base text-slate-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-slate-600 text-center text-sm md:text-base">
              No FAQs found for this product.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductFaqs;
