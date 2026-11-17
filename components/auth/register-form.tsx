"use client";

import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RegisterSchema, OTPRegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { SubmitButton } from "@/components/submit-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { resendOtp } from "@/actions/resend-otp";

export const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30); // Set initial timer value
  const [canResend, setCanResend] = useState(false);
  const [otpPhone, setOtpPhone] = useState<string | undefined>("");
  const [isIndianNumber, setIsIndianNumber] = useState<boolean>(false);

  const isIndian = (raw?: string) => {
    if (!raw) return false;
    const digits = raw.replace(/\D/g, "");
    return digits.startsWith("91");
  };

  const schema = showTwoFactor ? OTPRegisterSchema : RegisterSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      code: "",
    },
  });

  const { isValid } = form.formState;
  useEffect(() => {
    if (showTwoFactor) {
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
    }
  }, [showTwoFactor]);

  const handleResendOTP = () => {
    startTransition(() => {
      setIsLoading(true);
      const otpPayload = {
        phoneNumber: otpPhone,
      };

      if (!otpPayload.phoneNumber) {
        setError("Phone number is required");
        return;
      }

      resendOtp(otpPayload.phoneNumber)
        .then((data) => {
          if (data?.error) {
            setError("Something went wrong");
          }

          if (data?.success) {
            setIsLoading(false);
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

  const onSubmit = (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");
    setOtpPhone(values.phoneNumber);
    startTransition(() => {
      register(values, callbackUrl).then((data) => {
        if (data?.success) {
          form.reset();
          setIsLoading(false);
          setSuccess(data.success);

          localStorage.setItem("toastDisplayed", "false");
          router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
        }
        if (data.twoFactor) {
          setCanResend(true);
          const isIndianPhone = isIndian(values.phoneNumber);
          setIsIndianNumber(isIndianPhone); // Set for display purposes
          if (isIndianPhone && values.phoneNumber) {
            const countryCode =
              values.phoneNumber.match(/^\+\d+/)?.[0] || "+91";
            const actualPhoneNumber = values.phoneNumber.replace(
              countryCode,
              "",
            );
            const maskedNumber = actualPhoneNumber.replace(
              /^(\d{3})(\d+)(\d{3})$/,
              (_, p1, middle, p3) => `${p1}${"*".repeat(middle.length)}${p3}`,
            );

            const fullMaskedPhone = `${countryCode} ${maskedNumber}`;
            setMaskedPhoneNumber(fullMaskedPhone);
          } else {
            // Mask email like ab****yz@example.com
            const [localPart, domain] = values.email.split("@");
            const maskedEmail =
              localPart.length > 3
                ? `${localPart.slice(0, 2)}${"*".repeat(
                    localPart.length - 3,
                  )}${localPart.slice(-1)}@${domain}`
                : `${localPart[0]}***@${domain}`;
            setMaskedPhoneNumber(maskedEmail);
          }

          setShowTwoFactor(true);
        }
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <>
                {/* Display message with masked phone number */}
                <p className="text-center text-gray-500">
                  An OTP has been sent to your{" "}
                  {isIndianNumber ? "phone number" : "email"}:{" "}
                  <span className="font-semibold">{maskedPhoneNumber}</span>
                </p>

                {/* OTP Input field */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormLabel className="text-center">
                        Enter the OTP sent to your{" "}
                        {isIndianNumber ? "phone number" : "email"}
                      </FormLabel>
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
                <div className="text-center text-sm text-gray-500 font-semibold">
                  {canResend ? (
                    <button
                      onClick={handleResendOTP}
                      className="text-emerald-500 hover:underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span>
                      Resend OTP in{" "}
                      <span className="font-bold text-gray-700">{timer}s</span>
                    </span>
                  )}
                </div>
              </>
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          country={"in"}
                          value={field.value}
                          onChange={(phone) =>
                            form.setValue("phoneNumber", phone, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                          autoFormat
                          enableSearch={true}
                          disabled={isPending}
                          countryCodeEditable={false}
                          inputStyle={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #e2e8f0",
                            paddingLeft: "40px", // Ensure space for the flag and country code
                            boxSizing: "border-box",
                          }}
                          searchStyle={{
                            width: "90%",
                            height: "40px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Create Your Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={isLoading ? "" : success} />
          <SubmitButton
            isPending={isPending}
            isValid={isValid}
            submitText={showTwoFactor ? "Confirm OTP" : "Create an account"}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
