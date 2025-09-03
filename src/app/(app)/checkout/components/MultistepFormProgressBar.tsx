import { cn } from "@/lib/utils";
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
    <div className="w-full flex justify-stretch items-start gap-1.5 sm:gap-2 md:gap-5 mb-6 sm:mb-10">
      {steps.map((step, index) => (
        <div key={index} className="w-full">
          <div
            className={cn(
              "w-full h-[2px] xs:h-1",
              currentStep > index ? "bg-highlight" : "bg-accent-foreground"
            )}
          />
          <button
            className="flex flex-col items-start cursor-pointer w-full hover:bg-accent transition-all duration-200 p-2 rounded-b-sm gap-2 xs:gap-1"
            onClick={() => onStepSelect(index + 1)}
          >
            <span
              className={cn(
                "text-xs sm:text-sm",
                currentStep > index
                  ? "text-highlight"
                  : "text-accent-foreground"
              )}
            >
              Step {index + 1}
            </span>
            <p className="text-foreground text-sm sm:text-base text-start font-semibold mt-0 leading-tight">
              {step.label}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
}
