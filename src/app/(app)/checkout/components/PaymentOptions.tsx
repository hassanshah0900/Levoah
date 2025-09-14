import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { Check } from "lucide-react";

const paymentOptions = [
  {
    label: "Bank Transfer",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
  {
    label: "Easypaisa",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
  {
    label: "Jazz Cash",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
  {
    label: "Cash on delivery",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
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
              <AccordionItem key={option.label} value={option.label}>
                <AccordionHeader>
                  <AccordionTrigger className="flex justify-between items-center w-full [&[data-state=open]>svg]:opacity-100 py-3 px-2">
                    <span className="text-base sm:text-lg font-semibold uppercase">
                      {option.label}
                    </span>{" "}
                    <Check className="opacity-0 size-5 me-5 text-highlight" />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="px-2 text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur nostrum enim adipisci, animi at, eveniet minima
                  doloremque illo eius commodi vitae? Eos inventore aspernatur
                  quidem molestias alias. Vero, omnis cupiditate.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      />
    </div>
  );
}
