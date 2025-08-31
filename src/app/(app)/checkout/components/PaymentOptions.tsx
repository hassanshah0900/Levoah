import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { Check } from "lucide-react";

const paymentOptions = [
  {
    label: "Bank Transfer",
    value: "bankTransfer",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
  {
    label: "Easypaisa",
    value: "easypaisa",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
  {
    label: "Jazz Cash",
    value: "jazzcash",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
  {
    label: "Cash on deliver",
    value: "cashOnDelivery",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur nostrum enim adipisci, animi at, eveniet minima doloremque illo eiuscommodi vitae? Eos inventore aspernatur quidem molestias alias. Vero,omnis cupiditate.",
  },
];

export default function PaymentOptions() {
  return (
    <div className="space-y-10">
      <Accordion type="single" defaultValue="cashOnDelivery">
        {paymentOptions.map((option) => (
          <AccordionItem key={option.value} value={option.value}>
            <AccordionHeader>
              <AccordionTrigger className="flex justify-between items-center w-full [&[data-state=open]>svg]:opacity-100 py-3 px-2">
                <span className="text-lg font-semibold uppercase">
                  {option.label}
                </span>{" "}
                <Check className="opacity-0 size-5 me-5 text-highlight" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent className="px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur nostrum enim adipisci, animi at, eveniet minima
              doloremque illo eius commodi vitae? Eos inventore aspernatur
              quidem molestias alias. Vero, omnis cupiditate.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button className="w-full">Complete Order</Button>
    </div>
  );
}
