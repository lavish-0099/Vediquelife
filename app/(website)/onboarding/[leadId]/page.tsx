"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConcernForm } from "@/components/onboarding/concern-form";
import { API_URL, Step } from "@/constants";
import { WeightForm } from "@/components/onboarding/weight-form";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { Loader } from "lucide-react";
import { PersonalConcernForm } from "@/components/onboarding/personal-concern-form";
import { ChallengeForm } from "@/components/onboarding/challenge-form";
import { FormValues } from "@/types/consultation";
import { WeightLossTriedForm } from "@/components/onboarding/weight-loss-tried-form";
import { VediqueDietJourneyForm } from "@/components/onboarding/vedique-diet-journey-form";
import { MotivationForm } from "@/components/onboarding/motivation-form";
import { ConsultationForm } from "@/components/onboarding/consultation-form";

export default function OnboardingPage() {
  const params = useParams<{ leadId: string }>();
  const leadId = params.leadId;
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormValues>({
    healthConcern: "",
    journeyTimeline: "",
    currentWeight: null,
    height: "",
    age: null,
    challenges: [],
    weightLossJourney: [],
    vediqueDietJourney: "",
    motivatedResults: "",
    lookingVediqueDietNutritionist: false,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchLead = async () => {
      try {
        console.log("Fetching lead data for leadId:", leadId);
        const res = await fetch(`${API_URL}/webinar-lead/${leadId}`, {
          cache: "no-store",
          next: { revalidate: 0 },
        });

        console.log("Fetch lead response:", res);

        if (!cancelled && res.ok) {
          const lead = await res.json();
          setLoading(false);
          setName(lead.name || "");
          setFormData((prev) => ({
            ...prev,
            healthConcern: lead.healthConcern || "",
            journeyTimeline: lead.journeyTimeline || "",
            currentWeight: lead.currentWeight ?? null,
            height: lead.height ?? null,
            age: lead.age ?? null,
            challenges: Array.isArray(lead.challenges)
              ? (lead.challenges as string[])
              : [],
            weightLossJourney: Array.isArray(lead.weightLossJourney)
              ? (lead.weightLossJourney as string[])
              : [],
            vediqueDietJourney: lead.vediqueDietJourney || "",
            motivatedResults: lead.motivatedResults || "",
            lookingVediqueDietNutritionist:
              lead.lookingVediqueDietNutritionist ?? false,
          }));
        }
      } catch (err) {
        setError("❌ Failed to fetch lead data. Please try again.");
        console.error("❌ Failed to fetch lead:", err);
      }
    };

    fetchLead();

    return () => {
      cancelled = true;
    };
  }, [leadId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[26rem] px-4">
        <Loader className="animate-spin text-webprimary w-6 h-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  console.log("Rendering step:", step, "with formData:", formData);

  return (
    <div className="mx-auto max-w-2xl p-4 pt-4 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-2xl text-center md:text-left font-semibold">
            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-gray-800">
                  🎉 Thank you {name ? name : ""} for sharing your details!
                </h2>
                <p className="text-sm text-gray-600">
                  You’re just{" "}
                  <span className="font-semibold text-sm text-webprimary">
                    few steps
                  </span>{" "}
                  away from getting your
                  <span className="font-semibold">
                    {" "}
                    personalized Vedique Diet plan
                  </span>
                  .
                </p>
              </>
            )}

            {step === 2 && (
              <h2 className="text-xl font-bold text-gray-800">
                Share your weight details
              </h2>
            )}

            {step === 3 && (
              <h2 className="text-xl font-bold text-gray-800">
                What challenges are you facing right now?
              </h2>
            )}
            {step === 4 && (
              <h2 className="text-xl font-bold text-gray-800">
                What have you already tried in your weight loss journey?
              </h2>
            )}
            {step === 5 && (
              <h2 className="text-xl font-bold text-gray-800">
                When would you like to begin your Vedique Diet journey?
              </h2>
            )}
            {step === 6 && (
              <h2 className="text-xl font-bold text-gray-800">
                How motivated are you to achieve results?
              </h2>
            )}
            {step === 7 && (
              <h2 className="text-xl font-bold text-gray-800">
                Are you looking to consult a certified Vedique Diet
                nutritionist?
              </h2>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-3 md:p-4">
          {/* STEP INDICATOR */}
          <StepIndicator currentStep={step} />

          {/* Step rendering */}

          {step === 1 && (
            <ConcernForm
              onNext={() => setStep(2)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}

          {step === 2 && (
            <WeightForm
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}
          {step === 3 && (
            <ChallengeForm
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}
          {step === 4 && (
            <WeightLossTriedForm
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}
          {step === 5 && (
            <VediqueDietJourneyForm
              onNext={() => setStep(6)}
              onBack={() => setStep(4)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}
          {step === 6 && (
            <MotivationForm
              onNext={() => setStep(7)}
              onBack={() => setStep(5)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}
          {step === 7 && (
            <ConsultationForm
              onBack={() => setStep(6)}
              leadId={leadId}
              values={formData}
              setValues={setFormData}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
