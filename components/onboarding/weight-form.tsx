"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

import { API_URL, WEIGHT_NUDGE } from "@/constants";
import { WeightFormValues, weightSchema } from "@/schemas";
import { FormValues } from "@/types/consultation";

interface WeightFormProps {
  onNext: () => void;
  onBack: () => void;
  leadId: string;
  values: {
    currentWeight: number | null;
    height: string | null;
    age: string | null;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function WeightForm({
  onNext,
  onBack,
  leadId,
  values,
  setValues,
}: WeightFormProps) {
  const resolver = zodResolver(
    weightSchema
  ) as unknown as Resolver<WeightFormValues>;

  const form = useForm<WeightFormValues>({
    resolver,
    defaultValues: {
      currentWeight: values.currentWeight || undefined,
      height: values.height || undefined,
      age: values.age || undefined,
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const submitWeights = async (values: WeightFormValues) => {
    try {
      setLoading(true);
      setValues((prev: FormValues) => ({
        ...prev,
        currentWeight: values.currentWeight,
        height: values.height,
        age: values.age,
      }));
      await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        currentWeight: values.currentWeight,
        height: values.height,
        age: values.age,
        step: 2,
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
      <form onSubmit={form.handleSubmit(submitWeights)} className="space-y-4">
        <div className="text-base text-center md:text-left font-medium">
          What is your current weight?
        </div>

        <FormField
          control={form.control}
          name="currentWeight"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 78"
                  className="h-11 w-full text-base"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      field.onChange(val ? Number(val) : undefined);
                    } else {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter your weight in kilograms (only numbers)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-base font-medium">What is your height?</div>
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. 5'7&quot; or 170 cm"
                  className="h-11 w-full text-base"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Your height in feet/inches or centimeters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-base font-medium">What is your age?</div>
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. 30"
                  className="h-11 w-full text-base"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>Your age in years (old)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-xl bg-muted p-3 text-sm">{WEIGHT_NUDGE}</div>

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
