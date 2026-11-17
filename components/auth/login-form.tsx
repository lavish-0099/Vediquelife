"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

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
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { SubmitButton } from "@/components/submit-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/lib/utils";
import { useUserCountry } from "@/context/user-country-context";
import { resendOtp } from "@/actions/resend-otp";
import { EmailLoginSchema, OTPLoginSchema, TwoFactorSchema } from "@/schemas";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"otp" | "email">("otp");
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState<string>("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpPhone, setOtpPhone] = useState<string | undefined>("");
  const { userCountry } = useUserCountry();

  // Dynamically choose schema based on activeTab and two-factor state
  const formSchema = showTwoFactor
    ? TwoFactorSchema
    : activeTab === "otp"
    ? OTPLoginSchema
    : EmailLoginSchema;

  // Initialize form with dynamic schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
      code: "",
    },
  });

  const { isValid } = form.formState;

  useEffect(() => {
    if (userCountry && userCountry !== "IN") {
      setActiveTab("email");
    }
  }, [userCountry]);
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
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setIsLoading(true);
      setOtpPhone(values.phoneNumber);
      const loginPayload = {
        email: activeTab === "otp" ? undefined : values.email,
        password: activeTab === "otp" ? undefined : values.password,
        code: activeTab === "otp" ? values.code : undefined,
        phoneNumber: activeTab === "otp" ? values.phoneNumber : undefined,
      };

      login(loginPayload, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setIsLoading(false);

            setSuccess(data.success);

            localStorage.setItem("toastDisplayed", "false");
            router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
          }

          if (data?.twoFactor) {
            setCanResend(true);
            const countryCode = values.phoneNumber!.match(/^\+\d+/)?.[0] || "+";
            const actualPhoneNumber = values.phoneNumber!.replace(
              countryCode,
              ""
            );
            const maskedNumber = actualPhoneNumber.replace(
              /^(\d{3})(\d+)(\d{3})$/,
              (_, p1, middle, p3) => `${p1}${"*".repeat(middle.length)}${p3}`
            );

            const fullMaskedPhone = `${countryCode} ${maskedNumber}`;
            setMaskedPhoneNumber(fullMaskedPhone);
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const handleEmailLogin = () => {
    setActiveTab("email");
    form.reset();
    setShowTwoFactor(false);
  };
  const handleOtpLogin = () => {
    setActiveTab("otp");
    form.reset();
    setShowTwoFactor(false);
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      {userCountry === "IN" && (
        <div className="flex justify-center space-x-4 mb-4">
          <Button
            variant={activeTab === "otp" ? "default" : "outline"}
            onClick={handleOtpLogin}
            className={cn(
              "",
              activeTab === "otp"
                ? "bg-webprimary text-white px-4 py-2 rounded-md"
                : ""
            )}
          >
            Login with OTP
          </Button>
          <Button
            variant={activeTab === "email" ? "default" : "outline"}
            onClick={handleEmailLogin}
            className={cn(
              "",
              activeTab === "email"
                ? "bg-webprimary text-white px-4 py-2 rounded-md"
                : ""
            )}
          >
            Login with Password
          </Button>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {activeTab === "otp" && !showTwoFactor && (
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
                        inputStyle={{
                          width: "100%",
                          height: "40px",
                          border: "1px solid #e2e8f0",
                          paddingLeft: "40px",
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
            )}

            {showTwoFactor && userCountry === "IN" && (
              <>
                {/* Display message with masked phone number */}
                <p className="text-center text-gray-500">
                  An OTP has been sent to your phone number:{" "}
                  <span className="font-semibold">{maskedPhoneNumber}</span>
                </p>

                {/* OTP Input field */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormLabel className="text-center">
                        Enter the OTP sent to your phone
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
                    <div className="flex flex-col">
                      <button
                        onClick={handleResendOTP}
                        className="text-emerald-500 hover:underline"
                      >
                        Resend OTP
                      </button>
                      <button
                        onClick={() => setShowTwoFactor(false)}
                        className="text-red-500 hover:underline"
                      >
                        Want to change phone number?
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span>
                        Resend OTP in{" "}
                        <span className="font-bold text-gray-700">
                          {timer}s
                        </span>
                      </span>
                      <button
                        onClick={() => setShowTwoFactor(false)}
                        className="text-red-500 hover:underline"
                      >
                        Want to change phone number?
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {activeTab === "email" && !showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          {...field}
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isPending}
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
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
            isValid={isValid}
            isPending={isPending}
            submitText={showTwoFactor ? "Confirm" : "Login"}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
