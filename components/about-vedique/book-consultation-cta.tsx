"use client";

import { useState } from "react";
import { CtaButton } from "../cta-button";
import { ResponsiveModal } from "../modals/responsive-modal";
import { LeadDetailsForm } from "../forms/lead-details-form";

interface BookConsultationCtaProps {
  btnTitle?: string;
  variant?: "primary" | "outline";
}

export const BookConsultationCta = ({
  btnTitle,
  variant,
}: BookConsultationCtaProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <CtaButton
          onClick={() => setOpen(true)}
          label={btnTitle || "Book Your Consultation"}
          variant={variant || "primary"}
          className="w-full sm:w-auto"
        />
      </div>

      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <div className="p-4 sm:p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center">
            Enter Your Details
          </h2>

          <LeadDetailsForm
            onSuccess={() => setOpen(false)}
            onCloseModal={() => setOpen(false)}
          />
        </div>
      </ResponsiveModal>
    </>
  );
};
