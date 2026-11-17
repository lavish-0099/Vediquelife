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
import { API_URL, NUDGES } from "@/constants";
import { concernSchema, ConcernValues } from "@/schemas";
import { useMemo, useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";

interface ConcernFormProps {
  onNext: () => void;
  leadId: string;
  values: {
    healthConcern: string;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function ConcernForm({
  onNext,
  leadId,
  values,
  setValues,
}: ConcernFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ConcernValues>({
    resolver: zodResolver(concernSchema),
    defaultValues: { healthConcern: values.healthConcern || undefined },
    mode: "onChange",
  });

  const selectedConcern = form.watch("healthConcern");

  const concernNudge = useMemo(
    () => (selectedConcern ? NUDGES[selectedConcern] : ""),
    [selectedConcern]
  );

  const submitConcern = async (values: ConcernValues) => {
    try {
      setLoading(true);
      setValues((prev: FormValues) => ({
        ...prev,
        healthConcern: values.healthConcern,
      }));
      await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        healthConcern: values.healthConcern,
        step: 1,
      });

      onNext();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitConcern)} className="space-y-4">
        <FormField
          control={form.control}
          name="healthConcern"
          render={({ field }) => (
            <FormItem>
              <div className="text-base text-center md:text-left font-medium mb-2">
                What is your primary health concern?
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-3"
                >
                  {Object.keys(NUDGES).map((opt) => (
                    <label
                      key={opt}
                      htmlFor={opt}
                      className={`block rounded-xl border p-3 transition cursor-pointer
                        ${
                          selectedConcern === opt
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
                            data-[state=checked]:border-websecondary
                            data-[state=checked]:bg-white
                            flex items-center justify-center
                            transition
                            `}
                        />

                        <span className="font-medium text-gray-800">{opt}</span>
                      </div>

                      {selectedConcern === opt && (
                        <div className="mt-2 rounded-xl bg-muted  p-2 text-sm ">
                          {concernNudge}
                        </div>
                      )}
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
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
