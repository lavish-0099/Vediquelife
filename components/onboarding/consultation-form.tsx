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
import {
  API_URL,
  CONSULTATION_OPTIONS,
  CONSULTATION_NUDGES,
} from "@/constants";
import { consultationSchema, ConsultationValues } from "@/schemas";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";
import { useRouter } from "next/navigation";

interface ConsultationFormProps {
  onBack: () => void;
  leadId: string;
  values: {
    lookingVediqueDietNutritionist: boolean;
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function ConsultationForm({
  onBack,
  leadId,
  values,
  setValues,
}: ConsultationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      lookingVediqueDietNutritionist:
        values.lookingVediqueDietNutritionist || true,
    },
    mode: "onChange",
  });

  const submitConsultation = async (formValues: ConsultationValues) => {
    try {
      setLoading(true);

      // local wizard state update
      setValues((prev: FormValues) => ({
        ...prev,
        lookingVediqueDietNutritionist:
          formValues.lookingVediqueDietNutritionist,
      }));

      // API call – LAST STEP: step = 7 (same logic as old TimelineForm)
      const response = await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        lookingVediqueDietNutritionist:
          formValues.lookingVediqueDietNutritionist,
        step: 7,
      });

      if (response.status === 200) {
        router.push("/thank-you");
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error("❌ Consultation submit failed:", err);
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selected = form.watch("lookingVediqueDietNutritionist");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitConsultation)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="lookingVediqueDietNutritionist"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(val) => field.onChange(val === "true")}
                  value={String(field.value)}
                  className="space-y-3"
                >
                  {(["true", "false"] as const).map((optionKey) => {
                    const isSelected = String(selected) === optionKey;

                    const label =
                      CONSULTATION_OPTIONS[optionKey as "true" | "false"];

                    return (
                      <label
                        key={optionKey}
                        htmlFor={optionKey}
                        className={`block rounded-xl border p-3 cursor-pointer transition
                          ${
                            isSelected
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            id={optionKey}
                            value={optionKey}
                            className={`
                              w-5 h-5 rounded-full border-2 border-gray-400
                              data-[state=checked]:border-red-500
                              data-[state=checked]:bg-white
                              data-[state=checked]:text-red-500
                              transition
                            `}
                          />
                          <span className="font-medium text-gray-800">
                            {label}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="mt-2 rounded-xl bg-muted p-2 text-sm">
                            {CONSULTATION_NUDGES[optionKey as "true" | "false"]}
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
