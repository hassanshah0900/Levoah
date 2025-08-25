"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useMultistepForm from "@/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MultistepFormStep } from "../lib/types";
import { addressSchema, AddressSchemaType } from "../lib/validation";
import CustomerAddressFields from "./CustomerAddressFields";
import MultistepFormProgressBar from "./MultistepFormProgressBar";
import Container from "@/components/Container";
import PaymentOptions from "./PaymentOptions";

const steps: MultistepFormStep[] = [
  {
    label: "Order Summary",
    element: <div>Hello world</div>,
    fields: [],
  },
  {
    label: "Customer Details",
    element: <CustomerAddressFields />,
    fields: [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
      "country",
      "city",
    ],
  },
  {
    label: "Payment Options",
    element: <PaymentOptions />,
    fields: [],
  },
];

function CheckoutForm() {
  const form = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  const {
    step,
    currentStep,
    nextStep,
    previousStep,
    goTo,
    hasNextStep,
    hasPreviousStep,
  } = useMultistepForm(steps);

  function onSubmit(data: any) {
    console.log(data);
  }

  async function areAllCurrentPageFieldsValid() {
    return await form.trigger(step.fields);
  }

  return (
    <Container>
      <MultistepFormProgressBar
        steps={steps}
        currentStep={currentStep}
        onStepSelect={async (stepNumber) => {
          if (
            (await areAllCurrentPageFieldsValid()) ||
            stepNumber <= currentStep
          )
            goTo(stepNumber);
        }}
      />
      <form action="" onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>{steps[currentStep - 1].element}</Form>
      </form>
      <div className="flex justify-start items-center gap-5 mt-10">
        <Button disabled={!hasPreviousStep()} onClick={previousStep}>
          Previous
        </Button>
        <Button
          disabled={!hasNextStep()}
          onClick={async () => {
            if (await areAllCurrentPageFieldsValid()) nextStep();
          }}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default CheckoutForm;
