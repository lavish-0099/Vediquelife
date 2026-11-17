"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { couponSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useCouponStore } from "@/store/coupon-store";
import { useCartStore } from "@/store/cart-store";

const CouponCodeForm = () => {
  const { cartItems } = useCartStore();

  const { setCouponStatus, setIsSuccess, setAppliedCoupon } = useCouponStore();

  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof couponSchema>) => {
    try {
      const response = await axios.post("/api/coupons/apply", {
        ...values,
        cartItems,
      });
      setCouponStatus("Coupon applied successfully!");
      setIsSuccess(true);
      setAppliedCoupon(response.data);
      toast.success("Coupon applied successfully!");
      form.reset();
    } catch (error) {
      setIsSuccess(false);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "Something went wrong";
        toast.error(errorMessage);
        setIsSuccess(false);
        setCouponStatus(errorMessage);
      } else {
        setCouponStatus("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start relative">
      {isSubmitting && (
        <div className="absolute h-full w-full  top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-webprimary  animate-spin" />
        </div>
      )}
      <h1 className="text-2xl font-bold">Discount Coupon Code</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 w-full"
        >
          <div className="flex flex-col items-start w-full gap-x-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl className="w-full">
                    <Input
                      disabled={isSubmitting}
                      placeholder="Coupon Code"
                      {...field}
                      className="w-full text-lg font-medium"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full md:w-[200px] flex bg-webprimary hover:bg-webvedique mt-4 px-4 py-4 rounded-md"
            >
              Apply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CouponCodeForm;
