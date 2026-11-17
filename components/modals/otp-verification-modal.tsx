"use client";

import { useEffect, useState, useTransition } from "react";
import * as z from "zod";
import "react-phone-input-2/lib/style.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { SubmitButton } from "@/components/submit-button";
import { OTPSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { OTPResponsiveModal } from "./otp-responsive-modal";
import { sendOtp } from "@/actions/send-otp";
import { useCheckoutStore } from "@/store/checkout-store";
import { checkoutRegister } from "@/actions/checkout-register";
import { useCheckoutController } from "@/hooks/use-checkout-controller";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const OTPVerificationModal = ({
  isOpen,
  onOpenChange,

  className,
}: OTPVerificationModalProps) => {
  const [canResend, setCanResend] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState<string>("");
  const {
    setOtpModalOpen,
    name,
    email,
    phoneNumber,
    checkoutPayload,
    setIsPaymentProcessing,
  } = useCheckoutStore();
  const { handlePaymentSubmit } = useCheckoutController();

  const isIndianNumber =
    phoneNumber?.startsWith("+91") || phoneNumber?.startsWith("91");

  useEffect(() => {
    if (isOpen) {
      if (isIndianNumber) {
        const countryCode = phoneNumber.match(/^\+\d+/)?.[0] || "+91";
        const actualPhoneNumber = phoneNumber.replace(countryCode, "");
        const maskedNumber = actualPhoneNumber.replace(
          /^(\d{3})(\d+)(\d{3})$/,
          (_, p1, middle, p3) => `${p1}${"*".repeat(middle.length)}${p3}`
        );

        const fullMaskedPhone = `${countryCode} ${maskedNumber}`;
        setMaskedPhoneNumber(fullMaskedPhone);
      } else {
        // Mask email like ab****yz@example.com
        const [localPart, domain] = email.split("@");
        const maskedEmail =
          localPart.length > 3
            ? `${localPart.slice(0, 2)}${"*".repeat(
                localPart.length - 3
              )}${localPart.slice(-1)}@${domain}`
            : `${localPart[0]}***@${domain}`;

        setMaskedPhoneNumber(maskedEmail); // reuse same state for email
      }
    }
  }, [phoneNumber, isOpen]);

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      code: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    if (isOpen) {
      setTimer(30);
      setCanResend(false);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isOpen]);
  const handleResendOTP = () => {
    startTransition(() => {
      setIsLoading(true);

      const otpPayload = isIndianNumber ? phoneNumber : email;
      sendOtp(otpPayload)
        .then((data) => {
          if (data?.error) {
            setError("Something went wrong");
          }

          if (data?.success) {
            setIsLoading(false);
            form.reset();
            setError("");
            setSuccess("OTP resent successfully");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
    // Reset timer and disable resend button
    setTimer(30); // Reset timer to 30 seconds
    setCanResend(false);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setCanResend(true); // Enable resend button
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (values: z.infer<typeof OTPSchema>) => {
    const registerPayload = {
      name,
      email,
      phoneNumber,
      referralCode: checkoutPayload?.referralCode,
      code: values.code,
    };
    try {
      const data = await checkoutRegister(registerPayload);

      if (data?.error) {
        setError(data.error);
        console.error("Something went wrong");
        return;
      }

      if (data?.user) {
        setOtpModalOpen(false);
        setIsPaymentProcessing(true);
        await handlePaymentSubmit(checkoutPayload!);
        setIsPaymentProcessing(false);
        return data.user;
      }
    } catch (err) {
      console.error("Something went wrong");
    }
  };
  return (
    <OTPResponsiveModal open={isOpen} onOpenChange={onOpenChange}>
      <div className="flex w-full max-w-xs mx-auto items-center justify-center z-50">
        <div className=" flex w-full max-w-xs flex-col justify-center items-center p-6 relative">
          <p className="text-center text-gray-500 mb-4">
            An OTP has been sent to your{" "}
            {isIndianNumber ? "phone number" : "email"}:{" "}
            <span className="font-semibold">{maskedPhoneNumber}</span>
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full px-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center">
                    <FormControl>
                      <div className="w-full max-w-md flex justify-center">
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resend OTP Logic */}
              <div className="text-center text-sm text-gray-500 font-semibold pt-6">
                {canResend ? (
                  <>
                    <button
                      onClick={handleResendOTP}
                      className="text-emerald-500 hover:underline"
                    >
                      Resend OTP
                    </button>
                    <button
                      onClick={() => setOtpModalOpen(false)}
                      className="text-red-500 hover:underline"
                    >
                      Want to change {isIndianNumber ? "phone number" : "email"}
                    </button>
                  </>
                ) : (
                  <span>
                    Resend OTP in{" "}
                    <span className="font-bold text-gray-700">{timer}s</span>
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-center pt-2 gap-y-2">
                <FormError message={error} />
                <FormSuccess message={isLoading ? "" : success} />
                <SubmitButton
                  isPending={isSubmitting}
                  isValid={isValid}
                  submitText="Confirm OTP"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </OTPResponsiveModal>
  );
};
