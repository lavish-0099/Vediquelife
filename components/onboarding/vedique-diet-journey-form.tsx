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
import { API_URL, VEDIQUE_DIET_JOURNEY_OPTIONS } from "@/constants";
import { vediqueDietJourneySchema, VediqueDietJourneyValues } from "@/schemas";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";

interface VediqueDietJourneyFormProps {
  onNext: () => void;
  onBack: () => void;
  leadId: string;
  values: {
    vediqueDietJourney: string;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function VediqueDietJourneyForm({
  onNext,
  onBack,
  leadId,
  values,
  setValues,
}: VediqueDietJourneyFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<VediqueDietJourneyValues>({
    resolver: zodResolver(vediqueDietJourneySchema),
    defaultValues: {
      vediqueDietJourney: values.vediqueDietJourney || "",
    },
    mode: "onChange",
  });

  const submitJourney = async (formValues: VediqueDietJourneyValues) => {
    try {
      setLoading(true);

      // local wizard state update
      setValues((prev: FormValues) => ({
        ...prev,
        vediqueDietJourney: formValues.vediqueDietJourney,
      }));

      // API call
      await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        vediqueDietJourney: formValues.vediqueDietJourney,
        step: 5,
      });

      onNext();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedValue = form.watch("vediqueDietJourney");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitJourney)} className="space-y-4">
        <FormField
          control={form.control}
          name="vediqueDietJourney"
          render={({ field }) => (
            <FormItem>
              <div className="text-base text-center md:text-left font-medium mb-2">
                <span className="block text-sm text-gray-500">
                  Your best transformation starts the day you decide
                </span>
              </div>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-3"
                >
                  {VEDIQUE_DIET_JOURNEY_OPTIONS.map((opt) => {
                    const isSelected = selectedValue === opt;

                    return (
                      <label
                        key={opt}
                        htmlFor={opt}
                        className={`block rounded-xl border p-3 transition cursor-pointer
                          ${
                            isSelected
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-300 hover:border-websecondary"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={opt}
                            id={opt}
                            className={`
                              relative w-5 h-5 rounded-full border-2 border-gray-400
                              data-[state=checked]:border-red-500
                              data-[state=checked]:bg-white
                              data-[state=checked]:text-red-500
                              flex items-center justify-center
                              transition
                            `}
                          />
                          <span className="font-medium text-gray-800">
                            {opt}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
            className="bg-webprimary hover:bg-webyellow hover:text-black text-white gap-2"
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
