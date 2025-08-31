import { cn } from "@/lib/utils";
import React from "react";
import { MultistepFormStep } from "../lib/types";

interface Props {
  steps: MultistepFormStep[];
  onStepSelect: (stepNumber: number) => void;
  currentStep: number;
}
export default function MultistepFormProgressBar({
  steps,
  onStepSelect,
  currentStep,
}: Props) {
  return (
    <div className="w-full flex justify-stretch items-center gap-5 mb-10">
      {steps.map((step, index) => (
        <div key={index} className="w-full">
          <div
            className={cn(
              "w-full h-1",
              currentStep > index ? "bg-highlight" : "bg-accent-foreground"
            )}
          />
          <button
            className="flex flex-col items-start cursor-pointer w-full hover:bg-accent transition-all duration-200 p-2 rounded-b-sm"
            onClick={() => onStepSelect(index + 1)}
          >
            <span
              className={cn(
                "text-sm",
                currentStep > index
                  ? "text-highlight"
                  : "text-accent-foreground"
              )}
            >
              Step {index + 1}
            </span>
            <p className="text-foreground text-base font-semibold mt-0">
              {step.label}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}
