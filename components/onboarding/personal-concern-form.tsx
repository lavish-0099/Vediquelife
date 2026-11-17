"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";
import { API_URL, HEALTH_NUDGES } from "@/constants";
import { concernSchema, ConcernValues } from "@/schemas";
import { useState } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";

interface PersonalConcernFormProps {
  onNext: () => void;
  leadId: string;
  values: {
    healthConcern: string;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function PersonalConcernForm({
  onNext,
  leadId,
  values,
  setValues,
}: PersonalConcernFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ConcernValues>({
    resolver: zodResolver(concernSchema),
    defaultValues: { healthConcern: values.healthConcern || undefined },
    mode: "onChange",
  });

  const healthConcern = values.healthConcern;
  const concernNudge = HEALTH_NUDGES[healthConcern] || "";

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
        <div className="text-base text-center md:text-left font-medium mb-2">
          Your primary health concern
        </div>

        {/* Selected health concern */}
        <div className="rounded-xl border border-gray-300 bg-blue-50 p-3">
          <div className="font-medium text-gray-800">{healthConcern}</div>
          {concernNudge && (
            <div className="mt-2 rounded-xl bg-muted p-2 text-sm">
              {concernNudge}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
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
