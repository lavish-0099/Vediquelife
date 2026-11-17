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
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "react-toastify";
import { API_URL, CHALLENGE_NUDGES } from "@/constants";
import { challengeSchema, ChallengeValues } from "@/schemas";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { FormValues } from "@/types/consultation";

interface ChallengeFormProps {
  onNext: () => void;
  onBack: () => void;
  leadId: string;
  values: {
    challenges: string[];
  };
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export function ChallengeForm({
  onNext,
  onBack,
  leadId,
  values,
  setValues,
}: ChallengeFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ChallengeValues>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      challenges: values.challenges || [],
    },
    mode: "onChange",
  });

  const submitChallenges = async (formValues: ChallengeValues) => {
    try {
      setLoading(true);

      // local wizard state update
      setValues((prev: FormValues) => ({
        ...prev,
        challenges: formValues.challenges,
      }));

      // API call
      await axios.patch(`${API_URL}/webinar-lead/${leadId}`, {
        challenges: formValues.challenges,
        step: 3,
      });

      onNext();
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const challengeOptions = Object.keys(CHALLENGE_NUDGES) as string[];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitChallenges)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="challenges"
          render={({ field }) => {
            const selected: string[] = field.value || [];

            return (
              <FormItem>
                <div className="text-base text-center md:text-left font-medium mb-2">
                  <span className="text-sm text-gray-500">
                    You can select multiple options
                  </span>
                </div>
                <FormControl>
                  <div className="space-y-3">
                    {challengeOptions.map((opt) => {
                      const isSelected = selected.includes(opt);

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
                            <Checkbox
                              id={opt}
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  // add
                                  field.onChange([...selected, opt]);
                                } else {
                                  // remove
                                  field.onChange(
                                    selected.filter((item) => item !== opt)
                                  );
                                }
                              }}
                              className={`
                                mt-0.5
                                h-5 w-5 rounded-md border-2 transition
                                border-gray-400
                                data-[state=checked]:border-red-500
                                data-[state=checked]:bg-white
                                data-[state=checked]:text-red-500
                                hover:border-red-400
                              `}
                            />
                            <span className="font-medium text-gray-800">
                              {opt}
                            </span>
                          </div>

                          {isSelected && CHALLENGE_NUDGES[opt] && (
                            <div className="mt-2 rounded-xl bg-muted p-2 text-sm">
                              {CHALLENGE_NUDGES[opt]}
                            </div>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
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
