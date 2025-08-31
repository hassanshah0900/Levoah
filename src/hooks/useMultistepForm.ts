"use client";

import { MultistepFormStep } from "@/app/(app)/checkout/lib/types";
import { useState } from "react";

export default function useMultistepForm(steps: MultistepFormStep[]) {
  const [currentStep, setCurrentStep] = useState(1);

  function hasNextStep() {
    return currentStep < steps.length;
  }

  function hasPreviousStep() {
    return currentStep > 1;
  }

  function nextStep() {
    if (hasNextStep()) setCurrentStep(currentStep + 1);
  }

  function previousStep() {
    if (hasPreviousStep()) setCurrentStep(currentStep - 1);
  }

  function goTo(stepNumber: number) {
    setCurrentStep(stepNumber);
  }
  return {
    currentStep,
    step: steps[currentStep - 1],
    nextStep,
    previousStep,
    goTo,
    hasNextStep,
    hasPreviousStep,
    steps,
  };
}
