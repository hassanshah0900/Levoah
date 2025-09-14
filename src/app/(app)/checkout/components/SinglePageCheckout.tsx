"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkoutFormSchema } from "../lib/validation";
import CustomerAddressFields from "./CustomerAddressFields";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import ReviewOrder from "./ReviewOrder";

export default function SinglePageCheckout() {
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
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        action=""
        className="grid grid-cols-2 gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <ReviewOrder />
          <Separator />
          <CustomerAddressFields />
        </div>
        <div className="space-y-5">
          <Separator className="md:hidden" />
          <PaymentOptions />
          <Separator />
          <OrderSummary />
          <Button className="w-full" type="submit">
            Complete Order
          </Button>
        </div>
      </form>
    </Form>
  );
}
