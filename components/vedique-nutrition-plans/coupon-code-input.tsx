"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { couponSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Plan } from "@prisma/client";
import { IoIosArrowDown } from "react-icons/io";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useCouponStore } from "@/store/coupon-store";
import { AppliedCoupon } from "@/types/coupon";
import { useAIPlanStore } from "@/store/ai-plan-store";
import { useUserCountry } from "@/context/user-country-context";

interface CouponCodeInputProps {
  plan: Plan;
}

const CouponCodeInput = ({ plan }: CouponCodeInputProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const {
    couponStatus,
    isSuccess,
    setCouponStatus,
    setIsSuccess,
    setAppliedCoupon,
  } = useCouponStore();

  const { userCurrency, exchangeRate } = useUserCountry();

  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof couponSchema>) => {
    try {
      const response = await axios.post("/api/coupons/plan/apply", {
        ...values,
        currency: userCurrency || "INR",
        exchangeRate: exchangeRate || 1,
        planId: plan.id,
      });
      const planAppliedCoupon: AppliedCoupon = response.data;
      setCouponStatus(`Coupon ${response.data.code} applied successfully!`);
      setIsSuccess(true);
      setAppliedCoupon(planAppliedCoupon);
      form.reset();
      setCollapsed(true);

      toast.success("Coupon applied successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      setIsSuccess(false);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "Invalid coupon code";
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
        setCollapsed(false);
        setCouponStatus(errorMessage);
      } else {
        setCouponStatus("Something went wrong");
      }
    }
  };
  return (
    <div className="w-full flex flex-col items-start justify-start relative">
      {isSubmitting && (
        <div className="absolute h-full w-full top-2 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
        </div>
      )}
      {couponStatus ? (
        <span
          className={
            isSuccess
              ? "text-green-500 text-sm mt-2"
              : "text-red-500 text-sm mt-2"
          }
        >
          {couponStatus}
        </span>
      ) : (
        <span
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm underline underline-offset-8 cursor-pointer decoration-webprimary  decoration-dotted text-gray-600 flex items-center gap-1"
        >
          Have a coupon code?
          <IoIosArrowDown
            className={`transition-transform duration-200 ${
              collapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </span>
      )}

      {!collapsed && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full relative mt-4 flex flex-col "
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter coupon code"
                      {...field}
                      className="w-full text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              title="Apply coupon"
              disabled={!isValid || isSubmitting}
              className="mt-2 w-[100px] flex items-center justify-start gap-2"
            >
              <FaCircleChevronRight className="w-5 h-5" /> Apply
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CouponCodeInput;
