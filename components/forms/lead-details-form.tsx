"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { consultationFormSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Loader } from "lucide-react";
import { getAvailableSlots } from "@/utils/time-slots";

interface LeadDetailsFormProps {
  onSuccess?: () => void;
  onCloseModal?: () => void;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;
function formatHealthConcern(pathname: string): string {
  if (!pathname) return "";
  const excludedPaths = [
    "/Gads",
    "/Gads/v1",
    "/Gads/v2",
    "/Gads/v3",
    "/Gads/v4",
    "/about",
    "/contact",
  ];

  if (excludedPaths.includes(pathname)) {
    return "";
  }

  const slug = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
export const LeadDetailsForm = ({
  onSuccess,
  onCloseModal,
}: LeadDetailsFormProps) => {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const utm_source = searchParams.get("utm_source") || null;
  const utm_medium = searchParams.get("utm_medium") || null;
  const utm_campaign = searchParams.get("utm_campaign") || null;
  const utm_term = searchParams.get("utm_term") || null;
  const utm_content = searchParams.get("utm_content") || null;
  const todaySlots = getAvailableSlots("today");
  const defaultDay = todaySlots.length > 0 ? "today" : "tomorrow";
  const form = useForm<z.infer<typeof consultationFormSchema>>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      currentCity: "",
      bestDay: defaultDay,
      bestTime: "",
    },
    mode: "onChange",
  });
  const bestDay = form.watch("bestDay");

  useEffect(() => {
    const todaySlots = getAvailableSlots("today");
    const tomorrowSlots = getAvailableSlots("tomorrow");

    if (bestDay === "today" && todaySlots.length === 0) {
      form.setValue("bestDay", "tomorrow");
      setSlots(tomorrowSlots);
      form.setValue("bestTime", "");
    } else {
      const slotsForDay = bestDay === "today" ? todaySlots : tomorrowSlots;
      setSlots(slotsForDay);
      form.setValue("bestTime", "");
    }
  }, [bestDay, form]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof consultationFormSchema>) => {
    setLoading(true);

    const healthConcern = formatHealthConcern(pathname);
    console.log("Values:", values);
    try {
      const response = await axios.post(`${API_BASE_URL}/webinar-lead`, {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        currentCity: values.currentCity,
        bestDay: values.bestDay,
        bestTime: values.bestTime,
        lookingFor: "Vedique Diet",
        healthConcern: healthConcern,
        source: "Vedique Website",
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
      });

      if (response.status === 200 && response.data.id) {
        onSuccess?.();
        onCloseModal?.();
        const redirectUrl = healthConcern
          ? `/onboarding/${response.data.id}`
          : `/onboarding/${response.data.id}?s=static`;
        router.push(redirectUrl);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong during lead submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                  disabled={isSubmitting || loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...field}
                  disabled={isSubmitting || loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  {...field}
                  disabled={isSubmitting || loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Current City */}
        <FormField
          control={form.control}
          name="currentCity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Current City"
                  {...field}
                  disabled={isSubmitting || loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Best Day */}
          <FormField
            control={form.control}
            name="bestDay"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium mb-1">
                  Best Day to Call
                </label>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting || loading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableSlots("today").length > 0 && (
                        <SelectItem value="today">Today</SelectItem>
                      )}
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Best Time */}
          <FormField
            control={form.control}
            name="bestTime"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium mb-1">
                  Best Time to Call
                </label>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting || loading || slots.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {slots.length > 0 ? (
                        slots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No slots available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-webprimary text-white hover:bg-webyellow hover:text-black flex items-center justify-center gap-2"
          disabled={isSubmitting || !isValid || loading}
        >
          {loading && <Loader className="h-5 w-5 animate-spin" />}
          {loading ? "Processing..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};
