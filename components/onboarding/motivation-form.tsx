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
import { API_URL, MOTIVATION_OPTIONS, MOTIVATION_NUDGES } from "@/constants";
import { motivationSchema, MotivationValues } from "@/schemas";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";

interface MotivationFormProps {
  onNext: () => void;
  onBack: () => void;
  leadId: string;
  values: {
    motivatedResults: string;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function MotivationForm({
  onNext,
  onBack,
  leadId,
  values,
  setValues,
}: MotivationFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<MotivationValues>({
    resolver: zodResolver(motivationSchema),
    defaultValues: {
      motivatedResults: values.motivatedResults || "",
    },
    mode: "onChange",
  });

  const submitMotivation = async (formValues: MotivationValues) => {
    try {
      setLoading(true);

      // local wizard state update
      setValues((prev: FormValues) => ({
        ...prev,
        motivatedResults: formValues.motivatedResults,
      }));

      // API call
      await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        motivatedResults: formValues.motivatedResults,
        step: 6,
      });

      onNext();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selected = form.watch("motivatedResults");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitMotivation)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="motivatedResults"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-3"
                >
                  {MOTIVATION_OPTIONS.map((opt) => {
                    const isSelected = selected === opt;

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

                        {isSelected && MOTIVATION_NUDGES[opt] && (
                          <div className="mt-2 rounded-xl bg-muted p-2 text-sm">
                            {MOTIVATION_NUDGES[opt]}
                          </div>
                        )}
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
