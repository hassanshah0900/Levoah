import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PaymentMethod } from "../lib/types";
import { CheckoutFormSchemaType } from "../lib/validation";

const paymentOptions: {
  label: string;
  value: PaymentMethod;
  description: string;
}[] = [
  {
    label: "Bank Transfer",
    value: "BANKTRANSFER",
    description:
      "After placing your order, you'll receive the necessary bank details. Your order will be confirmed once we receive the payment for the full amount due.",
  },
  {
    label: "Cash on delivery",
    value: "CASHONDELIVERY",
    description: `Pay for your order in cash upon delivery.\nNote: Your order will be confirmed when you will pay delivery charges in advance.`,
  },
];

export default function PaymentOptions() {
  const {
    formState: { errors },
  } = useFormContext<CheckoutFormSchemaType>();
  return (
    <div className="space-y-2">
      <h2 className="text-xl">3. Select Payment Method</h2>
      <div>
        <FormField
          name="paymentMethod"
          render={({ field }) => (
            <Accordion
              type="single"
              value={field.value}
              onValueChange={field.onChange}
            >
              {paymentOptions.map((option) => (
                <AccordionItem key={option.label} value={option.value}>
                  <AccordionHeader>
                    <AccordionTrigger className="flex justify-between items-center w-full [&[data-state=open]>svg]:opacity-100 py-3 px-2 cursor-pointer">
                      <span className="text-base sm:text-lg font-semibold uppercase">
                        {option.label}
                      </span>{" "}
                      <Check className="opacity-0 size-5 me-5 text-highlight" />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="px-2 text-sm sm:text-base whitespace-pre-wrap">
                    {option.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        />
        {errors["paymentMethod"] && (
          <p className="text-sm text-destructive">
            {errors["paymentMethod"].message}
          </p>
        )}
      </div>
    </div>
  );
}
