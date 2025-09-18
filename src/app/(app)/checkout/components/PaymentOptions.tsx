import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { Check } from "lucide-react";
import { PaymentMethod } from "../lib/types";

const paymentOptions: {
  label: string;
  value: PaymentMethod;
  description: string;
}[] = [
  {
    label: "Payfast",
    value: "PAYFAST",
    description:
      "Pay safely online with PayFast using your card, bank transfer, or mobile wallet – instant confirmation and fully secure checkout.",
  },
  {
    label: "Cash on delivery",
    value: "CASHONDELIVERY",
    description: "Pay in cash when your order is delivered to you.",
  },
];

export default function PaymentOptions() {
  return (
    <div className="space-y-2">
      <h2 className="text-xl">3. Select Payment Method</h2>
      <FormField
        name="payment_method"
        render={({ field }) => (
          <Accordion
            type="single"
            value={field.value}
            onValueChange={field.onChange}
          >
            {paymentOptions.map((option) => (
              <AccordionItem key={option.label} value={option.value}>
                <AccordionHeader>
                  <AccordionTrigger className="flex justify-between items-center w-full [&[data-state=open]>svg]:opacity-100 py-3 px-2">
                    <span className="text-base sm:text-lg font-semibold uppercase">
                      {option.label}
                    </span>{" "}
                    <Check className="opacity-0 size-5 me-5 text-highlight" />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="px-2 text-sm sm:text-base">
                  {option.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      />
    </div>
  );
}
