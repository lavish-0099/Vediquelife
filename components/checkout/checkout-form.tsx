"use client";

import { FormProvider } from "react-hook-form";
import BillingForm from "@/components/checkout/billing-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CouponSection } from "./coupon-section";
import CheckoutSummary from "./checkout-summary";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCheckoutController } from "@/hooks/use-checkout-controller";
import { useCheckoutForm } from "@/hooks/use-checkout-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { OTPVerificationModal } from "@/components/modals/otp-verification-modal";
import { ProcessingOverlay } from "@/components/processing-overlay";

const CheckoutForm = () => {
  const {
    sameAsBilling,
    setSameAsBilling,
    otpModalOpen,
    isPaymentProcessing,
    setOtpModalOpen,
  } = useCheckoutStore();
  const user = useCurrentUser();

  const { handlePaymentSubmit } = useCheckoutController();

  const checkoutForm = useCheckoutForm(user, sameAsBilling);
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = checkoutForm;

  const toggleSameAsBilling = (checked: boolean) => {
    setSameAsBilling(checked);

    if (checked) {
      // Shipping fields cleanly reset
      reset(
        (values) => ({
          ...values,
          shippingAddress: undefined,
        }),
        {
          keepDirty: false,
          keepErrors: false,
        },
      );
    }
  };

  return (
    <>
      <FormProvider
        {...checkoutForm}
        key={sameAsBilling ? "billing" : "checkout"}
      >
        <Form {...checkoutForm}>
          <form onSubmit={handleSubmit(handlePaymentSubmit)}>
            <div className="w-full flex flex-col md:flex-row pt-12 gap-0 md:gap-10 justify-between items-start">
              <div className="w-full md:w-4/6">
                <BillingForm isSubmitting={isSubmitting} />
                <div className="w-full flex flex-col items-start justify-start bg-white rounded-md p-4 shadow-sm transition mb-10">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="shippingDiffrent"
                      checked={sameAsBilling}
                      onCheckedChange={toggleSameAsBilling}
                      style={{
                        backgroundColor: sameAsBilling ? "#41632e" : "#eec400",
                      }}
                    />
                    <Label htmlFor="shippingDiffrent">
                      Shipping address same as billing address
                    </Label>
                  </div>
                </div>

                {!sameAsBilling && <ShippingForm isSubmitting={isSubmitting} />}
              </div>
              <div className="w-full md:max-w-md flex flex-col">
                {/* Coupon Section */}
                <div className="mb-4">
                  <CouponSection />
                </div>

                {/* Summary */}
                <div className="bg-white rounded-md p-4 shadow-sm transition mb-4">
                  <div className="meta-summary-wrapper">
                    <CheckoutSummary />
                  </div>
                </div>
                <div className="mb-4">
                  <Button
                    className="relative bg-webprimary hover:bg-webvedique w-full font-bold rounded-md p-6 shadow-sm transition overflow-hidden mt-4"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    <span className="relative flex items-center">
                      <span className="transition-transform">
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          "Proceed to Payment"
                        )}
                      </span>
                      <FaArrowRight className="ml-2 opacity-100 group-hover:opacity-0 duration-300 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </FormProvider>
      {otpModalOpen && (
        <OTPVerificationModal
          isOpen={otpModalOpen}
          onOpenChange={setOtpModalOpen}
        />
      )}
      {isPaymentProcessing && (
        <ProcessingOverlay message="Processing your order..." />
      )}
    </>
  );
};

export default CheckoutForm;
