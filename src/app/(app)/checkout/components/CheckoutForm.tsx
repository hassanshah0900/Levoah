"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import useMultistepForm from "@/hooks/useMultistepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "../lib/actions";
import { MultistepFormStep } from "../lib/types";
import { checkoutFormSchema } from "../lib/validation";
import CustomerAddressFields from "./CustomerAddressFields";
import MultistepFormProgressBar from "./MultistepFormProgressBar";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";

const steps: MultistepFormStep[] = [
  {
    label: "Order Summary",
    element: <OrderSummary />,
    fields: [],
  },
  {
    label: "Customer Details",
    element: <CustomerAddressFields />,
    fields: [
      "full_name",
      "phone",
      "email",
      "address",
      "province",
      "country",
      "city",
      "postal_code",
    ].map(
      (field) => `shipping_address.${field}`
    ) as MultistepFormStep["fields"],
  },
  {
    label: "Payment Options",
    element: <PaymentOptions />,
    fields: [],
  },
];

function CheckoutForm() {
  const { cartItems, reset } = useShoppingCart();

  const router = useRouter();
  const { mutate, status } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      router.replace(`/order/confirmation/${data.tracking_code}`);
      reset();
    },

    onError(error) {
      toast.error("Couldn't place order.");
    },
  });

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onChange",
    defaultValues: {
      shipping_address: {
        full_name: "",
        address: "",
        city: "",
        country: "Pakistan",
        email: "",
        phone: "",
        province: "",
        postal_code: "",
      },
      payment_method: "Cash on delivery",
    },
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
    const order = {
      ...data,
      orderItems: cartItems,
    };
    mutate(order);
    console.log(order);
  }

  async function areAllCurrentPageFieldsValid() {
    return await form.trigger(step.fields);
  }

  async function areAllPreviousStepsFieldsValid(stepNumber: number) {
    const previousStepsFields = steps.reduce<MultistepFormStep["fields"]>(
      (acc, curr, idx) => {
        const fields = curr.fields;
        const currentStep = idx + 1;
        if (currentStep < stepNumber) {
          fields.forEach((field) => acc.push(field));
        }
        return acc;
      },
      []
    );
    const result = await form.trigger(previousStepsFields);

    // clear errors of all previous steps except for current step.
    form.clearErrors(
      previousStepsFields.filter((field) => !step.fields.includes(field))
    );
    return result;
  }

  return (
    <div>
      <MultistepFormProgressBar
        steps={steps}
        currentStep={currentStep}
        onStepSelect={async (stepNumber) => {
          if (
            stepNumber <= currentStep ||
            (await areAllPreviousStepsFieldsValid(stepNumber))
          )
            goTo(stepNumber);
        }}
      />
      <form action="" onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          {steps[currentStep - 1].element}

          {!hasNextStep() && (
            <Button className="w-full mt-10">
              {status === "pending" ? "Loading..." : "Complete Order"}
            </Button>
          )}
        </Form>
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
    </div>
  );
}

export default CheckoutForm;
