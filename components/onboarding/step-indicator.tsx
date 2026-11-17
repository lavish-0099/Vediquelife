"use client";

interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "Concern" },
  { id: 2, label: "Weight" },
  { id: 3, label: "Challenges" },
  { id: 4, label: "Tried Before" },
  { id: 5, label: "Start Time" },
  { id: 6, label: "Motivation" },
  { id: 7, label: "Consultation" },
];

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const totalSteps = STEPS.length;

  // clamp so that progress bar kabhi 100% se upar na jaye
  const safeStep =
    currentStep < 1 ? 1 : currentStep > totalSteps ? totalSteps : currentStep;

  const progress = (safeStep / totalSteps) * 100;
  const current = STEPS.find((s) => s.id === safeStep);

  return (
    <div className="mb-6">
      {/* Top text */}
      <div className="flex items-center justify-between text-xs md:text-sm mb-2">
        <span className="font-medium text-gray-700">
          Step {safeStep} of {totalSteps}
        </span>
        {current && (
          <span className="text-[11px] md:text-xs text-gray-500">
            {current.label}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-webprimary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="mt-3 flex justify-between">
        {STEPS.map((step) => {
          const isCompleted = safeStep > step.id;
          const isActive = safeStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1 text-center"
            >
              <div
                className={`
                  w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs
                  border-2
                  ${
                    isActive
                      ? "bg-webprimary border-webprimary text-white"
                      : isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }
                `}
              >
                {step.id}
              </div>
              <span className="hidden md:block mt-1 text-[11px] text-gray-600 truncate max-w-[80px]">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
