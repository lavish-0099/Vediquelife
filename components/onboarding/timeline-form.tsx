"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { toast } from "react-toastify";

import { API_URL, PRICE_ANCHOR } from "@/constants";

import { timelineSchema, TimelineValues } from "@/schemas";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";
import { useRouter } from "next/navigation";
import { useUserCountry } from "@/context/user-country-context";

interface TimelineFormProps {
  onBack: () => void;
  leadId: string;
  values: {
    journeyTimeline: string;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function TimelineForm({
  onBack,
  leadId,
  values,
  setValues,
}: TimelineFormProps) {
  const router = useRouter();
  const { monthPrice } = useUserCountry();
  const [loading, setLoading] = useState(false);

  const form = useForm<TimelineValues>({
    resolver: zodResolver(timelineSchema),
    defaultValues: { journeyTimeline: values.journeyTimeline || undefined },
    mode: "onChange",
  });

  const submitTimeline = async (values: TimelineValues) => {
    try {
      setLoading(true);
      setValues((prev: FormValues) => ({
        ...prev,
        journeyTimeline: values.journeyTimeline,
      }));
      const response = await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        journeyTimeline: values.journeyTimeline,
        step: 3,
      });
      if (response.status === 200) {
        const isMetaSource = response.data.source === "Meta";
        const redirectUrl = !isMetaSource ? "/Gads/thank-you" : "/thank-you";
        router.push(redirectUrl);
      } else throw new Error("Failed to save");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const options = [
    "Immediately",
    "Within 1 week",
    "Within 1 month",
    "Just exploring",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitTimeline)} className="space-y-5">
        <div className="text-base text-center md:text-left font-medium">
          How soon do you want to start your health journey?
        </div>

        <FormField
          control={form.control}
          name="journeyTimeline"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-3"
                >
                  {options.map((opt) => {
                    const id = opt.replace(/\s+/g, "-").toLowerCase();
                    return (
                      <label
                        key={opt}
                        htmlFor={id}
                        className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition
                          ${
                            field.value === opt
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        <RadioGroupItem
                          value={opt}
                          id={id}
                          className={`
                            w-5 h-5 rounded-full border-2 border-gray-400
                            data-[state=checked]:border-websecondary
                            data-[state=checked]:bg-websecondary
                            transition
                          `}
                        />
                        <span className="font-medium text-gray-800">{opt}</span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {PRICE_ANCHOR && (
          <div className="rounded-xl bg-muted p-3 text-sm">
            🌟 Most clients start noticing changes within 2 weeks. Our
            personalized Vedique Diet Program starts at just{" "}
            <strong>{monthPrice}</strong> — less than the cost of eating out
            twice a week — for complete medical nutrition guidance, recipes, and
            expert support.
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={onBack}
            disabled={loading}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <Button
            type="submit"
            disabled={!form.formState.isValid || loading}
            className="bg-websecondary hover:bg-webprimary text-white gap-2"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
